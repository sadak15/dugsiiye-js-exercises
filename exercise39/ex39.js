const API_KEY = '30d3b82aa9msh712b0f6755b13a5p1803c3jsn9fb8776aec82';
const API_HOST = 'microsoft-translator-text-api3.p.rapidapi.com';

async function loadLanguages() {
    const url = `https://${API_HOST}/languages`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        const result = JSON.parse(text);

        console.log("LANG RESPONSE:", result);

        const languages = result.translation;

        if (!languages || typeof languages !== 'object') {
            throw new Error("Languages not found or invalid format");
        }

        const fromSelect = document.getElementById("from");
        const toSelect = document.getElementById("to");

        const fromFragment = document.createDocumentFragment();
        const toFragment = document.createDocumentFragment();

        const makeDefault = (label) => {
            const opt = document.createElement("option");
            opt.value = "";
            opt.textContent = label;
            return opt;
        };

        fromFragment.appendChild(makeDefault("Select language"));
        toFragment.appendChild(makeDefault("Select language"));

        const sorted = Object.entries(languages).sort((a, b) =>
            a[1].name.localeCompare(b[1].name)
        );

        sorted.forEach(([code, lang]) => {
            const optFrom = document.createElement("option");
            optFrom.value = code;
            optFrom.textContent = lang.name;
            fromFragment.appendChild(optFrom);

            const optTo = document.createElement("option");
            optTo.value = code;
            optTo.textContent = lang.name;
            toFragment.appendChild(optTo);
        });

        fromSelect.innerHTML = "";
        toSelect.innerHTML = "";
        fromSelect.appendChild(fromFragment);
        toSelect.appendChild(toFragment);

    } catch (error) {
        console.error("Language load error:", error);
        document.getElementById("output").innerText = "Failed to load languages!";
        document.getElementById("from").innerHTML = `<option value="">Failed to load</option>`;
        document.getElementById("to").innerHTML = `<option value="">Failed to load</option>`;
    }
}

const translateBtn = document.getElementById("translateBtn");

translateBtn.addEventListener("click", async () => {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const text = document.getElementById("text").value;
    const output = document.getElementById("output");

    if (!from || !to) {
        output.innerText = "Please select languages!";
        return;
    }

    if (!text.trim()) {
        output.innerText = "Please enter text!";
        return;
    }

    translateBtn.disabled = true;
    translateBtn.textContent = "Translating...";
    output.innerText = "";

    const url = `https://${API_HOST}/largetranslate?to=${to}&from=${from}`;

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sep: '|',
            text: text
        })
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();

        console.log("TRANSLATE RESPONSE:", result);

        if (result && result.trim().length > 0) {
            output.innerText = result.trim();
        } else {
            output.innerText = "Translation failed! Empty response.";
        }

    } catch (error) {
        console.error("Translate error:", error);
        output.innerText = "Error occurred during translation!";
    } finally {
        translateBtn.disabled = false;
        translateBtn.textContent = "Translate";
    }
});

loadLanguages();
