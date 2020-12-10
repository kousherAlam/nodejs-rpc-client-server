const user = require('../data/User');

const getUser = (call, callback) => { 
    const md = call.metadata.getMap();
    for(let key in md){
        console.log(key, md[key]);
    }
    callback('error');
};



const getAllUser = (call) => { 
    user.Users.forEach(data =>{
        call.write({emaployee: data});
    });
    call.end();
};



const saveUser = (call, callback) => { 
    const user = call.request;
    if(user){
        callback(user);
        return;
    }
    callback('error');
};



const saveAllUser = (call, callback) => { 
    call.on('data', (user) =>{
        // save the user 
        call.write({user});
    });

    call.on('end', ()=>{
        // print all users 
        call.end();
    });
    callback('error');
};



const addPhoto = (call, callback) => { 
    const md = call.metadata.getMap();
    for(let key in md){
        console.log(key, md[key]);
    }
    let result = new Buffer(0);
    call.on('data', (data)=>{
        result = Buffer.concat([result, data.data]);
        console.log('get the chunk of data');
    });

    call.on('end', () =>{
        callback(null, {isOk: true});
        console.log(`got total data: ${result.length} bytes`);
    });
};


module.exports = {
    getAllUser, 
    getUser,
    saveUser, 
    saveAllUser, 
    addPhoto,
};
