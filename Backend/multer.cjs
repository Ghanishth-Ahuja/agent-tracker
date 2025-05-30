const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const filter = (req, file, cb) => {
  let allowed_formats = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];
  console.log(file);
  if (allowed_formats.includes(file.mimetype)) {
    cb(null, file.fieldname + path.extname(file.originalname));
  } else {
    cb(new Error("Unsupported File Format "), false);
  }
};
const upload = multer({ storage: storage, fileFilter: filter });
module.exports = { upload };
