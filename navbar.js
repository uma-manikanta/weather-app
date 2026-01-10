//------------------------Event Global Variables--------------------//
let currActiveItem = document.getElementById('n1');
let nextActiveItem = currActiveItem;
const thumb = document.getElementById('thumb')
let isSliding = false;
const navBar = document.getElementById('nav-bar');
//for sliding (touch and hold)
const holdDuration = 400; //in ms
let holdTimer = null


//--------------------------Event Handlers--------------------------//

/*click Handler for NavBar (same for Mobile + PC)
Not used (handled in pointerup)
*/

// function handleClick(event) {
//     const clickTarget = event.target.closest('.nav-item');
//     console.log(clickTarget);
//     if (!clickTarget) return;
//     console.log('CLicked');

//     if (clickTarget !== currActiveItem) {
//         currActiveItem.classList.remove('active');
//         currActiveItem = clickTarget;
//         currActiveItem.classList.add('active');
//         thumb.style.left = currActiveItem.offsetLeft + 'px';
//     }

// }

/*Pointerdown, PointerUp, pointercancel, pointermove, gotpointercapture
for Slider */
function handleMove(event, shiftX) {
    console.log('Moving');
    const dim = thumb.getBoundingClientRect();
    let belowElement = document.elementFromPoint(
                (dim.left + dim.right)/2,
                (dim.top + dim.bottom)/2)?.closest('.nav-item');
    
    nextActiveItem = belowElement ?? nextActiveItem;
    let offset = event.clientX - navBar.getBoundingClientRect().left;
    offset -= shiftX;

    offset = Math.max(3, offset);
    offset = Math.min(offset, navBar.clientWidth - thumb.offsetWidth);
    thumb.style.left = offset + 'px';
 
}

function startHold(event) {
    console.log('pointerdown');
    const holdTarget = event.target.closest('.nav-item');
    if (!holdTarget) return;
    if (holdTarget !== currActiveItem) return;
    
    holdTimer = setTimeout(() => {
        isSliding = true;
        thumb.classList.add('sliding');
        currActiveItem.classList.add('psuedo-active');

        let shiftX = event.clientX - thumb.getBoundingClientRect().left;
        navBar.onpointermove = function(event) {
            handleMove(event,shiftX);   
        };
    }, holdDuration);
    
}

function cancelHold(event) {
    console.log('pointerup/cancel');
    clearTimeout(holdTimer);
    if (isSliding) {
        //To set thumb position
        isSliding = false;
        navBar.onpointermove = null;
        thumb.style.left = nextActiveItem.offsetLeft + 'px';
        thumb.classList.remove('sliding');
        currActiveItem.classList.remove('psuedo-active');

        if (nextActiveItem != currActiveItem) {
            currActiveItem.classList.remove('active');
            currActiveItem = nextActiveItem;
            currActiveItem.classList.add('active');
        }
    } else {
        console.log('clicking...')
        const releasedOn = document.elementFromPoint(event.clientX, event.clientY);
        const clickTarget = releasedOn?.closest('.nav-item');

        if (clickTarget && clickTarget !== currActiveItem) {
            currActiveItem.classList.remove('active');
            currActiveItem = clickTarget;
            currActiveItem.classList.add('active');
            thumb.style.left = currActiveItem.offsetLeft + 'px';
        }
    }
    navBar.releasePointerCapture(event.pointerId);
}

//--------------------------Events Listeners------------------------//
navBar.onselectstart = () => false;
// navBar.addEventListener('click', handleClick); won't work due to setPointerCapture
navBar.addEventListener('pointerdown', function(event) {
    navBar.setPointerCapture(event.pointerId);
    startHold(event);
});
navBar.addEventListener('pointercancel', cancelHold);
navBar.addEventListener('pointerup', cancelHold);