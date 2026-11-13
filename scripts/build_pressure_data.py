#!/usr/bin/env python3
"""Build the data block for pressure-dashboard.html.

Usage:
    python3 scripts/build_pressure_data.py [download_dir]

Downloads public nflverse release files (cached in download_dir, default
.cache/nflverse), aggregates Seattle's defensive dropbacks, and rewrites the
JSON between the DATA:START / DATA:END markers in pressure-dashboard.html.

Sources (all public):
  - nflverse play-by-play (nflfastR): quarter, down, sacks, QB hits
  - FTN charting via nflverse: blitzers and pass rushers per play
  - Pro Football Reference advanced defense via nflverse: player pressures
  - nflverse participation (2025 only): pressure flag + defensive personnel
  - data/espn_prwr_2026.json: ESPN pass rush win rate, copied by hand
  - data/sumerbrain_2026_by_quarter.csv, _by_down.csv, _season.csv (optional):
    provider-reported 2026 pressure by game and quarter/down, plus season
    splits by coverage, rusher count and personnel, pasted from SumerBrain
    chats. Unaudited; dropbacks and sacks are checked against play-by-play.

Requires pandas. Nothing here is estimated: a metric with no public source
for a season is left out and the dashboard says so.
"""
import json, os, re, sys, urllib.request
import pandas as pd

TEAM = "SEA"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DL = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, ".cache", "nflverse")
BASE = "https://github.com/nflverse/nflverse-data/releases/download/"
FILES = {
    "pbp26": "pbp/play_by_play_2026.csv.gz",
    "pbp25": "pbp/play_by_play_2025.csv.gz",
    "ftn26": "ftn_charting/ftn_charting_2026.csv",
    "ftn25": "ftn_charting/ftn_charting_2025.csv",
    "pfr26": "pfr_advstats/advstats_week_def_2026.csv",
    "part25": "pbp_participation/pbp_participation_2025.csv",
    "roster26": "rosters/roster_2026.csv",
}


def load(key):
    os.makedirs(DL, exist_ok=True)
    path = os.path.join(DL, os.path.basename(FILES[key]))
    if not os.path.exists(path):
        print("downloading", FILES[key])
        urllib.request.urlretrieve(BASE + FILES[key], path)
    return pd.read_csv(path, low_memory=False)


def dropbacks(pbp, ftn):
    """Seattle defensive dropbacks with FTN rush counts attached."""
    d = pbp[(pbp.defteam == TEAM) & (pbp.qb_dropback == 1) & pbp.down.notna()
            & (pbp.qb_spike != 1)].copy()
    f = ftn[["nflverse_game_id", "nflverse_play_id", "n_blitzers", "n_pass_rushers"]]
    d = d.merge(f, how="left", left_on=["game_id", "play_id"],
                right_on=["nflverse_game_id", "nflverse_play_id"])
    d["contact"] = ((d.sack == 1) | (d.qb_hit == 1)).astype(int)
    d["blitz"] = (d.n_blitzers > 0).astype(int)
    d["qtr"] = d.qtr.clip(upper=4).astype(int)   # overtime folded into Q4
    d["down"] = d.down.astype(int)
    return d


def cell(g, metrics):
    out = {"n": int(len(g))}
    for name, col in metrics.items():
        out[name] = int(g[col].sum())
    return out


def weekly(d, metrics, label_fn):
    weeks = []
    for (wk, gid), g in d.groupby(["week", "game_id"], sort=True):
        w = {"week": int(wk), "label": label_fn(g), **cell(g, metrics)}
        w["qtr"] = {str(q): cell(g[g.qtr == q], metrics) for q in (1, 2, 3, 4)}
        w["down"] = {str(k): cell(g[g.down == k], metrics) for k in (1, 2, 3, 4)}
        rush = g.n_pass_rushers.dropna()
        w["rushers"] = {"3": int((rush <= 3).sum()), "4": int((rush == 4).sum()),
                        "5": int((rush == 5).sum()), "6": int((rush >= 6).sum())}
        weeks.append(w)
    return weeks


def game_label(g):
    r = g.iloc[0]
    home = r.home_team == TEAM
    opp = r.away_team if home else r.home_team
    wk = int(r.week)
    pre = {19: "WC", 20: "DIV", 21: "CONF", 22: "SB"}.get(wk, "W%d" % wk) if r.season_type == "POST" else "W%d" % wk
    return {"wk": pre, "opp": ("vs " if home else "@ ") + opp}


