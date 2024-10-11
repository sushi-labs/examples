import { Address, createPublicClient, http } from 'viem'

import { mainnet } from 'viem/chains'
import { abi } from './abi'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

// https://api.sushi.com/swap/v5/1?tokenIn=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&tokenOut=0x6B3595068778DD592e39A122f4f5a5cF09C90fE2&amount=1000000000000000000&maxSlippage=0.005&gasPrice=12170332386&enableFee=true&feeReceiver=0xca226bd9c754F1283123d32B2a7cF62a722f8ADa&fee=0.0025&feeBy=output&includeTransaction=true&includeRoute=true
// Chain (Ethereum)
const chainId = 1

const SWAP_API_URL = new URL('https://api.sushi.com/swap/v5/' + chainId)



// TokenA & TokenB
const inputCurrency = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
const outputCurrency = '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2'

// Amount
const amount = 1000000000000000

// Max Slippage
const maxSlippage = 0.005

// Gas Price
const gasPrice = await publicClient.getGasPrice()

// To
const to = '0x8f54C8c2df62c94772ac14CcFc85603742976312'

const { searchParams } = SWAP_API_URL
searchParams.set('tokenIn', inputCurrency)
searchParams.set('tokenOut', outputCurrency)
searchParams.set('amount', amount.toString())
searchParams.set('maxSlippage', maxSlippage.toString())
searchParams.set('gasPrice', gasPrice.toString())
searchParams.set('to', to)
searchParams.set('includeTransaction', 'true')

// Make call to API
console.log(SWAP_API_URL.toString())
const res = await fetch(SWAP_API_URL.toString())
const data = await res.json()

console.log(data)

const { tx } = data

// Simulate a call to the blockchain for the swap
const result = await publicClient.call({
  account: tx.from,
  data: tx.data,
  to: tx.to,
  value: tx.value,
})
console.log('Output: ', result)

// Make a call to the blockchain for the swap
// const PRIVATE_KEY = process.env.PRIVATE_KEY as Hex
// const walletClient = createWalletClient({
//   chain: mainnet,
//   transport: http(),
// })
// const acount = privateKeyToAccount(PRIVATE_KEY)