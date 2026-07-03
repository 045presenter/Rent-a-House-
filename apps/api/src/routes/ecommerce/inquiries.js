import express from 'express';
import pb from '../../utils/pocketbaseClient.js';
import logger from '../../utils/logger.js';

const router = express.Router();

// GET /inquiries - Fetch inquiries for authenticated user
router.get('/', async (req, res) => {
  const userId = req.user?.id;
  
  if (!userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const { page = 1, limit = 10 } = req.query;
  
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10));
  
  // Fetch inquiries where user is either tenant or landlord
  const filter = `tenantId = "${userId}" || landlordId = "${userId}"`;
  
  const inquiries = await pb.collection('inquiries').getList(pageNum, limitNum, {
    filter,
    sort: '-created',
    expand: 'propertyId,tenantId,landlordId',
  });
  
  res.json({
    items: inquiries.items,
    page: pageNum,
    limit: limitNum,
    totalItems: inquiries.totalItems,
    totalPages: inquiries.totalPages,
  });
});

// POST /inquiries - Create new inquiry
router.post('/', async (req, res) => {
  const tenantId = req.user?.id;
  
  if (!tenantId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const { propertyId, message, inquiryType } = req.body;
  
  // Validate required fields
  if (!propertyId || !propertyId.trim()) {
    return res.status(400).json({ error: 'Property ID is required' });
  }
  
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  if (!inquiryType || !inquiryType.trim()) {
    return res.status(400).json({ error: 'Inquiry type is required' });
  }
  
  // Verify property exists and get landlord ID
  const property = await pb.collection('properties').getOne(propertyId);
  
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  
  const inquiryData = {
    propertyId: propertyId.trim(),
    tenantId,
    landlordId: property.landlordId,
    message: message.trim(),
    inquiryType: inquiryType.trim(),
  };
  
  const createdInquiry = await pb.collection('inquiries').create(inquiryData);
  
  res.status(201).json({
    success: true,
    message: 'Inquiry created successfully',
    inquiry: createdInquiry,
  });
});

export default router;
