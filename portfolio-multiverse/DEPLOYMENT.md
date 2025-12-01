# 🚀 Deployment Guide - Portfolio Multiverse

Hướng dẫn chi tiết deploy `portfolio-multiverse` lên GitHub Pages.

---

## 📋 Bước 1: Tạo Repository trên GitHub

1. Vào [GitHub.com](https://github.com) → **New repository**
2. Tên repo: `portfolio-multiverse` (hoặc tên bạn muốn)
3. Chọn **Public** (để dùng GitHub Pages miễn phí)
4. **Không** tích "Initialize with README" (vì đã có code local)
5. Click **Create repository**

---

## 📋 Bước 2: Kết nối Local → GitHub

Mở terminal trong folder `portfolio-multiverse`:

```bash
# Khởi tạo Git (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit lần đầu
git commit -m "Initial commit: Portfolio Multiverse"

# Kết nối với GitHub (thay YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-multiverse.git

# Push code lên GitHub
git branch -M main
git push -u origin main
```

---

## 📋 Bước 3: Cấu hình GitHub Pages

1. Vào repo trên GitHub → **Settings** tab
2. Scroll xuống **Pages** (sidebar trái)
3. **Source**: Chọn **Deploy from a branch**
4. **Branch**: Chọn `gh-pages` / **root** folder
5. Click **Save**

> ⚠️ Lưu ý: Lần đầu chưa có branch `gh-pages`, bạn sẽ deploy ở bước 4 để tạo branch này.

---

## 📋 Bước 4: Kiểm tra `next.config.mjs`

Mở file `portfolio-multiverse/next.config.mjs`:

```js
basePath: '/portfolio-multiverse',  // ← Phải đúng tên repo GitHub
assetPrefix: '/portfolio-multiverse/',
```

**Nếu repo của bạn tên khác**, sửa lại cho đúng.

**Nếu dùng custom domain** (ví dụ: `multi.stepdevcode.me`), xóa `basePath` và `assetPrefix`:

```js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Không có basePath và assetPrefix
  trailingSlash: true,
};
```

---

## 📋 Bước 5: Deploy lần đầu

Trong terminal:

```bash
cd portfolio-multiverse
npm run deploy
```

Lệnh này sẽ:
1. ✅ Build Next.js → tạo folder `out/`
2. ✅ Tự động tạo branch `gh-pages` trên GitHub
3. ✅ Push code static lên branch `gh-pages`

**Kết quả**: GitHub Pages tự động deploy từ branch `gh-pages`.

---

## 📋 Bước 6: Kiểm tra Website

Sau 1-2 phút, truy cập:

```
https://YOUR_USERNAME.github.io/portfolio-multiverse
```

**Nếu thấy 404 hoặc blank page:**
- Đợi thêm 2-3 phút (GitHub cần thời gian build)
- Kiểm tra lại `basePath` trong `next.config.mjs` có đúng tên repo không
- Vào GitHub → Settings → Pages → xem có lỗi gì không

---

## 🔄 Deploy lần sau (khi có thay đổi)

Mỗi khi sửa code và muốn cập nhật website:

```bash
# 1. Commit thay đổi
git add .
git commit -m "Update: mô tả thay đổi"

# 2. Push code lên main branch
git push origin main

# 3. Deploy lên GitHub Pages
npm run deploy
```

> 💡 **Tip**: Chỉ deploy khi code đã ổn định, không cần deploy mỗi commit nhỏ.

---

## 📊 Lịch Deploy Khuyến Nghị

### Khi đang phát triển (UI/UX):
- **Làm việc bình thường** trên `main` branch
- **Cuối buổi** (1 lần): `npm run deploy` để xem kết quả

### Khi site đã ổn định:
- **Gộp thay đổi** 1-2 ngày → deploy 1 lần
- **Sửa text nhỏ**: Sửa xong vài chỗ → test local → deploy

### Tránh:
- ❌ Deploy mỗi commit nhỏ (tốn build time, không cần thiết)
- ❌ Deploy khi code còn lỗi (sẽ hiển thị lỗi trên website)

---

## 🛠️ Troubleshooting

### Lỗi: "basePath mismatch"
- **Nguyên nhân**: `basePath` trong `next.config.mjs` không khớp tên repo
- **Fix**: Sửa `basePath` cho đúng tên repo GitHub

### Lỗi: "Images not loading"
- **Nguyên nhân**: Next.js Image optimization không hoạt động với static export
- **Fix**: Đã có `images: { unoptimized: true }` trong config, nếu vẫn lỗi → dùng `<img>` thay vì `<Image>`

### Lỗi: "404 on all routes"
- **Nguyên nhân**: Thiếu `trailingSlash: true` hoặc routing không đúng
- **Fix**: Kiểm tra `next.config.mjs` có `trailingSlash: true`

### Website không cập nhật sau deploy
- Đợi 2-3 phút
- Hard refresh browser (Ctrl+Shift+R)
- Xóa cache browser

---

## 📝 Custom Domain (Tùy chọn)

Nếu muốn dùng domain riêng (ví dụ: `multi.stepdevcode.me`):

1. **Sửa `next.config.mjs`**: Xóa `basePath` và `assetPrefix`
2. **Tạo file `CNAME`** trong folder `public/`:
   ```
   multi.stepdevcode.me
   ```
3. **Cấu hình DNS** trên Namecheap:
   - CNAME record: `multi` → `YOUR_USERNAME.github.io`
4. **GitHub Pages Settings**:
   - Custom domain: `multi.stepdevcode.me`
   - Enforce HTTPS: ✅

---

## ✅ Checklist Deploy

- [ ] Đã tạo repo trên GitHub
- [ ] Đã push code lên `main` branch
- [ ] Đã cấu hình GitHub Pages (source: `gh-pages` branch)
- [ ] Đã kiểm tra `basePath` trong `next.config.mjs`
- [ ] Đã chạy `npm run deploy` thành công
- [ ] Website đã hiển thị đúng tại `https://USERNAME.github.io/portfolio-multiverse`

---

**Chúc bạn deploy thành công! 🎉**

