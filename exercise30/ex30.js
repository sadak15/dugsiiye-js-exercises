
// function great(name){
//     console.log("Hello, ", name )
// }

// function processUserInput(callback){
//     const name= prompt("Enter You name");
//     callback(name)
// }

// processUserInput(great)



function operate(a,b, callback){
    return callback(a,b)
}

function multiply(a,b){
    return a*b
}
function divide(a,b){
    return a/b
}

console.log("Multiply", operate(6,5, multiply));
console.log("Division", operate(30,6, divide));