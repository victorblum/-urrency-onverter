const clientCurrency = document.querySelectorAll('.client_currency p');
const bankCurrency = document.querySelectorAll('.bank_currency p');

const clientCourse = document.getElementById('clientCrossCourse');
const bankCourse = document.getElementById('bankCrossCourse');
const listRUB = document.getElementById('clientRUB');
const listUSD = document.getElementById('bankUSD');

const clientInput = document.getElementById('clientValue');
const bankInput = document.getElementById('bankValue');

//Input settings
//Ограничить количество знаков после точки
//Убрать появление запятой в конце
clientInput.oninput = function () {
    if (this.value.length > 9) {
        this.value = this.value.slice(0,9);
    }
}
bankInput.oninput = function () {
    if (this.value.length > 9) {
        this.value = this.value.slice(0,9); 
    }
}

//Initial values
//Лучший способ выделить валюту
window.addEventListener('load', () => {
    listRUB.style.background='#833AE0';
    listRUB.style.color='#FFFFFF';
    listRUB.style.border='1px solid #833AE0';
    listUSD.style.background='#833AE0';
    listUSD.style.color='#FFFFFF';
    listUSD.style.border='1px solid #833AE0';

    fetch('https://api.exchangerate.host/latest?base=USD&symbols=RUB')
    .then(res => res.json())
    .then(data => {
    clientCourse.innerText = `${clientInput.value} RUB = ${(clientInput.value / data.rates.RUB).toFixed(4)} USD`;
    bankInput.value = (clientInput.value/data.rates.RUB).toFixed(4);
    const result = +bankInput.value;
})
    fetch('https://api.exchangerate.host/latest?base=RUB&symbols=USD')
    .then(res => res.json())
    .then(data => {
    bankCourse.innerText = `${clientInput.value} USD = ${(1 / data.rates.USD).toFixed(4)} RUB`;
    })
 })

//Data request and currency conversion
//Убрать окрашивание валюты при выборе другой
//Использовать результат одной функции в другой
clientCurrency.forEach(function currency (el) {
    el.onclick = function() {
        el.style.background='#833AE0';
        el.style.color='#FFFFFF';
        el.style.border='1px solid #833AE0';
    }
});

bankCurrency.forEach(function(el) {
    el.onclick = function() {
        el.style.background='#833AE0';
        el.style.color='#FFFFFF';
        el.style.border='1px solid #833AE0';

    switch(el.textContent) {
        case 'RUB':
            clientCourse.innerText = `${clientInput.value} RUB = ${clientInput.value} RUB`;
            bankCourse.innerText = `${clientInput.value} RUB = ${clientInput.value} RUB`;
            bankInput.value = clientInput.value;
            break;
        case 'USD':
         
            fetch('https://api.exchangerate.host/latest?base=USD&symbols=RUB')
            .then(res => res.json())
            .then(data => {
                clientCourse.innerText = `${clientInput.value} RUB = ${(1 / data.rates.RUB).toFixed(4)} USD`;
                bankCourse.innerText = `1 ${el.textContent} = ${(data.rates.RUB).toFixed(4)} RUB`;
                bankInput.value = (clientInput.value/data.rates.RUB).toFixed(4);
                const result = +bankInput.value;
            })
            .catch((err) => {
                alert("API недоступен или ошибка при выполнении запроса");
                console.log(err);
            })
            break;
        
        case 'EUR':
            fetch('https://api.exchangerate.host/latest?base=EUR&symbols=RUB')
            .then(res => res.json())
            .then(data => {
                clientCourse.innerText = `${clientInput.value} RUB = ${(1 / data.rates.RUB).toFixed(4)} EUR`;
                bankCourse.innerText = `1 ${el.textContent} = ${(data.rates.RUB).toFixed(4)} RUB`;
                bankInput.value = (clientInput.value/data.rates.RUB).toFixed(4);
                const result = +bankInput.value;
            })
            .catch((err) => {
                alert("API недоступен или ошибка при выполнении запроса");
                console.log(err);
            })
            break;  
        case 'GBR':
            fetch('https://api.exchangerate.host/latest?base=GBP&symbols=RUB')
            .then(res => res.json())
            .then(data => {
                clientCourse.innerText = `${clientInput.value} RUB = ${(1 / data.rates.RUB).toFixed(4)} GBR`;
                bankCourse.innerText = `1 ${el.textContent} = ${(data.rates.RUB).toFixed(4)} RUB`;
                bankInput.value = (clientInput.value/data.rates.RUB).toFixed(4);
                const result = +bankInput.value;
            })
            .catch((err) => {
                alert("API недоступен или ошибка при выполнении запроса");
                console.log(err);
            })
            break;
    }
    }
});