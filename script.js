//Конвертация запятой
//Уменьшить количество кода

//Стрелки нужны?
//Модальное окно и footer
//Подсвечивать изменение курса валют

const clientCurrency = document.getElementsByClassName('buttonC');
const bankCurrency = document.getElementsByClassName('buttonB');

const clientCourse = document.getElementById('clientCrossCourse');
const bankCourse = document.getElementById('bankCrossCourse');
const listRUB = document.getElementById('clientRUB');
const listUSD = document.getElementById('bankUSD');

const clientInput = document.getElementById('clientValue');
const bankInput = document.getElementById('bankValue');

//Initial values
window.addEventListener('load', () => {
    fetch('https://api.exchangerate.host/latest?base=USD&symbols=RUB')
    .then(res => res.json())
    .then(data => {
    clientCourse.innerText = `${clientInput.value} RUB = ${(clientInput.value / data.rates.RUB).toFixed(2)} USD`;
    bankInput.value = (clientInput.value/data.rates.RUB).toFixed(2);
    const result = +bankInput.value;
});
    fetch('https://api.exchangerate.host/latest?base=RUB&symbols=USD')
    .then(res => res.json())
    .then(data => {
    bankCourse.innerText = `${clientInput.value} USD = ${(1 / data.rates.USD).toFixed(2)} RUB`;
    })
    client();
    bank();
})

//Currency selection
let clientCurСhoice = '';
let bankCurСhoice = '';

function client () {
    for (let i = 0; i < clientCurrency.length; i++) {
        clientCurrency[i].addEventListener("click", function() {
            const current = document.getElementsByClassName("activeC");
            current[0].className = current[0].className.replace(" activeC", "");
            this.className += " activeC";
            clientCurСhoice = current[0].textContent;
            conversion();
        });
    }
}
function bank () {
    for (let i = 0; i < bankCurrency.length; i++) {
        bankCurrency[i].addEventListener("click", function() {
            const current = document.getElementsByClassName("activeB");
            current[0].className = current[0].className.replace(" activeB", "");
            this.className += " activeB";
            bankCurСhoice = current[0].textContent;
            conversion();
        });
    }
}

//Data request and currency conversion
clientInput.oninput = function() {
    if (this.value.length > 10) {
        this.value = this.value.slice(0,10);
    }
    conversion();
}
bankInput.oninput = function() {
    if (this.value.length > 10) {
        this.value = this.value.slice(0,10); 
    }
    conversion2();
}

function conversion() {
    //Client currency RUB
    function innerDataRUB(data) {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.RUB).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.RUB).toFixed(2)} ${clientCurСhoice}`;
        bankInput.value = (clientInput.value/data.rates.RUB).toFixed(2);
        const result = +bankInput.value;
    }
    if(clientCurСhoice === 'RUB' && bankCurСhoice === 'RUB') {
        clientCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankInput.value = clientInput.value;
    } else if(clientCurСhoice === 'RUB' && bankCurСhoice === 'USD') {
    fetch('https://api.exchangerate.host/latest?base=USD&symbols=RUB')
    .then(res => res.json())
    .then(data => innerDataRUB(data))
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'RUB' && bankCurСhoice === 'EUR') {
    fetch('https://api.exchangerate.host/latest?base=EUR&symbols=RUB')
    .then(res => res.json())
    .then(data => innerDataRUB(data))
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'RUB' && bankCurСhoice === 'GBP') {
    fetch('https://api.exchangerate.host/latest?base=GBP&symbols=RUB')
    .then(res => res.json())
    .then(data => innerDataRUB(data))
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })

    //Client currency USD
    } else if (clientCurСhoice === 'USD' && bankCurСhoice === 'USD') {
        clientCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankInput.value = clientInput.value;
    } else if(clientCurСhoice === 'USD' && bankCurСhoice === 'RUB') {
    fetch('https://api.exchangerate.host/latest?base=RUB&symbols=USD')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.USD).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.USD).toFixed(2)} ${clientCurСhoice}`;
        bankInput.value = (clientInput.value/data.rates.USD).toFixed(2);
        const result = +bankInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'USD' && bankCurСhoice === 'EUR') {
    fetch('https://api.exchangerate.host/latest?base=EUR&symbols=USD')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.USD).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.USD).toFixed(2)} ${clientCurСhoice}`;
        bankInput.value = (clientInput.value/data.rates.USD).toFixed(2);
        const result = +bankInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'USD' && bankCurСhoice === 'GBP') {
    fetch('https://api.exchangerate.host/latest?base=GBP&symbols=USD')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.USD).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.USD).toFixed(2)} ${clientCurСhoice}`;
        bankInput.value = (clientInput.value/data.rates.USD).toFixed(2);
        const result = +bankInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })

    //Client currency EUR
    } else if (clientCurСhoice === 'EUR' && bankCurСhoice === 'EUR') {
        clientCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankInput.value = clientInput.value;
    } else if(clientCurСhoice === 'EUR' && bankCurСhoice === 'RUB') {
    fetch('https://api.exchangerate.host/latest?base=RUB&symbols=EUR')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.EUR).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.EUR).toFixed(2)} ${clientCurСhoice}`;
        bankInput.value = (clientInput.value/data.rates.EUR).toFixed(2);
        const result = +bankInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'EUR' && bankCurСhoice === 'USD') {
    fetch('https://api.exchangerate.host/latest?base=USD&symbols=EUR')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.EUR).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.EUR).toFixed(2)} ${clientCurСhoice}`;
        bankInput.value = (clientInput.value/data.rates.EUR).toFixed(2);
        const result = +bankInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'EUR' && bankCurСhoice === 'GBP') {
    fetch('https://api.exchangerate.host/latest?base=GBP&symbols=EUR')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.EUR).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.EUR).toFixed(2)} ${clientCurСhoice}`;
        bankInput.value = (clientInput.value/data.rates.EUR).toFixed(2);
        const result = +bankInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })

    //Client currency GBP
    } else if (clientCurСhoice === 'GBP' && bankCurСhoice === 'GBP') {
        clientCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankInput.value = clientInput.value;
    } else if(clientCurСhoice === 'GBP' && bankCurСhoice === 'RUB') {
    fetch('https://api.exchangerate.host/latest?base=RUB&symbols=GBP')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.GBP).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.GBP).toFixed(2)} ${clientCurСhoice}`;
        bankInput.value = (clientInput.value/data.rates.GBP).toFixed(2);
        const result = +bankInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'GBP' && bankCurСhoice === 'USD') {
    fetch('https://api.exchangerate.host/latest?base=USD&symbols=GBP')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.GBP).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.GBP).toFixed(2)} ${clientCurСhoice}`;
        bankInput.value = (clientInput.value/data.rates.GBP).toFixed(2);
        const result = +bankInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'GBP' && bankCurСhoice === 'EUR') {
    fetch('https://api.exchangerate.host/latest?base=EUR&symbols=GBP')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.GBP).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.GBP).toFixed(2)} ${clientCurСhoice}`;
        bankInput.value = (clientInput.value/data.rates.GBP).toFixed(2);
        const result = +bankInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    }
}

