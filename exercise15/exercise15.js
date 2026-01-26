
//show object only 
const person = { name: "Alice", age: 25, city: "Wonderland" };

for (const key in person) {
    console.log(key + ": " + person[key]);


};


// compinateion array and object
const persons = [
    { name: "Ahmed", age: 25, city: "Mogadishu" },
    { name: "Ikhlaas", age: 17, city: "Somalia" },
];

for (const person of persons) {
    for (const key in person) {
        console.log(key + ": " + person[key]);
    }
}
