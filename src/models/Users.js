import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    id: {type: ObjectId},
    nome: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    adress: {type: String, required: true},
    cep: {type: String, required: true},
    role: {type: String, required: true},
    created_at:  {type: Date, required: true},
    updated_at: {type: Date, required: true}
}, {versionKey: false});

const usuario = mongoose.model("users", usuarioSchema);

export default usuario;