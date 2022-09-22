import mongoose from "mongoose";

const benefitSchema = new mongoose.Schema(
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

const Benefit = mongoose.model('Benefit', benefitSchema)

export default Benefit;