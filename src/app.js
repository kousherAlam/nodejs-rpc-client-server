"use strict";

const fs = require("fs");
const path = require("path");
const grpc = require("grpc");
const protoBufLoader = require("@grpc/proto-loader");

const configs = require("./configs/configs");

const generateCertifcate = () => {
    const cacert = fs.readFileSync(path.join(__dirname, "..", "cert", "ca.crt")),
        cert = fs.readFileSync(path.join(__dirname, "..", "cert", "server.crt")),
        key = fs.readFileSync(path.join(__dirname, "..", "cert", "server.key")),
        keyPair = {
            private_key: key,
            cert_chain: cert,
        };
    const credential = grpc.ServerCredentials.createSsl(cacert, [keyPair]);
    return credential;
};

const getUser = () => { };

const getAllUser = () => { };

const saveUser = () => { };

const saveAllUser = () => { };

const addPhoto = () => { };


const main = () => {
    const protobufPath = path.join(__dirname, configs.PROBUF_PATH);
    const profobufDefinition = protoBufLoader.loadSync(protobufPath);
    const serviceDef = grpc.loadPackageDefinition(profobufDefinition);
    const server = new grpc.Server();
    server.addService(serviceDef.UserService.service, {
        GetUser: getUser,
        GetAllUser: getAllUser,
        SaveUser: saveUser,
        SaveAllUser: saveAllUser,
        AddPhoto: addPhoto,
    });
    server.bind(`0.0.0.0:${configs.PORT}`, generateCertifcate());
    console.log(`server start at port: ${configs.PORT}`);
    server.start();
};

main();
