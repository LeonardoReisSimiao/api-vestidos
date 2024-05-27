import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import addressSchema from "./Address.js";

const empresaSchema = new mongoose.Schema({
    id: {type: ObjectId},
    nome: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Array, required: true},
    address: addressSchema,
    opening_hours: {type: String, required: true},
    created_at:  {type: Date, required: true},
    updated_at: {type: Date, required: true}
}, {versionKey: false});

const empresa = mongoose.model("empresas", empresaSchema);

export {empresa, empresaSchema};