# StepDevCode.me

Website hiện đại với HTML, CSS và JavaScript thuần - Tối ưu hiệu suất và trải nghiệm người dùng.

## ✨ Tính năng

- 🎨 **Thiết kế hiện đại**: Giao diện đẹp mắt, responsive trên mọi thiết bị
- 🌙 **Dark Mode**: Chuyển đổi giữa chế độ sáng/tối với localStorage
- 🚀 **Hiệu suất cao**: Tối ưu hóa tốc độ tải trang, không dùng framework nặng
- 📱 **Responsive**: Hoạt động hoàn hảo trên mobile, tablet và desktop
- ✨ **Animations**: Hiệu ứng mượt mà, chuyên nghiệp
- 🎯 **Smooth Scroll**: Cuộn mượt mà giữa các section
- 📊 **Animated Counters**: Số liệu thống kê với animation khi scroll
- 🎭 **Parallax Effects**: Hiệu ứng parallax cho hero section
- 📝 **Contact Form**: Form liên hệ với validation

## 📁 Cấu trúc file

```
stepdevcode/
├── index.html      # File HTML chính
├── style.css       # File CSS với variables và responsive
├── script.js       # JavaScript cho interactions và animations
└── README.md       # File hướng dẫn này
```

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

## 🎨 Tùy chỉnh

### Màu sắc

Chỉnh sửa CSS variables trong `style.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* Thay đổi các giá trị này để đổi màu */
}
```

### Nội dung

Chỉnh sửa nội dung trong `index.html`:
- **Hero section**: Tiêu đề, mô tả, buttons
- **About section**: Giới thiệu, thống kê
- **Services section**: Các dịch vụ
- **Contact section**: Thông tin liên hệ, form

### Animations

Tùy chỉnh animations trong `script.js` và `style.css`:
- Scroll animations
- Counter animations
- Parallax effects
- Hover effects

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

### Animations
- Fade-in khi scroll vào viewport
- Animated counters cho statistics
- Floating cards trong hero section
- Parallax effect cho hero background

### Form
- Contact form với validation
- HTML5 form validation
- Success message sau khi submit

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
- Kiểm tra đường dẫn CSS và JS có đúng không
- Xem console trình duyệt có lỗi gì không

### Dark mode không hoạt động?
- Kiểm tra JavaScript có được load không
- Kiểm tra localStorage có được enable không

### Animations không chạy?
- Kiểm tra `script.js` có được load không
- Kiểm tra console có lỗi JavaScript không

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy:
1. Kiểm tra console trình duyệt
2. Kiểm tra Network tab trong DevTools
3. Xem lại code trong các file

---

**Made with ❤️ by StepDevCode**

