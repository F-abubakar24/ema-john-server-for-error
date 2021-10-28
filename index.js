const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require("cors");
require('dotenv').config()

const app = express()
const port = 5000;

// MIDDLE wayer
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.of2la.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("ema_john");
        const productsCollection = database.collection("products");

    // Find/READ api
        app.get("/products", async (req, res) => {
            const cursor = productsCollection.find({});
            const page = req.query.page;
            const size = parseInt(req.query.size);
            const count = await cursor.count();
            if (page) {
                products = await cursor.skip(page * size).limit(size).toArray();
                
            } else {
                const products = await cursor.toArray();
            }
            
            res.send({
                count,
                products
            });
        })

        // use POST to get data by keys
        app.post("products/byKeys", async (req, res) => {
            console.log(req.body);
            res.send('hitting the post')
        })



    } finally {
        // await client.close();
    }
}
run().catch(console.dir)



// ========================================================================
app.get("/", (req, res) => {
    res.send("Ema_John Server is Running");
})
app.listen(port, () => {
    console.log("Ema_John_Server running from ----------------------> ", port);
})