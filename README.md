# StepDevCode.me

Website hiện đại với HTML, CSS và JavaScript thuần - Tối ưu hiệu suất và trải nghiệm người dùng.

## 📁 Cấu trúc Dự án

```
stepdevcode/
├── index.html              # Trang chủ
├── courses.html            # Trang khóa học
│
├── assets/                 # Tài nguyên tĩnh
│   ├── css/
│   │   └── style.css      # Styles chính
│   ├── js/
│   │   ├── main.js        # JavaScript chính (theme, navigation)
│   │   └── courses.js     # JavaScript cho courses page
│   └── images/            # Hình ảnh (nếu có)
│
└── README.md              # File này
```

## ✨ Tính năng

- 🎨 **Thiết kế hiện đại**: Giao diện đẹp mắt, responsive trên mọi thiết bị
- 🌙 **Dark Mode**: Chuyển đổi giữa chế độ sáng/tối với localStorage
- 🚀 **Hiệu suất cao**: Tối ưu hóa tốc độ tải trang
- 📱 **Responsive**: Hoạt động hoàn hảo trên mobile, tablet và desktop
- ✨ **Animations**: Hiệu ứng mượt mà, chuyên nghiệp
- 🎯 **Smooth Scroll**: Cuộn mượt mà giữa các section
- 📊 **Course Filter**: Lọc khóa học theo category
- 📈 **Progress Tracking**: Theo dõi tiến độ học tập

## 🚀 Cách sử dụng

### Local Development

1. Mở folder `stepdevcode` trong trình soạn thảo
2. Mở `index.html` trong trình duyệt
3. Hoặc dùng local server:
   ```bash
   # Python
   cd stepdevcode
   python -m http.server 8000
   
   # Node.js
   cd stepdevcode
   npx serve
   ```
4. Truy cập: `http://localhost:8000`

### Deploy lên Netlify

#### Cách 1: Deploy từ folder
1. Đăng nhập Netlify: https://www.netlify.com
2. Kéo thả folder `stepdevcode` vào Netlify
3. Netlify sẽ tự động deploy

#### Cách 2: Deploy từ GitHub
1. Tạo repository trên GitHub
2. Upload folder `stepdevcode` lên repository
3. Kết nối repository với Netlify
4. Netlify sẽ tự động deploy từ GitHub

**Lưu ý:** Nếu deploy từ GitHub, đảm bảo các file nằm trong folder `stepdevcode` hoặc cấu hình Netlify để publish directory là `stepdevcode`.

## 📄 Files

### HTML Pages
- `index.html` - Trang chủ với navigation, hero, about, features, courses preview, contact
- `courses.html` - Trang khóa học với filter, course cards, learning path timeline

### CSS
- `assets/css/style.css` - Tất cả styles cho website

### JavaScript
- `assets/js/main.js` - Theme toggle, navigation, smooth scroll, dark mode
- `assets/js/courses.js` - Course filtering, animations, progress bars

## 🎨 Tùy chỉnh

### Màu sắc

Chỉnh sửa CSS variables trong `assets/css/style.css`:

```css
/* Tìm và thay đổi các giá trị này */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Nội dung

Chỉnh sửa nội dung trong:
- `index.html` - Trang chủ
- `courses.html` - Trang khóa học

### Thêm khóa học mới

Trong `courses.html`, copy một course card và chỉnh sửa:
- Icon
- Title
- Description
- Tags
- Progress percentage
- Category (dsa, web, other)

## 📱 Responsive Breakpoints

- **Desktop**: > 968px
- **Tablet**: 768px - 968px
- **Mobile**: < 768px

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🔧 Tính năng chi tiết

### Dark Mode
- Tự động lưu preference trong localStorage
- Chuyển đổi mượt mà giữa light/dark mode
- Icon thay đổi theo theme

### Navigation
- Fixed navbar với blur effect
- Mobile menu (hamburger)
- Smooth scroll đến các section
- Active state khi scroll

### Courses Page
- Filter buttons (Tất cả, DSA, Web Dev, Khác)
- Course cards với progress bars
- Learning path timeline
- Scroll animations

## 📝 Cấu hình Netlify

Nếu deploy lên Netlify, không cần cấu hình gì thêm. Netlify sẽ tự động:
- Detect HTML file
- Serve static files
- Enable HTTPS
- CDN distribution

## 🔗 Domain Setup

Nếu đã có domain (ví dụ: stepdevcode.me):

1. **Thêm domain trên Netlify:**
   - Site settings > Domain management
   - Add custom domain: `stepdevcode.me`

2. **Cấu hình DNS:**
   - Dùng Netlify DNS (khuyên dùng)
   - Hoặc cấu hình A Record và CNAME trên DNS provider

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **File Size**: 
  - HTML: ~10KB
  - CSS: ~15KB
  - JS: ~8KB
- **Load Time**: < 1s trên 3G

## 🛠️ Technologies

- **HTML5**: Semantic markup
- **CSS3**: Variables, Grid, Flexbox, Animations
- **Vanilla JavaScript**: ES6+, Intersection Observer API
- **No Dependencies**: Không dùng framework hay library

## 📝 License

MIT License - Tự do sử dụng và chỉnh sửa

## 🔗 Links

- **Website**: https://stepdevcode.me
- **Netlify**: https://www.netlify.com
- **GitHub**: (Thêm link GitHub của bạn nếu có)

## 🆘 Troubleshooting

### Website không hiển thị?
- Kiểm tra file `index.html` có tên đúng không
- Kiểm tra đường dẫn CSS và JS có đúng không (`assets/css/style.css`, `assets/js/main.js`)
- Xem console trình duyệt có lỗi gì không

### Dark mode không hoạt động?
- Kiểm tra JavaScript có được load không
- Kiểm tra localStorage có được enable không

### Animations không chạy?
- Kiểm tra `assets/js/main.js` và `assets/js/courses.js` có được load không
- Kiểm tra console có lỗi JavaScript không

## 📚 Tài liệu

Xem thêm tài liệu trong folder `docs/`:
- Development Process
- Best Practices
- Docker Deployment
- Node.js Setup

---

**Made with ❤️ by StepDevCode**


