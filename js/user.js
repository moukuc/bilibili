



const publish = document.getElementsByClassName('publish')[0];
const publishInput = publish.getElementsByClassName('text_input')[0];
const lineHeight = 0.25

publishInput.addEventListener('keydown', handlePublishInputKeydownAndUp);
publishInput.addEventListener('keyup', handlePublishInputKeydownAndUp);
function handlePublishInputKeydownAndUp(event) {
  console.log(event.keyCode)
  let publishHeight = pxToRem(publishInput.offsetHeight);
  if(publishHeight >= 10 * lineHeight) {
    publishInput.style.height = 10 * lineHeight + 'rem';
    publishInput.style.overflow = 'auto';
  }
  else if(publishInput.style.overflow == 'auto') {
    publishInput.style = '';
    publishHeight = pxToRem(publishInput.offsetHeight);
    if(publishHeight >= 9 * lineHeight) {
      publishInput.style.height = 10 * lineHeight + 'rem';
      publishInput.style.overflow = 'auto';
    }
  }
}


//用户栏移入移出动态
const user = document.getElementsByClassName('user')[0];
const userData = user.getElementsByClassName('user_data')[0];
const userImg = user.getElementsByClassName('img')[0];
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


//搜索栏基本交互
const search = document.getElementsByClassName('search')[0];
const searchInput = search.getElementsByTagName('input')[0];
const searchHistory = search.getElementsByClassName('search_history')[0];
//拷贝预设好的一个节点并删除
let tempHistoryNode = searchHistory.getElementsByTagName('li')[0];
const searchHistoryElem = tempHistoryNode.cloneNode(true);
tempHistoryNode.parentNode.removeChild(tempHistoryNode);
searchHistory.addEventListener('click', handleSearchHistoryClick);
function handleSearchHistoryClick(event) {
  let target = event.target;
  let historyList = searchHistory.getElementsByTagName('li');
  for(let i = 0; i < historyList.length; i++) {
    if(historyList[i].contains(target)) {
      if(historyList[i].getElementsByTagName('svg')[0].contains(target)) {
        historyList[i].parentNode.removeChild(historyList[i]);
      }
    }
  }
  if(historyList.length == 0) {
    searchHistory.style.display = 'none';
  }
}
searchInput.addEventListener('focus', handleSearchFocus);
function handleSearchFocus() {
  let historyList = searchHistory.getElementsByTagName('li');
  if(historyList.length != 0)
    searchHistory.style.display = 'flex';
}
searchInput.addEventListener('keydown', handleSearchInputKeyDown);
function handleSearchInputKeyDown(event) {
  let keyCode = event.keyCode;
  if(keyCode == 13) {
    let inputStr = searchInput.value.trim();
    searchInput.value = '';
    if(inputStr != '') {
      let historyList = searchHistory.getElementsByTagName('li');
      if(historyList.length == 10) {
        searchHistory.removeChild(historyList[historyList.length - 1])
      }
      if(historyList.length == 0) {
        searchHistory.style.display = 'flex';
      }
      let newNode = searchHistoryElem.cloneNode(true);
      newNode.getElementsByTagName('span')[0].innerHTML = inputStr;
      searchHistory.insertBefore(newNode, historyList[0]);
    }
  }
}
window.addEventListener('click', handleWindowClick);
function handleWindowClick(event) {
  let target = event.target;
  if(search.contains(target) == false) {
    if(target.getAttribute('name') != 'del')
      searchHistory.style.display = 'none';
  }
}

function pxToRem(px) {
  return px / rem;
}

//动态设置rem的值
let rem =  window.innerWidth >= 1150 ? 5.2631578947368 * window.innerWidth / 100 : 60;
window.onresize = handleWindowResize;
function handleWindowResize() {
  rem =  window.innerWidth >= 1150 ? 5.2631578947368 * window.innerWidth / 100 : 60;
}