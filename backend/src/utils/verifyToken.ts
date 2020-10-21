// Written of directly from https://www.youtube.com/watch?v=vqHkwTWbaUk&t=1590s&ab_channel=ApolloGraphQL

var jwt = require("jsonwebtoken");
var jwksClient = require("jwks-rsa");

export const verifyToken = async (bearerToken: string) => {
  const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });

  function getJwksClientKey(header: any, callback: any) {
    client.getSigningKey(header.kid, (error: any, key: any) => {
      const signingKey: any = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      bearerToken,
      getJwksClientKey,
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ["RS256"],
      },
      function (err: any, decoded: any) {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  });
};

module.exports = { verifyToken };
