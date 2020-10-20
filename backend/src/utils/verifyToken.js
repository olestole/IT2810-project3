// Written of directly from https://www.youtube.com/watch?v=vqHkwTWbaUk&t=1590s&ab_channel=ApolloGraphQL

const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

export const verifyToken = async (bearerToken) => {
  const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });

  function getJwksClientKey(header, callback) {
    client.getSigningKey(header.kid, function (error, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      bearerToken,
      getJwksClientKey,
      {
        audience: process.env.AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ["RS256"],
      },
      function (err, decoded) {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  });
};
