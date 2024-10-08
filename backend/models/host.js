const mongoose = require('mongoose');

const HostSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // Add other fields as necessary
}, { timestamps: true });

const Host = mongoose.model('Host', HostSchema);
module.exports = Host;
