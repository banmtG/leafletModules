const carousel = document.getElementById('carousel');
const container = document.getElementsByTagName("body")[0];
let theScrollID;
let allSwipes=[];
let thePreLoadNum = 2;
const totalItemCard_Containers = 28; //must be even number
const SelectCardBtn= document.getElementById('SelectCardBtn');
// let RemoveTopCardsBtn = document.getElementById('RemoveTopCardsBtn');
const showCarouselChild = document.getElementById('showCarouselChild');

SelectCardBtn.addEventListener('click', (e)=>{
   // console.log(`click`);
    scroll2Selection(theScrollID);
})

let firstItemIndex,lastItemIndex;

theScrollID=middleItemID;

function templateString(houseObject) {
    let aStringImg = "";
    //console.log(houseObject);
    for (let i=0;i<houseObject.image.length;i++)
    {//loading="lazy"
          aStringImg = aStringImg + `<div><img loading="lazy" src="./img/estate/${houseObject.image[i]}.jpg"  alt="a Photo" class="card_Img"></div>`;
    }

    return `<div class="card_Container"> 
                <div class="card_imgCarousel swipe"><div class="swipe-wrap">${aStringImg}</div></div>
                <div class="card_dotCarousel_container"><div class="card_dotCarousel"></div></div>
                <div class="card_Title">${houseObject.id}</div>
                <div class="card_Info">${houseObject.address}</div>
            </div>`;               

}


function loadForBeginCarousel()
{
    let aCssString = carousel.style['grid-template-columns'].toString();
    let columnNum = thePreLoadNum*parseInt(aCssString.substring(aCssString.indexOf('(')+1,aCssString.indexOf('(')+2));
   // console.log(`columnNum`, columnNum);
    let card_Container=document.getElementsByClassName('card_Container');
   // console.log(`columnNum`,columnNum);
    //console.log(`firstItemIndex`,firstItemIndex);
    if (firstItemIndex<columnNum) columnNum=firstItemIndex;
   // console.log(`columnNum`,columnNum);
    if (columnNum>0 && firstItemIndex>=0)
    {
        for (let i=0;i<columnNum;i++)
        {
            carousel.removeChild(card_Container[card_Container.length-1]);
        }
        let htmlArray = [];
        let aHtmlString = "";
      //  console.log(`firstItemIndex`,firstItemIndex);
      //  console.log(`columnNum`,columnNum);
        for (let i=columnNum;i>0;i--)
        {
            let item=firstItemIndex-i;
           // console.log(item);
            aHtmlString = aHtmlString + templateString(queriedDataArray[item]);
        }

        carousel.insertAdjacentHTML( 'afterbegin', aHtmlString );
        setupImgCarousel();
        firstItemIndex=firstItemIndex-columnNum;
        lastItemIndex=lastItemIndex-columnNum;
    }  
}

function loadForEndCarousel()
{
    let aCssString = carousel.style['grid-template-columns'].toString();
    let columnNum = thePreLoadNum*parseInt(aCssString.substring(aCssString.indexOf('(')+1,aCssString.indexOf('(')+2));
   // console.log(`columnNum first int`, columnNum);
    let card_Container=document.getElementsByClassName('card_Container');
  //  console.log(`columnNum`,columnNum);
   // console.log(`lastItemIndex`,lastItemIndex);
    
    let theCurrentFirstItem = firstItemIndex;
    let theCurrentLastItem = lastItemIndex;

    let theLeftOver = queriedDataArray.length - lastItemIndex;
   // console.log(`theLeftOver`,theLeftOver);
    if (columnNum>theLeftOver) columnNum=theLeftOver;

    //console.log(`columnNum`,columnNum);
   // console.log(`firstItemIndex`,firstItemIndex);
    //console.log(`lastItemIndex`,lastItemIndex);

    if (columnNum>0 && lastItemIndex<queriedDataArray.length)
    {       
        for (let i=0;i<columnNum;i++)
        {
            carousel.removeChild(card_Container[0]);
        }

        setTimeout(function() {
            let htmlArray = [];
            let aHtmlString = "";
            for (let i=0;i<columnNum;i++)
            {
              //  console.log(`i`,i);
              //  console.log(`lastItemIndex`,theCurrentLastItem);
                let item=theCurrentLastItem+i;
               // console.log(`item`,item);
                aHtmlString = aHtmlString + templateString(queriedDataArray[item]);         
            }
            carousel.insertAdjacentHTML( 'beforeend', aHtmlString );
            setupImgCarousel();
        },1);

        

       

        firstItemIndex=theCurrentFirstItem+columnNum;
        lastItemIndex=theCurrentLastItem+columnNum;     
       
      // console.log(lastItemIndex);
    }  
}

