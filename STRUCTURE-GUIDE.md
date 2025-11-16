# Hướng dẫn Cấu trúc Mở rộng - StepDevCode.me

## 📁 Cấu trúc Folder

```
stepdevcode/
├── index.html                    # Home page
├── about.html                    # About page
├── contact.html                  # Contact page
├── projects.html                 # Projects page
│
├── courses/                      # 📚 Courses Section
│   ├── index.html               # All courses overview
│   ├── web-development/         # Web Dev courses
│   ├── programming-languages/   # Programming languages
│   ├── data-science/            # Data Science courses
│   └── devops/                  # DevOps courses
│
├── roadmaps/                     # 🗺️ Learning Roadmaps
│   ├── index.html               # All roadmaps overview
│   ├── ml-data-engineer/        # ML Data Engineer roadmap
│   ├── devops-engineer/         # DevOps Engineer roadmap
│   └── fullstack-developer/     # Full Stack roadmap
│
├── resources/                    # 📖 Learning Resources
│   ├── articles/                # Articles & Blog posts
│   ├── tutorials/               # Step-by-step tutorials
│   └── cheatsheets/             # Quick reference
│
└── assets/                       # 🎨 Assets
    ├── css/
    ├── js/
    ├── images/
    │   ├── courses/
    │   └── roadmaps/
    └── data/                     # JSON data files
        ├── courses.json
        └── roadmaps.json
```

---

## 🎯 Cách sử dụng

### 1. Thêm Khóa học mới

#### Bước 1: Thêm vào JSON
Mở `assets/data/courses.json` và thêm course mới:

```json
{
  "id": "course-id",
  "title": "Course Title",
  "description": "Course description",
  "progress": 0,
  "status": "not-started",
  "duration": "X hours",
  "level": "beginner",
  "tags": ["tag1", "tag2"],
  "resources": []
}
```

#### Bước 2: Tạo trang HTML
Tạo file trong folder category tương ứng:
- `courses/web-development/html-css.html`
- `courses/programming-languages/python.html`
- etc.

#### Bước 3: Cập nhật category index
Cập nhật `courses/web-development/index.html` để thêm link đến course mới.

---

### 2. Thêm Roadmap mới

#### Bước 1: Thêm vào JSON
Mở `assets/data/roadmaps.json` và thêm roadmap:

```json
{
  "id": "roadmap-id",
  "title": "Roadmap Title",
  "description": "Roadmap description",
  "duration": "X-Y months",
  "icon": "🎯",
  "levels": [...]
}
```

#### Bước 2: Tạo folder và pages
```
roadmaps/new-roadmap/
├── index.html
├── foundation.html
├── intermediate.html
└── advanced.html
```

---

### 3. Thêm Tài liệu/Resource

#### Articles
1. Tạo file trong `resources/articles/`
2. Ví dụ: `resources/articles/python-tips.html`
3. Cập nhật `resources/articles/index.html`

#### Tutorials
1. Tạo file trong `resources/tutorials/`
2. Ví dụ: `resources/tutorials/docker-basics.html`

#### Cheatsheets
1. Tạo file trong `resources/cheatsheets/`
2. Ví dụ: `resources/cheatsheets/git-commands.html`

---

## 🔗 Navigation Links

### Relative Paths

Từ `index.html`:
- `courses/index.html` → Courses overview
- `roadmaps/index.html` → Roadmaps overview

Từ `courses/index.html`:
- `../index.html` → Home
- `web-development/index.html` → Web Dev courses
- `../roadmaps/index.html` → Roadmaps

Từ `courses/web-development/html-css.html`:
- `../../index.html` → Home
- `../index.html` → Courses overview
- `index.html` → Web Dev overview

---

## 📊 Data Structure

### courses.json Structure
```json
{
  "categories": [
    {
      "id": "category-id",
      "name": "Category Name",
      "description": "Description",
      "icon": "🎯",
      "courses": [
        {
          "id": "course-id",
          "title": "Course Title",
          "progress": 0-100,
          "status": "not-started|in-progress|completed",
          "duration": "X hours",
          "level": "beginner|intermediate|advanced",
          "tags": [],
          "resources": []
        }
      ]
    }
  ]
}
```

### roadmaps.json Structure
```json
{
  "roadmaps": [
    {
      "id": "roadmap-id",
      "title": "Roadmap Title",
      "duration": "X-Y months",
      "levels": [
        {
          "level": "foundation|intermediate|advanced",
          "title": "Level Title",
          "topics": [
            {
              "title": "Topic Title",
              "courses": ["course-id"],
              "resources": [],
              "completed": false
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 🎨 Template Pages

### Course Page Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Course Title - StepDevCode.me</title>
    <link rel="stylesheet" href="../../assets/css/style.css">
</head>
<body>
    <!-- Navigation -->
    <!-- Course Content -->
    <!-- Footer -->
    <script src="../../assets/js/main.js"></script>
</body>
</html>
```

### Roadmap Page Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Roadmap Title - StepDevCode.me</title>
    <link rel="stylesheet" href="../../assets/css/style.css">
</head>
<body>
    <!-- Navigation -->
    <!-- Roadmap Content -->
    <!-- Footer -->
    <script src="../../assets/js/main.js"></script>
</body>
</html>
```

---

## ✅ Checklist khi thêm nội dung mới

### Thêm Course:
- [ ] Thêm vào `courses.json`
- [ ] Tạo HTML file trong category folder
- [ ] Cập nhật category index page
- [ ] Test links hoạt động
- [ ] Add images nếu có

### Thêm Roadmap:
- [ ] Thêm vào `roadmaps.json`
- [ ] Tạo folder và pages
- [ ] Cập nhật roadmaps index
- [ ] Test navigation
- [ ] Add progress tracking

### Thêm Resource:
- [ ] Tạo HTML file
- [ ] Cập nhật resource index
- [ ] Add tags/categories
- [ ] Test links

---

## 🚀 Next Steps

1. **Tạo category pages:**
   - `courses/web-development/index.html`
   - `courses/programming-languages/index.html`
   - etc.

2. **Tạo roadmap detail pages:**
   - `roadmaps/ml-data-engineer/index.html`
   - `roadmaps/ml-data-engineer/foundation.html`
   - etc.

3. **Tạo resource pages:**
   - `resources/articles/index.html`
   - `resources/tutorials/index.html`
   - `resources/cheatsheets/index.html`

4. **Thêm nội dung:**
   - Courses content
   - Roadmap details
   - Articles & tutorials

---

**Cấu trúc này được thiết kế để dễ mở rộng và maintain!**

