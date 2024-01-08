import { Address, createPublicClient, http } from 'viem'

import { mainnet } from 'viem/chains'
import { abi } from './abi'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

// https://production.sushi.com/swap/v3.2?chainId=1&tokenIn=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&tokenOut=0x6B3595068778DD592e39A122f4f5a5cF09C90fE2&amount=1000000000000000&maxPriceImpact=0.005&gasPrice=89998588640&to=0x23DefC2Ca207e7FBD84AE43B00048Fb5Cb4DB5B2&preferSushi=true
const SWAP_API_URL = new URL('https://production.sushi.com/swap/v3.2')

// Chain (Ethereum)
const chainId = 1

// TokenA & TokenB
const inputCurrency = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
const outputCurrency = '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2'

// Amount
const amount = 1000000000000000

// Max Price Impact
const maxPriceImpact = 0.005

// Gas Price
const gasPrice = await publicClient.getGasPrice()

// To
const to = '0x8f54C8c2df62c94772ac14CcFc85603742976312'

const { searchParams } = SWAP_API_URL

searchParams.set('chainId', chainId.toString())
searchParams.set('tokenIn', inputCurrency)
searchParams.set('tokenOut', outputCurrency)
searchParams.set('amount', amount.toString())
searchParams.set('maxPriceImpact', maxPriceImpact.toString())
searchParams.set('gasPrice', gasPrice.toString())
searchParams.set('to', to)

// Make call to API
console.log(SWAP_API_URL.toString())
const res = await fetch(SWAP_API_URL.toString())
const json = await res.json()

console.log(json)

// Simulate a call to the blockchain for the swap
const { result } = await publicClient.simulateContract({
  address: json.routeProcessorAddr as Address,
  abi,
  functionName: 'processRoute',
  // tokenIn, amountIn, tokenOut, amountOutMin, to, route
  args: [json.routeProcessorArgs.tokenIn, json.routeProcessorArgs.amountIn, json.routeProcessorArgs.tokenOut, json.routeProcessorArgs.amountOutMin, json.routeProcessorArgs.to, json.routeProcessorArgs.routeCode] as [`0x${string}`, bigint, `0x${string}`, bigint, `0x${string}`, `0x${string}`],
  account: to,
  value: json.routeProcessorArgs.value
})
console.log(result)

// Make a call to the blockchain for the swap
// const PRIVATE_KEY = process.env.PRIVATE_KEY as Hex
// const walletClient = createWalletClient({
//   chain: mainnet,
//   transport: http(),
// })
// const acount = privateKeyToAccount(PRIVATE_KEY)