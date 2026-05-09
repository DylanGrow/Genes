# 🚀 Quick Start - Deploy in 5 Minutes

Get your Family Tree app live on GitHub Pages in just 5 minutes!

## Prerequisites
- GitHub account (free)
- Git installed on your computer

## Step-by-Step Deployment

### 1️⃣ Create GitHub Repository (1 minute)

1. Go to https://github.com/new
2. Repository name: `family-tree`
3. Visibility: **Public** (required for free GitHub Pages)
4. **Don't** check "Initialize with README"
5. Click **Create repository**

### 2️⃣ Push Your Code (2 minutes)

Open terminal in the `Genes-main` folder:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/family-tree.git
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` with your GitHub username!**

### 3️⃣ Enable GitHub Pages (1 minute)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select: **GitHub Actions**
4. Done! 🎉

### 4️⃣ Access Your Site (1 minute)

Wait 1-2 minutes, then visit:
```
https://YOUR-USERNAME.github.io/family-tree/
```

## 🎉 That's It!

Your family tree is now live and accessible worldwide!

## Next Steps

- **Customize**: Edit `index.html` to change the title
- **Add Data**: Use the app to add your family members
- **Share**: Send the URL to family members
- **Backup**: Export your data regularly

## Need Help?

- Full guide: See `DEPLOYMENT.md`
- User guide: See `USER-GUIDE.md`
- Issues: Open an issue on GitHub

## Updating Your Site

After making changes:
```bash
git add .
git commit -m "Update family data"
git push
```

Your site will automatically redeploy in 1-2 minutes!

---

**Cost**: $0/month (Free forever)  
**Maintenance**: Zero (Fully automated)  
**Privacy**: All data stays in user's browser