const colorPicker = document.getElementById('colorPicker');
const colorPreview = document.getElementById('colorPreview');
const colorHistory = document.getElementById('colorHistory');
const clearBtn = document.getElementById('clearHistory');

colorPreview.style.width = "300px";
colorPreview.style.height = "300px";
colorPreview.style.display = "flex";
colorPreview.style.alignItems = "center";
colorPreview.style.justifyContent = "center";
colorPreview.style.border = "2px solid black";
colorPreview.style.fontSize = "18px";
colorPreview.style.fontWeight = "bold";
colorPreview.style.marginTop = "10px";

let history = JSON.parse(localStorage.getItem('colors')) || [];

function renderHistory() {
    colorHistory.innerHTML = '';

    history.forEach((color, index) => {
        const li = document.createElement('li');
        li.textContent = color;

        li.style.cursor = "pointer";
        li.style.color = color;
        li.style.fontWeight = "bold";
        
        li.addEventListener('click', () => {
            colorPreview.style.backgroundColor = color;
            colorPreview.textContent = color;
            colorPicker.value = color;
        });

        colorHistory.appendChild(li);
    });
}

colorPicker.addEventListener('input', () => {
    const selectedColor = colorPicker.value;

    colorPreview.style.backgroundColor = selectedColor;
    colorPreview.textContent = selectedColor;

    if (!history.includes(selectedColor)) {
        history.push(selectedColor);
        localStorage.setItem('colors', JSON.stringify(history));
        renderHistory();
    }
});

clearBtn.addEventListener('click', () => {
    history = [];
    localStorage.removeItem('colors');
    renderHistory();
});

renderHistory();