def package(s):
    """Personnel package from listed positions. Returns (name, dl, lb, db)."""
    if not isinstance(s, str):
        return None
    n = {"dl": 0, "lb": 0, "db": 0}
    for cnt, pos in re.findall(r"(\d+) ([A-Z]+)", s):
        if pos in ("DE", "DT", "NT", "DL"): n["dl"] += int(cnt)
        elif pos in ("ILB", "OLB", "MLB", "LB"): n["lb"] += int(cnt)
        elif pos in ("CB", "FS", "SS", "S", "DB"): n["db"] += int(cnt)
    if sum(n.values()) != 11:
        return None
    name = {4: "Base", 5: "Nickel", 6: "Dime"}.get(n["db"], "Other")
    return name, n["dl"], n["lb"], n["db"]


def main():
    out = {"team": TEAM}

    # ---------- 2026: play-by-play + FTN + PFR ----------
    d26 = dropbacks(load("pbp26"), load("ftn26"))
    m26 = {"contact": "contact", "sacks": "sack", "blitz": "blitz"}
    w26 = weekly(d26, m26, game_label)

    pfr = load("pfr26")
    pfr = pfr[pfr.team == TEAM]
    pw = pfr.groupby("week").def_pressures.sum()
    for w in w26:
        w["pressures"] = int(pw.get(w["week"], 0))

    roster = load("roster26").drop_duplicates("pfr_id").set_index("pfr_id")
    players = []
    cols = {"pressures": "def_pressures", "hurries": "def_times_hurried",
            "hits": "def_times_hitqb", "sacks": "def_sacks", "blitzes": "def_times_blitzed"}
    weeks26 = [w["week"] for w in w26]
    for (pid, name), g in pfr.groupby(["pfr_player_id", "pfr_player_name"]):
        tot = {k: float(g[c].sum()) for k, c in cols.items()}
        if tot["pressures"] == 0 and tot["blitzes"] == 0:
            continue
        byw = g.set_index("week")
        players.append({
            "id": pid, "name": name,
            "pos": roster.position.get(pid) if pid in roster.index else None,
            "games": int(len(g)), **tot,
            "weekly": [int(byw.def_pressures.get(w, 0)) if w in byw.index else None for w in weeks26],
        })
    players.sort(key=lambda p: (-p["pressures"], -p["sacks"], -p["blitzes"]))
    out["s2026"] = {"weeks": w26, "players": players}

    # Optional provider-reported table: pressure per dropback, by game and quarter
    sb_path = os.path.join(ROOT, "data", "sumerbrain_2026_by_quarter.csv")
    if os.path.exists(sb_path):
        sb = pd.read_csv(sb_path)
        pers = []
        for w in w26:
            g = sb[sb.week == w["week"]]
            if len(g) != 4:
                sys.exit("SumerBrain table is missing quarters for week %d" % w["week"])
            for _, r in g.iterrows():
                c = w["qtr"][str(int(r.quarter))]
                if (c["n"], c["sacks"]) != (int(r.dropbacks), int(r.sacks)):
                    sys.exit("SumerBrain week %d Q%d does not match play-by-play" % (w["week"], r.quarter))
                c["pressure"] = int(r.pressures)
            w["pressure"] = int(g.pressures.sum())
            w["man"], w["zone"] = int(g.man.sum()), int(g.zone.sum())
            pers.append({"label": w["label"], "Base": int(g.base.sum()),
                         "Nickel": int(g.nickel.sum()), "Dime": int(g.dime.sum()), "Other": 0})
        out["s2026"]["personnel"] = {
            "weekly": pers, "dropbacks": int(sb.dropbacks.sum()),
            "total": int(sb.base.sum() + sb.nickel.sum() + sb.dime.sum()),
            "man": int(sb.man.sum()), "zone": int(sb.zone.sum()), "rush5": int(sb.rush5plus.sum())}

        dn_path = os.path.join(ROOT, "data", "sumerbrain_2026_by_down.csv")
        if os.path.exists(dn_path):
            dn = pd.read_csv(dn_path)
            for w in w26:
                for _, r in dn[dn.week == w["week"]].iterrows():
                    c = w["down"][str(int(r.down))]
                    if (c["n"], c["sacks"]) != (int(r.dropbacks), int(r.sacks)):
                        sys.exit("SumerBrain week %d down %d does not match play-by-play" % (w["week"], r.down))
                    c["pressure"] = int(r.pressures)
                if sum(c.get("pressure", 0) for c in w["down"].values()) != w["pressure"]:
                    sys.exit("SumerBrain down and quarter tables disagree in week %d" % w["week"])

        ss_path = os.path.join(ROOT, "data", "sumerbrain_2026_season.csv")
        if os.path.exists(ss_path):
            ss = pd.read_csv(ss_path)
            for cat, g in ss.groupby("category"):
                if (int(g.dropbacks.sum()), int(g.pressures.sum())) != (int(sb.dropbacks.sum()), int(sb.pressures.sum())):
                    sys.exit("SumerBrain season split '%s' does not add up to the game totals" % cat)
            out["s2026"]["splits"] = {cat: [{"name": str(r.value), "n": int(r.dropbacks), "pressure": int(r.pressures)}
                                            for _, r in g.iterrows()] for cat, g in ss.groupby("category", sort=False)}

    # ---------- 2025: adds participation (pressure flag + personnel) ----------
    d25 = dropbacks(load("pbp25"), load("ftn25"))
    part = load("part25")[["nflverse_game_id", "play_id", "was_pressure", "defense_personnel"]]
    d25 = d25.merge(part, how="left", left_on=["game_id", "play_id"],
                    right_on=["nflverse_game_id", "play_id"], suffixes=("", "_p"))
    d25["pressure"] = (d25.was_pressure == True).astype(int)  # noqa: E712
    m25 = {"pressure": "pressure", "contact": "contact", "sacks": "sack", "blitz": "blitz"}
    out["s2025"] = {"weeks": weekly(d25, m25, game_label)}

    pk = d25.defense_personnel.map(package)
    d25["pkg"] = pk.map(lambda t: t[0] if t else None)
    d25["shape"] = pk.map(lambda t: "%d-%d-%d" % t[1:] if t else None)
    known = d25[d25.pkg.notna()]
    pkgs = []
    for name in ("Base", "Nickel", "Dime", "Other"):
        g = known[known.pkg == name]
        if not len(g):
            continue
        shapes = [{"shape": s, **cell(sg, {"pressure": "pressure", "blitz": "blitz"})}
                  for s, sg in g.groupby("shape")]
        shapes.sort(key=lambda s: -s["n"])
        pkgs.append({"name": name, **cell(g, {"pressure": "pressure", "blitz": "blitz", "sacks": "sack"}),
                     "byDown": {str(k): int((g.down == k).sum()) for k in (1, 2, 3, 4)},
                     "shapes": shapes})
    pw25 = []
    for (wk, gid), g in known.groupby(["week", "game_id"], sort=True):
        pw25.append({"label": game_label(d25[d25.game_id == gid]),
                     **{n: int((g.pkg == n).sum()) for n in ("Base", "Nickel", "Dime", "Other")}})
    out["s2025"]["personnel"] = {"total": int(len(known)), "unclassified": int(len(d25) - len(known)),
                                 "packages": pkgs, "weekly": pw25}

    with open(os.path.join(ROOT, "data", "espn_prwr_2026.json")) as fh:
        out["espn"] = json.load(fh)
    out["meta"] = {"through2026": "Week %d" % max(weeks26),
                   "built": pd.Timestamp.now(tz="UTC").strftime("%Y-%m-%d")}

    html_path = os.path.join(ROOT, "pressure-dashboard.html")
    blob = json.dumps(out, separators=(",", ":"))
    with open(html_path) as fh:
        html = fh.read()
    new, n = re.subn(r"(/\*DATA:START\*/).*?(/\*DATA:END\*/)",
                     lambda m: m.group(1) + blob + m.group(2), html, flags=re.S)
    if n != 1:
        sys.exit("DATA markers not found in pressure-dashboard.html")
    with open(html_path, "w") as fh:
        fh.write(new)
    print("wrote %d bytes of data into pressure-dashboard.html" % len(blob))
    return out


if __name__ == "__main__":
    main()
