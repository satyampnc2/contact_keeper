const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const connectdb = require('./config/db');
const path = require('path')
connectdb();
app.use(bodyParser.json());
app.use('/api/users',require('./routes/user'));
app.use('/api/contacts',require('./routes/contacts'));
app.use('/api/auth',require('./routes/auth'))

//Server static assets in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}
app.listen(process.env.PORT || 5000,()=>console.log('listening to post 5000'))
