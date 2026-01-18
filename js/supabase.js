/* === Supabase и отправка эмоций === */
const SB_URL = 'https://yhlshbefcjfzzripqlzo.supabase.co';
const SB_KEY = 'sb_publishable_PVX1Hgt9KyL0r8o7DRbNAQ_gj0ixPeM';

const supabaseClient = supabase.createClient(SB_URL, SB_KEY);

/* === Отправка эмоции пользователя === */
async function finish(emotion) {
    if (!state.lat || !state.lng || !state.mode) return;

    const payload = {
        emotion: emotion,
        presence_type: state.mode,
        lat: state.lat,
        lng: state.lng,
        os: navigator.platform,
        browser: navigator.userAgent,
        lang: navigator.language,
        fingerprint: btoa(navigator.userAgent).slice(0,16),
        screen_res: `${window.screen.width}x${window.screen.height} (viewport: ${window.innerWidth}x${window.innerHeight})`
    };

    const { error } = await supabaseClient
        .from('world_mood_data')
        .insert([payload]);

    if (error) {
        console.error('Supabase error:', error);
    } else {
        // данные отправлены, можно обновлять локальные реакции, но alert больше не нужен
        // location.reload() можно убрать, будем обновлять реакцию динамически
        state.lat = null;
        state.lng = null;
        document.getElementById('emotions').style.display = 'none';
        document.getElementById('instr').style.display = 'block';
    }
}

/* === Получение последних эмоций за сутки для каждого fingerprint === */
async function loadRecentEmotions() {
    const oneDayAgo = new Date(Date.now() - 24*60*60*1000).toISOString();

    const { data, error } = await supabaseClient
        .from('world_mood_data')
        .select('*')
        .gte('created_at', oneDayAgo);

    if (error) {
        console.error('Supabase load error:', error);
        return [];
    }

    // группируем по fingerprint, берем последнюю за сутки
    const lastByFingerprint = {};
    data.forEach(d => {
        const key = d.fingerprint;
        if (!lastByFingerprint[key] || new Date(d.created_at) > new Date(lastByFingerprint[key].created_at)) {
            lastByFingerprint[key] = d;
        }
    });

    return Object.values(lastByFingerprint);
}

/* === Добавление реакций на глобус === */
function drawEmotionsOnGlobe(emotions) {
    // emotions = [{lat,lng,emotion}, ...]
    const points = emotions.map(d => {
        let color = '#888'; // нейтральное
        switch(d.emotion) {
            case 'joy': color = '#00ff88'; break;
            case 'anger': color = '#ff4444'; break;
            case 'neutral': color = '#888'; break;
            // сюда можно добавить больше эмоций
        }
        return {
            lat: d.lat,
            lng: d.lng,
            size: 0.5, // радиус пятна, можно масштабировать
            color
        };
    });

    world.pointsData(points)
        .pointLat(d => d.lat)
        .pointLng(d => d.lng)
        .pointColor(d => d.color)
        .pointAltitude(0.01)
        .pointRadius(d => d.size);
}
