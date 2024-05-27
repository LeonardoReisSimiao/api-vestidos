import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { empresaSchema } from "./Empresa.js";

const vestidoSchema = new mongoose.Schema({
    id: {type: ObjectId}, //id
    nome: {type: String, required: true}, //nome
    descricao: {type: String, required: true}, //descricao completa
    tamanho: {type: String, required: true}, // tamanho P,M,G 42,44 ETC
    tipoEvento: {type: String, required: true}, //FESTA, CASAMENTO, NOIVADO, DIA A DIA, ETC
    cor: {type: String, required: true}, // AZUL, BRANCO, ROYAL
    modelo: {type: String, required: true}, //SEREIA, TOMARA QUE CAIA, ETC
    comprimento: {type: String, required: true}, // LONGO, CURTO, MIDI, ETC
    tecido: {type: String, required: true}, // SEDA,ALGODAO, ETC
    preco: {type: Number, required: true}, //PREÇO EM R$
    alugado: {type: Boolean, required: true}, // BOOLEAN APRA DIZER SE ESTÁ DISPONÍVEL OU NÃO
    images: {type: Array, required: true}, // array de string com a url das imagens
    location_id: {type: ObjectId, ref: 'empresas', required: true}, //objeto da empresa de locação
    created_at:  {type: Date, default: Date.now}, // data de criação formato 2024-01-01T00:00:00.000+00:00
    updated_at: {type: Date, default: Date.now} // data de modificação formato 2024-01-01T00:00:00.000+00:00
}, {versionKey: false});

const vestido = mongoose.model("vestidos", vestidoSchema);

export default vestido;