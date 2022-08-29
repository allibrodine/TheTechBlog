async function newPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value.trim();

    //send post request to api/posts endpoint
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, post_text }),
        headers: { 'Content-Type': 'application/json' }
    });

    //pass new post to the dashboard page
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post').addEventListener('submit', newPostHandler);