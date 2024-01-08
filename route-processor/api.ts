import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
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
const gasPrice = await client.getGasPrice()

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

// Make a call to the blockchain for the swap