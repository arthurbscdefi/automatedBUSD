window.addEventListener('load', function () {
    setStartTimer();
    loadWeb3()
})

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        if (window.ethereum.selectedAddress !== null) {
            await connect();
                setTimeout(function () {
                controlLoop()
            }, 1000)
        }
    }
}

async function connect() {
    console.log('Connecting to metamask..')
    try {
        var accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length == 0) {
            console.log('Please connect to metamask..');
        } else if (accounts[0] !== currentAddr) {
            loginActions(accounts);
        }
    } catch (err) {
        if (err.code === 4001) {
            alert('Please connect to metamask..');
        } else {
            console.error(err);
        }
    }
}

function loginActions(accounts) {
    currentAddr = accounts[0];
    if (currentAddr !== null) {

        loadContracts();
        controlLoop();
        let shortenedAccount = currentAddr.replace(currentAddr.substring(4, 39), "****");
        console.log('Wallet Address ' + shortenedAccount + ' connected successfully..');
        var walletAddress = document.getElementById('user-address');
        var walletAddress2 = document.getElementById('user-address2');
        rawStr = shortenedAccount;
        walletAddress.textContent = rawStr;
        walletAddress2.textContent = rawStr;
    }
}

function loadContracts() {
    console.log('Loading contracts..')
    web3 = window.web3
    minersContract = new web3.eth.Contract(minersAbi, minersAddr)
    tokenContract = new web3.eth.Contract(tokenAbi, tokenAddr)
    console.log('Contracts loaded successfully..')
}

async function myConnect(){
    var element = document.getElementById("dotting");
    element.classList.toggle("dot");
}

function connectWallet() {
    connect()
}

function controlLoop() {
    refreshAllData();
    setTimeout(controlLoop, 30000);
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

function populateContractBalance() {

    var balanceElem = document.getElementById('contract-balance');

    contractBalance(function (result) {
        balanceElem.textContent = stripDecimals(numberWithCommas(Number(result).toFixed(2)), 2);
    });
}

function populateUserAvailable() {

    var userAvailableElem = document.getElementById('user-available');

    userAvailable(function (result) {
        userAvailableElem.textContent = stripDecimals(Number(result).toFixed(3), 2);
    });
}

function populateUserInfo() {

    var userTotalReferralElem = document.getElementById('user-referral-total-bonus');
    var userTotalDepositElem = document.getElementById('user-total-deposits');
    var userTotalCompoundElem = document.getElementById('user-total-compounds');
    var userTotalWithdrawElem = document.getElementById('user-total-withdrawn');
    var userTotalActiveStakesElem = document.getElementById('user-total-stakes');

    userInfo(function (result) {
        userTotalReferralElem.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.totalBonus)).toFixed(2)), 2);
        userTotalDepositElem.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.totalInvested)).toFixed(2)), 2);
        userTotalCompoundElem.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.totalCompounded)).toFixed(2)), 2);
        userTotalWithdrawElem.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.totalWithdrawn)).toFixed(2)), 2);
        userTotalActiveStakesElem.textContent = Number(result.totalActiveStakes);
    });
}

function populateSpendLimit() {

    var spentLimitElem = document.getElementById('spend-limit');

    spendLimit(function (result) {
        spentLimitElem.textContent = stripDecimals(numberWithCommas(Number(result).toFixed(2)), 2);
    });

}

function populateUserBalance() {

    var userBalanceElem = document.getElementById('user-balance');

    userBalance(function (result) {
        userBalanceElem.textContent = stripDecimals(numberWithCommas(Number(result).toFixed(2)), 2);
    });
}

function populateContractInfo() {

    var totalStaked = document.getElementById('total-users');
    var totalReferrals = document.getElementById('total-referrals');
    var totalAmountStaked = document.getElementById('total-deposit-amount');
    var totalAmountCompounded = document.getElementById('total-compounded-amount');
    var totalAmountWithdrawn = document.getElementById('total-withdrawn-amount');

    getContractInfo(function (result) {
        if(totalStaked) totalStaked.textContent = result.totalUsers; 
        if(totalReferrals) totalReferrals.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.totalReferrals)).toFixed(2)), 2);
        if(totalAmountStaked) totalAmountStaked.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.totalDeposited)).toFixed(2)), 2);
        if(totalAmountCompounded) totalAmountCompounded.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.totalCompounded)).toFixed(2)), 2);
        if(totalAmountWithdrawn) totalAmountWithdrawn.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.totalWithdrawn)).toFixed(2)), 2);
    });
}

