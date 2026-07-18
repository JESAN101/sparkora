import multer from "multer";

// multer-storage-cloudinary is published as CommonJS. Node's ESM loader
// can't always statically detect its named export ("does not provide an
// export named 'CloudinaryStorage'"), even though the export genuinely
// exists at runtime. The fix is to import the module's default (which,
// for a CJS package, is its whole `module.exports` object) and destructure
// from that instead of using a named import directly.
import pkg from "multer-storage-cloudinary";
const { CloudinaryStorage } = pkg;

import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sparkora-products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export default upload;