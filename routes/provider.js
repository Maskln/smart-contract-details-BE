

const express = require('express')
const router = express.Router()
const { ethers, BigNumber } = require('ethers')
const { sortBy } = require("lodash");

const PROVIDER_NETWORK = "homestead"
const INFURA_PROJECT_ID = "604a37f5c4194112bab9bd9266afca38"
const INFURA_PROJECT_SECRET = "4d85844598f149978320c38bef42ba0b"

module.exports = router

router.get('/:address', async (req, res) => {
	const smartContractAddress = req.params.address
	const etherscanProvider = new ethers.providers.EtherscanProvider()
	let latestTenTransactions = []
	let result = []

	try {
		const history = await etherscanProvider.getHistory(smartContractAddress)

		latestTenTransactions = sortBy(history, [(e) => {
			return e.blockNumber
		}]).reverse().slice(0, 10)

		latestTenTransactions.forEach((item) => {
			const transaction = {}
			transaction.hash = item.hash
			transaction.from = item.from
			transaction.to = item.to
			transaction.blockNumber = item.blockNumber
			transaction.timestamp = item.timestamp

			result.push(transaction)
		})

		const provider = ethers.getDefaultProvider(PROVIDER_NETWORK, {
			infura: {
				projectId: INFURA_PROJECT_ID,
				projectSecret: INFURA_PROJECT_SECRET
			}
		})

		for (let i = 0; i < result.length; i += 1) {
			const [trReceipt, transaction] = await Promise.all([provider.getTransactionReceipt(result[i].hash), provider.getTransaction(result[i].hash)])

			if (typeof trReceipt.status !== "undefined") {
				result[i].status = trReceipt.status
			}

			result[i].value = BigNumber.from(transaction.value).toString()
		}

		res.send(result)
	} catch (error) {
		res.send(error)
	}
})

