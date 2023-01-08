const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/api/state/33');
          sessionStorage.setItem('currentState', '33')
        } else {
          alert('Failed to log in');
        }
      } else {
        alert('Failed to sign up');
      }
    }
  };
  
  document
    .querySelector('#signup-form')
    .addEventListener('click', signupFormHandler);
  