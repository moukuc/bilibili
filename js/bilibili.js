let rem =  window.innerWidth >= 1150 ? 5.2631578947368 * window.innerWidth / 100 : 60;
const slider = document.getElementsByClassName('slider')[0];
const body = document.getElementsByClassName('body')[0];
const sliderMenu = document.getElementsByClassName('slider')[0].getElementsByTagName('li');
const partitions = document.getElementsByClassName('slide');
const menu_2 = document.getElementsByClassName('menu_2')[0];
const optionAbove = document.getElementsByClassName('option above');
const optionBelow = document.getElementsByClassName('option below');
const user = document.getElementsByClassName('user')[0];
const userData = user.getElementsByClassName('user_data')[0];
const userImg = user.getElementsByClassName('img')[0];

let sliderTop = slider.offsetTop;

let timeOutEvent = null;

function pxToRem(px) {
  return px / rem;
}

window.onresize = handleWindowResize;
function handleWindowResize() {
  rem =  window.innerWidth >= 1150 ? 5.2631578947368 * window.innerWidth / 100 : 60;
}

user.addEventListener('mouseenter', handleUserMouseenter);
user.addEventListener('mouseleave', handleUserMouseleave);
function handleUserMouseleave() {
  userImg.style = '';
  userData.style = '';
  setTimeout(()=>{user.style.overflow = 'hidden'}, 200)
}
function handleUserMouseenter(event) {
  let target = event.target;
  target.style.overflow = 'visible';
  userImg.style.transform = 'scale(2) translateY(65%)';
}
userData.addEventListener('mouseenter', handleUserDataMouseenter);
function handleUserDataMouseenter(event) {
  let target = event.target;
  target.style.opacity = 1;
  target.style.zIndex = 1;
  user.style.overflow = 'visible';
}

for(let i = 0; i < optionAbove.length; i++) {
  optionAbove[i].addEventListener('mouseenter', handleOptionAboveMousenter);
  optionAbove[i].addEventListener('mouseleave', handleOptionAboveMousleave);
}
function handleOptionAboveMousenter(event) {
  clearTimeout(timeOutEvent);
  var target = event.target;
  target.style.transform = 'translateY(-100%) translateX(-0.2rem) translateY(-0.25rem)';
  target.style.opacity = 1;
  target.style.zIndex = 3;
  for(let i = 0; i < optionAbove.length; i++) {
    optionAbove[i].style.display = 'none';
  }
  target.style.display = 'flex';
}
function handleOptionAboveMousleave(event) {
  clearTimeout(timeOutEvent);
  var target = event.target;
  target.style = '';
  menu_2.style.overflow = 'hidden';
  for(let i = 0; i < optionAbove.length; i++) {
    optionAbove[i].style.display = 'flex';
  }
}
for(let i = 0; i < optionBelow.length; i++) {
  optionBelow[i].addEventListener('mouseenter', handleOptionBelowMousenter);
  optionBelow[i].addEventListener('mouseleave', handleOptionBelowMousleave);
}
function handleOptionBelowMousleave(event) {
  clearTimeout(timeOutEvent);
  var target = event.target;
  target.style = '';
  menu_2.style.overflow = 'hidden';
  for(let i = 0; i < optionBelow.length; i++) {
    optionBelow[i].style.display = 'flex';
  }
}
function handleOptionBelowMousenter(event) {
  clearTimeout(timeOutEvent);
  var target = event.target;
  target.style.transform = 'translateY(0.5rem) translateX(-0.2rem)';
  target.style.opacity = 1;
  for(let i = 0; i < optionBelow.length; i++) {
    optionBelow[i].style.display = 'none';
  }
  target.style.display = 'flex';
}
menu_2.addEventListener('mouseenter', handleMenu_2Mouseenter);
function handleMenu_2Mouseenter() {
  clearTimeout(timeOutEvent);
  menu_2.style.overflow = 'visible';
}
menu_2.addEventListener('mouseleave', handleMenu_2Mouseleave);
function handleMenu_2Mouseleave() {
  timeOutEvent = setTimeout(()=> {menu_2.style.overflow = 'hidden';}, 400);
}



window.addEventListener('scroll', handleWindowScroll);
var height = 0;
function handleWindowScroll() {
  let scrollHeight = pxToRem(document.body.scrollTop == 0 ? document.documentElement.scrollTop : document.body.scrollTop);
  if(scrollHeight <= 3) {
    slider.style.top = '-6.8rem';
  }
  else {
    slider.style.top = scrollHeight - 9.4 + 'rem';
  }
  let showOne = false;
  if(scrollHeight > height) {
    for(let i = 0; i < partitions.length; i++) {
      sliderMenu[i].parentElement.style.backgroundColor = 'white';
      if(scrollHeight - pxToRem(partitions[i].offsetTop) < 9.5 && showOne === false) {
          sliderMenu[i].parentElement.style.backgroundColor = 'rgb(115, 201, 229)';
          showOne = true;
      }
    }
  }
  else {
    for(let i = partitions.length - 1; i >= 0 ; i--) {
      sliderMenu[i].parentElement.style.backgroundColor = 'white';
      if(scrollHeight - pxToRem(partitions[i].offsetTop) > 1.5 && showOne === false) {
          sliderMenu[i].parentElement.style.backgroundColor = 'rgb(115, 201, 229)';
          showOne = true;
      }
    }
  }
  
  height = scrollHeight;
}