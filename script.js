let currentIdx = 0;
const track = document.getElementById('sliderTrack');
const cards = document.querySelectorAll('.player-card');

function updateSlider() {
    cards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === currentIdx) {
            card.classList.add('active');
        }
    });

    // حساب المسافة: (عرض الكارت 300 + الفجوة 30)
    const cardWidth = 330;
    // توسيط الكارت النشط في الشاشة
    const containerWidth = document.querySelector('.slider-container').offsetWidth;
    const centerOffset = (containerWidth / 2) - (300 / 2);
    const moveAmount = centerOffset - (currentIdx * cardWidth);
    
    track.style.transform = `translateX(${moveAmount}px)`;
}

function moveSlide(direction) {
    currentIdx += direction;
    
    // حماية من الخروج عن نطاق المصفوفة
    if (currentIdx < 0) currentIdx = 0;
    if (currentIdx >= cards.length) currentIdx = cards.length - 1;
    
    updateSlider();
}

// تشغيل الوظيفة لأول مرة عند التحميل
window.onload = updateSlider;

function updateSlider() {
    cards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === currentIdx) {
            card.classList.add('active');
        }
    });

    // 1. عرض الحاوية اللي بره
    const containerWidth = document.querySelector('.slider-container').offsetWidth;
    
    // 2. عرض الكارت الواحد (بيتحسب لحظياً عشان لو اتغير في الموبايل)
    const cardWidth = cards[0].offsetWidth;
    
    // 3. المسافة (Gap) بين الكروت (هنا 30 بكسل زي ما حددنا في الـ CSS)
    const gap = 30;

    // 4. المعادلة السحرية للتوسيط:
    // بنجيب نص الشاشة، ونطرح منه نص الكارت، ونطرح منه مكان الكارت الحالي في الصف
    const centerOffset = (containerWidth / 2) - (cardWidth / 2);
    const moveAmount = centerOffset - (currentIdx * (cardWidth + gap));
    
    track.style.transform = `translateX(${moveAmount}px)`;
}

// ضيف السطر ده عشان لو المستخدم قلب الموبايل (عوضي/طولي) السلايدر يسنتر نفسه تاني
window.addEventListener('resize', updateSlider);
function toggleMenu() {
    // تأكد إن المنيو الجانبية عندك واخدة id="sideMenu"
    const menu = document.getElementById('sideMenu');
    
    if (menu) {
        menu.classList.toggle('active');
    } else {
        console.error("المنيو مش موجودة، تأكد إن الـ ID هو sideMenu");
    }
}