

function imageStyle() {
    const image = document.querySelector('#image');

    const url = prompt("Please enter your image url:");
    const borderColor = prompt("Enter border color:");
    const width = prompt("Enter image width:");
    const height = prompt("Enter image height:");
    const borderRadius = prompt("Enter border radius:");

    image.setAttribute('src', url);

    image.style.border = `20px solid ${borderColor}`;

    image.style.width = width + "px";

    image.style.height = height + "px";

    image.style.borderRadius = borderRadius + "px";
}