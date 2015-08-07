"use strict";


(function(){

  function createLargePic(img,event){
     var body = document.body;
     var lgImg = document.createElement('img');
     var imgSrc = img.getAttribute('src');
     var cx = event.clientX;
     var cy = event.clientY;
    // var sx = event.screenX;
    // var sy = event.screenY;


     var w = window.innerWidth * 0.3
     var h = window.innerHeight
     var imgX = img.offsetLeft;
     var imgY = img.offsetTop;
     var imgH = img.height;
     var bodyMarginTop = body.style.marginTop;
     var bodyMarginBottom = body.style.marginTop;
     removeLargePic();

     lgImg.setAttribute('src',imgSrc);
     lgImg.setAttribute('id','large');
     lgImg.style.width = w+'px';
     lgImg.style.left = imgX + 'px';
     //var top = (imgY + img.height - lgImg.height)>0? imgY + img.height - (lgImg.height - img.height): imgY;
     var top =  imgY-imgH+(bodyMarginTop + bodyMarginBottom);
     lgImg.style.top = top + 'px';

     body.appendChild(lgImg);

    // if(cy > lgImg.height){
    //  lgImg.style.top = cy - lgImg.height + 'px';
    // }else{
    //  lgImg.style.top = lgImg.height - cy + 'px';
    // }


     lgImg.addEventListener('mouseleave',removeLargePic,false);
  }

  function removeLargePic(){
    var lgImg = document.getElementById('large');
    var body = document.body;
    if(lgImg!=null){
      body.removeChild(lgImg);
    }
  }


  function ShowLarge(el){
     this.el = el;
     this.init();
   }

   ShowLarge.prototype.init = function(){
     this.getElement();
     this.bindEvent();
   }

   ShowLarge.prototype.getElement = function(){

     var elStr = this.el.toString();

     if(!isNaN(elStr)){
       throw new Error('the selector can not be the Number');
     }

     var firstChar = elStr.charAt(0);

     switch(firstChar){
       case '#':
       this.el = document.getElementById(elStr.substr(1));
       break;

       case '.':
       this.el = document.getElementsByClassName(elStr.substr(1));
       break;

       default:
       this.el = document.getElementsByTagName(elStr);
       break;
     }

     if(this.el.length == undefined){
       if(this.el.tagName != 'IMG'){
         throw new Error('the selector shall only be tag of img');
       }
     }else{
       if(this.el[0].tagName != 'IMG'){
         throw new Error('the selector shall only be tag of img');
       }
     }

   }

   ShowLarge.prototype.bindEvent = function(){

     if(this.el.length == undefined){

       this.el.removeEventListener('mouseover');
       this.el.removeEventListener('mouseleave');
       this.el.addEventListener('mouseover', function(event){
         createLargePic(this,event);
       });

       this.el.addEventListener('mouseleave', function(){
         removeLargePic();
       })

     }else{

       for(var i=0; i<this.el.length; i++){

          var curEl = this.el[i];

          curEl.addEventListener('mouseover', function(event){
            createLargePic(this,event);
          },false);

          curEl.addEventListener('mouseleave', function(e){
            console.log(e);

            if(!e.toElement||e.toElement.getAttribute('id')=='large'){
              return false;
            }
            removeLargePic();
          },false)
       }
     }

   }

  window.showLargePic = function(el){
    window.showlg = new ShowLarge(el)
  };

})();
