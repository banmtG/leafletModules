$(window).on( "resize", function() {

    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function(){
       //console.log('Resized finished.');
        setupGridSplit();
        autoAdjustCardsOnResize();

        // console.log(`screen.height`,screen.height);
        // console.log(`window.innerHeight`,window.innerHeight);
        // console.log(`document.documentElement.clientHeight`,document.documentElement.clientHeight);
        // console.log(`screen.availHeight`,screen.availHeight);

        // if (screen.height == window.innerHeight) {
        //     // browser is almost certainly fullscreen
        //     console.log(`full screen`);
        //     $('.magnifyBtn').html('<i class="fa-solid fa-down-left-and-up-right-to-center"></i>');
        //     // $('.magnifyBtn').removeClass('maximiseWindow');
        //     // $('.magnifyBtn').adsdClass('minimiseWindow');
        //     $('.magnifyBtn').on('click', function () {
        //         closeFullscreen();
        //     });
        //     // console.log(`turned to not full screen`);
        // } else 
        // {
        //     // browser is almost certainly fullscreen
        //     console.log(`not full screen`);
        //     $('.magnifyBtn').html('<i class="fa-solid fa-up-right-and-down-left-from-center"></i>');
        //     $('.magnifyBtn').on('click', function () {
        //         openFullscreen();
        //     });
        //     // $('.magnifyBtn').removeClass('minimiseWindow');
        //     // $('.magnifyBtn').addClass('maximiseWindow');
        //     // $('.maximiseWindow').on('click', function () {
        //     //     openFullscreen();
        //     // });
        //     // console.log(`turned to full screen`);
        // }


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
   // console.log(`screen.availHeight`,screen.availHeight);
    
    setTimeout(function() {
    },100);

} );

// $('.magnifyBtn').on('click', function () {
//     openFullscreen();
// })

$('.magnifyBtn').on('click', function () {
    let magnifyBtn=document.getElementsByClassName('magnifyBtn')[0];
    toggleFullScreen(document.body);
    toggleIcon(magnifyBtn,`<i class="fa-solid fa-up-right-and-down-left-from-center"></i>`,`maximiseWindow`,`<i class="fa-solid fa-down-left-and-up-right-to-center"></i>`,`minimiseWindow`);
})

// $(window).keypress(function(event){
//     var code = event.keyCode || event.which;
//     if(code == 122){
//         toggleFullScreen(document.body);
//         toggleIcon(magnifyBtn,`<i class="fa-solid fa-up-right-and-down-left-from-center"></i>`,`maximiseWindow`,`<i class="fa-solid fa-down-left-and-up-right-to-center"></i>`,`minimiseWindow`);
//     }
// });

// $(document).on('keyup', function(e) { 
//     console.log(e.keyCode);
//     if(e.keyCode == 122){
//         let magnifyBtn=document.getElementsByClassName('magnifyBtn')[0];
//         toggleFullScreen(document.body);
//         toggleIcon(magnifyBtn,`<i class="fa-solid fa-up-right-and-down-left-from-center"></i>`,`maximiseWindow`,`<i class="fa-solid fa-down-left-and-up-right-to-center"></i>`,`minimiseWindow`);
//     }
// });

// function checkWH(){
//     if((window.outerWidth-screen.width) ==0 && (window.outerHeight-screen.height) ==0 )
//     {
//         alert('fullscreen');
//     }
// }

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (!isMobile) {
   // console.log(typeof screen.orientation);
  //  console.log(`khong phai mobile`);
  //  $('#messageLog').html(typeof screen.orientation);
    $('.magnifyBtn').hide();
}



// var flags = document.getElementsByClassName('flag_link');

// Array.prototype.forEach.call(flags, function(e){
//   e.addEventListener('click', function(){
//     var lang = e.getAttribute('data-lang'); 
//     var languageSelect = document.querySelector("select.goog-te-combo");
//     languageSelect.value = lang; 
//     languageSelect.dispatchEvent(new Event("change"));
//   }); 
// });

// if (typeof screen.orientation !== 'undefined') { 
//     console.log(typeof screen.orientation);
//     console.log(`khong phai mobile`);
//     $('#messageLog').html(typeof screen.orientation);
//     $('.magnifyBtn').hide();
// }

// window.mobileAndTabletCheck = function() {
//     let check = false;
//     (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
//     return check;
//   };


function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen().then(()=>{
            console.log("fullscreen")
          },()=>{console.warn("no fullscreen")});

    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen().then(()=>{
    console.log("fullscreen")
  },()=>{console.warn("no fullscreen")});
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen().then(()=>{
            console.log("fullscreen")
          },()=>{console.warn("no fullscreen")});
}
}
  
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen().then(()=>{
            console.log("fullscreen")
          },()=>{console.warn("no fullscreen")});
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen().then(()=>{
            console.log("fullscreen")
          },()=>{console.warn("no fullscreen")});
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen().then(()=>{
            console.log("fullscreen")
          },()=>{console.warn("no fullscreen")});
    }
}

function toggleIcon(element,html1,class1,html2,class2) {
    if (element.classList.contains(class1)) {
        element.innerHTML=html2;
        element.classList.remove(class1);
        element.classList.add(class2);
    } else {
        element.innerHTML=html1;
        element.classList.remove(class2);
        element.classList.add(class1);
    }
  
}

function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
       
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}