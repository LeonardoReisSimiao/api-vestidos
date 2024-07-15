import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import addressSchema from "./Address.js";

// Função de validação de CPF
function validarCPF(cpf) {
	cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
	if (cpf === "") return false;
	if (
		cpf.length !== 11 ||
		cpf === "00000000000" ||
		cpf === "11111111111" ||
		cpf === "22222222222" ||
		cpf === "33333333333" ||
		cpf === "44444444444" ||
		cpf === "55555555555" ||
		cpf === "66666666666" ||
		cpf === "77777777777" ||
		cpf === "88888888888" ||
		cpf === "99999999999"
	)
		return false;
	let add = 0;
	for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
	let rev = 11 - (add % 11);
	if (rev === 10 || rev === 11) rev = 0;
	if (rev !== parseInt(cpf.charAt(9))) return false;
	add = 0;
	for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
	rev = 11 - (add % 11);
	if (rev === 10 || rev === 11) rev = 0;
	if (rev !== parseInt(cpf.charAt(10))) return false;
	return true;
}

const usuarioSchema = new mongoose.Schema(
	{
		id: { type: ObjectId },
		nome: {
			type: String,
			required: [true, "O nome do(a) usuário(a) é obrigatório"],
		},
		email: {
			type: String,
			required: [true, "O e-mail do(a) usuário(a) é obrigatório"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "A senha do(a) usuário(a) é obrigatório"],
		},
		cpf: {
			type: String,
			required: [true, "O CPF do(a) usuário(a) é obrigatório"],
			unique: true,
			immutable: true,
			validate: {
				validator: validarCPF,
				message: "{VALUE} não é um CPF válido.",
			},
		},
		phone: {
			type: String,
			required: [true, "O telefone do(a) usuário(a) é obrigatório"],
		},
		address: addressSchema,
		role: {
			type: String,
			required: [true, "O perfil do(a) usuário(a) é obrigatório"],
		},
		created_at: { type: Date, default: Date.now, immutable: true },
		updated_at: {
			type: Date,
			default: Date.now,
			required: [true, "A data de atualização do(a) usuário(a) é obrigatório"],
		},
	},
	{ versionKey: false },
);

const usuario = mongoose.model("users", usuarioSchema);

export { usuario, usuarioSchema };
