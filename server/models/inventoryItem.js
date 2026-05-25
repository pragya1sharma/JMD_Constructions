import mongoose from 'mongoose';
import inventorySchema from '../Schema/inventoryItem.js';

export default mongoose.model('Inventory', inventorySchema);