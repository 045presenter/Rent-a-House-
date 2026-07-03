import express from 'express';
import pb from '../../utils/pocketbaseClient.js';
import logger from '../../utils/logger.js';

const router = express.Router();

// GET /properties - Fetch properties with optional filters and pagination
router.get('/', async (req, res) => {
  const { location, propertyType, minRent, maxRent, landlordId, page = 1, limit = 10 } = req.query;
  
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10));
  const skip = (pageNum - 1) * limitNum;
  
  let filter = '';
  const filters = [];
  
  if (location && location.trim()) {
    filters.push(`location ~ "${location.trim()}"`);
  }
  
  if (propertyType && propertyType.trim()) {
    filters.push(`propertyType = "${propertyType.trim()}"`);
  }
  
  if (minRent) {
    const minVal = parseFloat(minRent);
    if (!isNaN(minVal)) {
      filters.push(`rentAmount >= ${minVal}`);
    }
  }
  
  if (maxRent) {
    const maxVal = parseFloat(maxRent);
    if (!isNaN(maxVal)) {
      filters.push(`rentAmount <= ${maxVal}`);
    }
  }

  if (landlordId && landlordId.trim()) {
    filters.push(`landlordId = "${landlordId.trim()}"`);
  }
  
  if (filters.length > 0) {
    filter = filters.join(' && ');
  }
  
  const properties = await pb.collection('properties').getList(pageNum, limitNum, {
    filter: filter || undefined,
    sort: '-created',
    expand: 'landlordId',
  });
  
  res.json({
    items: properties.items,
    page: pageNum,
    limit: limitNum,
    totalItems: properties.totalItems,
    totalPages: properties.totalPages,
  });
});

// GET /properties/:id - Fetch single property by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!id || !id.trim()) {
    return res.status(400).json({ error: 'Property ID is required' });
  }
  
  const property = await pb.collection('properties').getOne(id, {
    expand: 'landlordId',
  });
  
  res.json(property);
});

// POST /properties - Create new property (landlord-only)
router.post('/', async (req, res) => {
  const landlordId = req.user?.id;
  
  if (!landlordId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const { title, description, propertyType, rentAmount, location, county, amenities, images } = req.body;
  
  // Validate required fields
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!propertyType || !propertyType.trim()) {
    return res.status(400).json({ error: 'Property type is required' });
  }
  if (rentAmount === undefined || rentAmount === null || rentAmount === '') {
    return res.status(400).json({ error: 'Rent amount is required' });
  }
  if (!location || !location.trim()) {
    return res.status(400).json({ error: 'Location is required' });
  }
  
  const rentVal = parseFloat(rentAmount);
  if (isNaN(rentVal) || rentVal < 0) {
    return res.status(400).json({ error: 'Rent amount must be a valid positive number' });
  }
  
  const propertyData = {
    title: title.trim(),
    description: description ? description.trim() : '',
    propertyType: propertyType.trim(),
    rentAmount: rentVal,
    location: location.trim(),
    county: county ? county.trim() : '',
    amenities: amenities ? (Array.isArray(amenities) ? amenities : [amenities]) : [],
    landlordId,
  };
  
  const createdProperty = await pb.collection('properties').create(propertyData);
  
  res.status(201).json({
    success: true,
    message: 'Property created successfully',
    property: createdProperty,
  });
});

// PUT /properties/:id - Update property (landlord-only)
router.put('/:id', async (req, res) => {
  const landlordId = req.user?.id;
  const { id } = req.params;
  
  if (!landlordId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  if (!id || !id.trim()) {
    return res.status(400).json({ error: 'Property ID is required' });
  }
  
  // Verify ownership
  const property = await pb.collection('properties').getOne(id);
  
  if (property.landlordId !== landlordId) {
    return res.status(403).json({ error: 'You can only update your own properties' });
  }
  
  const { title, description, propertyType, rentAmount, location, amenities } = req.body;
  
  const updateData = {};
  
  if (title !== undefined) {
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    updateData.title = title.trim();
  }
  
  if (description !== undefined) {
    updateData.description = description ? description.trim() : '';
  }
  
  if (propertyType !== undefined) {
    if (!propertyType || !propertyType.trim()) {
      return res.status(400).json({ error: 'Property type cannot be empty' });
    }
    updateData.propertyType = propertyType.trim();
  }
  
  if (rentAmount !== undefined) {
    if (rentAmount === null || rentAmount === '') {
      return res.status(400).json({ error: 'Rent amount cannot be empty' });
    }
    const rentVal = parseFloat(rentAmount);
    if (isNaN(rentVal) || rentVal < 0) {
      return res.status(400).json({ error: 'Rent amount must be a valid positive number' });
    }
    updateData.rentAmount = rentVal;
  }
  
  if (location !== undefined) {
    if (!location || !location.trim()) {
      return res.status(400).json({ error: 'Location cannot be empty' });
    }
    updateData.location = location.trim();
  }
  
  if (amenities !== undefined) {
    updateData.amenities = Array.isArray(amenities) ? amenities : (amenities ? [amenities] : []);
  }
  
  const updatedProperty = await pb.collection('properties').update(id, updateData);
  
  res.json({
    success: true,
    message: 'Property updated successfully',
    property: updatedProperty,
  });
});

// DELETE /properties/:id - Delete property (landlord-only)
router.delete('/:id', async (req, res) => {
  const landlordId = req.user?.id;
  const { id } = req.params;
  
  if (!landlordId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  if (!id || !id.trim()) {
    return res.status(400).json({ error: 'Property ID is required' });
  }
  
  // Verify ownership
  const property = await pb.collection('properties').getOne(id);
  
  if (property.landlordId !== landlordId) {
    return res.status(403).json({ error: 'You can only delete your own properties' });
  }
  
  await pb.collection('properties').delete(id);
  
  res.json({
    success: true,
    message: 'Property deleted successfully',
  });
});

export default router;
