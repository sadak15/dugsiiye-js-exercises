
const form = document.getElementById('post-form');
const postsContainer = document.getElementById('posts');

document.addEventListener('DOMContentLoaded', loadPosts);

form.addEventListener('submit', addPost);

function addPost(e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const image = document.getElementById('image').value.trim();
    const content = document.getElementById('content').value.trim();

    const post = {
        id: Date.now(),
        title,
        image,
        content
    };

    savePost(post);
    addPostToDOM(post);

    form.reset();
}

function addPostToDOM(post) {
    const div = document.createElement('div');
    div.className = 'post';
    div.dataset.id = post.id;

    div.innerHTML = `
        <h3>${post.title}</h3>
        ${post.image ? `<img src="${post.image}">` : ''}
        <p>${post.content}</p>
        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    postsContainer.appendChild(div);

    // Events
    div.querySelector('.delete').addEventListener('click', () => {
        deletePost(post.id);
        div.remove();
    });

    div.querySelector('.edit').addEventListener('click', () => {
        editPost(post.id, div);
    });
}

function editPost(id, div) {
    const titleEl = div.querySelector('h3');
    const contentEl = div.querySelector('p');
    const imgEl = div.querySelector('img');

    const newTitle = prompt('Edit Title:', titleEl.textContent);
    if (!newTitle) return;

    const newImage = prompt('Edit Image URL:', imgEl ? imgEl.src : '');
    const newContent = prompt('Edit Content:', contentEl.textContent);

    updatePost(id, newTitle, newImage, newContent);

    titleEl.textContent = newTitle;
    contentEl.textContent = newContent;

    if (newImage) {
        if (imgEl) {
            imgEl.src = newImage;
        } else {
            const img = document.createElement('img');
            img.src = newImage;
            div.insertBefore(img, contentEl);
        }
    }
}

function deletePost(id) {
    let posts = getPosts();
    posts = posts.filter(p => p.id != id);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function updatePost(id, title, image, content) {
    const posts = getPosts();
    const post = posts.find(p => p.id == id);

    if (post) {
        post.title = title;
        post.image = image;
        post.content = content;
        localStorage.setItem('posts', JSON.stringify(posts));
    }
}

function savePost(post) {
    const posts = getPosts();
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    const posts = getPosts();
    posts.forEach(addPostToDOM);
}

function getPosts() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}