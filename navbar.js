let currActiveItem = document.getElementById('n1');
const thumb = document.getElementById('thumb')
let isSliding = false;
const navBar = document.getElementById('nav-bar');



// navBar.addEventListener('click', function(event) {
//     const newActiveItem = event.target.closest('.nav-item');
//     if (!newActiveItem) return;
//     if (newActiveItem !== currActiveItem) {
//         currActiveItem.classList.remove('active');
//         newActiveItem.classList.add('active')

//         const left = newActiveItem.offsetLeft;
//         thumb.style.left = left + 'px';

//         currActiveItem = newActiveItem;
//     }
// })

//Nav barSlider
navBar.onselectstart = () => false;
navBar.addEventListener('pointerdown', function (event) {
    let newActiveItem = event.target.closest('.nav-item');
    let upcomingActiveItem = currActiveItem;

    navBar.setPointerCapture(event.pointerId);
    if (!newActiveItem) return;
    if (newActiveItem == currActiveItem) { //SLiding
        thumb.classList.add('sliding');
        currActiveItem.classList.add('psuedo-active');
        navBar.onpointermove = function (event) {
            let belowElement = document.elementFromPoint(
                event.clientX,
                event.clientY).closest('.nav-item');
            upcomingActiveItem = belowElement ?? upcomingActiveItem;
            let offset = event.clientX - navBar.getBoundingClientRect().left;
            offset = Math.max(3, offset);
            offset = Math.min(offset, navBar.clientWidth - thumb.offsetWidth);
            thumb.style.left = offset + 'px';
        }
    } else { //clicking
        upcomingActiveItem = newActiveItem;
    }
    navBar.onpointerup = function (event) {
        navBar.onpointermove = null;
        thumb.style.left = upcomingActiveItem.offsetLeft + 'px';
        if (currActiveItem !== upcomingActiveItem) {
            currActiveItem.classList.remove('active');
            upcomingActiveItem.classList.add('active');
        }
        if (currActiveItem == newActiveItem) {
            thumb.classList.remove('sliding');
            currActiveItem.classList.remove('psuedo-active');
        }
        currActiveItem = upcomingActiveItem;
        navBar.onpointerup = null;
    }

})