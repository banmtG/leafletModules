const anArrayPosition=[0,35,50,60,80,100];
const gutterSize=3;
let preOrient='';

function checkClosestPosition(anArray,value) {    
    let Pos;
    for (let i=0;i<anArray.length-1;i++)
    {
        if ((anArray[i]<=value)&&(value<=anArray[i+1])) {
            Pos=i;
            break;
        }        
    }
   // console.log(Pos);
    return (Math.abs(anArray[Pos] - value) < Math.abs(anArray[Pos+1] - value) ? anArray[Pos] : anArray[Pos+1]);
   
}

$(window).on( "resize", function() {

    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function(){
        console.log('Resized finished.');
        setupGridSplit();
        autoAdjustCardsOnResize();
    }, 50);
//     theWidth =  $("#content-grid").width();
//     //console.log(theWidth);
//     let snapPercent=$("#windowStateMap").val();
//    // console.log(snapPercent);
//     let snapPos=snapPercent*theWidth/100;        
//    // console.log(`snapPos`,snapPos);  
//     //$("#aMap").width(snapPos);
//     let leftOver = theWidth - gutterSize - snapPos;
//     if (leftOver<0) {
//         leftOver=0;
//         snapPos=theWidth-gutterSize;
//     }
//     //console.log(`leftOver`,leftOver);
   // document.querySelector('#content-grid').style['grid-template-columns'] = `${snapPos}px ${gutterSize}px ${leftOver}px`;
    // adjustSplitGridDirection();
  
} );


$( document ).ready(function() {
    setupGridSplit();
});

function setupGridSplit ()
{
    let theWidth =  $("#content-grid").width();
    let theHeight =  $("#content-grid").height();
    let orient;
   // console.log(theWidth);
  //  console.log(theHeight);
    const grid = document.getElementById('content-grid');
    const gutter = document.createElement('div');

    const split = Split({
        columnMinSize: 0,
        onDrag: function () {
            let snapPercent;          
            let theWidth =  $("#content-grid").width();
            let position=$("#map").width();
            let percent = parseInt(position/theWidth*100);
            //snapPercent =checkClosestPosition(anArrayPosition,percent);
            $('#messageLog').html(percent);
        },

        onDragEnd: function (orient) {
            reDrawSplit(orient);
            // console.log(`drag end`);
            // console.log(orient);
        }
    });

    if (theWidth>=900&&preOrient!='column') {
        console.log(preOrient);
        $('.gutter-col').remove();
        $('.gutter-row').remove();
        grid.style.removeProperty('grid-template-rows');
        grid.style.removeProperty('grid-template-columns');
        //split.removeColumnGutter(1,true);
        console.log(`remove Column Gutter`);
        split.addColumnGutter(gutter, 1);
        gutter.className = "gutter-col gutter-col-1";
        gutter.innerHTML='<div class="overLapIcon"><img src="./img/row-resize-icon.png" alt="sample"><div>';
        document.querySelector('#content-grid').style['grid-template-columns'] = `1fr ${gutterSize}px 1fr`;
        console.log('add column gutter');
        orient = 'column';
        preOrient = orient;
    }

    if (theWidth<900&&preOrient!='row') {
        console.log(preOrient);
        // split.removeRowGutter(1,true);
        $('.gutter-col').remove();
        $('.gutter-row').remove();
        grid.style.removeProperty('grid-template-rows');
        grid.style.removeProperty('grid-template-columns');
        // split.removeColumnGutter(1,true);
        console.log(`remove Row Gutter`);
        split.addRowGutter(gutter, 1);
        gutter.className = "gutter-row gutter-row-1";
        gutter.innerHTML='<div class="overLapIcon"><img src="./img/column-resize-icon.png" alt="sample"><div>';

        document.querySelector('#content-grid').style['grid-template-rows'] = `1fr ${gutterSize}px 1fr`;
        console.log('add row gutter');
        orient = 'row';
        preOrient = orient;
    }

    setTimeout(function(){ map.invalidateSize()}, 100);
    grid.appendChild(gutter);    
    //split.addColumnGutter(gutter, 1);
    autoAdjustCardsOnResize();
}


function reDrawSplit(orient) {
   // console.log(`vao orient`,orient);
    let snapPercent;
    if (orient=='column') {
        let theWidth =  $("#content-grid").width();
        let position=$("#map").width();
        let percent = parseInt(position/theWidth*100);
        //snapPercent = percent;
        snapPercent =checkClosestPosition(anArrayPosition,percent);
        let snapPos=snapPercent*theWidth/100;      
        let leftOver = theWidth - gutterSize - snapPos;
        if (leftOver<0) {
            leftOver=0;
            snapPos=theWidth-gutterSize;
        }
        document.querySelector('#content-grid').style['grid-template-columns'] = `${snapPos}px ${gutterSize}px ${leftOver}px`;
    }
   
    if (orient=='row') {
        let theHeight =  $("#content-grid").height();
       // console.log(theHeight);
        let position=$("#map").height();
        let percent = parseInt(position/theHeight*100);
       // snapPercent = percent;
        snapPercent=checkClosestPosition(anArrayPosition,percent);
        let snapPos=snapPercent*theHeight/100;   
        let leftOver = theHeight - gutterSize - snapPos;
        if (leftOver<0) {
            leftOver=0;
            snapPos=theHeight-gutterSize;
        }
        document.querySelector('#content-grid').style['grid-template-rows'] = `${snapPos}px ${gutterSize}px ${leftOver}px`;
    }
    
   
/////////////////////////////////////

    $("#windowStateMap").val(snapPercent);
    // const windowStateMap = document.getElementById('windowStateMap');
    // const event = new Event('blur');
    // windowStateMap.dispatchEvent(event);

/////////////////////////////////////  
   
    setTimeout(function(){ map.invalidateSize()}, 100);
    autoAdjustCardsOnResize();
}
// function fromHiddenStateBox2Appearance() {
//     console.log(`vao fromHiddenStateBox2Appearance`);
//     console.log($('#windowStateMap').val());
//     let snapPercent=$('#windowStateMap').val();
//     console.log(snapPercent);
//     let snapPos=snapPercent*theWidth/100;        
//     console.log(`snapPos`,snapPos);      
//     let leftOver = theWidth - gutterSize - snapPos;
//     if (leftOver<0) {
//         leftOver=0;
//         snapPos=theWidth-gutterSize;
//     }
//     console.log(`leftOver`,leftOver);
//     document.querySelector('.lastRow').style['grid-template-columns'] = `${snapPos}px ${gutterSize}px ${leftOver}px`;
 
//     // $('.stateWindow').each(function () {
//     //     console.log('vao stateWindow');
//     //     console.log(this.id);
//     //     console.log(this.value);
//     //             
//     // })
//  }