
// let dropdownFlag=document.getElementById('DropdownFlagList');

// function toggleDropdownFlagList() {
//     dropdownFlag.classList.toggle("dropDown_show");
//     // console.log(document.getElementById("DropdownFlagList").classList);
//     // console.log(`toggle`);
// }

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en,vi,ja,ko,zh-CN',
    includedLanguages: 'vi,en,ja,ko,zh-CN',}, 'google_translate_element');
}

  var flags = document.getElementsByClassName('flag_link');

  Array.prototype.forEach.call(flags, function(e){
    e.addEventListener('click', function(){
      var lang = e.getAttribute('data-lang'); 
      var languageSelect = document.querySelector("select.goog-te-combo");
      console.log(languageSelect);
      languageSelect.value = lang; 
      languageSelect.dispatchEvent(new Event("change"));
    //console.log(e.children[0].src);
      document.getElementById("dropdownFlagBtn").innerHTML=`<img src="${e.children[0].src}" alt="Language">`
      //document.getElementById("DropdownFlagList").classList.toggle("dropDown_show");
    }); 
  });



//   dropdownFlag.addEventListener('blur', () => {
//     console.log(`blur`);
//     document.getElementById("DropdownFlagList").classList.toggle("dropDown_show");
//     // dropdownWindow.classList.remove('dropdown__window--active');
//   });


//   $("#DropdownFlagList").mouseleave(function() {
//     console.log('similar to blur');

//   });
  

const dropdown = document.querySelector('.dropdown');
const dropdownWindow = document.querySelector('.dropdown__window')

dropdown.addEventListener('click', (event) => {
  dropdownWindow.classList.toggle('dropdown__window--active');
});

dropdown.addEventListener('blur', (event) => {
  dropdownWindow.classList.remove('dropdown__window--active');
});