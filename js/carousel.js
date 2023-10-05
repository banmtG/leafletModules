const carousel = document.getElementById('carousel');
let theScrollID;
let SelectCardBtn= document.getElementById('SelectCardBtn');
let RemoveTopCardsBtn = document.getElementById('RemoveTopCardsBtn');
let showCarouselChild = document.getElementById('showCarouselChild');

showCarouselChild.addEventListener('click', (e)=>{
    console.log(carousel.children);
    console.log(`firstItemIndex`,firstItemIndex);
    console.log(`lastItemIndex`,lastItemIndex);
})

let peg=0;
let firstItemIndex,lastItemIndex;

theScrollID=middleItemID;

RemoveTopCardsBtn.addEventListener('click', (e)=>{
    loadForBeginCarousel();
    var position = document.getElementById('carousel').scrollTop;
    console.log(`position 1`, position);

   let card_Container=document.getElementsByClassName('card_Container');
   //console.log(card_Container);
   for (let i=0;i<6;i++)
   {
    carousel.removeChild(card_Container[card_Container.length-1]);
   }
  // console.log(card_Container);
  // console.log(card_Container.length);
   let htmlArray = [];
   let aString = "";
//    let aFrom = peg+0;
//    let aTo = peg+3;
   for (let i=0;i<6;i++)
    {
        let item=19-i;
       // console.log(item);
        aString = aString + `<div class="card_Container">
                            <img src="./img/${queriedDataArray[item].image}.jpg" loading="lazy" alt="a Photo" class="card_Img">
                            <div class="card_Title">${queriedDataArray[item].id}</div>
                            <div class="card_Info">${queriedDataArray[item].address}</div>
                      </div>`;
       
          
    }
    carousel.insertAdjacentHTML( 'afterbegin', aString );
    // $(aString).appendTo(carousel);   

   // console.log(card_Container);
   // console.log(card_Container.length);
    //document.getElementById("carousel").scrollTop = position;
    let position2 = document.getElementById('carousel').scrollTop;
    
   // console.log(`position 2`, position2);

 })

function loadForBeginCarousel()
{
    let aCssString = carousel.style['grid-template-columns'].toString();
    let columnNum = 3*parseInt(aCssString.substring(aCssString.indexOf('(')+1,aCssString.indexOf('(')+2));
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
        console.log(`firstItemIndex`,firstItemIndex);
        console.log(`columnNum`,columnNum);
        for (let i=columnNum;i>0;i--)
        {
            let item=firstItemIndex-i;
            console.log(item);
            aHtmlString = aHtmlString + `<div class="card_Container">
                                <img src="./img/${queriedDataArray[item].image}.jpg" loading="lazy" alt="a Photo" class="card_Img">
                                <div class="card_Title">${queriedDataArray[item].id}</div>
                                <div class="card_Info">${queriedDataArray[item].address}</div>
                        </div>`;            
        }

        carousel.insertAdjacentHTML( 'afterbegin', aHtmlString );
        firstItemIndex=firstItemIndex-columnNum;
        lastItemIndex=lastItemIndex-columnNum;
    }  
}

function loadForEndCarousel()
{
    let aCssString = carousel.style['grid-template-columns'].toString();
    let columnNum = 3*parseInt(aCssString.substring(aCssString.indexOf('(')+1,aCssString.indexOf('(')+2));
    console.log(`columnNum`, columnNum);
    let card_Container=document.getElementsByClassName('card_Container');
    console.log(`columnNum`,columnNum);
    console.log(`lastItemIndex`,lastItemIndex);
    let theLeftOver = queriedDataArray.length - lastItemIndex;
    if (columnNum>theLeftOver) columnNum=theLeftOver;

    console.log(`columnNum`,columnNum);
    console.log(`firstItemIndex`,firstItemIndex);
    console.log(`lastItemIndex`,lastItemIndex);

    if (columnNum>0 && lastItemIndex<queriedDataArray.length)
    {
        for (let i=0;i<columnNum;i++)
        {
            carousel.removeChild(card_Container[0]);
        }
        let htmlArray = [];
        let aHtmlString = "";

        for (let i=0;i<columnNum;i++)
        {
            let item=lastItemIndex+i;
            console.log(item);
            aHtmlString = aHtmlString + `<div class="card_Container">
                                <img src="./img/${queriedDataArray[item].image}.jpg" loading="lazy" alt="a Photo" class="card_Img">
                                <div class="card_Title">${queriedDataArray[item].id}</div>
                                <div class="card_Info">${queriedDataArray[item].address}</div>
                        </div>`;            
        }

        carousel.insertAdjacentHTML( 'beforeend', aHtmlString );
        firstItemIndex=firstItemIndex+columnNum;
        lastItemIndex=lastItemIndex+columnNum;
        console.log(lastItemIndex);
    }  
}

