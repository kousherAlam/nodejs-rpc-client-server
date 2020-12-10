'use strict';

const fs = require('fs');
const path = require('path');
const grpc = require('grpc');
const protoBufLoader = require('@grpc/proto-loader');

const configs = require('./configs/configs');


const main = () =>{
    const protobufPath = path.join(__dirname, configs.PROBUF_PATH);
    const profobufDefinition = protoBufLoader.loadSync(protobufPath);
    const serviceDef = grpc.loadPackageDefinition(profobufDefinition);
    console.log(serviceDef);
}

main();
