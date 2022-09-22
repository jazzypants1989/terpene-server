import mongoose from "mongoose";

const terpSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        strains: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Strain'
        }],
        nature: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Nature'
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
        likes: {
            type: Number
        },
    }
)

const Terp = mongoose.model('Terp', terpSchema)

export default Terp;