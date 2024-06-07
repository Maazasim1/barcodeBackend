
const { Items } = require('../models/itemsModel');
const mongoose = require('mongoose');


async function searchGtin(gtin) {
    try {
        const result = await Items.findOne({ itemGtin: gtin });
        if (result) {
            console.log('GTIN found:', result);
            return result
        } else {
            console.log('GTIN not found');
            return "gtin not found"
        }
    } catch (error) {
        console.error('Error searching for GTIN:', error);
    } 
}

module.exports={searchGtin}