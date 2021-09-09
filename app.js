const express = require('express'); //Third Party
const bodyParser = require('body-parser'); // Core Module
const app = express();
const cors = require('cors');
app.use(express.json())
const path = require('path')
const database = require('./database/db')
const public = path.join(__dirname,'')
const user_routes = require('./routes/userRoutes');
const rooms_routes = require('./routes/roomsRoutes');
const message_routes = require('./routes/messageRoutes');
app.use(cors());

app.use(express.static(public))
app.use(message_routes);
app.use(user_routes);
app.use(rooms_routes);



app.use(bodyParser.urlencoded({extended:false}));

app.listen(3001);