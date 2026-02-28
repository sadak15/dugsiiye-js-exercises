

async function getData() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if(!response.ok){
            
            throw new Error(`http error status: ${response.status}`);

        }

        const data = await response.json();
        console.log("data: ", data);

    }catch(error){
        console.log("Error data fetching: ", error);
    }
}


getData()