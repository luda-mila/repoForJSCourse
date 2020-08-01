const fruitsPrice = {
    apple:     1,
    orange:    6,
    banana:    2,
    kiwi:      4,
    peach:     5, 
    apricot:   3, 
    pineapple: 9, 
    mango:     7, 
    plum:      4, 
};

/**
 * fruits arr is a store of fruits, fill as you wish
 * Example
 * ['banana', 'orange', 'orange']
 */
const fruits = fillFruitArray();

/**
 * fruitsBought arr is a store of bought fruits
 * push fruit here after buying
 */

const fruitsBought = [];
/**
 * logs array is used to store logs on the page.
 * Can be filled with executing log function
 * 
 * Example:
 * log(customerName, fruitName, success)
 * where
 * - customerName is name of customer
 * - fruitName is name of fruit
 * - success is state if customer bought a fruit
 */
const logs = []; 

/**
 * Example of customer
 */
const customers = [{
    name: 'Ivan',
    balance: 46,
    fruitsToBuy: [{
        name: 'banana',
        count: 4,
    }, {
        name: 'kiwi',
        count: 2,
    }, {
        name: 'mango',
        count: 3,        
    }, {
        name: 'apple',
        count: 10,
    }]
}, {
    name: 'Masha',
    balance: 5,
    fruitsToBuy: [{
        name: 'plum',
        count: 3,
    }]    
}, {
    name: 'Vova',
    balance: 30,
    fruitsToBuy: [{
        name: 'peach',
        count: 2,
    }, {
        name: 'kiwi',
        count: 2,
    }, {
        name: 'orange',
        count: 1,        
    }]
}, {
    name: 'Natasha',
    balance: 100,
    fruitsToBuy: [{
        name: 'banana',
        count: 2,
    }, {
        name: 'pineapple',
        count: 1,
    }, {
        name: 'apricot',
        count: 6,        
    }, {
        name: 'mango',
        count: 1,
    }, {
        name: 'peach',
        count: 3,
    }]
},];

/**
 * Function buyFruits is used to iterate over array passes as a param
 * if customer wants to buy 4 banana try to remove banana from fruits array (find it above)
 * and push it to fruitsBought array (find it above)
 * 
 * Push execution result in log
 * function log is written below, you'll find execution example on line 18 of this file
 * 
 * Example:
 * buyFruits(customers)
 */
function buyFruits(customersArr) {
    for (let customer of customersArr) {
        if (customer.fruitsToBuy.length === 0) continue;

        processBuyingFruits(customer);    
    }
}

function processBuyingFruits(buyer) {
    for (let fruit of buyer.fruitsToBuy) {
        for(let i = 0; i < fruit.count; i++) {
            let money = !(buyer.balance < fruitsPrice[fruit.name]);
            let suc   = fruits.includes(fruit.name) && money;

            log (buyer.name, fruit.name, suc, money);

            if (money && suc) {
                fruits.splice(fruits.indexOf(fruit.name), 1);
                fruitsBought.push(fruit.name);
                buyer.balance -= fruitsPrice[fruit.name];
            }
        }
    }
}

/**
 * Function getFruitsMap returns map of fruits
 * Example:
 * 
 * const fr = ['banana', 'orange', 'orange']
 * getFruitsMap(fr); -> { banana: 1, orange: 2 }
 * 
 */
function getFruitsMap(fruitsArr) {
    return fruitsArr.reduce(function(acc, fruit){
        acc[fruit] = (fruit in acc) ? acc[fruit] + 1 : 1;
        
        return acc;
    }, {})
}

function fillFruitArray() {
    let arr        = [];
    let fruitNames = Object.keys(fruitsPrice);

    for(let i = 0; i < 21; i++) {
        arr.push(fruitNames[getRandomInt(fruitNames.length)]);
    }

    return arr;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}




// DONT'T EDIT FOLLOWING CODE
buyFruits(customers);
const fruitsLeftMap = getFruitsMap(fruits);
const fruitsBoughtMap = getFruitsMap(fruitsBought);

function log (customerName, fruitName, success, money) {
    const action = success ? 'bought' : 'failed to buy';
    const className = success ? 'green' : 'red';
    const reason = success ? '' : money 
        ? '(no fruit available)' : '(not enough money)';
    logs.push(`${customerName} <span class=${className}>${action}</span> ${fruitName} ${reason}`);
}

function render () {
    renderLog();
    renderFruits('fruits-left', fruitsLeftMap);
    renderFruits('fruits-bought', fruitsBoughtMap);

    function renderLog() {
        let existingLogsContainer = document.getElementById('messages');
        let mainLogsContainer =  document.getElementById('log');
        
        if (existingLogsContainer) {
            mainLogsContainer.removeChild(existingLogsContainer);
        }
        
        const logsContainer = document.createElement('ul');
        logsContainer.id = 'messages';
        
        logs.forEach(log => {
            const logEl = document.createElement('li');
            logEl.innerHTML = log;
            logsContainer.appendChild(logEl);
        });
        
        mainLogsContainer.appendChild(logsContainer);    
    }
    
    function renderFruits (id, mappedData) {
        const mainFruitsContainer = document.getElementsByClassName(id)[0];
        const existingFruitsBoughtContainer = (mainFruitsContainer.getElementsByClassName('fruits-list') || [])[0];
        
        if (existingFruitsBoughtContainer) {
            mainFruitsContainer.removeChild(existingFruitsBoughtContainer);
        }
        
        const fruitsContainer = document.createElement('ul');
        fruitsContainer.classList.add('fruits-list');
        
        for (let key in mappedData) {
            const fruitEl = document.createElement('li');
            const nameEl = document.createElement('span');
            const countEl = document.createElement('span');
            nameEl.innerText = `${key}:`;
            countEl.innerText = mappedData[key];
        
            fruitEl.appendChild(nameEl);
            fruitEl.appendChild(countEl);
            fruitsContainer.appendChild(fruitEl);
        }
        
        mainFruitsContainer.appendChild(fruitsContainer);
    }
}