function conversion2() {
    //Client currency RUB
    if(clientCurСhoice === 'RUB' && bankCurСhoice === 'RUB') {
        clientCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        clientInput.value = bankInput.value;
    } else if(clientCurСhoice === 'RUB' && bankCurСhoice === 'USD') {
    fetch('https://api.exchangerate.host/latest?base=USD&symbols=RUB')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.RUB).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.RUB).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.RUB).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'RUB' && bankCurСhoice === 'EUR') {
    fetch('https://api.exchangerate.host/latest?base=EUR&symbols=RUB')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.RUB).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.RUB).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.RUB).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'RUB' && bankCurСhoice === 'GBP') {
    fetch('https://api.exchangerate.host/latest?base=GBP&symbols=RUB')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.RUB).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.RUB).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.RUB).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })

    //Client currency USD
    } else if (clientCurСhoice === 'USD' && bankCurСhoice === 'USD') {
        clientCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        clientInput.value = bankInput.value;
    } else if(clientCurСhoice === 'USD' && bankCurСhoice === 'RUB') {
    fetch('https://api.exchangerate.host/latest?base=RUB&symbols=USD')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.USD).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.USD).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.USD).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'USD' && bankCurСhoice === 'EUR') {
    fetch('https://api.exchangerate.host/latest?base=EUR&symbols=USD')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.USD).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.USD).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.USD).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'USD' && bankCurСhoice === 'GBP') {
    fetch('https://api.exchangerate.host/latest?base=GBP&symbols=USD')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.USD).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.USD).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.USD).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })

    //Client currency EUR
    } else if (clientCurСhoice === 'EUR' && bankCurСhoice === 'EUR') {
        clientCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        clientInput.value = bankInput.value;
    } else if(clientCurСhoice === 'EUR' && bankCurСhoice === 'RUB') {
    fetch('https://api.exchangerate.host/latest?base=RUB&symbols=EUR')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.EUR).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.EUR).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.EUR).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'EUR' && bankCurСhoice === 'USD') {
    fetch('https://api.exchangerate.host/latest?base=USD&symbols=EUR')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.EUR).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.EUR).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.EUR).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'EUR' && bankCurСhoice === 'GBP') {
    fetch('https://api.exchangerate.host/latest?base=GBP&symbols=EUR')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.EUR).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.EUR).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.EUR).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })

    //Client currency GBP
    } else if (clientCurСhoice === 'GBP' && bankCurСhoice === 'GBP') {
        clientCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        bankCourse.innerText = `1 ${clientCurСhoice} = 1 ${clientCurСhoice}`;
        clientInput.value = bankInput.value;
    } else if(clientCurСhoice === 'GBP' && bankCurСhoice === 'RUB') {
    fetch('https://api.exchangerate.host/latest?base=RUB&symbols=GBP')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.GBP).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.GBP).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.GBP).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'GBP' && bankCurСhoice === 'USD') {
    fetch('https://api.exchangerate.host/latest?base=USD&symbols=GBP')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.GBP).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.GBP).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.GBP).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    } else if(clientCurСhoice === 'GBP' && bankCurСhoice === 'EUR') {
    fetch('https://api.exchangerate.host/latest?base=EUR&symbols=GBP')
    .then(res => res.json())
    .then(data => {
        clientCourse.innerText = `1 ${clientCurСhoice} = ${(1 / data.rates.GBP).toFixed(2)} ${bankCurСhoice}`;
        bankCourse.innerText = `1 ${bankCurСhoice} = ${(data.rates.GBP).toFixed(2)} ${clientCurСhoice}`;
        clientInput.value = (bankInput.value*data.rates.GBP).toFixed(2);
        const result = +clientInput.value;
    })
    .catch((err) => {
        alert("API недоступен или ошибка при выполнении запроса");
        console.log(err);
    })
    }
}