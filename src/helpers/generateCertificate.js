const fs = require('fs');
const path = require('path');
const grpc = require("grpc");

const generateCertifcate = () => {
    const cacert = fs.readFileSync(path.join(__dirname, "..", "..", "cert", "ca.crt")),
        cert = fs.readFileSync(path.join(__dirname, "..", "..", "cert", "server.crt")),
        key = fs.readFileSync(path.join(__dirname, "..", "..", "cert", "server.key")),
        keyPair = {
            private_key: key,
            cert_chain: cert,
        };
    const credential = grpc.ServerCredentials.createSsl(cacert, [keyPair]);
    return credential;
};

module.exports = { generateCertifcate };