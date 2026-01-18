/* === UI === */

/* выбор режима */
function setMode(m, el){
    state.mode = m;
    document.querySelectorAll('.top button').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('action-panel').style.display = 'flex';
}

/* переключение континентов */
function toggleContinents(enabled){
    if(enabled){
        world.labelsData(continents)
             .labelLat(d => d.lat)
             .labelLng(d => d.lng)
             .labelText(d => d.name)
             .labelSize(1.1)
             .labelDotRadius(0.5)
             .labelColor(() => 'rgba(255,255,255,0.9)')
             .labelResolution(2);
    } else {
        world.labelsData([]);
    }
}

/* переключение сетки */
function toggleGrid(enabled){
    world.graticulesData(enabled ? [{}] : []);
}