let scrollDirection;
let oldScrollTop;

carousel.addEventListener("scroll", (e) => {
    //console.log(oldScrollTop);
    //console.log(carousel.scrollTop);
  //  console.log(`carousel.scrollHeight == `, carousel.scrollHeight);
    if (oldScrollTop>carousel.scrollTop) scrollDirection='up';
    if (oldScrollTop<carousel.scrollTop) scrollDirection='down';
    oldScrollTop=carousel.scrollTop;
   // console.log(scrollDirection);
    let addSwitch=0;
    let theHeight = $("#carousel").height();
    // let theHeight
    // console.log(`scrollHeight`, carousel.scrollHeight);
    ///  console.log(`theHeight`,theHeight);
      
    let totalValue = theHeight + carousel.scrollTop;
 //    console.log(`totalValue`,totalValue);
     
    if (document.getElementById("carousel").scrollTop<1 && scrollDirection=='up') {

        let myElement = carousel.firstChild;    
        loadForBeginCarousel();
        myElement.scrollIntoView();
        addSwitch = 1;
        
    }  
    let tuyetdoi = Math.abs(totalValue - carousel.scrollHeight);
    // console.log(`tuyet doi == `, tuyetdoi);
   //  console.log(`carousel.scrollHeight == `, carousel.scrollHeight);  
    if (tuyetdoi<11 && scrollDirection=='down') {
       // console.log(`vaof loadForEndCarousel`);
       
        let myElement = carousel.lastChild;    
        loadForEndCarousel();
        addSwitch = 1;
       // myElement.scrollIntoView();
    }

    if (addSwitch == 1)
    {
        $('#ajax-loader').show();

        // onImagesLoaded(container, function() {
        //     $('#ajax-loader').hide();
        // });`
        setTimeout(function() {
            $('#ajax-loader').hide();
        },1000);

        $('.card_Container').off('click');

        setTimeout(function() {
        $('.card_Container').on(`click`, function (e) {
            //get ID
            console.log(e.currentTarget);
            let thisCard=e.currentTarget;
            let thisCard_Title = e.currentTarget.getElementsByClassName('card_Title')[0];
           // e.currentTarget.getElementsByClassName
            let clicked_ID =  thisCard_Title.textContent;
            $('#messageLog').html(queriedDataArray.length + " " + clicked_ID);
           // console.log(`click`,clicked_ID);
            // apply background to seleted ID
            highLightSelection (clicked_ID);  
    
        });
        },2);

       
       
       


    }
    // if (document.getElementById("carousel").scrollTop==0) {
    //     var myElement = carousel.lastChild;    
    //     RemoveTopCardsBtn.click();
    //     myElement.scrollIntoView();
    // }
   // console.log(`scroll end`,addSwitch);
    //console.log(`document.getElementById("carousel").scrollTop`,document.getElementById("carousel").scrollTop);
   //console.log(document.getElementById("carousel").scrollTop);
})

function killAllSwipe()
{
    for (let i=0;i<allSwipes.length;i++)
    {
        allSwipes[i].theSwipe.kill();
    }
    allSwipes=[];
}