carousel.addEventListener("scrollend", (e) => {
    let addSwitch=0;
    
    if (document.getElementById("carousel").scrollTop==0) {
        var myElement = carousel.firstChild;    
        loadForBeginCarousel();
        myElement.scrollIntoView();
        addSwitch = 1;
    }
    let theHeight = $("#carousel").height();
   // let theHeight
   //console.log(carousel.scrollHeight);
   // console.log(carousel.scrollTop);
    //console.log(theHeight);
    let totalValue = theHeight + carousel.scrollTop;
   // console.log(totalValue);
    if (carousel.scrollHeight==totalValue) {
        var myElement = carousel.lastChild;    
        loadForEndCarousel();
        addSwitch = 1;
       // myElement.scrollIntoView();
    }

    if (addSwitch == 1)
    {
        $('.card_Container').on(`click`, function (e) {
            //get ID
            console.log(e.currentTarget.children[1]);
            var clicked_ID =  e.currentTarget.children[1].childNodes[0].data;
            $('#messageLog').html(queriedDataArray.length + " " + clicked_ID);
            console.log(`click`,clicked_ID);
            // apply background to seleted ID
            highLightSelection (clicked_ID);  
    
        });
    }
    // if (document.getElementById("carousel").scrollTop==0) {
    //     var myElement = carousel.lastChild;    
    //     RemoveTopCardsBtn.click();
    //     myElement.scrollIntoView();
    // }
    console.log(`scroll end`,addSwitch);
    console.log(`document.getElementById("carousel").scrollTop`,document.getElementById("carousel").scrollTop);
   //console.log(document.getElementById("carousel").scrollTop);
})

fromQueried2Carousel(queriedDataArray,theScrollID);

function get20Items(queriedDataArray,middleItemID)
{
    let the20ItemsArray = [];
   
    for (let index=0;index<queriedDataArray.length;index++)
    {
        if (queriedDataArray[index].id==middleItemID) 
        {
            console.log(index);
            firstItemIndex = index - 10;
            lastItemIndex = index + 10;
            if (firstItemIndex<0) {
                firstItemIndex=0;               
            }
            if (lastItemIndex>=queriedDataArray.length) {            
                lastItemIndex=queriedDataArray.length;
              //  firstItemIndex=lastItemIndex-20;
            }               
            break;
            console.log(`after break`);
        }       
       
    }

    for (let i=firstItemIndex;i<lastItemIndex;i++)    
        the20ItemsArray.push(queriedDataArray[i]);

    return the20ItemsArray;
}



function fromQueried2Carousel(sourceArray,item_ID) {
    carousel.innerHTML="";
    let htmlArray = [];
    let queriedDataArray=get20Items(sourceArray,item_ID);
    console.log(queriedDataArray);
    for (let item=0;item<queriedDataArray.length;item++)
    {
        htmlArray.push(`<div class="card_Container">
                            <img src="./img/${queriedDataArray[item].image}.jpg" loading="lazy" alt="a Photo" class="card_Img">
                            <div class="card_Title">${queriedDataArray[item].id}</div>
                            <div class="card_Info">${queriedDataArray[item].address}</div>
                      </div>`);
       
       // $(aStrig).appendTo(carousel);        
    }
   // console.log(htmlArray.join(""));
    carousel.innerHTML = htmlArray.join("");
    console.log(carousel.innerHTML);
    //highLightSelection (item_ID);  
    highLightSelection (item_ID);  
    //setTimeout($('#SelectCardBtn').trigger('click'),2000);

    $('.card_Container').on(`click`, function (e) {
        //get ID
        console.log(e.currentTarget.children[1]);
        var clicked_ID =  e.currentTarget.children[1].childNodes[0].data;
        $('#messageLog').html(queriedDataArray.length + " " + clicked_ID);
        console.log(`click`,clicked_ID);
        // apply background to seleted ID        
        highLightSelection (clicked_ID);  

    });
}

function findCardElement(id) {
    let cards_Collection = document.getElementsByClassName('card_Container'); // not array but HTMLCollection
    let cards_Array = Array.prototype.slice.call(cards_Collection);
    let res = cards_Array.filter((el) => el.children[1].childNodes[0].data==id)
    console.log(res[0]);
    return res[0];
}

function highLightSelection (id) {
    console.log(id);
    $('.card_Container').css('background',"");
    let element_withID = findCardElement(id);
    element_withID.style.background = `rgba(151, 151, 151, .9)  `;
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

    SelectCardBtn.addEventListener('click', (e)=>{
       // console.log(`click`);
        scroll2Selection(theScrollID);
    })

function scroll2Selection (id) {
    highLightSelection (id);
    let element_withID = findCardElement(id);    
    console.log(`element_withID`,element_withID);
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
    }
    if (width<900) 
    {
        //console.log('nho hon 500');
        //$('#carousel').css("grid-template-columns","repeat(2, 1fr)");
        carousel.style['grid-template-columns'] = "repeat(3, 1fr)";
    }
    if (width<660) 
    {
       // console.log('nho hon 400');
        //$('#carousel').css("grid-template-columns","repeat(2, 1fr)");
        carousel.style['grid-template-columns'] = "repeat(2, 1fr)";
    }
    if (width<370) 
    {
      //  console.log('nho hon 300');
       // $('#carousel').css("grid-template-columns","repeat (2, 1fr)");
        carousel.style['grid-template-columns'] = "repeat(1, 1fr)";
    }
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


