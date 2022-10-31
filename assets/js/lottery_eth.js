var web3;
var spend;
var currentAddr = '';
var contract;
var tokenContract;

const minerAddress = '0x171e2C6052f82d28cdD23dFae0370D62332ada1a'; //testnet
const tokenAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'; //testnet

const minersAbi = 
	[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"investor","type":"address"},{"indexed":false,"internalType":"uint256","name":"pot","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"round","type":"uint256"}],"name":"LotteryWinner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"drawWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ticketCount","type":"uint256"}],"name":"gamble","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getLotteryHistory","outputs":[{"internalType":"uint256","name":"round","type":"uint256"},{"internalType":"address","name":"winnerAddress","type":"address"},{"internalType":"uint256","name":"pot","type":"uint256"},{"internalType":"uint256","name":"totalLotteryParticipants","type":"uint256"},{"internalType":"uint256","name":"totalLotteryTickets","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLotteryHistorySize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLotteryInfo","outputs":[{"internalType":"uint256","name":"lotteryStartTime","type":"uint256"},{"internalType":"uint256","name":"lotteryStep","type":"uint256"},{"internalType":"uint256","name":"lotteryCurrentPot","type":"uint256"},{"internalType":"uint256","name":"lotteryParticipants","type":"uint256"},{"internalType":"uint256","name":"totalLotteryTickets","type":"uint256"},{"internalType":"uint256","name":"lotteryTicketPrice","type":"uint256"},{"internalType":"uint256","name":"maxLotteryTicket","type":"uint256"},{"internalType":"uint256","name":"lotteryPercent","type":"uint256"},{"internalType":"uint256","name":"round","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSiteInfo","outputs":[{"internalType":"uint256","name":"_totalEntries","type":"uint256"},{"internalType":"uint256","name":"_totalLotteryBonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTimeStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_adr","type":"address"}],"name":"getUserLotteryInfo","outputs":[{"internalType":"uint256","name":"userTotalEntries","type":"uint256"},{"internalType":"uint256","name":"userTotalLotteryBonus","type":"uint256"},{"internalType":"uint256","name":"userCurrentRewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"}],"name":"getUserTickets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"launch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"step","type":"uint256"}],"name":"setLotteryTimeStep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"switchLotteryEventStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"ticketOwners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"userTotalEntries","type":"uint256"},{"internalType":"uint256","name":"currentRewards","type":"uint256"},{"internalType":"uint256","name":"totalLotteryBonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawRewards","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const tokenAbi =
    [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

    // ------ contract calls

function loadContracts() {
    console.log('Loading contracts...')
    web3 = window.web3
    contract = new web3.eth.Contract(minersAbi, minerAddress);
    tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
    console.log('Done loading contracts.')
}

async function connect() {
    console.log('Connecting to wallet...')
    try {
        var accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length == 0) {
            console.log('Please connect to MetaMask.');
            $('#enableMetamask').html('Connect')
        } else if (accounts[0] !== currentAddr) {
            currentAddr = accounts[0];
            if (currentAddr !== null) {
                console.log('Wallet connected = '+ currentAddr.replace(currentAddr.substring(4, 39), "****"))

                loadContracts()
                refreshData()

                let shortenedAccount = currentAddr.replace(currentAddr.substring(4, 39), "****")
                $('#enableMetamask').html(shortenedAccount)
            }
            $('#enableMetamask').attr('disabled', true)
        }
    } catch (err) {
        if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert('Please connect to MetaMask.');
        } else {
            console.error(err);
        }
        $('#enableMetamask').attr('disabled', false)
    }
}

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        $('#enableMetamask').attr('disabled', false)
        if (window.ethereum.selectedAddress !== null) {
            await connect();
                setTimeout(function () {
                controlLoop()
                controlLoopFaster()
            }, 1000)
        }
    } else {
        $('#enableMetamask').attr('disabled', true)
    }
}

window.addEventListener('load', function () {
    setStartTimer();
    loadWeb3()
})

$('#enableMetamask').click(function () {
    connect()
});

function controlLoop() {
    refreshData()
    setTimeout(controlLoop, 25000)
}

function controlLoopFaster() {
    setTimeout(controlLoopFaster, 30)
}

function roundNum(num) {
    if (num == 0) { return 0};
    if (num < 1) {
        return parseFloat(num).toFixed(4)
    }
    return parseFloat(parseFloat(num).toFixed(2));
}

