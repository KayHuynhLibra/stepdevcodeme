# Page Management System - Hướng dẫn sử dụng

## Tổng quan

Hệ thống quản lý trang tập trung giúp quản lý tất cả các file `index.html` dễ dàng hơn bằng cách:

- **Tập trung cấu hình**: Tất cả meta tags, navigation, CSS/JS được quản lý trong một file
- **Tự động inject**: Meta tags và navigation được tự động inject vào mỗi trang
- **Dễ bảo trì**: Chỉ cần sửa một nơi để cập nhật tất cả các trang

## Cấu trúc Files

```
stepdevcode/
├── assets/
│   └── js/
│       ├── page-config.js    # Cấu hình cho tất cả các trang
│       └── page-loader.js    # Script tự động inject meta tags & navigation
├── templates/
│   └── page-template-simple.html  # Template mẫu cho trang mới
└── docs/
    └── PAGE-MANAGEMENT-SYSTEM.md  # File này
```

## Cách sử dụng

### 1. Tạo trang mới

Sử dụng template `templates/page-template-simple.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Load page config và loader -->
    <script src="../assets/js/page-config.js"></script>
    <script src="../assets/js/page-loader.js"></script>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation sẽ được inject tự động -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="../index.html" class="logo-link">
                    <span class="logo-text">StepDevCode</span>
                </a>
            </div>
            <ul class="nav-menu">
                <!-- Navigation sẽ được inject ở đây -->
            </ul>
            <!-- ... nav-actions ... -->
        </div>
    </nav>
    
    <!-- Your content here -->
    
    <!-- Scripts sẽ được load tự động -->
</body>
</html>
```

### 2. Thêm cấu hình cho trang mới

Mở `assets/js/page-config.js` và thêm vào object `pages`:

```javascript
pages: {
    // ... existing pages ...
    
    'your-page/index.html': {
        title: 'Your Page Title - StepDevCode.me',
        description: 'Description of your page',
        keywords: 'keyword1, keyword2, keyword3',
        canonical: '/your-page/',
        ogImage: '/assets/images/your-page-og.jpg',
        activeNav: 'yourkey'  // Key trong navigation config
    }
}
```

### 3. Cập nhật navigation

Trong `page-config.js`, cập nhật `navigation`:

```javascript
navigation: {
    main: [
        // Main navigation items
    ],
    dropdown: [
        // Dropdown items
    ]
}
```

## Cấu hình chi tiết

### Page Configuration

Mỗi trang trong `pages` object có các thuộc tính:

- `title`: Tiêu đề trang (hiển thị trong tab browser)
- `description`: Mô tả cho SEO
- `keywords`: Keywords cho SEO
- `canonical`: Canonical URL
- `ogImage`: Open Graph image path
- `ogImageWidth`: Width của OG image (default: 1200)
- `ogImageHeight`: Height của OG image (default: 630)
- `activeNav`: Key của navigation item để highlight (phải match với key trong navigation config)

### Site Configuration

Trong `site` object:

- `name`: Tên site
- `url`: Base URL
- `author`: Tác giả
- `themeColor`: Màu theme
- `twitterCreator`: Twitter handle
- `locale`: Locale code

### CSS & JS Loading

- `css.common`: CSS files được load cho tất cả trang
- `css.pageSpecific`: CSS files riêng cho từng trang
- `js.common`: JS files được load cho tất cả trang
- `js.pageSpecific`: JS files riêng cho từng trang

## Migration từ trang cũ

### Bước 1: Xóa meta tags cũ

Xóa tất cả meta tags trong `<head>` (giữ lại charset và viewport):

```html
<!-- Xóa tất cả các dòng này -->
<meta name="description" content="...">
<meta property="og:title" content="...">
<!-- etc. -->
```

### Bước 2: Thêm page-loader scripts

Thêm vào `<head>`:

```html
<script src="../assets/js/page-config.js"></script>
<script src="../assets/js/page-loader.js"></script>
```

### Bước 3: Đơn giản hóa navigation

Thay thế navigation HTML bằng:

```html
<ul class="nav-menu">
    <!-- Navigation sẽ được inject tự động -->
</ul>
```

### Bước 4: Thêm config vào page-config.js

Thêm cấu hình cho trang vào `pages` object.

## Lợi ích

1. **Dễ quản lý**: Chỉ cần sửa một file (`page-config.js`) để cập nhật tất cả trang
2. **Nhất quán**: Tất cả trang có cùng cấu trúc meta tags và navigation
3. **SEO tốt hơn**: Dễ dàng đảm bảo tất cả trang có đầy đủ meta tags
4. **Bảo trì dễ**: Thêm/sửa/xóa trang chỉ cần cập nhật config
5. **Tự động**: Không cần copy-paste code giữa các trang

## Lưu ý

- Scripts phải được load trong `<head>` trước khi body
- Navigation HTML structure phải đúng format (có class `nav-menu`)
- Asset paths sẽ được tính tự động dựa trên depth của trang
- Nếu trang không có trong config, sẽ dùng default values

## Troubleshooting

### Navigation không hiển thị

- Kiểm tra xem `page-config.js` đã được load chưa
- Kiểm tra console có lỗi JavaScript không
- Đảm bảo HTML structure đúng (có `.nav-menu`)

### Meta tags không đúng

- Kiểm tra path trong `pages` object có đúng không
- Kiểm tra `getCurrentPagePath()` function
- Xem console log để debug

### CSS/JS không load

- Kiểm tra asset paths trong config
- Kiểm tra file có tồn tại không
- Xem Network tab trong DevTools

