const multer = require('multer');
const path = require('path');

// Define storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination for the uploaded files
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        // Set the file name for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Define file filter
const fileFilter = (req, file, cb) => {
    // Accept images only
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Only images are allowed!'), false);
};

// Initialize multer with the storage and file filter options
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    },
    fileFilter: fileFilter
});

module.exports = upload;

