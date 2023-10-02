var map = L.map('map').setView([51.505, -0.09], 13);

var tiles =  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    subdomains:['mt0']
}).addTo(map);

map.addLayer(tiles);

// new L.Control.GPlaceAutocomplete({
//     callback: function(place){
//         var loc = place.geometry.location;
//         map.panTo([loc.lat(), loc.lng()]);
//         map.setZoom(18);
//     }
// }).addTo(map);