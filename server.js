const express = require('express')
const app = express()

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
	next()
})

const coinMarketCapRouter = require('./routes/coinMarketCap')
app.use('/coin-market-cap', coinMarketCapRouter)
const contractRouter = require('./routes/contract')
app.use('/contract', contractRouter)
const providerRouter = require('./routes/provider')
app.use('/provider', providerRouter)

app.listen(8000, () => console.log("Listening: http://localhost:8000/"))