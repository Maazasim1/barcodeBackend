const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const { Items } = require('../models/itemsModel');

const folderPath = path.resolve(__dirname, 'csv-files'); // Use absolute path for the folder
async function uploadToMongo() {
    try {
        const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.csv'));

        for (const file of files) {
            const filePath = path.join(folderPath, file);

            await new Promise((resolve, reject) => {
                const data = [];

                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (row) => {
                        if (row['Item GTIN']) { // Filter out rows without Item GTIN
                            // Map CSV columns to schema fields
                            data.push({
                                itemCode: row['Item Code'],
                                division: row['Division'],
                                department: row['Department'],
                                category: row['Category'],
                                class: row['Class'],
                                group: row['Group'],
                                description: row['Description'],
                                uom: row['UOM'],
                                brand: row['Brand'],
                                totalQOH: parseFloat(row['Total QOH']),
                                totalAvail: parseFloat(row['Total Avail.']),
                                status: row['Status'],
                                condition: row['Condition'],
                                issueCtrl: row['Issue Ctrl'],
                                itemGtin: row['Item GTIN'],
                            });
                        }
                    })     .on('end', async () => {
                        try {
                            if (data.length > 0) {
                                await Items.insertMany(data);
                                console.log(`${data.length} records inserted from ${file}`);
                            }
                            resolve();
                        } catch (error) {
                            reject(error);
                        }
                    })
                    .on('error', (error) => {
                        reject(error);
                    });
            });
        }

        // Create an index on the 'gtin' field for fast search
        await Items.createIndexes({ gtin: 1 });
        console.log('Index created on gtin field');
    } catch (error) {
        console.error('Error importing CSV to MongoDB:', error);
    } 
}

module.exports = { uploadToMongo }