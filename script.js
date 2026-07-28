let units=[


{
callsign:"A-101",
status:"10-8",
postal:"603",
llc:"Patrol 1"
}


];



const layer=document.getElementById(
"marker-layer"
);



function loadUnits(){


layer.innerHTML="";


units.forEach(unit=>{


if(unit.status!="10-8")
return;



let pos=postals[unit.postal];


if(!pos)
return;



let marker=document.createElement(
"div"
);



marker.className="unit-marker";



marker.style.left=
pos.x+"px";


marker.style.top=
pos.y+"px";



marker.title=
`
${unit.callsign}
Postal: ${unit.postal}
LLC: ${unit.llc}
`;



layer.appendChild(marker);



});


}



loadUnits();



setInterval(()=>{

loadUnits();

},10000);
