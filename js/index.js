
/*小箭头*/
window.onload=function () {

    /*头部*/
    headerHand();
  function headerHand() {
      var liNodes= document.querySelectorAll('.nav li');
      var arrowsNodes = document.querySelector('.arrows');
      var downNodes=document.querySelectorAll('.down');




      arrowsNodes.style.left = liNodes[0].getBoundingClientRect().left + liNodes[0].offsetWidth/2 - arrowsNodes.offsetWidth/2+'px';
      downNodes[0].style.width='100%';

      for(var i=0;i<liNodes.length;i++){
          liNodes[i].index= i;

          liNodes[i].onclick=function () {
              for(var j=0;j<downNodes.length;j++){
                  downNodes[j].style.width = '0'
              }

              downNodes[this.index].style.width='100%';


              arrowsNodes.style.left = this.getBoundingClientRect().left + this.offsetWidth/2 - arrowsNodes.offsetWidth/2+'px';
          }
      }
  }


}
