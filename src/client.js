const path = require("path");
const grpc = require("grpc");
const protoBufLoader = require("@grpc/proto-loader");
const configs = require("./configs/configs");
const { generateClientCertifcate } = require('./helpers/generateCertificate');


const sendMetaData = (client) => {
    const md = new grpc.Metadata();
    md.add('username', 'kousher alam');
    md.add('password', 'password1');

    client.getUser({name: 'kousher'}, (err, data)=>{
        console.log(data);
        console.error(err);
    });
};

const main = () => {
    const protobufPath = path.join(__dirname, configs.PROBUF_PATH);
    const profobufDefinition = protoBufLoader.loadSync(protobufPath);
    const serviceDef = grpc.loadPackageDefinition(profobufDefinition);

    // console.log(serviceDef);

    const serverURL = `https://0.0.0.0:${configs.PORT}`;
    console.log('serverURL: ',serverURL);

    const client = new serviceDef.UserService(serverURL, generateClientCertifcate());
    
    const option = parseInt(process.argv[2], 10);

    switch (option) {
        case 1: 
            sendMetaData(client);
            break;

    }
};

main();
