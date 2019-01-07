

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
    move(1)
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
     /*窗口变化调整小箭头*/
    window.onresize = function () {
        arrowsNodes.style.left =  liNodes[nowindex].getBoundingClientRect().left + liNodes[nowindex].offsetWidth/2 - arrowWidth+'px';

        contentUlNode.style.top = -contentHeight *nowindex +'px'
    }

    firstViewHandle();
    function firstViewHandle() {
        var homeCaruselNodes = document.querySelectorAll('.home-carousel li');
        var homePointNodes = document.querySelectorAll('.home-point li');
        var homeNode = document.querySelector('.home');

        var lastindex=0;
        var nowindex=0;
        var lastTime=0;
        var timer = null;
        for(var i=0;i<homePointNodes.length;i++){

            homePointNodes[i].index= i;

            homePointNodes[i].onclick=function () {
                    /*当前时间*/
                    var nowTime = Date.now();
                    /*轮播小于两秒不生效*/
                    if( nowTime-lastTime<=2000) return;
                    /*同步上一次点击时间*/
                    lastTime = nowTime;
                    nowindex = this.index;
                    var thar = this;
                    if(nowindex === lastindex) return;

                    if(nowindex > lastindex){
                        homeCaruselNodes[nowindex].className = 'common-title right-show';
                        homeCaruselNodes[lastindex].className = 'common-title left-hide';
                    }else{
                        homeCaruselNodes[nowindex].className = 'common-title left-show';
                        homeCaruselNodes[lastindex].className = 'common-title right-hide';
                    }

                    homePointNodes[lastindex].className= '';
                    this.className ='active';

                    lastindex = nowindex;

            }
        }
        homeNode.onmouseenter = function () {
            clearInterval(timer);
        };
        homeNode.onmouseleave = function () {
            autoPlay();
        };
        autoPlay();
       function autoPlay() {
           timer=setInterval(function () {
               nowindex++;
               lastTime = Date.now();
               if(nowindex>=4) nowindex=0;
               homeCaruselNodes[nowindex].className = 'common-title right-show';
               homeCaruselNodes[lastindex].className = 'common-title left-hide';
               homePointNodes[lastindex].className= '';
               homePointNodes[nowindex].className ='active';
               lastindex = nowindex;

           },2500);
       }
    }


})
