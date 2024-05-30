const mongoose = require('mongoose');


const itemsSchema = new mongoose.Schema({
    itemCode: { type: String, required: false },
    division: { type: String, required: false },
    department: { type: String, required: false },
    category: { type: String, required: false },
    class: { type: String, required: false },
    group: { type: String, required: false },
    description: { type: String, required: false },
    uom: { type: String, required: false }, 
    brand: { type: String, required: false },
    totalQOH: { type: Number, required: false }, 
    totalAvail: { type: Number, required: false },
    status: { type: String, required: false },
    condition: { type: String, required: false },
    issueCtrl: { type: String, required: false },
    itemGtin: { type: String, required: false },
    
}, { collection: 'items' }); 


const Items = mongoose.model('Items', itemsSchema);

module.exports = { Items }