function setupImgCarousel()
{
   // console.log(`vaoImageCarousel`);
   let imgCarousels = document.getElementsByClassName('card_imgCarousel'); 
  // kill all Swipe
   killAllSwipe();
    // kill all Swipe

    for (const imgCarousel of imgCarousels) {   

        let thisID = imgCarousel.parentElement.getElementsByClassName('card_Title')[0].innerHTML;
        let this_ImgList = imgCarousel.getElementsByClassName('swipe-wrap')[0].children;
        //console.log(this_ImgList);
        let this_imgCarouselLength = this_ImgList.length;
        let theDotCarousel= imgCarousel.parentElement.getElementsByClassName('card_dotCarousel_container')[0].children[0];
       
      // Setup DOT CAROUSEL

        //console.log(length);
        let aDotString = "";
        // if (length>7) length = 7; // limit 5 dot for long list
        for (let i=0;i<this_imgCarouselLength;i++)
        aDotString = aDotString + `<i class="fa-solid fa-circle"></i>`;
        theDotCarousel.innerHTML=aDotString;
        adjustDotCarousel(theDotCarousel,0,this_imgCarouselLength);

        // Setup DOT CAROUSEL

        let mySwipe = new Swipe(imgCarousel, {
            startSlide: 0,
            draggable: true,
            autoRestart: false,
            continuous: false,
            disableScroll: true,
            stopPropagation: true,
            callback: function(index, element,dir) {
               console.log(index,element,dir);
                // console.log(`call back`);
                //showCarouselChild.click();
                adjustDotCarousel(theDotCarousel,index,this_imgCarouselLength);
                // console.log(this_ImgList[index].classList);

               
                // if (dir==-1)this_ImgList[index-1].classList.remove('show');
                // if (dir==1)this_ImgList[index+1].classList.remove('show');
            },
            transitionEnd: function(index, element) {
                // console.log(index,element);
                // console.log(`transitionEnd`);
                //showCarouselChild.click();
                // for (let i=0;i<this_ImgList.length;i++)
                // this_ImgList[i].children[0].classList.remove('show');

                // this_ImgList[index].children[0].classList.add('show');
            
               
            }
          });


        let aSwipeObject = {};
        aSwipeObject['id']=thisID;
        aSwipeObject['theSwipe']=mySwipe;

        // if (aSwipeObject.id=='82') aSwipeObject.theSwipe.kill();       
        allSwipes.push(aSwipeObject);

        


     
    }
   // console.log(allSwipes);
}

function applyClassToImgCarouselItems (theParent,position) {

}

function adjustDotCarousel(theDotCarousel,position,length)
{
  //  console.log(theDotCarousel.childNodes);
  //  console.log(position);
  //  console.log(length);

    theDotCarousel.childNodes.forEach(function(node, index) {
      // console.log(node);
       node.style.opacity = 0.7;
       node.classList.remove('theNode');
      //  console.log(i);
    });
    let i_next1= [];
    let size1= "8px";
    let i_next2= [];
    let size2= "5px";
    let i_next3= [];
    let size3= "2px";

    let Min = position -3;
    let Max = position +3;
    //console.log(`Min`,Min);
   // console.log(`Max`,Max);
    if (Min<0) { Max = Max - Min; Min = 0; }
    if (Max>length) { Min = length-7; Max = length-1; }
   // console.log(`Min`,Min);
   // console.log(`Max`,Max);

    for (let i=0;i<length;i++)
    {
        let tuyetdoi=Math.abs(i-position);
        if (tuyetdoi>0 && tuyetdoi<=1) i_next1.push(i);
        if (tuyetdoi>1 && tuyetdoi<=2) i_next2.push(i);
        if (tuyetdoi>2) i_next3.push(i);
    }
   // console.log(`i_next1`,i_next1);
   // console.log(`i_next2`,i_next2);
   // console.log(`i_next3`,i_next3);
    for (let i=0;i<length;i++)
    {
        if (i>=Min && i<=Max) theDotCarousel.childNodes[i].style.display = "block";
        else theDotCarousel.childNodes[i].style.display = "none";
    }
    // for (let i=Min;i<Max;i++)
    // {
    //     theDotCarousel.childNodes[i].style.display = "block";
    // }

    for (let i=0;i<i_next1.length;i++)
    {
        theDotCarousel.childNodes[i_next1[i]].style.fontSize = size1;
    }

    for (let i=0;i<i_next2.length;i++)
    {
        theDotCarousel.childNodes[i_next2[i]].style.fontSize = size2;
    }

    for (let i=0;i<i_next3.length;i++)
    {
        theDotCarousel.childNodes[i_next3[i]].style.fontSize = size3;
    }

    theDotCarousel.childNodes[position].style.opacity = 0.9;
    theDotCarousel.childNodes[position].style.fontSize = "10px";
    theDotCarousel.childNodes[position].classList.add('theNode');
}

