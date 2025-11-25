// routers/api.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

const komikController = require('../controllers/komikController');

// Setup multer untuk upload gambar (disimpan di memory)
const upload = multer({ storage: multer.memoryStorage() });

// ====== KOMIK ROUTES ======
router.post('/komiks', upload.single('gambar'), komikController.createKomik);
router.get('/komiks', komikController.getAllKomik);
router.get('/komiks/:id', komikController.getKomikById);
router.put('/komiks/:id', upload.single('gambar'), komikController.updateKomik);
router.delete('/komiks/:id', komikController.deleteKomik);

// Export router untuk digunakan di index.js
module.exports = router;
