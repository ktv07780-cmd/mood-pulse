/* === Supabase === */
const SB_URL = 'https://yhlshbefcjfzzripqlzo.supabase.co';
const SB_KEY = 'sb_publishable_PVX1Hgt9KyL0r8o7DRbNAQ_gj0ixPeM';

const supabaseClient = supabase.createClient(SB_URL, SB_KEY);

/* отправка эмоции */
async function finish(emotion){
    if(!state.lat || !state.lng) return;

    const payload = {
        emotion,
        presence_type: state.mode,
        lat: state.lat,
        lng: state.lng,
        os: navigator.platform,
        browser: navigator.userAgent,
        lang: navigator.language,
        fingerprint: btoa(navigator.userAgent).slice(0,16),
        screen_res: `${window.screen.width}x${window.screen.height} (viewport: ${window.innerWidth}x${window.innerHeight})`
    };

    const { error } = await supabaseClient.from('world_mood_data').insert([payload]);

    if(error){
        console.error('Supabase error:', error);
    }
    // убран alert об успешной отправке
}
