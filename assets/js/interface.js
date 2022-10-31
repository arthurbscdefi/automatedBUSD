var currentAddr = '';
var minerAddr = '0x966E4eB004e963c4b890E44F4ADA5D05b5c33709'; //testnet
//var minerAddr = '0x219Db24F59B7e4F4AeDCD88e43D36c5B791c489B'; //mainnet
var minersAddr = '0xb340B99f1f5Ece1b11f0D13262FD705f268e0C5E'; //testnet
//var minersAddr = '0x219Db24F59B7e4F4AeDCD88e43D36c5B791c489B'; //mainnet
var tokenAddr = '0xc46CCBE42Afdf64cc4DA7e56DCd60eE9bF1B743B'; //testnet
//var tokenAddr = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'; //mainnet

var minersAbi = 
	[{"inputs":[{"internalType":"address","name":"dev","type":"address"},{"internalType":"address","name":"part","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"round","type":"uint256"},{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"LastBuyPayout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RefBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Reinvested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"round","type":"uint256"},{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"TopDepositPayout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawnInitial","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"drawLastDepositWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractInfo","outputs":[{"internalType":"uint256","name":"totalUsers","type":"uint256"},{"internalType":"uint256","name":"launched","type":"uint256"},{"internalType":"uint256","name":"userCompounds","type":"uint256"},{"internalType":"uint256","name":"totalDeposited","type":"uint256"},{"internalType":"uint256","name":"totalCompounded","type":"uint256"},{"internalType":"uint256","name":"totalWithdrawn","type":"uint256"},{"internalType":"uint256","name":"totalReferrals","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getUserAmountOfDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getUserDepositInfo","outputs":[{"internalType":"uint256","name":"depoKey","type":"uint256"},{"internalType":"uint256","name":"depositTime","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"withdrawn","type":"bool"},{"internalType":"uint256","name":"requestTime","type":"uint256"},{"internalType":"bool","name":"requested","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"totalInvested","type":"uint256"},{"internalType":"uint256","name":"totalCompounded","type":"uint256"},{"internalType":"uint256","name":"totalWithdrawn","type":"uint256"},{"internalType":"uint256","name":"totalBonus","type":"uint256"},{"internalType":"uint256","name":"totalActiveStakes","type":"uint256"},{"internalType":"uint256","name":"totalStakesMade","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getUserTotalDeposits","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"invest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastDepositInfo","outputs":[{"internalType":"uint256","name":"currentRound","type":"uint256"},{"internalType":"uint256","name":"currentBalance","type":"uint256"},{"internalType":"uint256","name":"currentStartTime","type":"uint256"},{"internalType":"uint256","name":"currentStep","type":"uint256"},{"internalType":"address","name":"currentPotentialWinner","type":"address"},{"internalType":"uint256","name":"previousReward","type":"uint256"},{"internalType":"address","name":"previousWinner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"launch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"key","type":"uint256"}],"name":"requestWithdrawInitial","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sellTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"switchLastDepositEventStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"switchTopDepositEventStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"topDepositInfo","outputs":[{"internalType":"uint256","name":"topDepositRound","type":"uint256"},{"internalType":"uint256","name":"topDepositCurrentTopDeposit","type":"uint256"},{"internalType":"address","name":"topDepositCurrentPotentialWinner","type":"address"},{"internalType":"uint256","name":"topDepositCurrentBalance","type":"uint256"},{"internalType":"uint256","name":"topDepositCurrentStartTime","type":"uint256"},{"internalType":"uint256","name":"topDepositCurrentStep","type":"uint256"},{"internalType":"uint256","name":"topDepositPreviousReward","type":"uint256"},{"internalType":"address","name":"topDepositPreviousWinner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"startDate","type":"uint256"},{"internalType":"uint256","name":"divs","type":"uint256"},{"internalType":"uint256","name":"refBonus","type":"uint256"},{"internalType":"uint256","name":"totalInvested","type":"uint256"},{"internalType":"uint256","name":"totalWithdrawn","type":"uint256"},{"internalType":"uint256","name":"totalCompounded","type":"uint256"},{"internalType":"uint256","name":"lastWith","type":"uint256"},{"internalType":"uint256","name":"timesCmpd","type":"uint256"},{"internalType":"uint256","name":"keyCounter","type":"uint256"},{"internalType":"uint256","name":"activeStakesCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[{"internalType":"uint256","name":"withdrawAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"key","type":"uint256"}],"name":"withdrawInitial","outputs":[],"stateMutability":"nonpayable","type":"function"}]

