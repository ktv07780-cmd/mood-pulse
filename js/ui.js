/* === UI: выбор режима и эмоций === */

let state = {
    mode: null,
    lat: null,
    lng: null
};

/* === Режим пользователя: "Я тут" или "Думаю" === */
function setMode(m, el) {
    state.mode = m;
    document.querySelectorAll('.top button')
        .forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('action-panel').style.display = 'flex';
}

/* === Эмоции для выбора пользователя === */
const emotionsList = [
    { id: 'very_bad', color: '#440000', label: 'В бешенстве' },
    { id: 'angry', color: '#aa0000', label: 'Сильно зол' },
    { id: 'slightly_angry', color: '#ff4444', label: 'Немного зол' },
    { id: 'sad_very', color: '#550055', label: 'Очень грустно' },
    { id: 'sad', color: '#aa00aa', label: 'Грустно' },
    { id: 'slightly_sad', color: '#ff88ff', label: 'Грустненько' },
    { id: 'neutral', color: '#888888', label: 'Нейтрально' },
    { id: 'good', color: '#88ff88', label: 'Хорошее' },
    { id: 'great', color: '#00ff00', label: 'Отличное' },
    { id: 'amazing', color: '#00cc88', label: 'Замечательное' },
    { id: 'super', color: '#00ffaa', label: 'Супер' }
];

/* === Отрисовка кнопок эмоций === */
function renderEmotionButtons(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // очистка
    emotionsList.forEach(em => {
        const btn = document.createElement('button');
        btn.style.backgroundColor = em.color;
        btn.textContent = em.label;
        btn.onclick = () => finish(em.id); // вызывает функцию из supabase.js
        container.appendChild(btn);
    });
}

/* === Инициализация UI === */
function initUI() {
    renderEmotionButtons('emotions');
    document.getElementById('instr').style.display = 'block';
    document.getElementById('emotions').style.display = 'none';
}
