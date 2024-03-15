const express = require('express')
const app = express()
const port = 3001
const merchant_model = require('./merchantModel')

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/', (req, res) => {
    merchant_model.getMerchants()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

app.post('/merchants', (req, res) => {
    merchant_model.createMerchant(req.body)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

app.delete('/merchants/:id', (req, res) => {
    merchant_model.deleteMerchant(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

app.put('/merchants/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    console.log('update body', body);

    merchant_model
        .updateMerchant(id, body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})