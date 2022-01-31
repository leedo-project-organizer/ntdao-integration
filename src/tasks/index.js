const ethers = require('ethers')
const srcDir = require('find-config')('src')
//const sleep = require('util').promisify(setTimeout)
const { readMnemonic } = require(srcDir + '/keyman')
const db = require(srcDir + '/db')

require('dotenv').config({ path: require('find-config')('.env') })

const vaultAddr = '0x122DbB0C76d1d96a9187a50C898A789b0Ed1cf7C' //klaytn mainnet
const vaultAbi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BalanceWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"caller","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"message","type":"string"}],"name":"Received","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Refunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enumNTDaoNft.State","name":"_state","type":"uint8"}],"name":"StateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"MAX_PUBLIC_ID","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PUBLIC_MULTI","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINTING_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"changeToPermanent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getAttrs","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getBaseGeneNames","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getBaseGenes","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getImg","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMintingState","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getSeed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"getUnclaimedRefunds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPermanent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"notRefundCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"publicMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds_","type":"uint256[]"}],"name":"refund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId_","type":"uint256"}],"name":"refundState","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"refunds","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setStateToFinished","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setStateToPublicMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setStateToRefund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setStateToSetup","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"state","outputs":[{"internalType":"enumNTDaoNft.State","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"tokensOf","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds_","type":"uint256[]"},{"internalType":"address","name":"_to","type":"address"}],"name":"transferBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"geneContract_","type":"address"}],"name":"updateGene","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_feeAmount","type":"uint256"}],"name":"updateMintingFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"addresspayable","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]' 

const mirrorAddr = '' //mumbai testnet & mainnet
const mirrorAbi = []

const polygonERC20Addr = '0x94576423d85b47575BBA515a1F328A265e6318e6' //polygon mainnet 
const polygonERC20Abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEPOSITOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name_","type":"string"}],"name":"changeName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes","name":"depositData","type":"bytes"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getDomainSeperator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"address","name":"childChainManager","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"transferBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
//const vaultNetwork = 'rinkeby'
const vaultNetwork = 'mainnet'
const mirrorNetwork = 'matic' //Polygon mainnet
//const mirrorNetwork = 'maticmum' //Polygon testnet
const infuraId =  process.env.INFURA_API_KEY
const alchemyId = process.env.ALCHEMY_API_KEY

const defaultPath = "m/44'/60'/0'/0/0"
const currentPath = "m/44'/60'/0'/0/1"


let vaultProvider
let vaultWallet
let vaultContract

let mirrorProvider
let mirrorWallet
let mirrorContract
let polygonERC20

//let vaultStart = 9589355 //rinkeby
//let vaultStart = 13555663 //mainnet 

let deployedBlock = {
  'vault': 13555663,  //mainnet
  'mirror': 13555663  //mumbai
}

const getContract = async () => {

  vaultProvider = ethers.getDefaultProvider('https://public-node-api.klaytnapi.com/v1/cypress')
  let  rawWallet = ethers.Wallet.fromMnemonic(readMnemonic(), currentPath)
  //vaultWallet = rawWallet.connect(vaultProvider)
  vaultContract = new ethers.Contract(vaultAddr, vaultAbi, vaultProvider)
  mirrorProvider = new ethers.providers.AlchemyProvider(mirrorNetwork, alchemyId);
  //mirrorProvider = new ethers.providers.AlchemyProvider.getWebSocketProvider(mirrorNetwork, alchemyId)
  mirrorWallet = rawWallet.connect(mirrorProvider)
  //mirrorContract = new ethers.Contract(mirrorAddr, mirrorAbi, mirrorWallet)
  polygonERC20 = new ethers.Contract(polygonERC20Addr, polygonERC20Abi, mirrorWallet)
  return vaultProvider, vaultWallet, vaultContract, mirrorProvider, mirrorWallet, polygonERC20
}

(async () => {
  try {
    await getContract()
  } catch (err) {
  }
})();

const download = async (target) => {
  //target = 'vault' or 'mirror'
  let provider   
  let contract 

  let startBlock = db.get(target + '-last-block')
  if (!startBlock) startBlock = deployedBlock[target]
  if (target == 'vault') {
    provider = vaultProvider
    contract = vaultContract
  } else {
    provider = mirrorProvider
    contract = mirrorContract
  }
  let endBlock = await provider.getBlockNumber()
  let allTokens = db.get(target + '-allTokens') || {}
  let records = await contract.queryFilter('Transfer', startBlock, endBlock)

  records.forEach((r, i) => {
    let tokenId = r.args.tokenId.toNumber()
    let from = r.args.from
    let to = r.args.to
    let tokenKey = target + '-token-' + tokenId
    let addressKey = target + '-address-' + to
    let addressKeyFrom = target + '-address-' + from
    let currentSetTo = new Set(db.get(addressKey) || [])
    let currentSetFrom = new Set(db.get(addressKeyFrom) || [])

    if (from == '0x0000000000000000000000000000000000000000') {
      db.put(tokenKey, to)
      currentSetTo.add(tokenId)
      db.put(addressKey, Array.from(currentSetTo.values()).sort())
      allTokens[tokenId] = to
    } else if (to == '0x0000000000000000000000000000000000000000') {
      db.put(tokenKey, to)
      currentSetTo.delete(tokenId)
      db.put(addressKey, Array.from(currentSetTo.values()).sort())
      delete allTokens[tokenId]
    } else {
      db.put(tokenKey, to)
      currentSetTo.add(tokenId)
      currentSetFrom.delete(tokenId)
      db.put(addressKey, Array.from(currentSetTo.values()).sort())
      db.put(addressKeyFrom, Array.from(currentSetFrom.values()).sort())
      allTokens[tokenId] = to      
    }
    console.log('finished ' + i)
  })
  db.put(target + '-allTokens', allTokens)
  db.put(target + '-last-block', endBlock)
}

