import mongoose from "mongoose";

const natureSchema = new mongoose.Schema(
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
        strains: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Strain'
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
            required: true,
        },
        likes: {
            type: Number
        },
    }
)

const Nature = mongoose.model('Nature', natureSchema)

export default Nature;