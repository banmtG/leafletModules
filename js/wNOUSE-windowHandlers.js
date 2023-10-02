// $( function() {

//     fromHiddenStateBox2Appearance();

//     $('.stateWindow').change( function() {
//         console.log(`change`);
//         let UrlObjCompressedString = fromStates2UrlObjString('UrlObj');
//         //document.getElementById('UrlQueryInput').value = UrlObjCompressedString;
//         window.history.pushState({UrlObjCompressedString},"Results for `Cats`",`?q=${UrlObjCompressedString}`);
//       });        
   
    
//     let theHeight =  $("#aMap").height();
//     let theWidth =  $(".lastRow").width();
//     let maxWidth=theWidth-30;
//     let minWidth=30;
//     let anArray=[5,30,50,70,95];
//     console.log(theHeight);
//     $("#aMap").resizable({      
//         minHeight: theHeight,
//         maxHeight: theHeight,
//         maxWidth: maxWidth,
//         minWidth: minWidth,
//         resize: function( event, ui ) {
            
//             //$("#windowStateMap").val(ui.size.width).change();;
//             //$("#aCarousel").width(maxWidth-$("#aMap").width());
//         },
//         stop: function( event, ui ) {
//             let theNewWidth = ui.size.width;
//             console.log(ui);
//             console.log(theNewWidth);
//             let percent = parseInt(theNewWidth/theWidth*100);
//             console.log(`percent`,percent);  
//             for (let i=0;i<anArray.length;i++)
//             {
//                 console.log(`abs`,Math.abs(percent-anArray[i]));
//                 if (Math.abs(percent-anArray[i])<15) 
//                 {
//                     console.log(`(anArray[i]`, anArray[i]);
//                     $("#aMap").width(anArray[i]*theWidth/100);
//                     $("#windowStateMap").val(anArray[i]).change();
//                     break;
//                 }
//                 // } else
//                 // { $("#aMap").width(ui.originalSize.width); }
//             }
//         }
//       });
//     console.log(`vao resizable`);

//  } );




//  function fromHiddenStateBox2Appearance() {
//     $('.stateWindow').each(function () {
//         console.log('vao stateWindow');
//         console.log(this.id);
//         console.log(this.value);
//         let w=this.value;
//         $("#aMap").width(w);            
//     })
//  }