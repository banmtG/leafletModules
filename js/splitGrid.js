let anArrayPosition=[0,30,50,70,100];
let theWidth =  $(".lastRow").width();
let gutterSize=5;
console.log(theWidth);
Split({
    columnMinSize: 15,
    columnGutters: [{
        track: 1,
        element: document.querySelector('.gutter-col-1'),
    }],
    onDragEnd: (e) => {      
        let position=$("#aMap").width();
        console.log(position);
        let percent = parseInt(position/theWidth*100);
        console.log(`percent`,percent);  
        let snapPercent=checkClosestPosition(anArrayPosition,percent);
/////////////////////////////////////

        $("#windowStateMap").val(snapPercent);
        const windowStateMap = document.getElementById('windowStateMap');
        const event = new Event('blur');
        windowStateMap.dispatchEvent(event);

/////////////////////////////////////
        console.log(snapPercent);
        let snapPos=snapPercent*theWidth/100;        
        console.log(`snapPos`,snapPos);  
        //$("#aMap").width(snapPos);
        let leftOver = theWidth - gutterSize - snapPos;
        if (leftOver<0) {
            leftOver=0;
            snapPos=theWidth-gutterSize;
        }
        console.log(`leftOver`,leftOver);
        document.querySelector('.lastRow').style['grid-template-columns'] = `${snapPos}px ${gutterSize}px ${leftOver}px`;
        position=$("#aMap").width();
        console.log(position);
        percent = parseInt(position/theWidth*100);
        console.log(`percent`,percent);  

    }
})

function checkClosestPosition(anArray,value) {    
    let Pos;
    for (let i=0;i<anArray.length-1;i++)
    {
        if ((anArray[i]<=value)&&(value<=anArray[i+1])) {
            Pos=i;
            break;
        }        
    }
    console.log(Pos);
    return (Math.abs(anArray[Pos] - value) < Math.abs(anArray[Pos+1] - value) ? anArray[Pos] : anArray[Pos+1]);
   
}



function fromHiddenStateBox2Appearance() {
    console.log(`vao fromHiddenStateBox2Appearance`);
    console.log($('#windowStateMap').val());
    let snapPercent=$('#windowStateMap').val();
    console.log(snapPercent);
    let snapPos=snapPercent*theWidth/100;        
    console.log(`snapPos`,snapPos);      
    let leftOver = theWidth - gutterSize - snapPos;
    if (leftOver<0) {
        leftOver=0;
        snapPos=theWidth-gutterSize;
    }
    console.log(`leftOver`,leftOver);
    document.querySelector('.lastRow').style['grid-template-columns'] = `${snapPos}px ${gutterSize}px ${leftOver}px`;
 
    // $('.stateWindow').each(function () {
    //     console.log('vao stateWindow');
    //     console.log(this.id);
    //     console.log(this.value);
    //             
    // })
 }