function get20Items(queriedDataArray,middleItemID)
{
    let the20ItemsArray = [];

   
    for (let index=0;index<queriedDataArray.length;index++)
    {
        if (queriedDataArray[index].id==middleItemID) 
        {
           // console.log(index);
            firstItemIndex = index - totalItemCard_Containers/2;
            
            if (firstItemIndex<0) {
                firstItemIndex=0;    
                lastItemIndex = firstItemIndex + totalItemCard_Containers;  
                if (lastItemIndex>=queriedDataArray.length) {            
                    lastItemIndex=queriedDataArray.length;
                  //  firstItemIndex=lastItemIndex-20;
                }     
                break;        
            }

            lastItemIndex =  index + totalItemCard_Containers/2;

            if (lastItemIndex>=queriedDataArray.length) {            
                lastItemIndex=queriedDataArray.length;
                firstItemIndex= lastItemIndex - totalItemCard_Containers; 
                if (firstItemIndex<0) {
                    firstItemIndex=0;    
                }     
                break;        
            }
            console.log(`after break`);
        }       
       
    }

    for (let i=firstItemIndex;i<lastItemIndex;i++)    
        the20ItemsArray.push(queriedDataArray[i]);
    
        console.log(the20ItemsArray);
        console.log(`firstItemIndex`,firstItemIndex);
        console.log(`lastItemIndex`,lastItemIndex);
    return the20ItemsArray;
}



function fromQueried2Carousel(sourceArray,item_ID) {
    carousel.innerHTML="";
    let htmlArray = [];
    let queriedDataArray=get20Items(sourceArray,item_ID);
   // console.log(queriedDataArray);
    for (let item=0;item<queriedDataArray.length;item++)
    {
        htmlArray.push(templateString(queriedDataArray[item]));
       
       // $(aStrig).appendTo(carousel);        
    }

    let htmlDummyArray = [];
    if (queriedDataArray.length<9) 
    {
        for (i=0;i<9-queriedDataArray.length;i++)
        htmlDummyArray.push(`<div class="card_Container1">
                            <img src="" loading="lazy" alt=" " class="card_Img">
                            <div class="card_Title"></div>
                            <div class="card_Info"></div>
                      </div>`);
    }
   // console.log(htmlArray.join(""));
    carousel.innerHTML = htmlArray.join("");
    carousel.insertAdjacentHTML( 'beforeend', htmlDummyArray.join(""));
   // console.log(carousel.innerHTML);
    //highLightSelection (item_ID);  
    highLightSelection (item_ID);  
    $('.card_Container').off('click');
    $('.card_Container').on(`click`, function (e) {
        //get ID
        console.log(e.currentTarget);
        let thisCard=e.currentTarget;
        let thisCard_Title = e.currentTarget.getElementsByClassName('card_Title')[0];
       // e.currentTarget.getElementsByClassName
        let clicked_ID =  thisCard_Title.textContent;
        // $('#messageLog').html(queriedDataArray.length + " " + clicked_ID);
        // console.log(`click`,clicked_ID);
        // apply background to seleted ID
        highLightSelection (clicked_ID);  

    });

    setupImgCarousel();

}

$(document).ready(function() {
   // openFullscreen();
    fromQueried2Carousel(queriedDataArray,theScrollID);
    // $('#carousel').css('display','block');
    $('#SelectCardBtn').trigger('click');
    // RemoveTopCardsBtn.addEventListener('click', (e)=>{
    //     openFullscreen();    
    // })
    
   
    // let aCssString = carousel.style['grid-template-columns'].toString();
    // let columnNum = parseInt(aCssString.substring(aCssString.indexOf('(')+1,aCssString.indexOf('(')+2));
    // console.log(columnNum);
    // let card_Container=document.getElementsByClassName('card_Container')[0];
    // console.log(card_Container);
   
    // let heightofOneContainer=card_Container.offsetHeight;
    // console.log(heightofOneContainer);
    // if (queriedDataArray.length<=columnNum*2) {
    //     console.log(`case 1`);
    //     console.log($('#map').height()*2/3);
    //     carousel.style.height=`${$('#map').height()*2/3}px`;
    // }

    // if (queriedDataArray.length<=columnNum) {
    //     console.log(`case 2`);
    //     console.log($('#map').height()/3);
    //     carousel.style.height=`${$('#map').height()/3}px`;
    // }

});


