// create element to listen for opening drawer event 
const openDrawerElement = document.createElement('div'); 
openDrawerElement.id = "openDrawerElement"; 
// openDrawerElement.style.zIndex = '3';
let body = document.getElementsByTagName('body')[0]; 
body.appendChild(openDrawerElement);
    
const drawerWidth = 220; 

const swipeAreaLeft = 0, minimumSwipeDistance = 60, swipeAreaRight = swipeAreaLeft + minimumSwipeDistance; 
// // set css drawer width to that which is set above 
// document.documentElement.style.setProperty(`--drawerWidth`, `${drawerWidth}px`);

// // add 'active' class to drawer to open and close it
const toggleMenuOpen = () => {
    // sideDrawer.classList.toggle('active'); 
    if (sideDrawer.classList.contains('active')){
        closeMenu(sideDrawer)
    }else{
        openMenu(sideDrawer)
    }
}

const closeSideDrawer = () => {
    sideDrawer.classList.remove('active')
}

const openSideDrawer = () => {
    sideDrawer.classList.add('active')
}

toggler.addEventListener('click', toggleMenuOpen)

// touch specific functions for animating drawer open and closed 
const openMenu = ele => {
    // find the current left attribute of the element's style 
    let currentLeft = window.getComputedStyle(ele).left; 
    let openFrames = [
        {
            left: currentLeft,
        },
        {
            left: 0+'px',
        }
    ]; 
    // make up a duration now, but later base it on how far to the left the drawer is already and make the length a fraction of the difference between that and the final left position 
    // actually, just using a short time feels fine. 
    let timing = {
        duration: 300,
        fill: 'forwards',
        easing: 'ease'
    }
    // animate element
    // ele.animate(openFrames, timing)
    // ele.style.left = null
    // ele.style.left = drawerWidth+'px'

    // ended up only using the next line, but left the rest for reference or in case I want to reuse it 
    ele.classList.add('active')
    //freeze scrolling 
    document.body.style.overflow = 'hidden'
}

const closeMenu = ele => {
    // find the current left attribute of the element's style 
    let currentLeft = window.getComputedStyle(ele).left; 
    let closeFrames = [
        {
            left: currentLeft,
        },
        {
            left: -drawerWidth + 'px',
        }
    ]; 
    // make up a duration now, but later base it on how far to the left the drawer is already and make the length a fraction of the difference between that and the final left position 
    // actually, just using a short time feels fine. 
    let timing = {
        duration: 300,
        fill: 'forwards',
        easing: 'ease'
    }
    // animate element
    // ele.animate(closeFrames, timing)
    // ele.style.left = null

    // set transition style, which needs reset afterwards
    sideDrawer.style.transition = "0.2s ease-out"
    ele.classList.remove('active');
    // add the ability to scroll the page again 
    document.body.style.overflow = 'scroll'
}


// swiping menu open touch feature
let x1, y1; 
// let recentTouches = []; 
// let firstX = ''; 
openDrawerElement.addEventListener('touchstart', (event) => {
    console.log(event);
    let touchLocation = event.targetTouches[0]
    x1 = touchLocation.clientX;
    y1 = touchLocation.clientY;
    // reset sideDrawer transition so it doesn't act jumpy while moving with touch 
    sideDrawer.style.transition = ""
})


openDrawerElement.addEventListener('touchmove', (event)=>{
    // console.log(event.touches[0].clientY)
    // console.log(event.touches[0].clientX)
    let yLocation = event.touches[0].clientY; 
    let xLocation = event.touches[0].clientX; 
    let yDiff = Math.abs(y1 - yLocation);
    let xDiff = Math.abs(x1 - xLocation);

    // keep drawer from extending out past its own width 
    if (xLocation > drawerWidth+x1){
        xLocation = drawerWidth+x1
    }

    // if the difference traveled along x axis is greater than y axis, start pulling drawer out 
    if (xDiff > yDiff){
        //freeze scrolling 
        document.body.style.overflow = 'hidden'
        // move drawer out
        sideDrawer.style.left = `${xLocation - (drawerWidth+x1)}px`;
        // console.log(window.getComputedStyle(sideDrawer).left );
        
    }
})

openDrawerElement.addEventListener('touchend', event => {
    let x2 = event.changedTouches[0].clientX; 
    let y2 = event.changedTouches[0].clientY; 
    // if the final x point is greater than 1/2 the drawerWidth, fire the open drawer animation 
    if (x2 > drawerWidth/2){
        // sideDrawer.style.left = 0+'px';
        // openMenu(sideDrawer)
        openMenu(sideDrawer)
    }else{
        // sideDrawer.style.left = -drawerWidth+'px';
        // closeMenu(sideDrawer);
        closeMenu(sideDrawer)
    }
    sideDrawer.style.left = null
})



// const toggleSubItemActive = (subItem) => {
//     if (subItem !== undefined){
//         subItem.classList.toggle('active');
//     }
// }

// // find all titles, add this event listener to them
// let titles = Array.from(document.getElementsByClassName('drawerItemTitle')); 
// let subItems = Array.from(document.getElementsByClassName('subItems'))

// titles.forEach(title => {
//     // find the UL that matches this title element (the next sibling element) and add toggle its visitbility with a callback to toggleSubItemActive(the matching UL) 
//     let matchingUL = title.nextElementSibling;
//     console.log(matchingUL);
//     if (matchingUL !== undefined){
//         title.addEventListener('click', () => toggleSubItemActive(matchingUL))
//     }
// })

// // on a subitem click, hide the drawer
// subItems.forEach(subItem => {
//     subItem.addEventListener('click', toggleMenuOpen)
// })





// create new hammer instance for opening drawer 
// const openDrawerAction = new Hammer(openDrawerElement, {}); 

// // openDrawerAction.on('swiperight', e => {
// //     console.log(e);
    
// //     e.preventDefault();
// //     if (e.isFinal && e.deltaX > minimumSwipeDistance){
// //         console.log('ajsdfljas');
        
// //         console.log(document.activeElement);
// //         e.target.focus()
// //         console.log(document.activeElement);
// //         openSideDrawer()
// //         window.setTimeout(sideDrawer.focus(), 0)
// //         // debugger
// //     }
// // })

// // new hammer instance for closing drawer 
// const closeDrawerAction = new Hammer(sideDrawer); 
// closeDrawerAction.on('swipe left', e => {
//     if (e.isFinal && e.deltaX < (minimumSwipeDistance * -1)){
//         closeSideDrawer()
//     }
// })


// // create a region on the document body ZingTouch to work 
// let zt = new ZingTouch.Region(document.body); 


// // add listener to element to open drawer 
// zt.bind(openDrawerElement, 'swipe', function(e){
//     console.log(e);
//     // check if swipe was to the right, and open drawer if it was 
//     let direction = e.detail.data[0].currentDirection; 
//     console.log(direction);
//     if ((direction < 361 && direction > 334) || (direction > 0 && direction < 26)){
//         openSideDrawer()
//         // add closing drawer function to drawer 
//     zt.bindOnce(sideDrawer, 'swipe', function(e){
//         console.log('side drawer swiped');
//         let direction = e.detail.data[0].currentDirection; 
//         if (direction < 206 && direction > 154){
//             closeSideDrawer()
//         }
//         // console.log(e);
//     })
//     }  
// })


// listen for click or tap on the body and close the sideDrawer if it's open 
body.addEventListener('click', e => {
    if (sideDrawer.classList.contains('active')){
        closeMenu(sideDrawer)
    }
})