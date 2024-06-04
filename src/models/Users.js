import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import addressSchema from "./Address.js";

const usuarioSchema = new mongoose.Schema({
    id: {type: ObjectId},
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    address: addressSchema,
    role: {type: String, required: true},
    created_at:  {type: Date, required: true},
    updated_at: {type: Date, required: true}
}, {versionKey: false});

const usuario = mongoose.model("users", usuarioSchema);

export {usuario, usuarioSchema};