const path = require("path");
const grpc = require("grpc");
const protoBufLoader = require("@grpc/proto-loader");
const configs = require("./configs/configs");
const userController = require('./controller/user');
const { generateCertifcate } = require('./helpers/generateCertificate');


const main = () => {
    const protobufPath = path.join(__dirname, configs.PROBUF_PATH);
    const profobufDefinition = protoBufLoader.loadSync(protobufPath);
    const serviceDef = grpc.loadPackageDefinition(profobufDefinition);
    const server = new grpc.Server();
    server.addService(serviceDef.UserService.service, {
        GetUser: userController.getUser,
        GetAllUser: userController.getAllUser,
        SaveUser: userController.saveUser,
        SaveAllUser: userController.saveAllUser,
        AddPhoto: userController.addPhoto,
    });
    server.bind(`0.0.0.0:${configs.PORT}`, generateCertifcate());
    console.log(`server start at port: ${configs.PORT}`);
    server.start();
};

main();
