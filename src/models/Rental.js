import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const aluguelSchema = new mongoose.Schema(
	{
		id: { type: ObjectId }, //id
		precoTotal: {
			type: Number,
			required: [true, "O preço total da reserva é obrigatório"],
		}, //PREÇO EM R$
		user_id: {
			type: ObjectId,
			ref: "users",
			required: [true, "O ID do(a) usuário(a) da reserva é obrigatório"],
		}, //objeto do usuario que locou
		vestido_id: {
			type: ObjectId,
			ref: "vestidos",
			required: [true, "O ID do vestido da reserva é obrigatório"],
		}, //objeto do vestido locado
		location_id: {
			type: ObjectId,
			ref: "empresas",
			required: [true, "O ID da empresa do vestido é obrigatório"],
		}, //objeto da empresa de locação
		dataInicio: {
			type: Date,
			required: [true, "A data de início da reserva é obrigatório"],
		}, // data de criação formato 2024-01-01T00:00:00.000+00:00
		dataFim: {
			type: Date,
			required: [true, "A data de termino da reserva é obrigatório"],
		}, // data de modificação formato 2024-01-01T00:00:00.000+00:00
		status: {
			type: String,
			enum: ["Pendente", "Pago", "Ativo", "Cancelado", "Finalizado"],
			default: "Pendente",
		}, //status do pedido
		created_at: { type: Date, default: Date.now }, // data de criação formato 2024-01-01T00:00:00.000+00:00
		updated_at: {
			type: Date,
			default: Date.now,
			required: [true, "A data de atualização do(a) aluguel é obrigatório"],
		}, // data de modificação formato 2024-01-01T00:00:00.000+00:00
	},
	{ versionKey: false },
);

const aluguel = mongoose.model("rentals", aluguelSchema);

export default aluguel;
