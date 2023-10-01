let googleAppScript = ``https://script.google.com/macros/s/AKfycby98lPZ7LNGxk2I1zLNB9WsYJjgp4NRc68EFgCR1T5w6Lvs2YX0EyLOdjgDwnzIshuP_w/exec?getGeoCodeFromAddress=a``;
// let googleAppScript = `https://script.google.com/macros/s/AKfycbzm9n7EV1mTDckbu_Jy2xGqSpBpewHLvXYf0RDNo61JAYkHVA4-eS6rHQTULiVbx2d5yg/exec?myService=checkUser&name=AD&pass=BiTin2011`;

fetch (googleAppScript)
    .then (res => res.json())
    .then (data => {
        console.log(data);

        // console.log(JSON.stringify(data));
    })