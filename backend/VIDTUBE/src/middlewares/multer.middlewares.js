import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make sure upload directory exists
const uploadDir = path.join(__dirname, "../../public/temp");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

// ✅ MIME type filtering
const fileFilter = (req, file, cb) => {
  // Accept only video and image files (thumbnails)
  if (file.fieldname === "videoFile" && file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else if (
    file.fieldname === "thumbnail" &&
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only video and images allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });
