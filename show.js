"use strict";


(function(){
//  var img = document.getElementsByTagName('img')[0];
//  img.addEventListener('mouseover', function(){
//    createLargePic();
//  });
//
//  img.addEventListener('mouseleave', function(){
//    removeLargePic();
//  })
  function createLargePic(){
     var body = document.body;
     var lgImg = document.createElement('img');
     lgImg.setAttribute('src','./img/1.jpg');
     lgImg.setAttribute('id','large');
     body.appendChild(lgImg);
  }

  function removeLargePic(){
    var lgImg = document.getElementById('large');
    var body = document.body;
    body.removeChild(lgImg);
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

     if(this.el.tagName != 'IMG'){
       throw new Error('the selector shall only be tag of img');
     }

   }

   ShowLarge.prototype.bindEvent = function(){
      this.el.addEventListener('mouseover', function(){
       createLargePic();
     });

     this.el.addEventListener('mouseleave', function(){
       removeLargePic();
     })

   }

  window.showLargePic = function(el){
    window.showlg = new ShowLarge(el)
  };

})();
