const carousel = document.getElementById('carousel');

for (let item=0;item<queriedDataArray.length;item++)
{
    let aStrig = `<div class="card_Container">
                        <img src="./img/${queriedDataArray[item].image}.webp" alt="a Photo" class="card_Img">
                        <div class="card_Title">${queriedDataArray[item].id}</div>
                        <div class="card_Info">${queriedDataArray[item].address}</div>
                  </div>`;
    $(aStrig).appendTo(carousel);    
}

function autoAdjustCardsOnResize() {
    let width=carousel.clientWidth;
    console.log(width);
    if (width>=470) 
    {
        console.log('nho hon 500');
        //$('#carousel').css("grid-template-columns","repeat(2, 1fr)");
        carousel.style['grid-template-columns'] = "repeat(3, 1fr)";
    }
    if (width<470) 
    {
        console.log('nho hon 400');
        //$('#carousel').css("grid-template-columns","repeat(2, 1fr)");
        carousel.style['grid-template-columns'] = "repeat(2, 1fr)";
    }
    if (width<300) 
    {
        console.log('nho hon 300');
       // $('#carousel').css("grid-template-columns","repeat (2, 1fr)");
        carousel.style['grid-template-columns'] = "repeat(1, 1fr)";
    }
}
   

// $(document).ready(function(){
//     $('.scrollbar-inner').scrollbar();
//     console.log(`vao ready`);
// });
