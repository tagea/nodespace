console.log('dd');

const mainAnim = lottie.loadAnimation({
    container: document.getElementById('lottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'json/DNA.json',
});

const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupInner = document.getElementById('popup-lottie');
const popupVideo = document.getElementById('popup-video');
const popupClose = document.querySelector('.lottie-popup__close');

const WINDOW_4_LABELS = [
    { key: 'partners', text: 'Partners', x: 200, y: 84.239, compW: 400, compH: 300 },
    { key: 'company', text: 'Nodespace', x: 309.3, y: 215.6, compW: 400, compH: 300 },
    { key: 'project', text: 'Defi Strategies', x: 92.882, y: 215.588, compW: 400, compH: 300 },
];
const popupContainer = document.getElementById('popup-lottie');
let popupAnim = null;
let currentPopupPath = null;

const loadPopupAnimation = (path) => {
    if (!popupContainer) return;
    if (currentPopupPath === path && popupAnim) return;
    if (popupAnim) {
        popupAnim.destroy();
        popupAnim = null;
    }
    popupContainer.innerHTML = '';
    currentPopupPath = path;
    popupAnim = lottie.loadAnimation({
        container: popupContainer,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path,
    });
};

const showPopup = () => {
    popup.classList.add('is-visible');
    if (popupAnim) {
        popupAnim.goToAndPlay(0, true);
    }
};

const showPopupLabels = (labels) => {
    if (!popupText || !popupInner) return;
    const rect = popupInner.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    popupText.innerHTML = '';
    labels.forEach((label) => {
        const item = document.createElement('div');
        item.className = 'lottie-popup__text-item';
        item.dataset.key = label.key;
        item.textContent = label.text;
        const x = (label.x / label.compW) * rect.width;
        const y = (label.y / label.compH) * rect.height;
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        popupText.appendChild(item);
    });
    popup.classList.remove('has-text');
    popup.classList.remove('has-video');
    popupText.classList.add('is-visible');
};

const showPopupParagraph = (text) => {
    if (!popupText) return;
    popupText.innerHTML = '';
    const block = document.createElement('div');
    block.className = 'lottie-popup__text-block';
    block.textContent = text;
    popupText.appendChild(block);
    popup.classList.add('has-text');
    popup.classList.remove('has-video');
    popupText.classList.add('is-visible');
};

const showPopupVideo = (src) => {
    if (!popupVideo) return;
    popupVideo.src = src || '';
    popupVideo.currentTime = 0;
    popupVideo.play().catch(() => {});
    popup.classList.add('has-video');
    popup.classList.remove('has-text');
};

const hidePopupVideo = () => {
    if (!popupVideo) return;
    popupVideo.pause();
    popupVideo.removeAttribute('src');
    popupVideo.load();
    popup.classList.remove('has-video');
};

const hidePopupText = () => {
    if (!popupText) return;
    popupText.innerHTML = '';
    popupText.classList.remove('is-visible');
    popup.classList.remove('has-text');
    hidePopupVideo();
};

const updatePopupPosition = (event) => {
    if (!event) return;
    if (window.matchMedia('(max-width: 768px)').matches) {
        popup.style.left = '50%';
        popup.style.top = '50%';
        return;
    }
    const container = document.querySelector('.container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const offsetX = 16;
    const offsetY = 16;
    const popupRectSource = popup?.classList.contains('has-video') ? popupVideo : popup?.classList.contains('has-text') ? popupText : popupInner;
    const popupRect = popupRectSource?.getBoundingClientRect();
    const popupW = popupRect?.width || 0;
    const popupH = popupRect?.height || 0;
    let x = event.clientX - rect.left + offsetX;
    let y = event.clientY - rect.top + offsetY;
    const spaceRight = window.innerWidth - event.clientX;
    if (popupW > 0 && spaceRight < popupW + offsetX) {
        x = event.clientX - rect.left - popupW - offsetX;
    }
    if (popupW > 0) {
        const maxX = Math.min(rect.width - popupW, window.innerWidth - rect.left - popupW);
        x = Math.min(Math.max(0, x), Math.max(0, maxX));
    }
    if (popupH > 0) {
        const maxY = Math.min(rect.height - popupH, window.innerHeight - rect.top - popupH);
        y = Math.min(Math.max(0, y), Math.max(0, maxY));
    }
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
};

const hidePopup = () => {
    popup.classList.remove('is-visible');
    if (popupAnim) {
        popupAnim.stop();
    }
    hidePopupText();
};

const getLayerElement = (anim, layerName) => {
    const elements = anim?.renderer?.elements || [];
    const match = elements.find((el) => el?.data?.nm === layerName);
    if (!match) return null;
    return match.layerElement || match.baseElement || match.element || match;
};

const handleLayerActivate = (layerName, event) => {
    if (layerName === 'circles-hover-4') {
        loadPopupAnimation('json/window-4.json');
        showPopupLabels(WINDOW_4_LABELS);
    } else if (layerName === 'circles-hover-3') {
        loadPopupAnimation('json/window-3.json');
        hidePopupText();
    } else if (layerName === 'circles-hover-2') {
        loadPopupAnimation('json/window-2.json');
        hidePopupText();
    } else if (layerName === 'circles-hover-8') {
        loadPopupAnimation('');
        showPopupParagraph(
            'Web3 investing made simple: We streamline the entire experience, providing access to yield farming, staking, airdrops, and private sales with zero technical expertise required. All you need to do is trust in our experience. Settle in and relish the journey!',
        );
    } else if (layerName === 'circles-hover-6') {
        loadPopupAnimation('');
        showPopupParagraph(
            "Forget about complicated setups and technical hurdles. We handle the entire process for you, harnessing artificial intelligence to automate and optimize your Web3 investments. Our goal is to provide you with passive income through minimal effort on your part.\n\nNodspace analyzes a vast array of factors—including current yields, risks, and market trends—continuously adjusting the portfolio to achieve optimal results. Your assets work efficiently, even when you aren't monitoring the process.",
        );
    } else if (layerName === 'circles-hover-5') {
        loadPopupAnimation('');
        showPopupParagraph(
            'We empower you to enter the Web3 world in a secure and hassle-free way, allowing you to earn from the most promising blockchain technologies. Unlike many complex and confusing solutions, our platform serves as your reliable bridge between traditional finance and decentralized opportunities.',
        );
    } else if (layerName === 'circles-hover-1') {
        loadPopupAnimation('');
        showPopupVideo('video/window-1.mp4');
    } else if (layerName === 'circles-hover-7') {
        loadPopupAnimation('');
        showPopupVideo('video/window-7.mp4');
    } else {
        loadPopupAnimation('');
        hidePopupText();
    }
    updatePopupPosition(event);
    showPopup();
};

mainAnim.addEventListener('DOMLoaded', () => {
    const svgEl = document.querySelector('#lottie svg');
    if (svgEl) {
        svgEl.style.pointerEvents = 'auto';
    }

    const hoverLayerNames = [
        'circles-hover-1',
        'circles-hover-2',
        'circles-hover-3',
        'circles-hover-4',
        'circles-hover-5',
        'circles-hover-6',
        'circles-hover-7',
        'circles-hover-8',
    ];

    hoverLayerNames.forEach((layerName) => {
        const layer = getLayerElement(mainAnim, layerName);
        if (!layer) return;
        layer.style.cursor = 'pointer';
        layer.style.pointerEvents = 'all';
        layer.setAttribute('pointer-events', 'all');
        layer.addEventListener('mouseover', (event) => {
            handleLayerActivate(layerName, event);
        });
        layer.addEventListener('click', (event) => {
            handleLayerActivate(layerName, event);
        });
        layer.addEventListener('mousemove', updatePopupPosition);
        layer.addEventListener('mouseout', hidePopup);
    });
});

if (popupClose) {
    popupClose.addEventListener('click', hidePopup);
}
