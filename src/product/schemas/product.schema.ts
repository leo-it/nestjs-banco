import { Schema } from "mongoose";

export const UserSchema = new Schema({
    name: String,
    dni: Number,
    amount: Number,
    id: String,
    createdAt: { type: Date, default: Date.now }
});

