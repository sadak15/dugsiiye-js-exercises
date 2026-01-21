let car = {
    make: "japan",
    model: "toyota",
    year: 2026,
    start: function(){
        console.log("The car has started " + this.make)
    }
    // start: ()=>{
    //     console.log("The car has started")
    // }
}

console.log(car);
console.log(car.start());

