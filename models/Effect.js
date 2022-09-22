import mongoose from "mongoose";

const effectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        terps: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Terp'
        }],
        benefits: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Benefit'
        }],
        research: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Research'
        }],
        strains: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Strain'
        }],
        scents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scent'
        }],
        nature: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Nature'
        }],
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        likes: {
            type: Number
        },
    }
)

const Effect = mongoose.model('Effect', effectSchema)

export default Effect;