function refreshData() {
    console.log('Refreshing data...')
    if(!contract || !contract.methods){
    	console.log('contract is not yet loaded.')
	loadContracts()    
    }	

    tokenContract.methods.balanceOf(currentAddr).call().then(userBalance => {
        $('#user-balance').html(stripDecimals(numberWithCommas(Number(web3.utils.fromWei(userBalance)).toFixed(2)), 2))
    }).catch((err) => {
        console.log(err)
    });

    tokenContract.methods.allowance(currentAddr, minerAddress).call().then(result => {
        spend = web3.utils.fromWei(result)
        if (spend > 0) {
            $('#user-approved-spend').html(stripDecimals(numberWithCommas(Number(spend).toFixed(2)), 2));
        }
    }).catch((err) => {
        console.log(err)
    });

    contract.methods.getSiteInfo().call().then(result => {
        $('#total-entries').html(result._totalEntries);
        var bonusRewards = web3.utils.fromWei(result._totalLotteryBonus);
        $('#total-rewards').html(roundNum(bonusRewards));
    }).catch((err) => {
        console.log(err);
    });

    contract.methods.users(currentAddr).call().then(result => {
        //var entries = user.userTotalEntries;
        var bonus = result.totalLotteryBonus;
        var currentBonus = result.currentRewards;
        //$("#user-total-entries").html(entries);
        $('#user-total-bonus').html(stripDecimals(numberWithCommas(Number(web3.utils.fromWei(bonus)).toFixed(2)), 2));
        $('#user-current-bonus').html(stripDecimals(numberWithCommas(Number(web3.utils.fromWei(currentBonus)).toFixed(2)), 2));
    }).catch((err) => {
        console.log(err);
    });

    contract.methods.getLotteryInfo().call().then(result => {
        var round = result.round;
        if (round) {
            $("#lottery-round").text(`${(+round+1)}`);
            contract.methods.ticketOwners(round, currentAddr).call().then(numTix => {
                if (numTix && numTix > 0) {
                    var totalTickets = result.totalLotteryTickets;
                    $("#user-winning-chance").html(`${(numTix / totalTickets * 100).toFixed(2)}`);
                    $("#user-tickets").html(numTix);
                }
            }).catch((err) => {
                console.log(err)
            });
            if (round >= 1) {
                contract.methods.getLotteryHistorySize().call().then(result => {
                    contract.methods.getLotteryHistory(result - 1).call().then(winner => {
                        var winnerAddress = winner.winnerAddress;
                        let shortenedAddr = winnerAddress.replace(winnerAddress.substring(4, 39), "****")
                        var amount = winner.pot;
                        var prevPotBUSD = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(amount)).toFixed(2)), 2);
                        var prevRound = winner.round;
                        $("#previous-winner").html(shortenedAddr.toLowerCase());
                        $("#previous-round").html(+prevRound + +1);
                        $("#previous-tickets").html(winner.totalLotteryTickets);
                        $("#previous-participants").html(winner.totalLotteryParticipants);
                        $("#previous-pot-busd").html(prevPotBUSD);
                    }).catch((err) => {
                        console.log(err)
                    });            
                }).catch((err) => {
                    console.log(err)
                }); 
            }
        }
        var participants = result.lotteryParticipants;
        $("#round-participants").html(participants);
        var tickets = result.totalLotteryTickets;
        $("#round-tickets").html(tickets);
        var currentPot = result.lotteryCurrentPot;
        $("#lottery-pot").html(stripDecimals(numberWithCommas(Number(web3.utils.fromWei(currentPot)).toFixed(2)), 2));
    }).catch((err) => {
        console.log(err)
    });
    setLotteryTimer();
    console.log('Done refreshing data...')
}



let j;
function setLotteryTimer(){
    contract.methods.getLotteryInfo().call().then(result => {
        var start = result.lotteryStartTime;
        var time = new Date().getTime();
        var cutoff = (+start + +86400) - (+time/1000);
        var countDownDate = new Date(+time + +cutoff * 1000).getTime();

        clearInterval(j)
        j = setInterval(function() {
            var currentTime = new Date().getTime();
            var distance = countDownDate - currentTime;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + days*24);
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (hours < 10) { hours = '0' + hours; }
            if (minutes < 10) { minutes = '0' + minutes; }
            if (seconds < 10) { seconds = '0' + seconds; }

            $("#lottery-timer").html(`<strong> ${hours} H : ${minutes} M : ${seconds} S</strong>`);

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(j);
                $("#lottery-timer").html("<span> 00 H : 00 M : 00 S</span>");
            }
        }, 1000, 1);
    }).catch((err) => {
        console.log(err)
    });
}

var startTimeInterval;
function setStartTimer() {
    var endDate = new Date('October 18, 2022 9:00 EST').getTime();

    clearInterval(startTimeInterval)
    startTimeInterval = setInterval(function() {
        var currTime = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = endDate - currTime;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
	    if (days < 10) { days = '0' + days; }
        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }

        $("#start-timer").html(` LAUNCHES IN ${days} D : ${hours} H : ${minutes} M : ${seconds} S`);

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(startTimeInterval);
            $("#start-container").remove();
            refreshData()
        }
    }, 1000, 1);
}

function approve(_amount) {
    let amt;
    if (_amount != 0) {
        amt = +spend + +_amount;
    }
    else {
        amt = 0
    }
    let _spend = web3.utils.toWei(amt.toString())
    tokenContract.methods.approve(minerAddress, _spend).send({ from: currentAddr }).then(result => {
        if (result) {
            refreshData();
        }

    }).catch((err)=> {
        console.log(err)
    });
}

function approveMiner() {
    let spendDoc = document.getElementById("eth-to-spend1");
    let _amount = spendDoc.value;
    approve(_amount);
}

function buyTickets() {
    let spendDoc = document.getElementById("eth-to-spend1");
    contract.methods.gamble(spendDoc.value).send({ from: currentAddr }).then(result => {
        refreshData()
    }).catch((err) => {
        console.log(err)
    });
}

function stake(){
    console.log('Stake');
    contract.methods.stakeRewards().send({ from: currentAddr }).then(result => {
        refreshData()
    }).catch((err) => {
        console.log(err)
    });
    setTimeout(function(){
        canSell = true;
    },10000);
}

function withdraw(){
    console.log('Withdraw');
    contract.methods.withdrawRewards().send({ from: currentAddr }).then(result => {
        refreshData()
    }).catch((err) => {
        console.log(err)
    });
    setTimeout(function(){
        canSell = true;
    },10000);
}

function readableBUSD(amount, decimals) {
    return (amount / 1e18).toFixed(decimals);
  }


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function stripDecimals(str, num) {
    if (str.indexOf('.') > -1) {
        var left = str.split('.')[0];
        var right = str.split('.')[1];
        return left + '.' + right.slice(0, num);
    }
    else {
        return str;
    }
}