function findCardElement(id) {
    let cards_Collection = document.getElementsByClassName('card_Container'); // not array but HTMLCollection
 //  console.log(`in findcardElemnt`);
   for (const card of cards_Collection) {
    //console.log(card.getElementsByClassName('card_Title')[0].textContent);
    if (card.getElementsByClassName('card_Title')[0].textContent==id) {
      //  console.log(card);
        return card;
    }
   }

    // let cards_Array = Array.prototype.slice.call(cards_Collection);
    // let res = cards_Array.filter((el) => el.getElementsByClassName('card_Title')[0].data==id)
    // console.log(res[0]);
    // return res[0];
}

function highLightSelection (id) {
    //console.log(id);
    $('.card_Container').css('background',"");
    let element_withID = findCardElement(id);
   // console.log(element_withID);
    element_withID.style.background = `rgba(151, 151, 151, .4)  `;
}
    // let aTarget;
    // aTarget = document.getElementsByClassName('card_Container');
    // let arr = Array.prototype.slice.call(aTarget);
    // //aTarget = $('.card_Container');
    
    // console.log(aTarget);
    // console.log(arr);
    // let res = arr.filter((el) => el.children[1].childNodes[0].data==id)
    // console.log(res);
    // // console.log(e.currentTarget.style.background);
    // res[0].style.background = `rgba(151, 151, 151, .4)  `;



function scroll2Selection (id) {
  //  highLightSelection (id);
    let element_withID = findCardElement(id);    
   // console.log(`element_withID`,element_withID);
   // console.log(isElementXPercentInViewport(element_withID,100));
   element_withID.scrollIntoView();
   // console.log(isElementXPercentInViewport(element_withID,100));
}


function autoAdjustCardsOnResize() {
   // console.log(`vao autoAdjustCardsOnResize`);
    let width=carousel.clientWidth;
   // console.log(width);
   if (width>=900) 
    {
        //console.log('nho hon 500');
        //$('#carousel').css("grid-template-columns","repeat(2, 1fr)");
        carousel.style['grid-template-columns'] = "repeat(4, 1fr)";
        $('.card_Container1').show();
        thePreLoadNum = 2;
    }
    if (width<900) 
    {
        //console.log('nho hon 500');
        //$('#carousel').css("grid-template-columns","repeat(2, 1fr)");
        carousel.style['grid-template-columns'] = "repeat(3, 1fr)";
        $('.card_Container1').show();
        thePreLoadNum = 3;
    }
    if (width<690) 
    {
       // console.log('nho hon 400');
        //$('#carousel').css("grid-template-columns","repeat(2, 1fr)");
        carousel.style['grid-template-columns'] = "repeat(2, 1fr)";
       $('.card_Container1:not(:last)').hide();
       thePreLoadNum = 7;
    }
    if (width<430) 
    {
      //  console.log('nho hon 300');
       // $('#carousel').css("grid-template-columns","repeat (2, 1fr)");
        carousel.style['grid-template-columns'] = "repeat(1, 1fr)";
        $('.card_Container1').hide();
        thePreLoadNum = 15;
        // let theWidth_SwipeWrap=$('.swipe-wrap').width();
        // console.log(theWidth_SwipeWrap);
        // $('.swipe-wrap div').css('height',`${theWidth_SwipeWrap}px`);
        // $('.card_Container').css(`grid-template-rows`,`${theWidth_SwipeWrap}px 0 25px minmax(25px, auto)`);
      
    }
    setupImgCarousel();
}

const isElementXPercentInViewport = function(el, percentVisible) {
    let
      rect = el.getBoundingClientRect(),
      windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  
    return !(
      Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
    )
  };


  function onImagesLoaded(container, event) {
    let images = container.getElementsByTagName("img");
    let loaded = images.length;
    for (let i = 0; i < images.length; i++) {
        if (images[i].complete) {
            loaded--;
        }
        else {
            images[i].addEventListener("load", function() {
                loaded--;
                if (loaded == 0) {
                    event();
                }
            });
        }
        if (loaded == 0) {
            event();
        }
    }
}







