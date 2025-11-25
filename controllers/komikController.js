const db = require('../models');
const komikService = require('../services/komikService');

// Membuat komik baru
async function createKomik(req, res) {
  try {
    const komikData = req.body;

    if (req.file) {
      komikData.imageType = req.file.mimetype;
      komikData.imageName = req.file.originalname;
      komikData.imageData = req.file.buffer; // disimpan FULL di DB
    }

    const result = await komikService.createKomik(db, komikData);

    // Membuat preview pendek
    const preview = result.imageData
      ? result.imageData.toString('base64').substring(0, 120) + "..."
      : null;

    // Hapus data buffer asli dari response
    result.imageData = preview;

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// Mendapatkan semua komik
async function getAllKomik(req, res) {
  try {
    let result = await komikService.getAllKomiks(db);

    // Buat preview pendek untuk semua komik
    result = result.map(k => {
      if (k.imageData) {
        k.imageData = k.imageData.substring(0, 120) + "...";
      }
      return k;
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Mendapatkan komik berdasarkan ID
async function getKomikById(req, res) {
  try {
    const result = await komikService.getKomikById(db, req.params.id);

    // Buat preview pendek
    if (result.imageData) {
      result.imageData = result.imageData.substring(0, 120) + "...";
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
}

// Update komik
async function updateKomik(req, res) {
  try {
    const komikData = req.body;

    if (req.file) {
      komikData.imageType = req.file.mimetype;
      komikData.imageName = req.file.originalname;
      komikData.imageData = req.file.buffer;
    }

    const result = await komikService.updateKomik(db, req.params.id, komikData);

    // Buat preview pendek
    const preview = result.imageData
      ? result.imageData.toString('base64').substring(0, 120) + "..."
      : null;

    result.imageData = preview;

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// Menghapus komik
async function deleteKomik(req, res) {
  try {
    const result = await komikService.deleteKomik(db, req.params.id);
    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

module.exports = {
  createKomik,
  getAllKomik,
  getKomikById,
  updateKomik,
  deleteKomik,
};
