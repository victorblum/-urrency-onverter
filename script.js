//Конвертация запятой/менять type text
//Смена валют
//Функция в функции

//Стрелки нужны?
//Footer
//Подсвечивать изменение курса валют

const clientCurrency = document.getElementsByClassName('buttonClientCur');
const bankCurrency = document.getElementsByClassName('buttonBankCur');
const activeClient = document.querySelector(".activeClientCur");
const activeBank = document.querySelector(".activeBankCur");

const clientCourse = document.getElementById('clientCrossCourse');
const bankCourse = document.getElementById('bankCrossCourse');
const listRUB = document.getElementById('clientRUB');
const listUSD = document.getElementById('bankUSD');

const clientInput = document.getElementById('clientValue');
const bankInput = document.getElementById('bankValue');

const modalWindow = document.querySelector('.modal');
const modalWindowClose = document.querySelector('.modal_close-button');

//Initial values
window.addEventListener('load', () => {
    let fromCurClient = activeBank.textContent;
    let toCurClient = activeClient.textContent;
    fetch(`https://api.exchangerate.host/latest?base=${fromCurClient}&symbols=${toCurClient}`)
    .then(res => res.json())
    .then(data => {
    clientCourse.innerText = `${clientInput.value} ${toCurClient} = ${(clientInput.value / data.rates[toCurClient]).toFixed(2)} ${fromCurClient}`;
    bankInput.value = (clientInput.value/data.rates[toCurClient]).toFixed(2);
    const result = +bankInput.value;
});
    let fromCurBank = activeClient.textContent;
    let toCurBank = activeBank.textContent;
    fetch(`https://api.exchangerate.host/latest?base=${fromCurBank}&symbols=${toCurBank}`)
    .then(res => res.json())
    .then(data => {
    bankCourse.innerText = `${clientInput.value} ${toCurBank} = ${(1 / data.rates[toCurBank]).toFixed(2)} ${fromCurBank}`;
    })
    client();
    bank();
})

//Currency selection
let clientCurСhoice = activeClient.textContent;
let bankCurСhoice = activeBank.textContent;

function client () {
    for (let i = 0; i < clientCurrency.length; i++) {
        const activeClient = document.getElementsByClassName("activeClientCur");
        clientCurrency[i].addEventListener("click", function() {
            activeClient[0].className = activeClient[0].className.replace(" activeClientCur", "");
            this.className += " activeClientCur";
            clientCurСhoice = activeClient[0].getAttribute("data-currency");
            conversionClientToBank();
        });
    }
}
function bank () {
    for (let i = 0; i < bankCurrency.length; i++) {
        const activeBank = document.getElementsByClassName("activeBankCur");
        bankCurrency[i].addEventListener("click", function() {
            activeBank[0].className = activeBank[0].className.replace(" activeBankCur", "");
            this.className += " activeBankCur";
            bankCurСhoice = activeBank[0].getAttribute("data-currency");
            conversionClientToBank();
        });
    }
}

//Data request and currency conversion
clientInput.oninput = function() {
    if (this.value.length > 10) {
        this.value = this.value.slice(0,10);
    }
    setTimeout(() => {
        conversionClientToBank();
      }, 500)
}
bankInput.oninput = function() {
    if (this.value.length > 10) {
        this.value = this.value.slice(0,10); 
    }
    setTimeout(() => {
        conversionBankToClient();
      }, 500)
}

function conversionClientToBank() {
        if(clientCurСhoice === bankCurСhoice) {
            clientCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
            bankCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
            bankInput.value = clientInput.value;
            return
        } fetch(`https://api.exchangerate.host/latest?base=${bankCurСhoice}&symbols=${clientCurСhoice}`)
        .then(res => res.json())
        .then(data => {
            result = data.rates[clientCurСhoice];
            clientToBank(result);
        })
        .catch((err) => errorWindow(err))
}   
function clientToBank(result) {
    clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / result).toFixed(2)} ${bankCurСhoice}`;
    bankCourse.innerText = `1 ${bankCurСhoice} = ${result.toFixed(2)} ${clientCurСhoice}`;
    bankInput.value = (clientInput.value / result).toFixed(2);
    const res = +bankInput.value;
}

function conversionBankToClient() {
    if(bankCurСhoice === clientCurСhoice) {
        clientCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        clientInput.value = bankInput.value;
        return
    }
    fetch(`https://api.exchangerate.host/latest?base=${clientCurСhoice}&symbols=${bankCurСhoice}`)
    .then(res => res.json())
    .then(data => {
        result = data.rates[bankCurСhoice];
        bankToClient(result);
    })
    .catch((err) => errorWindow(err))
}
function bankToClient(result) {
    clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / result).toFixed(2)} ${bankCurСhoice}`;
    bankCourse.innerText = `1 ${bankCurСhoice} = ${result.toFixed(2)} ${clientCurСhoice}`;
    clientInput.value = (bankInput.value / result).toFixed(2);
    const res = +clientInput.value;
}

function errorWindow (err) {
    modalWindow.classList.add('modal_active');
    modalWindowClose.onclick = function () {
        modalWindow.classList.remove('modal_active');
    };
    console.log(err);
}