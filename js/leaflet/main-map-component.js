var map = L.map('map').setView([51.505, -0.09], 13);

var tiles =  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.addLayer(tiles);

// new L.Control.GPlaceAutocomplete({
//     callback: function(place){
//         var loc = place.geometry.location;
//         map.panTo([loc.lat(), loc.lng()]);
//         map.setZoom(18);
//     }
// }).addTo(map);