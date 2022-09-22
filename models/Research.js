import mongoose from "mongoose";

const researchSchema = new mongoose.Schema(
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
        benefits: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Benefit'
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

const Research = mongoose.model('Research', researchSchema)

export default Research;