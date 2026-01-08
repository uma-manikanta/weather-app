let currActiveItem = document.getElementById('n1');

currActiveItem.classList.add('active');


//Use Event Delegation
const navBar = document.getElementById('nav-bar');
navBar.addEventListener('click', function(event) {
    const newActiveItem = event.target.closest('.nav-item');
    if (!newActiveItem) return;
    if (newActiveItem !== currActiveItem) {
        currActiveItem.classList.remove('active');
        newActiveItem.classList.add('active')
        currActiveItem = newActiveItem;
    }
})