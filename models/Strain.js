import mongoose from "mongoose";

const strainSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        terps: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Terp'
        }],
        effects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Effect'
        }],
        research: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Research'
        }],
        scents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scent'
        }],
        benefits: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Benefit'
        }],
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        image: {
            type: String,
        },
        likes: {
            type: Number
        },
    }
)

const Strain = mongoose.model('Strain', strainSchema)

export default Strain;