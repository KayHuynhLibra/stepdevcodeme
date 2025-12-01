const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../out');
const targetDir = path.join(__dirname, '../../multiverse');

// Xóa folder multiverse cũ nếu có
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
  console.log('✅ Đã xóa folder multiverse cũ');
}

// Tạo folder multiverse mới
fs.mkdirSync(targetDir, { recursive: true });
console.log('✅ Đã tạo folder multiverse');

// Copy toàn bộ nội dung từ out/ sang multiverse/
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(sourceDir)) {
  copyRecursiveSync(sourceDir, targetDir);
  console.log('✅ Đã copy build từ out/ sang multiverse/');
  console.log(`📁 Output: ${targetDir}`);
} else {
  console.error('❌ Không tìm thấy folder out/. Chạy "npm run build" trước.');
  process.exit(1);
}

