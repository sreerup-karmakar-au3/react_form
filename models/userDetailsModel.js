const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const detailsSchema = new Schema(
    {
        image: { type: String, trim: true, required: true },
        firstname: { type: String, trim: true, required: true },
        lastname: { type: String, trim: true, required: true },
        email: { type: String, trim: true, required: true },
        phone: { type: Number, trim: true, required: true }
    },
    {
        timestamps: false
    }
);

const MovieDetails = mongoose.model('Details', detailsSchema);

module.exports = MovieDetails;