const postFormHandler = async (event) => {
    event.preventDefault();
  
    const post_text = document.querySelector('#new-post').value;
    const state_id = sessionStorage.getItem('currentState')
  console.log(post_text)
    if (post_text) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ post_text, state_id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        location.reload()
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  document
    .querySelector('#post-button')
    .addEventListener('click', postFormHandler);
  