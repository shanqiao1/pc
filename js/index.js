

window.addEventListener('DOMContentLoaded',function () {

    var liNodes = document.querySelectorAll('.nav li');
    var arrowsNodes = document.querySelector('.arrow');
    var downNodes = document.querySelectorAll('.down');
    var contentUlNode = document.querySelector('.content-main');
    var contentNode = document.querySelector('.content');
    var contentHeight = contentNode.offsetHeight;
    var arrowWidth = arrowsNodes.offsetWidth/2;
    var nowindex = 0;
    var WheelTimer = null;

    /*头部*/
    headerHand();
    function headerHand() {



      arrowsNodes.style.left = liNodes[0].getBoundingClientRect().left + liNodes[0].offsetWidth / 2 - arrowWidth + 'px';
      downNodes[0].style.width = '100%';

      for (var i = 0; i < liNodes.length; i++) {
          liNodes[i].index = i;

          liNodes[i].onclick = function () {
              move(this.index);
          }
      }
  }
     /*公共的代码*/
    function move(nowindex) {
       for(var j=0;j<downNodes.length;j++){
            downNodes[j].style.width = '0'
        }
         downNodes[nowindex].style.width='100%';

         arrowsNodes.style.left =  liNodes[nowindex].getBoundingClientRect().left + liNodes[nowindex].offsetWidth/2 - arrowWidth+'px';

          contentUlNode.style.top = -contentHeight *nowindex +'px'

    }

    /*内容区*/
    contentHandle();
    function contentHandle() {
    document.onmousewheel = wheel;
    document.addEventListener('DOMMouseScroll',wheel);
    function wheel(event) {
        event = event || window.event;
        clearTimeout(WheelTimer);
        WheelTimer = setTimeout(function () {
            var flag = '';
            if (event.wheelDelta) {
                //ie/chrome
                if (event.wheelDelta > 0) {
                    flag = 'up';
                } else {
                    flag = 'down'
                }
            } else if (event.detail) {
                //firefox
                if (event.detail < 0) {
                    flag = 'up';
                } else {
                    flag = 'down'
                }
            }

            switch (flag) {
                case 'up' :
                    if(nowindex>0){
                        nowindex--;
                        move(nowindex);
                    }

                    break;
                case 'down' :
                    if(nowindex<4){
                        nowindex++
                        move(nowindex);
                    }

                    break;
            }

            //禁止默认行为

        },200);
        event.preventDefault && event.preventDefault();
        return false;

    }
    }

    window.onresize = function () {
        arrowsNodes.style.left =  liNodes[nowindex].getBoundingClientRect().left + liNodes[nowindex].offsetWidth/2 - arrowWidth+'px';

        contentUlNode.style.top = -contentHeight *nowindex +'px'
    }


})
