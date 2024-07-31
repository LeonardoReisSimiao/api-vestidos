import { Storage } from "@google-cloud/storage";
import sharp from "sharp";
import crypto from "crypto";
import multer from "multer";
import path from "path";
import ErroBase from "../erros/ErroBase.js";

// Configurar o Google Cloud Storage
const storage = new Storage({
	projectId: process.env.G_ID,
	keyFilename: process.env.G_STORAGE, // Caminho para o arquivo JSON das credenciais
});
const bucketName = process.env.G_PRODUTOS;
const bucket = storage.bucket(bucketName);

// Função para fazer upload do arquivo convertido para WebP para o Google Cloud Storage
const uploadToGCS = async (file) => {
	try {
		// Verificar se o arquivo foi recebido
		if (!file || !file.buffer) {
			throw new ErroBase("Arquivo não recebido ou buffer ausente.");
		}

		// Converter a imagem para WebP usando sharp
		const buffer = await sharp(file.buffer).webp().toBuffer();

		// Criar um novo nome para o arquivo com extensão .webp
		const originalName = path.parse(file.originalname).name;
		const fileName = `${originalName}-${crypto.randomBytes(2).toString("hex")}.webp`;

		// Configurar o Google Cloud Storage
		const blob = bucket.file(fileName);
		const blobStream = blob.createWriteStream({
			resumable: false,
			gzip: false,
			metadata: {
				contentType: "image/webp",
				metadata: {
					firebaseStorageDownloadTokens: crypto.randomBytes(1).toString("hex"),
				},
			},
		});

		return new Promise((resolve, reject) => {
			blobStream.on("error", (err) => {
				console.error("Erro ao criar stream:", err);
				reject(err);
			});

			blobStream.on("finish", () => {
				const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
				console.log("Arquivo enviado para GCS com sucesso.");
				resolve(publicUrl);
			});

			blobStream.end(buffer);
		});
	} catch (error) {
		console.error("Erro ao processar imagem:", error);
		throw new Error("Error processing image: " + error.message);
	}
};

export { uploadToGCS };