function populateLastDeposit() {

    var round = document.getElementById('current-round');
    var balance = document.getElementById('current-balance');
    var addr = document.getElementById('current-winner');
    var prev = document.getElementById('previous-winner');
    var prevBalance = document.getElementById('previous-balance');

    getLastDepositInfo(function (result) {

        round.textContent = result.currentRound;
        balance.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.currentBalance)).toFixed(2)), 2);
        prevBalance.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.previousReward)).toFixed(2)), 2);
        addr.textContent = result.currentPotentialWinner.replace(result.currentPotentialWinner.substring(4, 39), "****");
        prev.textContent = result.previousWinner.replace(result.previousWinner.substring(4, 39), "****");
    });
}

function populateTopDeposit() {

    var topround = document.getElementById('top-current-round');
    var topdeposit = document.getElementById('top-current-deposit');
    var topbalance = document.getElementById('top-current-balance');
    var topaddr = document.getElementById('top-current-winner');
    var topprev = document.getElementById('top-previous-winner');
    var topprevBalance = document.getElementById('top-previous-balance');

    getTopDepositInfo(function (result) {

        topround.textContent = result.topDepositRound;
        topdeposit.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.topDepositCurrentTopDeposit)).toFixed(2)), 2);
        topbalance.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.topDepositCurrentBalance)).toFixed(2)), 2);
        topprevBalance.textContent = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(result.topDepositPreviousReward)).toFixed(2)), 2);
        topaddr.textContent = result.topDepositCurrentPotentialWinner.replace(result.topDepositCurrentPotentialWinner.substring(4, 39), "****");
        topprev.textContent = result.topDepositPreviousWinner.replace(result.topDepositPreviousWinner.substring(4, 39), "****");
    });
}

var x;
var startTimer = 0;
var stepTime = 0;
function setLastDepositTimer() {

    var lastDepositElem = document.getElementById("last-deposit-timer")

    getLastDepositInfo(function (result) {
        startTimer = result.currentStartTime;
        stepTime = result.currentStep;
    });
    var now = new Date().getTime();
    var diff = (+startTimer + +stepTime) - (+now/1000);
    var countDownDate = new Date(+now + +diff * 1000).getTime();

    clearInterval(x)
    x = setInterval(function () {
        var currTime = new Date().getTime();
        var distance = countDownDate - currTime;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + days*24);
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);


        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }

        textStr = hours + " H : " + minutes + " M : " + seconds + " S";
        if(lastDepositElem) lastDepositElem.textContent = textStr;

        if (distance < 0) {
            textStr = "00 H : 00 M : 00 S"
            if(lastDepositElem) lastDepositElem.textContent = textStr;
            clearInterval(x);
            setLastDepositTimer();
        }
    }, 1000, 1);
}

