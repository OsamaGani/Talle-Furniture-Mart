// const express = require('express');
// const dbConnection = require('./database');

// const app = express();
// app.use(express.json());

// app.get('/',async(req , resp)=>{
//     let data = await dbConnection();
//     data = await data.find().toArray();
// })
// app.delete('/',async (req , resp)=>{
//     console.log(req.params.name);
// })
// app.listen(5000);