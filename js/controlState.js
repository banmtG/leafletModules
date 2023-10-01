let generateUrlButton=document.getElementById('generateUrlButton');
const defaultState = 'NobwRA9gDgLglhAdgRjALgGYEMA2BnAUwF8AacaeJAJnW32LMlgUQGZbdDTzmkAWDvW5NKiAKyCujCiwBskhj1EB2BcJlIAHGum9EATh1KWyAAxGwARwCuBAE4BPAGJwcMe6jRgwwm-eeu7nY0Xj6Mfo4ubvbsob62kYH2AnHhCQHRdhKp4ADucIgAJhC5AMowWO4AslhQ6GCs5sKEOAQAxjCewAC6zQStHQC0eAC2uDhdYABuuKi9jC3tMCHA07Ng8+CLQ6PjK2sTG30DMLGrM4ebYNsww2M4OGcHc8dLKefrVzd34+-PRwt+ktsh9Lq8dvccCD-r1ukA';

generateUrlButton.addEventListener('click', function(e){   
    let UrlObjCompressedString = fromStates2UrlObjString('UrlObj');

    // console.log(UrlObj);
    // console.log(JSON.stringify(UrlObj));
    // console.log(JSON.stringify(UrlObj).length);

    // var compressed = LZString.compressToEncodedURIComponent(JSON.stringify(UrlObj));
    // console.log(compressed);
    // console.log(compressed.length);

    // var decompressed = LZString.decompressFromEncodedURIComponent(compressed);
    // console.log(decompressed);
    // console.log(decompressed.length);
    // console.log(JSON.parse(decompressed));


    // var compressedURL = encodeURI(JSON.stringify(UrlObj));
    // console.log(compressedURL);
    // console.log(compressedURL.length);

    // var decompressedURL = decodeURI(compressedURL);
    // console.log(decompressedURL);
    // console.log(decompressedURL.length);
    // console.log(JSON.parse(decompressedURL));

    document.getElementById('UrlQueryInput').value = UrlObjCompressedString;
})

fromUrlObj2UrlQuery();

function fromUrlObj2UrlQuery() {
    let UrlObjElements=document.getElementsByClassName('UrlObj');
    for (let i=0;i<UrlObjElements.length;i++)
    {
        UrlObjElements.item(i).addEventListener('blur', (e) => {      
            console.log(e.explicitOriginalTarget.id);    
            let UrlObjCompressedString = fromStates2UrlObjString('UrlObj');
            //document.getElementById('UrlQueryInput').value = UrlObjCompressedString;
            //window.history.pushState({UrlObjCompressedString},"Results for `Cats`",`?q=${UrlObjCompressedString}`);
            window.history.pushState({id: e.explicitOriginalTarget.id, UrlObjCompressedString: UrlObjCompressedString},"Results for `Cats`",`?q=${UrlObjCompressedString}`);
        })
    }  
}

window.addEventListener('popstate', e => {    console.log(e.state);
    let qryString;
    if (e.state!=null && e.state!="") {
        qryString = e.state.UrlObjCompressedString;
        console.log('khac null');
    }
    if (e.state==null) {
        console.log('= null');
        history.replaceState({},"",'./controlState.html');
        qryString = defaultState;
    }
   // query  = window.location.search.substring(3);
   // console.log(query);
   // state data of history (remember history.state ?)
    fromUrlObj2States(qryString);
    })



$(function() {
    let queryStr = window.location.search.substring(3);
    console.log(queryStr);
    fromUrlObj2States(queryStr);
    
});


// function processAjaxData(response, urlPath){
//     document.getElementById("content").innerHTML = response.html;
//     document.title = response.pageTitle;
//     window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
// }
// "NobwRA9gDgLglhAdgRjALgGYEMA2BnAUwF8AacaeJAJnW32LMlgUQGZbdDTzmkAWDvW5NKiAKyCujCiwBskhj1EB2BcJlIAHGum9EATh1KWyAAxGwARwCuBAE4BPAGJwcMe6jRgwwm-eeu7nY0Xj6Mfo4ubvbsob62kYH2AnHhCQHRdhKp4IQ4BADGMJ7AALrCeYUwALR4ALa4OCVgAG64qOWMlUUhwK3tYJ25BPlFtQ04OL39TYMVI1WxfW2zQ2DdNfWNSzMd86MwKcsDaxvjjUe7c10LRdnHq-tV55P3V+WlQA"


function fromUrlQuery2State() {
    
}

let setupStateButton=document.getElementById('setupStateButton');
setupStateButton.addEventListener('click', function(e){
    let queryStringCompressed =  document.getElementById('UrlQueryInput').value;
    console.log(queryStringCompressed);
    // let decompressedQueryString = LZString.decompressFromEncodedURIComponent(queryStringCompressed);
    // console.log(decompressedQueryString);
    // let UrlObj = JSON.parse(decompressedQueryString);
    // console.log(UrlObj);
    fromUrlObj2States(queryStringCompressed);
})


function fromStates2UrlObjString(UrlClass) {

    let UrlObj = [];
    let UrlObjElements=document.getElementsByClassName(UrlClass);
    for (var item=0;item<UrlObjElements.length;item++)
    {
        let anObj = {};    
        let anItem = UrlObjElements[item];
        
        if (anItem.type=="checkbox") anObj[anItem.id]=anItem.checked;
        if (anItem.type=="text") anObj[anItem.id]=anItem.value;
        if (anItem.type=="number") anObj[anItem.id]=anItem.value;      
        if (anItem.type.split('-')[0]=="select") {
            let anArray=[];
            for (let option=0;option<anItem.selectedOptions.length;option++)
            {
                anArray.push(anItem.selectedOptions[option].value);
            }            
            anObj[anItem.id]=anArray;
        }
        UrlObj.push(anObj);
    }
    let compressed = LZString.compressToEncodedURIComponent(JSON.stringify(UrlObj));
    return compressed;
}

function fromUrlObj2States(UrlObjCompressedString) {
    console.log(UrlObjCompressedString);
    if(UrlObjCompressedString==undefined) UrlObjCompressedString=defaultState;
    let decompressed = LZString.decompressFromEncodedURIComponent(UrlObjCompressedString);
    console.log(decompressed);

    if (UrlObjCompressedString) {
        let UrlObj;
        try {
            UrlObj = JSON.parse(decompressed);
           
        } catch (e) {
            console.log('vao catch');
            window.location='./controlState.html';
            
           // return console.error(e); // error in the above string (in this case, yes)!
        } 
        if (UrlObj!=undefined)  
        {             
            let UrlObjElements=document.getElementsByClassName('UrlObj');
            console.log(UrlObjElements);
            for (let i=0;i<UrlObjElements.length;i++)
            {
                let anItem = UrlObjElements[i];
                if (anItem.type=="checkbox") anItem.checked = UrlObj[i][anItem.id];
                if (anItem.type=="text") anItem.value=UrlObj[i][anItem.id];
                if (anItem.type=="number") anItem.value=UrlObj[i][anItem.id];      
                if (anItem.type.split('-')[0]=="select") {
                    let anArray =  UrlObj[i][anItem.id].slice();
                    for (let j=0;j<anArray.length;j++)
                    {                      
                        anItem.querySelector("option[value="+anArray[j]+"]").selected = true;      
                    }
                }
                anItem.dispatchEvent(new Event('change'));
            }      
        }
    }  
    fromHiddenStateBox2Appearance(); 
}