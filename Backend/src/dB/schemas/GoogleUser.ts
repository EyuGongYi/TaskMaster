import mongoose from "mongoose";

const GoogleUserSchema = new mongoose.Schema({
    googleId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    displayName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    accessToken: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    refreshToken: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
    canvasCredential: {
        type: mongoose.SchemaTypes.String,
    },
    events: {
        type: mongoose.SchemaTypes.Map,
        required: true,
        default: new Map(),
    },
});

export const GoogleUser = mongoose.model("GoogleUser", GoogleUserSchema);