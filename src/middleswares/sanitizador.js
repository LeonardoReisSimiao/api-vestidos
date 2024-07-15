// sanitizer.js
import sanitizeHtml from "sanitize-html";
import xssFilters from "xss-filters";
import fs from "fs-extra";
import path from "path";
import ErroBase from "../erros/ErroBase.js";

// Diretório onde os logs serão armazenados
const logDirectory = path.join(process.cwd(), "logs"); // Caminho relativo ao diretório de execução do Node.js
// Nome do arquivo de log
const logFileName = "xss-detections.log";
const erroLogFileName = "erro-detections.log";
// Caminho completo para o arquivo de log
const logFilePath = path.join(logDirectory, logFileName);

// Função para sanitizar uma string
export const sanitizeInput = (input) => {
	if (typeof input !== "string") return input; // Retorna o input como está se não for string

	// Sanitiza HTML para evitar XSS
	let sanitizedInput = sanitizeHtml(input, {
		allowedTags: ["b", "i", "u", "strong", "em", "a", "p", "br"],
		allowedAttributes: { a: ["href"], href: ["https", "http"] },
	});

	// Aplica filtros de XSS
	sanitizedInput = xssFilters.inHTMLData(sanitizedInput);

	// Escapa caracteres perigosos para evitar SQL Injection
	sanitizedInput = sanitizedInput.replace(
		/[\0\x08\x09\x1a\n\r"'\\\%]/g,
		(char) => {
			switch (char) {
				case "\0":
					return "\\0";
				case "\x08":
					return "\\b";
				case "\x09":
					return "\\t";
				case "\x1a":
					return "\\z";
				case "\n":
					return "\\n";
				case "\r":
					return "\\r";
				case '"':
				case "'":
				case "\\":
				case "%":
					return "\\" + char;
			}
		},
	);

	return sanitizedInput;
};

// Função para verificar se há ataques XSS
export const hasXSS = (input) => {
	// Regex para detectar padrões de XSS simples
	const regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	return regex.test(input);
};

// Middleware para sanitizar e verificar ataques XSS
export const sanitizeMiddleware = (req, res, next) => {
	const sanitizeObject = (obj) => {
		for (let key in obj) {
			if (typeof obj[key] === "string") {
				// Verifica se há ataques XSS
				if (hasXSS(obj[key])) {
					const ip = req.ip || req.connection.remoteAddress;
					const dateTime = new Date().toISOString();
					const sanitizedValue = sanitizeInput(obj[key]);
					let message = `Tentativa de ataque XSS em: ${key}: ${sanitizedValue} do IP: ${ip} Data/Hora: ${dateTime}\n`;

					try {
						fs.ensureDirSync(logDirectory); // Garante que o diretório exista
						fs.appendFileSync(logFilePath, message);
					} catch (err) {
						message = `Erro ao escrever no arquivo de log: ${err} em: ${key}: ${sanitizedValue} do IP: ${ip} Data/Hora: ${dateTime}\n`;
						fs.ensureDirSync(logDirectory); // Garante que o diretório exista
						fs.appendFileSync(erroLogFileName, message);
					}

					const error = new ErroBase("Não tente novamente 😭", 418); // Erro 418 I'm a teapot
					return next(error);
				}

				obj[key] = sanitizeInput(obj[key]);

				console.log(`Checking for XSS in ${key}: ${obj[key]}`);
			} else if (typeof obj[key] === "object" && obj[key] !== null) {
				sanitizeObject(obj[key]);
			}
		}
	};

	sanitizeObject(req.body);
	sanitizeObject(req.query);
	sanitizeObject(req.params);

	next();
};
