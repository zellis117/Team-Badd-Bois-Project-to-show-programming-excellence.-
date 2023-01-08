const stateButtonHandler = async (event) => {
    event.preventDefault();
    const target = event.target
    console.log(target)
    const id = target.value
    document.location.replace(`/api/state/${id}`);
    sessionStorage.setItem('currentState', id)
}
 const stateButton = document
    .querySelectorAll('.state-button')
    stateButton.forEach((button) => 
    button.addEventListener('click', stateButtonHandler));