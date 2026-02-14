

// synchornous 

function fetchUserData(){
    alert("Hey");
    return{
        id: 1, 
        Name: "Ahmed Ali",
    }
}

console.log("Starting user fetching Data");

const user = fetchUserData();

console.log("User Data: ", user);

console.log("this message is blocked")




// Asynchronous
function getUserdata(Callback){
    setTimeout(()=>{
        const user = {
            id: 1,
            name: "Ahmed Ali",
        }; Callback(user);
    }, 2000)
}

console.log("starting Fetching User data")

getUserdata(function(user){
    console.log(user)
})

console.log("this is none blocked message")