// showCarouselChild.addEventListener('click', (e)=>{
//     let theElement = findCardElement('82');
//     let theImgCarousel = theElement.getElementsByClassName('swipe-wrap')[0];
//     let houseObject = queriedDataArray[82];
//     let aStringImg = "";
//     for (let i=1;i<houseObject.image.length;i++)
//     {//loading="lazy"
//         aStringImg = aStringImg + `<div><img src="./img/estate/${houseObject.image[i]}.jpg"  alt="a Photo" class="card_Img"></div>`;
//     }
//     theImgCarousel.insertAdjacentHTML( 'beforeend', aStringImg );
//      // kill all Swipe



//     let obj = allSwipes.find(o => o.id === '82');
//     console.log(obj);
//     obj.theSwipe.kill();

//     allSwipes = allSwipes.filter(function( obj ) {
//         return obj.id !== '82';
//     });

//     console.log(theImgCarousel);

//     window.mySwipe = new Swipe(theImgCarousel.parentElement, {
//              startSlide: 0,
//              draggable: true,
//              autoRestart: false,
//              continuous: false,
//              disableScroll: false,
//              stopPropagation: true,
//              callback: function(index, element) {
//                  console.log(index,element);
//                  console.log(`call back`);
//              },
//              transitionEnd: function(index, element) {
//                  console.log(index,element);
//                  console.log(`transitionEnd`);
//              }
//            });

//     let aSwipeObject = {};
//     aSwipeObject['id']='82';
//     aSwipeObject['theSwipe']=window.mySwipe;

//     allSwipes.push(aSwipeObject);
//     console.log(allSwipes);

//     // allSwipes.push(window.mySwipe);

//     console.log(theImgCarousel);
// })



// function scrollHandler(e) {

//     var timeOut = 150;

//     clearTimeout(e.target.scrollTimeout); 

//     let theWidth = e.target.children[0].getBoundingClientRect().width;
//     let theLength = e.target.children.length;
//     let anArray = [];
//     for (let i=0;i<theLength;i++)
//         anArray.push(i*theWidth);
//    // console.log(anArray);

//     let snapPosition=checkClosestPosition(anArray,e.target.scrollLeft);
//   //  console.log(`snapPosition`,snapPosition);
//     let positionI = anArray.indexOf(snapPosition);
//     if (positionI==-1) positionI=theLength-1;
//    // console.log(anArray[theLength-1]);
//     let theDotCarousel = e.target.parentElement.getElementsByClassName('card_dotCarousel_container')[0].children[0];
//     adjustDotCarousel(theDotCarousel,positionI,theLength);


//     e.target.scrollTimeout = setTimeout(function() {
//         //using the timeOut to evaluate scrolling state
//         if (!timeOut) {
//            // console.log('Scroller snapped!');
//         } else {     
//             let theWidth = e.target.children[0].getBoundingClientRect().width;
//     let theLength = e.target.children.length;
//     let anArray = [];
//     for (let i=0;i<theLength;i++)
//         anArray.push(i*theWidth);
//    // console.log(anArray);

//     let snapPosition=checkClosestPosition(anArray,e.target.scrollLeft);
//    // console.log(`snapPosition`,snapPosition);
//     let positionI = anArray.indexOf(snapPosition);
//     if (positionI==-1) positionI=theLength-1;
//    // console.log(anArray[theLength-1]);
//     let theDotCarousel = e.target.parentElement.getElementsByClassName('card_dotCarousel_container')[0].children[0];
//     adjustDotCarousel(theDotCarousel,positionI,theLength);
//         //     let snapPosition=checkClosestPosition(anArray,e.target.scrollLeft);
//         //     console.log(`snapPosition`,snapPosition);
//         //     let positionI = anArray.indexOf(snapPosition);
//         //     if (positionI==-1) positionI=theLength-1;
//         //    // console.log(anArray[theLength-1]);
//         //     // let theDotCarousel = e.target.parentElement.getElementsByClassName('card_dotCarousel_container')[0].children[0];
//         //     adjustDotCarousel(theDotCarousel,positionI,theLength);
//             if (snapPosition<=anArray[theLength-1]) {
//                 e.target.scrollTo({
//                     left: snapPosition,
//                     behavior: "smooth",
//                 })
//                // e.target.scrollLeft = snapPosition;
//             }
//            // console.log(`image is selected`,positionI);
//         }
//     }, timeOut);
   
// }
