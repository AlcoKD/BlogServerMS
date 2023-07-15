const express = require('express'); //richiama l'utilizzo di express
const bodyParser = require('body-parser');//ne avremo bisogno per poter convertire i dati json che arriveranno dalle chiamate http
const { randomBytes } = require('crypto');//per generare un id casuale (non necessario se si utilizza un DB e si storano gli ID)
const cors = require('cors');//utile per aggirare le policy cors che non permettono la comunicazione su localhost se non con specifici headers
const axios = require('axios');

const app = express(); //crea una nuova app utilizzando express
app.use(bodyParser.json());
app.use(cors());

const posts = {}; //si occuperà di immagazzinare i diversi post che arriveranno

//http get request
app.get('/posts', (req,res) => {
    res.send(posts);
});

//http post request
app.post('/posts/create',  async (req, res) => {
    const id = randomBytes(4).toString('hex');//4 bvtes of random data in hexadecimal
    const {title} = req.body;

    posts[id] = {
        id, title
    };

   await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
           id, title 
        }
    });

    res.status(201).send(posts[id]);
}); 

app.post('/events', (req, res) => {
    console.log('Received Event:', req.body.type);
    res.send({});
});

//specifichiamo che vogliamo che l'app comunichi sulla porta 4000
app.listen(4000, () => {
    console.log('v55');
    console.log('listening on 4000');
});