# 🚀 SETUP INSTRUCTIONS

## 📦 You've Downloaded All Files!

Your Dark Side Defense playbook is ready to deploy.

---

## 📁 FILE STRUCTURE

Create this folder structure on your computer:

```
dark-side-defense/
├── index.html              ⭐ MAIN FILE
├── README.md
├── DEPLOYMENT.md
├── package.json
├── .gitignore
└── docs/
    ├── dl_alignment_guide.md
    ├── pressure_system_guide.md
    ├── expansion-phases-2-3.md
    └── expansion-phase-4.md
```

---

## 🔧 STEP-BY-STEP SETUP

### **1. Create Folder**
```bash
mkdir dark-side-defense
cd dark-side-defense
```

### **2. Place Files**
- Put all downloaded files in the `dark-side-defense` folder
- Create a `docs` subfolder
- Put the 4 doc files in the `docs` folder

### **3. Initialize Git**
```bash
git init
git add .
git commit -m "Initial commit: Dark Side Defense playbook"
```

### **4. Connect to GitHub**
```bash
git remote add origin https://github.com/bdoubleok/dark-side-defense.git
git branch -M main
git push -u origin main --force
```

**Note:** Using `--force` will overwrite what's currently on GitHub with this clean version (no vercel.json).

---

## 🌐 DEPLOY TO VERCEL

### **Option A: Vercel Dashboard (Easiest)**
1. Go to: https://vercel.com
2. Click "Add New..." → "Project"
3. Import from GitHub: `bdoubleok/dark-side-defense`
4. Click "Deploy"
5. Done! ✅

### **Option B: Vercel CLI**
```bash
npm i -g vercel
cd dark-side-defense
vercel --prod
```

---

## ✅ VERIFICATION

After deployment:

1. **GitHub:** https://github.com/bdoubleok/dark-side-defense
   - Should show all files
   - No vercel.json ✅

2. **Vercel:** Your deployment URL
   - Should show the playbook
   - No 404 error ✅

---

## 🎯 QUICK CHECK

Before pushing to GitHub, verify you have:
- [ ] `index.html` (156KB)
- [ ] `README.md`
- [ ] `DEPLOYMENT.md`
- [ ] `package.json`
- [ ] `.gitignore`
- [ ] `docs/` folder with 4 files
- [ ] **NO** `vercel.json` ❌

---

## 🆘 IF SOMETHING GOES WRONG

**404 Error on Vercel:**
- Make sure `index.html` is in the root folder (not in a subfolder)
- Check Vercel build logs

**Git Push Fails:**
- Use `git push -u origin main --force` to overwrite
- Or create a new repo and start fresh

**Files Missing:**
- Re-download all files from Claude
- Make sure the `docs` folder structure is correct

---

## 🎉 YOU'RE DONE!

Once deployed, your playbook will be live at:
```
https://dark-side-defense.vercel.app
```

Share it with your dynasty league! 🏈⚡
