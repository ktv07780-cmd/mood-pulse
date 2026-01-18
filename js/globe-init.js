/* === Глобальный state === */
let state = {
    mode: null,
    lat: null,
    lng: null
};

/* === данные континентов === */
const continents = [
    { name: 'North America', lat: 54, lng: -105 },
    { name: 'South America', lat: -15, lng: -60 },
    { name: 'Europe', lat: 50, lng: 15 },
    { name: 'Africa', lat: 5, lng: 20 },
    { name: 'Asia', lat: 40, lng: 90 },
    { name: 'Australia', lat: -25, lng: 135 },
    { name: 'Antarctica', lat: -80, lng: 0 }
];

/* === создание глобуса === */
const world = Globe()(document.getElementById('globeViz'))
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
    .backgroundColor('#000')
    .onGlobeClick(({ lat, lng }) => {
        if (!state.mode) return;
        state.lat = lat;
        state.lng = lng;
        document.getElementById('instr').style.display = 'none';
        document.getElementById('emotions').style.display = 'block';
    });

world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.6;

/* === снежный эффект на полюсах === */
const polarSnowPoints = [];

// северный полюс
for(let lat=75; lat<=90; lat++){
    for(let lng=-180; lng<180; lng+=10){
        polarSnowPoints.push({
            lat, lng,
            size: 0.3 + Math.random()*0.2,
            color: `rgba(255,255,255,${0.1 + Math.random()*0.3})`
        });
    }
}

// южный полюс
for(let lat=-90; lat<=-75; lat++){
    for(let lng=-180; lng<180; lng+=10){
        polarSnowPoints.push({
            lat, lng,
            size: 0.3 + Math.random()*0.2,
            color: `rgba(255,255,255,${0.1 + Math.random()*0.3})`
        });
    }
}

world.pointsData(polarSnowPoints)
     .pointLat(d => d.lat)
     .pointLng(d => d.lng)
     .pointColor(d => d.color)
     .pointAltitude(0.01)
     .pointRadius(d => d.size);
