var Web3 = require('web3')
var EthereumTransaction = require("ethereumjs-tx")
var url = 'HTTP://127.0.0.1:7545'

var web3 = new Web3(url)
web3.eth.getAccounts().then(accounts => console.log(accounts));


var sendingAddress = '0xE23C33a00547a0D359608b1A9C5BA994A2ace219'
var receivingAddress = '0xBb7845F08964feaB0Bd06a3AE0407422A1617fd5'

web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

//Set up the transaction using the transaction variables as shown 
var rawTransaction = {
 	nonce: 2,
  to: receivingAddress,
  gasPrice: 20000000,
  gasLimit: 30000,
  value: 100,
  data: ""
 }


/*##########################
Sign the Transaction
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender 
var privateKeySender = 'fa364eb1697d2e15aed7a771895927e0d9e798089b510976c5b5b82fb2b29cfa' 
var privateKeySenderHex = new Buffer(privateKeySender, 'hex') 
var transaction = new EthereumTransaction(rawTransaction) 
transaction.sign(privateKeySenderHex)

/*#########################################
Send the transaction to the network
#########################################*/
var serializedTransaction = transaction.serialize(); 

// Getting error
// web3.eth.sendSignedTransaction(serializedTransaction)

// Getting error
// web3.eth.sendSignedTransaction(serializedTransaction).catch(error => { console.log(`An error occurred processing the transaction: ${error}`); })

// Working fine
web3.eth.sendSignedTransaction(serializedTransaction,function(error,result){
 if(error){
    console.log(error)
 }
 else{
    console.log(result)
 }
})

