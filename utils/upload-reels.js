import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
// إعداد Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// إعداد multer (ذاكرة مؤقتة)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 40 * 1024 * 1024, // أقصى حجم 30 ميغا
  },
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed!"), false);
    }
  },
});

// دالة ترفع الفيديو مباشرة لـ Cloudinary
const uploadToCloudinary = (fileBuffer, folder = "videos") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export { upload, uploadToCloudinary };