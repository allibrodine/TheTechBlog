async function deletePostHandler(event) {
    event.preventDefault();

    //find post by id
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    //send delete request to api/post endpoint with post id
    const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE'
        });

    if (response.ok) {
        //update dashboard
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-btn').addEventListener('click', deletePostHandler);