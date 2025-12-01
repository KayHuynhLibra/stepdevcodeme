# Portfolio Multiverse - Tích hợp vào StepDevCode

Portfolio 3-style (Minimalist Modern, Dark Interactive, Retro Terminal) được tích hợp vào `stepdevcode`.

## 📁 Cấu trúc

```
stepdevcode/
├── portfolio-multiverse/    # Source code Next.js
│   ├── app/                 # Next.js pages
│   ├── scripts/             # Build scripts
│   └── ...
└── multiverse/              # Built static files (tự động tạo khi build)
    ├── index.html
    └── _next/               # Next.js assets
```

## 🚀 Development

```bash
cd stepdevcode/portfolio-multiverse
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## 🔨 Build & Deploy

### Build cho Production

```bash
cd stepdevcode/portfolio-multiverse
npm run deploy
```

Lệnh này sẽ:
1. Build Next.js → `out/`
2. Copy toàn bộ từ `out/` → `../multiverse/`
3. Sẵn sàng deploy cùng với `stepdevcode`

### Deploy cùng StepDevCode

Sau khi build, folder `multiverse/` sẽ được commit và push cùng với `stepdevcode`:

```bash
cd stepdevcode
git add multiverse/
git commit -m "Update multiverse build"
git push
```

Website sẽ có tại: `https://stepdevcode.me/multiverse/`

## 📝 Lưu ý

- **Không commit** folder `portfolio-multiverse/node_modules/` và `portfolio-multiverse/out/`
- **Commit** folder `multiverse/` sau khi build
- Build script tự động xóa và tạo lại `multiverse/` mỗi lần build

## 🎨 Phát triển tiếp

1. Tạo 3 trang với 3 style:
   - `/minimal` - Minimalist Modern
   - `/dark` - Dark Interactive
   - `/terminal` - Retro Terminal

2. Thêm navigation giữa các trang

3. Customize design cho từng trang
