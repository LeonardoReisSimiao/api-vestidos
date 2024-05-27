import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const aluguelSchema = new mongoose.Schema({
    id: {type: ObjectId}, //id
    precoTotal: {type: Number, required: true}, //PREÇO EM R$
    user_id: {type: ObjectId, ref: 'users', required: true}, //objeto do usuario que locou
    vestido_id: {type: ObjectId, ref: 'vestidos', required: true}, //objeto do vestido locado
    location_id: {type: ObjectId, ref: 'empresas', required: true}, //objeto da empresa de locação
    dataInicio:  {type: Date, required: true}, // data de criação formato 2024-01-01T00:00:00.000+00:00
    dataFim: {type: Date, required: true}, // data de modificação formato 2024-01-01T00:00:00.000+00:00
    status: {type: String, enum: ['Pendente', 'Pago', 'Ativo', 'Cancelado', 'Finalizado'], default: 'Pendente'}, //status do pedido
    created_at:  {type: Date, default: Date.now}, // data de criação formato 2024-01-01T00:00:00.000+00:00
    updated_at: {type: Date, default: Date.now} // data de modificação formato 2024-01-01T00:00:00.000+00:00
}, {versionKey: false});

const aluguel = mongoose.model("rentals", aluguelSchema);

export default aluguel;