/* === UI === */

/* выбор режима */
window.setMode = function(m, el){
    window.state.mode = m;
    document.querySelectorAll('.top button').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('action-panel').style.display = 'flex';
}

/* переключение континентов */
window.toggleContinents = function(enabled){
    if(enabled){
        window.world.labelsData(window.continents)
             .labelLat(d => d.lat)
             .labelLng(d => d.lng)
             .labelText(d => d.name)
             .labelSize(1.1)
             .labelDotRadius(0.5)
             .labelColor(() => 'rgba(255,255,255,0.9)')
             .labelResolution(2);
    } else {
        window.world.labelsData([]);
    }
}

/* переключение сетки */
window.toggleGrid = function(enabled){
    window.world.graticulesData(enabled ? [{}] : []);
}
