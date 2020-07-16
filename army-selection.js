let names                 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
let candidates            = [];
const personsNamesForArmy = [];

createCondidates();

function generateAge() {
    return Math.round(Math.random() * (31 - 15) + 15);
}

function generateGender() {
    return Math.round(Math.random()) === 0 ? 'male' : 'female';
}

function createCondidates() {
    for (let i = 0; i < 20; i++) {
        let person  = {
            name:   names[i],
            age:    generateAge(),
            gender: generateGender(),
        };

        candidates.push(person);
    }   
} 

for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].age >= 18 && candidates[i].age <= 27 && candidates[i].gender === 'male') {
            personsNamesForArmy.push(candidates[i].name);
    }
}

console.log(personsNamesForArmy);