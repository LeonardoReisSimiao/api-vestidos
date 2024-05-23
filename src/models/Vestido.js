import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const vestidoSchema = new mongoose.Schema({
    id: {type: ObjectId},
    nome: {type: String, required: true},
    tipoEvento: {type: String, required: true},
    cor: {type: String, required: true},
    modelo: {type: String, required: true},
    tamanho: {type: String, required: true},
    tecido: {type: String, required: true},
    preco: {type: Number, required: true},
    alugado: {type: Boolean, required: true},
    inicioAluguel:  {type: Date},
    finalAluguel: {type: Date}
}, {versionKey: false});

const vestido = mongoose.model("vestidos", vestidoSchema);

export default vestido;