var y;
var startTimer2 = 0;
var stepTime2 = 0;
function setTopDepositTimer() {

    var topDepositElem = document.getElementById("top-deposit-timer")

    getTopDepositInfo(function (result) {
        startTimer2 = result.topDepositCurrentStartTime;
        stepTime2 = result.topDepositCurrentStep;
    });
    var curr = new Date().getTime();
    var diff = (+startTimer2 + +stepTime2) - (+curr/1000);
    var countDown = new Date(+curr + +diff * 1000).getTime();

    clearInterval(y)
    y = setInterval(function () {
        var current = new Date().getTime();
        var dist2 = countDown - current;

        var d = Math.floor(dist2 / (1000 * 60 * 60 * 24));
        var h = Math.floor((dist2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + d * 24);
        var m = Math.floor((dist2 % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((dist2 % (1000 * 60)) / 1000);

        
        if (h < 10) { h = '0' + h; }
        if (m < 10) { m = '0' + m; }
        if (s < 10) { s = '0' + s; }

        textStr2 = h + " H : " + m + " M : " + s + " S";
        if(topDepositElem) topDepositElem.textContent = textStr2;

        if (dist2 < 0) {
            textStr2 = "00 H : 00 M : 00 S"
            if(topDepositElem) topDepositElem.textContent = textStr2;
            clearInterval(y);
            setTopDepositTimer();
        }
    }, 1000, 1);
}

var startTimeInterval;
function setStartTimer() {
    var startTimeElem = document.getElementById("start-timer");
    var endDate = new Date('November 3, 2022 9:00 EST').getTime();

    clearInterval(startTimeInterval)
    startTimeInterval = setInterval(function() {
        var currTime = new Date().getTime();
        var distance = endDate - currTime;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
	    if (days < 10) { days = '0' + days; }
        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }
        textStr = " " + days + " D : " + hours + " H : " + minutes + " M : " + seconds + " S";
        if(startTimeElem) startTimeElem.textContent = textStr

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(startTimeInterval);
            if(startTimeElem) startTimeElem.remove();
            setStartTimer();
        }
    }, 1000, 1);
}

function populateDepositTable() {

    var depositsTable = document.getElementById('table-deposits');
    var depositsTableBody = document.getElementById('table-deposits').getElementsByTagName('tbody')[0];
    
    if (depositsTable) {
        getUserDeposits(function (results) {

            for (var i = depositsTable.rows.length - 1; i > 0; i--) {
                depositsTable.deleteRow(i);
            }

            results.forEach(deposit => {
                var today = new Date();
                var dateStartNonLocale = new Date(deposit.depositTime * 1000);
                var dateStart = new Date(deposit.depositTime * 1000).toLocaleString();
                var diffMs = (today - dateStartNonLocale);
                var diffDays = Math.floor(diffMs / 86400000);

                var dateStartNonLocale2 = new Date(deposit.requestTime * 1000);
                var dateRequested = new Date(deposit.requestTime * 1000).toLocaleString();
                var diffMs2 = (today - dateStartNonLocale);
                var diffDays2 = Math.floor(diffMs2 / 86400000);

                const newRow = depositsTableBody.insertRow(depositsTableBody.rows.length);
                
                textStr1 = deposit.depoKey;
                //textStr2 = dateStart;
                //textStr3 = diffDays + " days";
                textStr3 = dateStart;
                textStr4 = stripDecimals(numberWithCommas(Number(web3.utils.fromWei(deposit.amount)).toFixed(2)), 2) + " BUSD";
                textStr6 = dateRequested;
                
                if(deposit.withdrawn === false)
                {
                    textStr7 = "Active"
                }
                else{
                    textStr1 = "-"
                    //textStr2 = "-"
                    textStr3 = "-"
                    textStr4 = "-"
                    textStr7 = "Inactive"
                }

                if(deposit.requested){
                    textStr5 = "Yes"
                    textStr6 = dateRequested;
                }else{
                    textStr5 = "-"
                    textStr6 = "-";
                }

                if(textStr7 === "Inactive"){
                    textStr6 = "-";
                }

                newRow.innerHTML = `
                <tr>
                    <td>${textStr1}</td>
                    <td>${textStr3}</td>
                    <td>${textStr4}</td>
                    <td>${textStr5}</td>
                    <td>${textStr6}</td>
                    <td>${textStr7}</td>
                </tr>`;
            })

            if (results && results.length > 0) {
                document.getElementById('div-deposits').style.display = 'block'
            }
        })
    }
}

function calculateEarnings() {
    var stakedAmount = document.getElementById('staked-amount');
    var stakedDays = document.getElementById('staked-days');
    var dividendsEarned = document.getElementById('dividends-earned');
    var dailyPercentage = document.getElementById('daily-percentage');
    var dailyYield = document.getElementById('daily-yield');
    var dailyRate = 2;
    var daily = stakedAmount.value * 20 / 1000;
    
    dailyPercentage.textContent = dailyRate;
    
    dailyYield.textContent = numberWithCommas(Number(daily).toFixed(2))

    var totalEarned = dailyYield.textContent * stakedDays.value;
    dividendsEarned.textContent = numberWithCommas(Number(totalEarned).toFixed(2))
}

function invest() {
    var trxspenddoc = document.getElementById('eth-to-spend1');
    let ref = getQueryVariable('ref');
    if (!web3.utils.isAddress(ref)) { ref = minerAddr }
    investNow(ref, trxspenddoc.value, function () {
        controlLoop();
    });
}

function requestWithdrawInitial() {
    var trxspenddoc = document.getElementById('deposit-key');
    requestWithdrawInitialDeposit(trxspenddoc.value, function () {
        controlLoop();
    });
}

function withdrawInitial() {
    var trxspenddoc = document.getElementById('deposit-key');
    withdrawInitialDeposit(trxspenddoc.value, function () {
        controlLoop();
    });
}

function approveMiner() {
    let spendDoc = document.getElementById("eth-to-spend1");
    let amount = spendDoc.value;
    approveBUSD(amount, function () {
        controlLoop();
    });
}

function copyRef() {
    var copyText
    copyText = window.location.origin + "/index.html?ref=" + currentAddr
    navigator.clipboard.writeText(copyText)
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function refreshAllData() {
    populateContractBalance();
    populateUserAvailable();
    populateSpendLimit();
    populateUserBalance();
    populateDepositTable();
    populateLastDeposit();
    populateTopDeposit();
    populateContractInfo();
    populateUserInfo();
    setLastDepositTimer();
    setTopDepositTimer();
    setStartTimer();
}
