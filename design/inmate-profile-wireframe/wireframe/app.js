const navItems = document.querySelectorAll(".nav-item[data-section]");
const sections = document.querySelectorAll(".main .section");

navItems.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.section;
    navItems.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    sections.forEach((s) => s.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
  });
});

document.querySelectorAll(".toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("on");
    toggle.setAttribute("aria-pressed", toggle.classList.contains("on"));
  });
});

const visitorMaster = document.getElementById("visitor-master");
const visitorChildren = document.querySelectorAll("#visitor-children .child-toggle");

function syncVisitorChildren() {
  const masterOn = visitorMaster.classList.contains("on");
  visitorChildren.forEach((row) => {
    row.classList.toggle("disabled", masterOn);
  });
}

if (visitorMaster) {
  visitorMaster.addEventListener("click", () => {
    setTimeout(syncVisitorChildren, 0);
  });
  syncVisitorChildren();
}