var tokenAbi =
	[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]


function spendLimit(callback) {
	tokenContract.methods.allowance(currentAddr,minersAddr).call().then(result => {
		  callback(web3.utils.fromWei(result));
	  }).catch((err) => {
		  console.log(err)
	  });
}
  
function userBalance(callback){
    tokenContract.methods.balanceOf(currentAddr).call().then(result => {
        callback(web3.utils.fromWei(result));
    }).catch((err) => {
        console.log(err)
    });
}

function contractBalance(callback){
	tokenContract.methods.balanceOf(minersAddr).call().then(result => {
        callback(web3.utils.fromWei(result));
    }).catch((err) => {
        console.log(err)
    });
}

function userAvailable(callback){
    minersContract.methods.getUserDividends(currentAddr).call().then(result => {
			  var amt = web3.utils.fromWei(result)
        callback(amt);
    }).catch((err) => {
        console.log(err)
    });
}

function userAmountOfDeposits(callback){
    minersContract.methods.getUserAmountOfDeposits(currentAddr).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function userInfo(callback){
    minersContract.methods.getUserInfo(currentAddr).call().then(result => {
        callback(result);
    }).catch((err) => {
        console.log(err)
    });
}

function getUserDeposits(callback){
	userAmountOfDeposits((result) => {
		if (result && result > 0) {
			const promises = []
			for (let i=0; i<result; i++) {
				promises.push(minersContract.methods.getUserDepositInfo(currentAddr, i).call())
			}
			Promise.all(promises).then(deposits => {
				callback(deposits)
			})
		} else {
			callback([])
		}
	})
}

function getLastDepositInfo(callback){
	minersContract.methods.lastDepositInfo().call().then(result => {
		callback(result)
	}).catch((err) => {
        console.log(err)
    });
}

function getTopDepositInfo(callback){
	minersContract.methods.topDepositInfo().call().then(result => {
		callback(result)
	}).catch((err) => {
        console.log(err)
    });
}

function getContractInfo(callback){
	minersContract.methods.getContractInfo().call().then(result => {
		callback(result)
	}).catch((err) => {
        console.log(err)
    });
}

function withdraw(){
	console.log('Selling Dividends..');
	minersContract.methods.withdraw().send({from:currentAddr})
	.catch((err) => {
		console.log(err)
	});
}

function reinvest(){
	console.log('Approving BUSD Spend Limit..');
	minersContract.methods.reinvest().send({from:currentAddr})
	.catch((err) => {
		console.log(err)
	});
}

function investReferral(){
	console.log('Investing Referrals..');
	minersContract.methods.investRefBonus().send({from:currentAddr})
	.catch((err) => {
		console.log(err)
	});
}

function investNow(ref, trx) {
	console.log('Investing..');
	minersContract.methods.invest(ref, web3.utils.toWei(trx))
		.send({ from: currentAddr })
		.catch((err) => {
			console.log(err)
		});
}

function requestWithdrawInitialDeposit(trx) {
	console.log('Request Withdraw Initial Stakes..');
	minersContract.methods.requestWithdrawInitial(trx)
		.send({ from: currentAddr })
		.catch((err) => {
			console.log(err)
		});
}

function withdrawInitialDeposit(trx) {
	console.log('Withdrawing Initial Stakes..');
	minersContract.methods.withdrawInitial(trx)
		.send({ from: currentAddr })
		.catch((err) => {
			console.log(err)
		});
}

function approveBUSD(amount) {
	console.log('Approving BUSD Spend Limit..');
	let spend = web3.utils.toWei(amount)
	tokenContract.methods.approve(minersAddr, spend).send({from: currentAddr});
}
