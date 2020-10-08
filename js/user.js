
//基本的评论和转发功能
const message = document.getElementsByClassName('messages')[0];
message.addEventListener('click', handleMessageClick);
function handleMessageClick(event) {
  const messages = document.getElementsByClassName('message');
  let target = event.target;
  for(let i = 0; i < messages.length; i++) {
    if(messages[i].contains(target) == true) {
      let operations = messages[i].getElementsByClassName('operations')[0];
      if(messages[i].className.indexOf('image') != -1) {
        if(messages[i].getElementsByClassName('images')[0].contains(target) == true) {
          let image = messages[i].getElementsByClassName('images')[0];
          image.style.width = pxToRem(image.offsetWidth) > 4 ? '2.7rem' : '5.7rem'
        }
      }
      if(operations.getElementsByClassName('like')[0].contains(target) == true) {
        let like = messages[i].getElementsByClassName('like')[0];
        let text = like.getElementsByTagName('span')[0];
        if(like.style.color != 'rgb(251, 114, 153)') {
          like.style.color = 'rgb(251, 114, 153)';
          if(text.innerHTML - 1 >= 0) {
            text.innerHTML = text.innerHTML - 1 + 2;
          }
        }
        else {
          like.style.color = '';
          if(text.innerHTML - 1 >= 0) {
            text.innerHTML = text.innerHTML - 1;
          }
        }
      }
      if(operations.getElementsByClassName('forward')[0].contains(target) == true) {
        let forward = messages[i].getElementsByClassName('forward')[2];
        let comment = null;
        if(messages[i].className.indexOf('vedio') != -1) {
          comment = messages[i].getElementsByClassName('comment')[2];
        }
        else {
          comment = messages[i].getElementsByClassName('comment')[1];
        }
        if(operations.getElementsByClassName('forward')[0].style.color != 'rgb(251, 114, 153)') {
          forward.style.display = 'block';
          comment.style.display = 'none';
          operations.getElementsByClassName('comment')[0].style.color = '';
          operations.getElementsByClassName('forward')[0].style.color = 'rgb(251, 114, 153)';
        }
        else {
          forward.style.display = 'none';
          operations.getElementsByClassName('forward')[0].style.color = '';
        }
      }
      if(operations.getElementsByClassName('comment')[0].contains(target) == true) {
        let comment = null;
        let forward = messages[i].getElementsByClassName('forward')[2];
        if(messages[i].className.indexOf('vedio') != -1) {
          comment = messages[i].getElementsByClassName('comment')[2];
        }
        else {
          comment = messages[i].getElementsByClassName('comment')[1];
        }
        console.log(comment)
        if(operations.getElementsByClassName('comment')[0].style.color != 'rgb(251, 114, 153)') {
          
          comment.style.display = 'block';
          forward.style.display = 'none';
          operations.getElementsByClassName('forward')[0].style.color = '';
          operations.getElementsByClassName('comment')[0].style.color = 'rgb(251, 114, 153)';
        }
        else {
          comment.style.display = 'none';
          operations.getElementsByClassName('comment')[0].style.color = '';
        }
      }
    }
  }
}


//话题栏的position:sticky效果
const topic = document.getElementsByClassName('topic_2')[0];
window.addEventListener('scroll', handleTopicScroll);
function handleTopicScroll() {
  let scrollHeight = pxToRem(document.body.scrollTop == 0 ? document.documentElement.scrollTop : document.body.scrollTop);
  if(scrollHeight <= 2.7) {
    topic.style.top = '2.7rem'
  }
  else {
    topic.style.top = scrollHeight + 'rem'
  }
}

//发表动态的文本框高度控制
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