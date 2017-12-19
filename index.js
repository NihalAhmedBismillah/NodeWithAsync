const express = require('express');
const app  = express();


app.get('/',(req,res)=>{

     res.send({server:'started at 8080'});
});

app.listen(8080,'localhost',(req,res)=>{

    console.log('server started ! on :  '+8080);
});


