require('dotenv').config();
require('dotenv').config({ path: '../.env' });
const mongoose = require("mongoose");
// const server = '127.0.0.1:27017'; 

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

mongoose.connect(process.env.MONGO_URL, {

}).then(()=> {
    console.log(`Connection Successful`);
}).catch((error)=> {
    console.log(`Connection Failed `+ error.message);
})