# 📁 Cấu Trúc StepDevCode.me

## 🎯 Tổng Quan

StepDevCode.me bao gồm:
1. **Static Site** (HTML/CSS/JS) - Site chính
2. **Portfolio Multiverse** (Next.js + React + TypeScript + Tailwind CSS) - Portfolio 3-style (The Dev Multiverse)

## 📂 Cấu Trúc Chi Tiết

```
stepdevcode/
│
├── index.html                    # 🏠 Trang chủ
├── pages/                        # 📄 Các trang HTML
│   ├── about.html
│   ├── projects.html
│   └── contact.html
│
├── courses/                      # 📚 Khóa học
├── roadmaps/                     # 🗺️ Learning roadmaps
├── learning-schedule/            # 📅 Lịch học
├── resources/                    # 📖 Tài nguyên
├── community/                    # 👥 Cộng đồng
│
├── assets/                       # 🎨 Tài nguyên tĩnh
│   ├── css/                      # Styles
│   ├── js/                       # JavaScript
│   ├── images/                   # Hình ảnh
│   └── data/                     # JSON data
│
├── multiverse/                   # ⚠️ Portfolio Multiverse (BUILT)
│   ├── index.html                # Next.js static export
│   └── _next/                    # Next.js assets
│
└── portfolio-multiverse/          # ⚠️ Source code Next.js
    ├── app/                      # Next.js pages
    ├── scripts/
    │   └── copy-build.js         # Build script
    ├── next.config.mjs           # Next.js config
    └── package.json
```

## 🚀 Deploy

### Static Site (Tự động)
- Push code → GitHub Pages tự động deploy
- URL: `https://stepdevcode.me`

### Multiverse (Cần build)
```bash
cd portfolio-multiverse
npm run deploy
git add ../multiverse/
git commit -m "Update multiverse"
git push
```
- URL: `https://stepdevcode.me/multiverse/`

## 📝 Lưu Ý

- **Commit**: `multiverse/` (built files)
- **Không commit**: `portfolio-multiverse/node_modules/`, `out/`, `.next/`

Xem chi tiết: `docs/DEPLOYMENT-STRUCTURE.md`

---

## 🧠 Flow tổng quan (Technical)

```text
DEV FLOW

Chỉnh sửa Static Site
  → HTML/CSS/JS trong stepdevcode/

Chỉnh sửa Portfolio Multiverse
  → Next.js + TS + Tailwind trong stepdevcode/portfolio-multiverse/app

Test Multiverse
  → cd stepdevcode/portfolio-multiverse
  → npm run dev

Build Multiverse
  → npm run deploy
     └─ next build + copy-build.js
         └─ Copy out/ → stepdevcode/multiverse/

Commit & Push
  → git add .
  → git commit -m "Update ..."
  → git push origin main

GitHub Pages
  → Deploy root:        https://stepdevcode.me
  → Deploy multiverse:  https://stepdevcode.me/multiverse/
```
