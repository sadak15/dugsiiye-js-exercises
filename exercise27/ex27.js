

function fetchUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true; 
            if (success) {
                resolve({ id: 1, name: "Ahmed Ali" });
            } else {
                reject("Failed to fetch user data");
            }
        }, 2000);
    });
}

fetchUserData()
    .then(data => console.log("User Data:", data))
    .catch(error => console.error("Error:", error));
