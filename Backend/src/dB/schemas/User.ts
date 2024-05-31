import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        default: function() {
            const _t = this as any; // tslint:disable-line
            return _t.email.slice(0,2);
        }
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
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

export const User = mongoose.model("User", UserSchema);