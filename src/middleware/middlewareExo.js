export const date = (req, res, next) => {
  const now = new Date();
  console.log(`${now.toLocaleDateString()} ${now.toLocaleTimeString()} - ${req.method} ${req.path}`);
  next()// Passe à la prochaine fonction middleware dans la chaîne
}

let click = 0

export const nombreClick = (req, res, next) => {
  click += 1
  console.log(click)
  next()
}

// Middleware qui calcule de temps temps de réponse d'une requête
export const requestTimer = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`Requête ${req.method} ${req.url} traitée en ${duration}ms`);
  });

  next();
};

const rateLimit = {};

/**
 * Middleware qui limite le nombre de requete par ip
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns A partir de 5 req /min message qui indique trop de requete
 */
export const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!rateLimit[ip]) {
    rateLimit[ip] = { count: 1, lastRequest: now };
  } else {
    const timeDiff = now - rateLimit[ip].lastRequest;
    if (timeDiff < 60000) { // 1 minute
      rateLimit[ip].count++;
      if (rateLimit[ip].count > 5) { // Limite de 5 requêtes par minute
        return res.status(429).json({ message: "Trop de requêtes, réessayez plus tard." });
      }
    } else {
      rateLimit[ip] = { count: 1, lastRequest: now };
    }
  }

  next();
};