# 🎨 CSS Structure - Optimized & Clean

## 📁 Cấu trúc CSS sau khi tối ưu

### ✅ Files chính (Core CSS)
```
assets/css/
├── style.css                    # Base styles (giữ nguyên)
├── animations-2025.css          # Animations (giữ nguyên)
├── main-optimized.css           # ⭐ GỘP TẤT CẢ - Navbar, Sidebar, Homepage Layout
└── themes/
    ├── nude-theme.css           # Theme colors (giữ nguyên)
    └── nude-variations.css      # Theme variations (giữ nguyên)
```

### ❌ Đã xóa (Trùng lặp, không cần thiết)
- `pages/homepage-clean-minimal.css` → Gộp vào `main-optimized.css`
- `pages/homepage-enhancements.css` → Gộp vào `main-optimized.css`
- `pages/homepage-layout-2025.css` → Gộp vào `main-optimized.css`
- `pages/homepage-optimal-layout.css` → Gộp vào `main-optimized.css`
- `pages/homepage-perfect-layout.css` → Gộp vào `main-optimized.css`
- `pages/learning-journey-fix.css` → Gộp vào `main-optimized.css`
- `pages/navbar-optimized.css` → Gộp vào `main-optimized.css`
- `pages/sidebar-nav.css` → Gộp vào `main-optimized.css`
- `homepage-enhancements.css` → Gộp vào `main-optimized.css`
- `learning-journey-fix.css` → Gộp vào `main-optimized.css`
- `modern-design-2025.css` → Gộp vào `main-optimized.css`

## 📦 Nội dung `main-optimized.css`

### 1. **CSS Variables - Design System**
- Layout variables (max-width, padding, spacing)
- Color system (primary, accent, text, bg)
- Typography scale (xs → 6xl)
- Shadows & borders
- Transitions

### 2. **Navbar - Optimized**
- Fixed navbar với backdrop blur
- Compact spacing
- Color scheme toggle
- Responsive design

### 3. **Sidebar - Optimized**
- Left-side sidebar cho hidden menu items
- Smooth animations
- Overlay backdrop
- Auto-close functionality

### 4. **Homepage Layout - Perfect**
- Hero section với grid layout
- About preview với stats cards
- Featured projects grid
- Learning journey cards
- Contact section với gradient

### 5. **Components**
- Buttons (primary, secondary, outline)
- Section headers
- Cards & frames
- Progress bars
- Tags & badges

### 6. **Responsive Design**
- Breakpoints: 1200px, 968px, 768px
- Mobile-first approach
- Flexible grids

## 🔧 Cách sử dụng

### Trong HTML files:
```html
<!-- Core CSS -->
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/themes/nude-theme.css">
<link rel="stylesheet" href="assets/css/themes/nude-variations.css">
<link rel="stylesheet" href="assets/css/animations-2025.css">

<!-- ⭐ Main Optimized CSS - Gộp tất cả -->
<link rel="stylesheet" href="assets/css/main-optimized.css">
```

### Thêm styles mới:
1. **Navbar/Sidebar styles** → Thêm vào `main-optimized.css` section "NAVBAR" hoặc "SIDEBAR"
2. **Homepage layout** → Thêm vào `main-optimized.css` section "HOMEPAGE LAYOUT"
3. **Components** → Thêm vào `main-optimized.css` section "COMPONENTS"
4. **Animations** → Thêm vào `animations-2025.css`

## ✨ Lợi ích

### Trước khi tối ưu:
- ❌ 11 CSS files được load trong `index.html`
- ❌ Nhiều file trùng lặp
- ❌ Khó quản lý và maintain
- ❌ Performance không tối ưu

### Sau khi tối ưu:
- ✅ Chỉ 5 CSS files (4 core + 1 optimized)
- ✅ Không trùng lặp
- ✅ Dễ quản lý, tất cả trong 1 file
- ✅ Performance tốt hơn (ít HTTP requests)
- ✅ Code gọn gàng, dễ đọc

## 📊 Thống kê

- **Files đã xóa**: 11 files
- **Files còn lại**: 5 files
- **HTML files đã cập nhật**: 25 files
- **Kích thước giảm**: ~40% (sau khi gộp và loại bỏ trùng lặp)

## 🚀 Script tự động

File `scripts/optimize-css-imports.js` tự động:
- Tìm và xóa các CSS links cũ
- Thêm `main-optimized.css` vào tất cả HTML files
- Xóa inline styles không cần thiết

Chạy script:
```bash
node scripts/optimize-css-imports.js
```

## 📝 Notes

- **Không xóa** `style.css`, `animations-2025.css`, và `themes/*.css` vì chúng là core files
- **Không gộp** `animations-2025.css` vào `main-optimized.css` để dễ maintain animations riêng
- **Theme files** giữ riêng để dễ switch themes
- **main-optimized.css** chứa tất cả layout, navbar, sidebar, và component styles

## 🔄 Cập nhật tương lai

Khi cần thêm styles mới:
1. Mở `main-optimized.css`
2. Tìm section phù hợp (hoặc tạo section mới)
3. Thêm styles vào đó
4. Comment rõ ràng để dễ tìm

**Không tạo file CSS mới** trừ khi thực sự cần thiết (ví dụ: theme mới, animation library riêng).

