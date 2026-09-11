import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Allowed extensions mapped to MIME types
const ALLOWED_EXTENSIONS: Record<string, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
};

const ALLOWED_MIMES = Object.keys(ALLOWED_EXTENSIONS);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    // Generate random filename — never trust original name
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (_req: any, file: any, cb: any) => {
  const ext = path.extname(file.originalname).toLowerCase();

  // Validate MIME type
  if (!ALLOWED_MIMES.includes(file.mimetype)) {
    cb(new Error('Invalid file type. Only images (JPEG/PNG/WebP) and documents (PDF/DOC/DOCX/XLS/XLSX) are allowed.'), false);
    return;
  }

  // Validate extension matches MIME
  const allowedExts = ALLOWED_EXTENSIONS[file.mimetype];
  if (!allowedExts || !allowedExts.includes(ext)) {
    cb(new Error(`File extension ${ext} does not match the uploaded file type.`), false);
    return;
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
    files: 1,
  },
  fileFilter,
});
