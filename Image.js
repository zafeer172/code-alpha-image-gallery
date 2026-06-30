const galleryItems = document.querySelectorAll('.gallery-item');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let currentIndex = 0;
let filteredItems = [...galleryItems];

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterValue = button.getAttribute('data-filter');
        filterItems(filterValue);
    });
});

function filterItems(category) {
    filteredItems = [];
    galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            filteredItems.push(item);
        } else {
            item.style.display = 'none';
        }
    });
}

galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        const filteredIndex = filteredItems.indexOf(item);
        if (filteredIndex !== -1) {
            currentIndex = filteredIndex;
            openLightbox();
        }
    });
});

function openLightbox() {
    const currentItem = filteredItems[currentIndex];
    const img = currentItem.querySelector('img');
    const caption = currentItem.querySelector('.caption');
    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption.textContent;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentIndex = (currentIndex + 1) % filteredItems.length;
    updateLightbox();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightbox();
}

function updateLightbox() {
    const currentItem = filteredItems[currentIndex];
    const img = currentItem.querySelector('img');
    const caption = currentItem.querySelector('.caption');
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption.textContent;
        lightboxImg.style.opacity = '1';
    }, 200);
}

closeBtn.addEventListener('click', closeLightbox);

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    }
});

filterItems('all');
