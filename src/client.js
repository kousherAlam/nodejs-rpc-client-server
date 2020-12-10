const path = require("path");
const grpc = require("grpc");
const protoBufLoader = require("@grpc/proto-loader");
const configs = require("./configs/configs");
const { generateClientCertifcate } = require('./helpers/generateCertificate');


const sendMetaData = (client) => {
    const md = new grpc.Metadata();
    md.add('username', 'kousher alam');
    md.add('password', 'password1');

    client.getUser({}, md, (data)=>{
        console.log(data);
    });
};

const main = () => {
    const protobufPath = path.join(__dirname, configs.PROBUF_PATH);
    const profobufDefinition = protoBufLoader.loadSync(protobufPath);
    const serviceDef = grpc.loadPackageDefinition(profobufDefinition);

    // console.log(serviceDef);

    const serverURL = `0.0.0.0:${configs.PORT}`;
    console.log('serverURL: ',serverURL);

    const client = new serviceDef.UserService(serverURL, generateClientCertifcate());
    
    const option = parseInt(process.argv[2], 10);
    const md = new grpc.Metadata();
    md.add('username', 'kousher alam');
    md.add('password', 'password1');
    client.getUser({}, md, (data)=>{
        console.log('test data.');
    });
    // switch (option) {
    //     case 1: 
    //         sendMetaData(client);
    //         break;

    // }
};

main();
