async function fetchData() {
    console.log("Start fetching data...");

    const response = await fetch('./exercise29/data.json');
    const data = await response.json();

    console.log("Fetched Data:", data);
    console.log("Data fetching complete. This message runs after data is fetched.");
}

fetchData();