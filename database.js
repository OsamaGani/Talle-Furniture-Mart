const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'e-commerce';
const clinet = new MongoClient(url);

async function dbConnet() {
    const result = await clinet.connect();
    const db = result.db(dbName);
    const collection = db.collection('registerdata');
    return collection
}
async function checkout()
{
    const result = await clinet.connect();
    const db = result.db(dbName);
    const collection = db.collection('orderdata');
    return collection
}

async function contactdata()
{
    const result = await clinet.connect();
    const db = result.db(dbName);
    const collection = db.collection('contactdata');
    return collection
}
async function products()
{
    const result = await clinet.connect();
    const db = result.db(dbName);
    const collection = db.collection('products');
    return collection
}
module.exports = {
    dbConnet : dbConnet,
    checkout :checkout,
    contactdata : contactdata,
    products :products
};
