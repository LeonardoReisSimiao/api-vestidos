import multer from "multer";
import { uploadToGCS } from "../utils/images.utils.js";

// armazenamento do multer na memória
const multerStorage = multer.memoryStorage();

// Configuração do multer
const upload = multer({
	storage: multerStorage,
	limits: { fileSize: 10 * 1024 * 1024 }, // limite de 10MB por arquivo
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb(
				new Error("Arquivo não é uma imagem! Por favor, envie uma imagem."),
				false,
			);
		}
	},
});

// verificar se há arquivos na solicitação e processar imagens
const verifyAndProcessImages = (req, res, next) => {
	// verifica se o Content-Type indica que há arquivos senão já parte para as rotas

	if (
		req.headers["content-type"] &&
		req.headers["content-type"].includes("multipart/form-data")
	) {
		upload.array("images", 4)(req, res, async (err) => {
			if (err) {
				return next(err);
			}

			const files = req.files;

			if (!files || files.length === 0) {
				return next();
			}

			try {
				const uploadPromises = files.map((file) => uploadToGCS(file));
				const urls = await Promise.all(uploadPromises);

				req.body.images = Array.isArray(urls) ? urls : [urls]; // garantir que seja sempre um array
				delete req.files && files; //deletando para limpar memória após o processamento
				next();
			} catch (uploadError) {
				next(uploadError);
			}
		});
	} else {
		next();
	}
};

export { verifyAndProcessImages };
