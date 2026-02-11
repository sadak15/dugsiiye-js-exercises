

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combined = [...arr1, ...arr2];

console.log(combined);






// Multiply operator

function multiply(...numbers) {
    return numbers.reduce((total, num) => total * num, 1);
}

console.log(multiply(2, 3, 4));
