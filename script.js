// =====================================
// ER:LC CAD LIVE MAP SCRIPT
// =====================================


// Create the map

const map = L.map("map", {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 4
});


// Map size (change later when we add your real map)

const mapBounds = [
    [0, 0],
    [1000, 1000]
];


// Load map image

L.imageOverlay(
    "map.png",
    mapBounds
).addTo(map);


map.fitBounds(mapBounds);


// Store markers

let activeMarkers = [];


// =====================================
// ADD UNIT MARKER
// =====================================

function addUnit(unit) {


    // Only show 10-8 units

    if(unit.status !== "10-8"){
        return;
    }


    // Find postal location

    let location = postals[unit.postal];


    if(!location){
        console.log(
            "Missing postal:",
            unit.postal
        );
        return;
    }



    // Create marker

    let marker = L.circleMarker(
        location,
        {
            radius:8,

            color:"#00ff55",

            fillColor:"#00ff55",

            fillOpacity:1,

            weight:2
        }
    );



    // Popup information

    marker.bindPopup(`

        <div>

        <h3>${unit.callsign}</h3>

        <b>Status:</b>
        ${unit.status}
        <br>

        <b>Postal:</b>
        ${unit.postal}
        <br>

        <b>LLC:</b>
        ${unit.llc}

        <br>

        <b>Time:</b>
        ${unit.time || "N/A"}

        </div>

    `);



    marker.addTo(map);


    activeMarkers.push(marker);

}



// =====================================
// REMOVE OLD MARKERS
// =====================================

function clearMarkers(){

    activeMarkers.forEach(marker=>{

        map.removeLayer(marker);

    });


    activeMarkers=[];

}



// =====================================
// LOAD UNITS
// =====================================


// Example data
// Later this connects to Google Sheets

function loadUnits(){


    clearMarkers();


    let units = [

        {
            callsign:"A-101",
            status:"10-8",
            postal:"603",
            llc:"Patrol 1",
            time:"12:00"
        },


        {
            callsign:"B-205",
            status:"10-7",
            postal:"502",
            llc:"Patrol 2",
            time:"12:02"
        }


    ];



    units.forEach(unit=>{

        addUnit(unit);

    });


}



// Load map

loadUnits();



// Refresh every 10 seconds

setInterval(()=>{

    loadUnits();

},10000);
