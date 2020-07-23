const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];

const alcoholPriceForOneItem = {
    whisky:   23, // don't change this one
    vodka:    10,
    wine:     20,
    tequila:  27,
    cognac:   32,
    rum:      25,
    liquor:   18,
    absinthe: 60,
};

const LEGAL_AGE = 18; // don't change this

function generateValue(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let people = createBuyersList();

function createBuyersList() {
    let buyers = [];

    for(let i = 1; i <= 20; i++) {
        let buyer = {
        id: i,
        name: names[i-1],
        age: generateValue(15, 50),
        moneyAmount: generateValue(10, 180),
        desiredAlcoholName: Object.keys(alcoholPriceForOneItem)[generateValue(0, 7)],
        desiredAlcoholAmount: generateValue(1, 5),
        };

        buyers.push(buyer);
    }

    return buyers;
}

/**
 * Function is used to filter array of objects by age param, name of param is passed as second argument
 * If object has age above LEGAL_AGE -> it's returned in new array 
 * @param {Array} arr
 * @param {String} ageParamName
 * Returns filtered array
 * f.e function is called getLegalAgePeople(people, 'age');
 * 
 * tip: use .filter method
 */
function getLegalAgePeople(arr, ageParamName) {
    return arr.filter((p) => {
        
        return p[ageParamName] >= LEGAL_AGE;
    });
}

let legalAgePeople = getLegalAgePeople(people, 'age');

/**
 * Function is used to filter array of objects
 * If object has money amount more than alcohol price multiplied by alcohol amount -> it's returned to new array
 * @param {Array} arr 
 * Returns filtered array
 * f.e function is called getPeopleWhoHaveMoneyForAlcohol(legalAgePeople);
 * 
 * tip: use .filter method
 */

function getPeopleWhoHaveMoneyForAlcohol(arr) {
    return arr.filter(p => {
        changeDesiredAlcoholAmount(p);

        return p.moneyAmount >= alcoholPriceForOneItem[p.desiredAlcoholName] * p.desiredAlcoholAmount;
    })
}

legalAgePeople = getPeopleWhoHaveMoneyForAlcohol(legalAgePeople);

function changeDesiredAlcoholAmount(obj) {
    if ((obj.moneyAmount < obj.desiredAlcoholAmount * alcoholPriceForOneItem[obj.desiredAlcoholName]) && (Math.floor(obj.moneyAmount / alcoholPriceForOneItem[obj.desiredAlcoholName]) > 0)) { 
        obj.desiredAlcoholAmount = Math.floor(obj.moneyAmount / alcoholPriceForOneItem[obj.desiredAlcoholName]);
    }
}

/**
 * Function is used to get array of strings
 * @param {Array} arr 
 * Returns filtered array of strings like:
 * ["NAME bought COUNT bottles of ALCOHOL_NAME for SUM rubles"]
 * where NAME is name of person, COUNT is bottles count, ALCOHOL_NAME is name of alcohol, SUM is bottles count multipled by price for a bottle
 * f.e function is called buyAlcohole(legalAgePeople);
 * 
 * tip: use .map method
 */
function buyAlcohol(arr) {
    return arr.map(p => {
        let sum = alcoholPriceForOneItem[p.desiredAlcoholName] * p.desiredAlcoholAmount;
        return p.name + ' bought ' + p.desiredAlcoholAmount + ' bottles of ' + p.desiredAlcoholName + ' for ' + sum + ' rubles';
    })
}

let reports = buyAlcohol(legalAgePeople);

console.log(reports);