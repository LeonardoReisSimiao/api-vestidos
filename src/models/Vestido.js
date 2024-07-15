import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const vestidoSchema = new mongoose.Schema(
	{
		id: { type: ObjectId }, //id
		nome: {
			type: String,
			required: [true, "O nome do vestido é obrigatório"],
		}, //nome
		descricao: {
			type: String,
			required: [true, "A descrição do vestido é obrigatório"],
		}, //descricao completa
		tamanho: {
			type: String,
			required: [true, "O tamanho do vestido é obrigatório"],
		}, // tamanho P,M,G 42,44 ETC
		tipoEvento: {
			type: String,
			required: [true, "O tipo de evento do vestido é obrigatório"],
		}, //FESTA, CASAMENTO, NOIVADO, DIA A DIA, ETC
		cor: {
			type: String,
			required: [true, "A cor do vestido é obrigatório"],
		}, // AZUL, BRANCO, ROYAL
		modelo: {
			type: String,
			required: [true, "O modelo do vestido é obrigatório"],
		}, //SEREIA, TOMARA QUE CAIA, ETC
		comprimento: {
			type: String,
			required: [true, "O comprimento do vestido é obrigatório"],
		}, // LONGO, CURTO, MIDI, ETC
		tecido: {
			type: String,
			required: [true, "O tecido do vestido é obrigatório"],
		}, // SEDA,ALGODAO, ETC
		preco: {
			type: Number,
			required: [true, "O preço do vestido é obrigatório"],
			min: [
				0,
				"O preço deve ser maior que R$ 0,00 e menor que R$ 5.000,00. Preço fornecido: {VALUE}",
			],
			max: [
				5000,
				"O preço deve ser maior que R$ 0,00 e menor que R$ 5.000,00. Preço fornecido: {VALUE}",
			],
		}, //PREÇO EM R$
		alugado: { type: Boolean, default: false }, // BOOLEAN APRA DIZER SE ESTÁ DISPONÍVEL OU NÃO
		images: {
			type: Array,
			required: [true, "A imagem do vestido é obrigatório"],
		}, // array de string com a url das imagens
		location_id: {
			type: ObjectId,
			ref: "empresas",
			required: [true, "A empresa do vestido é obrigatório"],
			autopopulate: { select: "nome" },
		}, //objeto da empresa de locação
		created_at: { type: Date, default: Date.now, immutable: true }, // data de criação formato 2024-01-01T00:00:00.000+00:00
		updated_at: {
			type: Date,
			default: Date.now,
			required: [true, "A data de atualização do vestido é obrigatório"],
		}, // data de modificação formato 2024-01-01T00:00:00.000+00:00
		desativado: { type: Boolean, default: false }, // BOOLEAN APRA DIZER SE ESTÁ DESATIVADO OU NÃO
		desativadoEm: { type: Date },
		motivoDesativacao: { type: String },
	},
	{ versionKey: false },
);

vestidoSchema.plugin(autopopulate);
const vestido = mongoose.model("vestidos", vestidoSchema);

export { vestido, vestidoSchema };
