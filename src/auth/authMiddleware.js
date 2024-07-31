import jwt from "jsonwebtoken";
import ErroBase from "../erros/ErroBase.js";

const secretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
	if (!req.headers["authorization"]) {
		return next(new ErroBase("Nenhum token informado", 401));
	}

	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return next(new ErroBase("Nenhum token informado", 401));
	}

	jwt.verify(token, secretKey, (err, user) => {
		if (err) {
			return next(new ErroBase("Token Inválido", 403)); // Não autorizados
		} else {
			req.user = user;

			if (req.method === "GET" && req.path === "/auth") {
				return res.status(200).json({ valid: true, message: "Token Válido" });
			} else {
				next(); // Passa o controle para o próximo middleware ou rota
			}
		}
	});
};

export { authenticateToken };
