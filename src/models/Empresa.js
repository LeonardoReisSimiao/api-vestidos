import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import addressSchema from "./Address.js";

const empresaSchema = new mongoose.Schema(
	{
		id: { type: ObjectId },
		cnpj: {
			type: String,
			required: [true, "O CNPJ da empresa é obrigatório"],
		},
		nome: {
			type: String,
			required: [true, "O nome da empresa é obrigatório"],
		},
		email: {
			type: String,
			required: [true, "O e-mail da empresa é obrigatório"],
		},
		phone: {
			type: Array,
			required: [true, "O telefone da empresa é obrigatório"],
		},
		address: addressSchema,
		opening_hours: {
			type: String,
			required: [true, "O horário de atendimento da empresa é obrigatório"],
		},
		created_at: { type: Date, default: Date.now },
		updated_at: {
			type: Date,
			default: Date.now,
			required: [true, "A data de atualização da empresa é obrigatório"],
		},
	},
	{ versionKey: false },
);

const empresa = mongoose.model("empresas", empresaSchema);

export { empresa, empresaSchema };