const getArraySet = (target, start, end) => {
  let allList = Object.entries(target)
  if (!end) end = allList.length
  let tokendIds = []
  let addrs = []
  for (let i=start; i < end; i++) {
    tokendIds.push(allList[i][0])
    addrs.push(allList[i][1])
  }
  return { tokendIds, addrs }
}

const uploadMirror = async (start, end) => {
  //until synced, no updates on vault data requred
  if(!start) start = (await mirrorContract.totalSupply()).toNumber()
  if(!end) {
    let allTokens = db.get('vault-allTokens')
    end = Object.keys(allTokens).length
  }
  let batch = 200
  for (let i = start; i < end; i += batch) {
    let batchEnd = i + batch
    if (batchEnd > end) batchEnd = end
    let vaultTokens = db.get('vault-allTokens')
    let { tokendIds, addrs } = getArraySet(vaultTokens, i, batchEnd)
    await mirrorContract.add(tokendIds, addrs)
    console.log('finished...' + batchEnd)
  }
}

const getHash = (target) => {
  let allTokens = db.get(target +'-allTokens')
  return ethers.utils.id(JSON.stringify(allTokens))
}

const diff = () => {
  adds = {}
  transfers = {}
  removes = []
  let vaultTokens = db.get('vault-allTokens')
  let vaultList = Object.entries(vaultTokens)
  let MirrorTokens = db.get('mirror-allTokens')
  for(let i=0; i<vaultList.length; i++) {
    let tokenId = vaultList[i][0]
    if(vaultList[i][1] != MirrorTokens[tokenId]) {
      if(MirrorTokens[tokenId]) {
        transfers[tokenId] = [MirrorTokens[tokenId], vaultList[i][1]]
      } else {
        adds[tokenId] = vaultList[i][1]
      }
    }
    delete MirrorTokens[tokenId]
  }
  removes = Object.keys(MirrorTokens)
  return { adds, transfers, removes }
}

const resync = async () => {
  let { adds, transfers, removes } = diff()
  //adds
  let end = Object.keys(adds).length 
  if(end > 0) {
    let batch = 100
    for (let i = 0; i < end; i += batch) {
      let batchEnd = i + batch
      if (batchEnd > end) batchEnd = end
      //let vaultTokens = db.get('vault-allTokens')
      let { tokendIds, addrs } = getArraySet(adds, i, batchEnd)

      let gasData = await mirrorWallet.getFeeData()   
      let maxPriorityFeePerGas = gasData.maxPriorityFeePerGas.add(ethers.utils.parseUnits("5", "gwei"))
      let maxFeePerGas = gasData.maxFeePerGas.add(ethers.utils.parseUnits("50", "gwei"))
      let options = { maxPriorityFeePerGas, maxFeePerGas }
      await mirrorContract.add(tokendIds, addrs, options)
      console.log('finished...' + batchEnd)
    }
  }
  //transfers
  let transferIds = Object.keys(transfers)
  if(transferIds.length > 0) {
    let values = Object.values(transfers)
    let froms = []
    let tos = []
    for (let j=0; j < values.length; j++) {
      froms.push(values[j][0])
      tos.push(values[j][1])
    }
    let gasData = await mirrorWallet.getFeeData()   
    let maxPriorityFeePerGas = gasData.maxPriorityFeePerGas.add(ethers.utils.parseUnits("5", "gwei"))
    let maxFeePerGas = gasData.maxFeePerGas.add(ethers.utils.parseUnits("50", "gwei"))
    let options = { maxPriorityFeePerGas, maxFeePerGas }    
    await mirrorContract.bulkTransfer(froms, tos, transferIds, options)
    console.log('finished bulkTransfer...')
  }    
  //removes
  await download('mirror')  
}


const saveSnapshot = async () => {
  const count = (await vaultContract.totalSupply()).toNumber()
  const holdersKey = 'snapshot1-holders'
  const tokensKey = 'snapshot1-tokens'
  let holders = {}
  let tokens = {}
  for(let i=1; i<=count; i++) {
    let owner = await vaultContract.ownerOf(i)
    tokens[i] = owner
    if(holders[owner]) {
      holders[owner] += 1
    } else {
      holders[owner] = 1
    }
    if (i % 10 === 0) {
      console.log('finished..' + i)
    }   
  }
  db.put(holdersKey, holders)
  db.put(tokensKey, tokens)
}

const airdrop = async (data, start, end) => {
  let allList = Object.entries(data)
  if (!end) end = allList.length
  let addrs = []
  let qtys = []
  for (let i=start; i < end; i++) {
    addrs.push(allList[i][0])
    qtys.push(ethers.utils.parseEther((allList[i][1]*100).toString()).toString())
  }

  let gasData = await mirrorWallet.getFeeData()   
  let maxPriorityFeePerGas = gasData.maxPriorityFeePerGas.add(ethers.utils.parseUnits("30", "gwei"))
  let maxFeePerGas = gasData.maxFeePerGas.add(ethers.utils.parseUnits("50", "gwei"))
  let options = { maxPriorityFeePerGas, maxFeePerGas }    
  let receipt = await polygonERC20.transferBatch(addrs, qtys, options)  
  return receipt
}


module.exports = { download, getHash, vaultProvider, vaultWallet, vaultContract, mirrorProvider, mirrorWallet, mirrorContract }