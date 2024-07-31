import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const aluguelSchema = new mongoose.Schema(
	{
		id: { type: ObjectId }, //id
		precoTotal: {
			type: Number,
			required: [true, "O preço total da reserva é obrigatório"],
			min: [
				0,
				"O preço deve ser maior que R$ 0,00 e menor que R$ 5.000,00. Preço fornecido: {VALUE}",
			],
			max: [
				5000,
				"O preço deve ser maior que R$ 0,00 e menor que R$ 5.000,00. Preço fornecido: {VALUE}",
			],
		}, //PREÇO EM R$
		user_id: {
			type: ObjectId,
			ref: "users",
			required: [true, "O ID do(a) usuário(a) da reserva é obrigatório"],
			autopopulate: { select: "nome" },
		}, //objeto do usuario que locou
		vestido_id: {
			type: ObjectId,
			ref: "vestidos",
			required: [true, "O ID do vestido da reserva é obrigatório"],
			autopopulate: { select: "nome" },
		}, //objeto do vestido locado
		location_id: {
			type: ObjectId,
			ref: "empresas",
			required: [true, "O ID da empresa do vestido é obrigatório"],
			autopopulate: { select: "nome" },
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
			enum: {
				values: [
					"Pendente",
					"Pago",
					"Ativo",
					"Cancelado",
					"Finalizado",
					"Lavando",
					"Ajustando",
				],
				message: "O código de status '{VALUE}' fornecido é inválido",
			},
			default: "Pendente",
		}, //status do pedido
		created_at: { type: Date, default: Date.now, immutable: true }, // data de criação formato 2024-01-01T00:00:00.000+00:00
		updated_at: {
			type: Date,
			default: Date.now,
			required: [true, "A data de atualização do(a) aluguel é obrigatório"],
		}, // data de modificação formato 2024-01-01T00:00:00.000+00:00
		desativado: { type: Boolean, default: false }, // BOOLEAN APRA DIZER SE ESTÁ DESATIVADO OU NÃO
		desativadoEm: { type: Date },
		motivoDesativacao: { type: String },
	},
	{ versionKey: false },
);

aluguelSchema.plugin(autopopulate);
aluguelSchema.index({ location_id: 1 });
aluguelSchema.index({ user_id: 2 });
aluguelSchema.index({ vestido_id: 3 });
const aluguel = mongoose.model("rentals", aluguelSchema);

export default aluguel;
