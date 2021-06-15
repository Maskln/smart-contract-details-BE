const express = require('express')
const router = express.Router()
const rp = require('request-promise')

module.exports = router

const COIN_MARKET_CAP_API_KEY = "ee5a97eb-43bc-4bc3-9ef1-22d7f8fe65ba"

router.get('/ether-price-eur', (req, res) => {
	const requestOptions = {
		method: 'GET',
		uri: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH&convert=EUR`,
		headers: {
			'X-CMC_PRO_API_KEY': COIN_MARKET_CAP_API_KEY
		},
		json: true,
		gzip: true
	};

	rp(requestOptions).then(response => {
		console.log('API call response:', response);
		res.send(response)
	}).catch((err) => {
		console.log('API call error:', err.message);
		res.send(err.message)
	});
})

router.get('/ether-price-usd', (req, res) => {
	const requestOptions = {
		method: 'GET',
		uri: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH&convert=USD`,
		headers: {
			'X-CMC_PRO_API_KEY': COIN_MARKET_CAP_API_KEY
		},
		json: true,
		gzip: true
	};

	rp(requestOptions).then(response => {
		console.log('API call response:', response);
		res.send(response)
	}).catch((err) => {
		console.log('API call error:', err.message);
		res.send(err.message)
	});
})