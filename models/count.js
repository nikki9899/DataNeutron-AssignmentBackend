const mongoose = require('mongoose');

// Define the schema for the count
const countSchema = new mongoose.Schema({
    addCount: {
        type: Number,
        default: 0  // Default value for addCount
    },
    updateCount: {
        type: Number,
        default: 0  // Default value for updateCount
    }
});

// Create the Count model based on the schema
const Count = mongoose.model('Count', countSchema);

module.exports = Count;
