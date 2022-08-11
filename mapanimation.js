mapboxgl.accessToken =
  "pk.eyJ1Ijoic2lsYWthZyIsImEiOiJjbDZwNHFyMmkwaDlsM2NsZTd5ejc4aXd4In0.Lc_UKsI4SFYVfWgvOrE3rw";

// This is the map instance
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.093729, 42.359244],
  zoom: 14,
});

let markers = {};

async function move() {
  const data = await fetch("https://api-v3.mbta.com/vehicles?filter%5Broute%5D=1&include=trip");
  const vehicleData = (await data.json()).data;
	console.log(vehicleData);

	vehicleData?.forEach(vehicle => {
		if(markers[vehicle.id]){
			markers[vehicle.id].setLngLat([vehicle.attributes.latitude, vehicle.attributes.longitude]);
		}else{
			markers[vehicle.id] = new mapboxgl.Marker();
			markers[vehicle.id].setLngLat([vehicle.attributes.latitude, vehicle.attributes.longitude]).addTo(map)
		}
	});

}

// setInterval(() => {
// 	move();
// }, 2000);

move();