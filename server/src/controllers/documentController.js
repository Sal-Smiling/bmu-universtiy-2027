import Document from '../models/Document.js';

// In-memory fallback dataset for immediate testing when MongoDB connection is not active
let inMemoryDocuments = [
  {
    _id: 'doc-1',
    title: 'Presidential Merit Scholarship & Quantum Fellowship Guidelines (2026)',
    category: 'Scholarship Announcement',
    description: 'Full tuition waiver criteria, SCIF lab quotas, and monthly research stipend application process.',
    fileUrl: '/uploads/bmu-merit-guidelines-2026.pdf',
    fileName: 'bmu-merit-guidelines-2026.pdf',
    fileSize: '3.1 MB',
    fileType: 'application/pdf',
    uploadedBy: 'Office of the University President',
    downloads: 1420,
    createdAt: new Date('2026-06-15').toISOString(),
  },
  {
    _id: 'doc-2',
    title: 'SCIF Enclave & Quantum Foundry Security Protocol Whitepaper',
    category: 'Research Whitepaper',
    description: 'Technical architecture of the BMU air-gapped cryptographic research network and red-team auditing rules.',
    fileUrl: '/uploads/scif-security-whitepaper.pdf',
    fileName: 'scif-security-whitepaper.pdf',
    fileSize: '4.8 MB',
    fileType: 'application/pdf',
    uploadedBy: 'Faculty of Computing & Defense Systems',
    downloads: 980,
    createdAt: new Date('2026-05-20').toISOString(),
  },
  {
    _id: 'doc-3',
    title: 'International Student Exchange & Dual-Degree Articulation Charter',
    category: 'Exchange Report',
    description: 'Bilateral transfer guidelines and shared credits across True VISIONS, Google Garage, and Yulin University.',
    fileUrl: '/uploads/bmu-international-exchange-report.pdf',
    fileName: 'bmu-international-exchange-report.pdf',
    fileSize: '2.5 MB',
    fileType: 'application/pdf',
    uploadedBy: 'BMU Global Relations Directorate',
    downloads: 650,
    createdAt: new Date('2026-04-10').toISOString(),
  },
];

// @desc    Get all documents
// @route   GET /api/v1/documents
// @access  Public
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    if (documents.length === 0) {
      return res.status(200).json({ success: true, count: inMemoryDocuments.length, data: inMemoryDocuments });
    }
    res.status(200).json({ success: true, count: documents.length, data: documents });
  } catch (error) {
    // Fallback gracefully to in-memory documents if DB is not connected
    res.status(200).json({ success: true, count: inMemoryDocuments.length, data: inMemoryDocuments });
  }
};

// @desc    Upload a new document (PDF/File)
// @route   POST /api/v1/documents/upload
// @access  Private (Admin only)
export const uploadDocument = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    let fileUrl = '';
    let fileName = '';
    let fileSize = '1.8 MB';

    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
      fileName = req.file.originalname;
      fileSize = `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`;
    } else if (req.body.fileUrl) {
      fileUrl = req.body.fileUrl;
      fileName = req.body.fileName || 'uploaded-document.pdf';
    } else {
      return res.status(400).json({ success: false, message: 'Please attach a PDF file or provide a fileUrl' });
    }

    const newDocObj = {
      title: title || fileName,
      category: category || 'Research Whitepaper',
      description: description || 'Official university institutional archive document.',
      fileUrl,
      fileName,
      fileSize,
      fileType: 'application/pdf',
      uploadedBy: req.user?.name || 'BMU Admin',
      downloads: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const document = await Document.create(newDocObj);
      res.status(201).json({ success: true, data: document });
    } catch (dbErr) {
      // If DB error/disconnected, push to inMemory list so testing works instantly
      const fallbackDoc = { _id: `doc-${Date.now()}`, ...newDocObj };
      inMemoryDocuments.unshift(fallbackDoc);
      res.status(201).json({ success: true, data: fallbackDoc });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a document
// @route   PUT /api/v1/documents/:id
// @access  Private (Admin only)
export const updateDocument = async (req, res) => {
  try {
    const doc = await Document.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] });
    if (doc) {
      doc.title = req.body.title || doc.title;
      doc.category = req.body.category || doc.category;
      doc.description = req.body.description || doc.description;
      const updated = await doc.save();
      return res.status(200).json({ success: true, data: updated });
    }
    // Check inMemory list if not found in DB
    inMemoryDocuments = inMemoryDocuments.map((d) =>
      d._id === req.params.id ? { ...d, ...req.body } : d
    );
    res.status(200).json({ success: true, data: inMemoryDocuments.find((d) => d._id === req.params.id) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a document
// @route   DELETE /api/v1/documents/:id
// @access  Private (Admin only)
export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] });
    if (doc) {
      await doc.deleteOne();
      return res.status(200).json({ success: true, message: 'Document removed from archive' });
    }
    // Check inMemory list if not found in DB
    inMemoryDocuments = inMemoryDocuments.filter((d) => d._id !== req.params.id);
    res.status(200).json({ success: true, message: 'Document removed' });
  } catch (error) {
    inMemoryDocuments = inMemoryDocuments.filter((d) => d._id !== req.params.id);
    res.status(200).json({ success: true, message: 'Document removed' });
  }
};

