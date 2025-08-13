const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const form = document.querySelector('#add-posts-form');

async function showPosts() {
  try {

    const res = await fetch("http://localhost:8080/api/posts");

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await res.json();
    output.innerHTML = '';

    posts.forEach((post) => {
      const postEl = document.createElement('div');
      postEl.textContent = post.title;
      output.appendChild(postEl);
    })
  } catch (error) {
    console.log('Error fetching posts: ', error)
  }
}


async function addPosts(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  console.log(formData);
  const title = formData.get('title');
console.log(title);
  try {
    const res = await fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })

    if (!res.ok) {
      throw new Error('Failed to add post');
    }

    const newPost = await res.json();

    const postEl = document.createElement('div');
    postEl.textContent = newPost.title;
    output.appendChild(postEl);
  } catch (e) {
    console.log('Error is occured:', e)
  }
}
// ! Event Listener

button.addEventListener('click', showPosts);
form.addEventListener('submit', addPosts);

