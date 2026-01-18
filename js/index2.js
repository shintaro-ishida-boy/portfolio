// DOMの読み込み完了を待つ
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observerの設定
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // ページタイトルを監視（detail-page用）
    const pageTitle = document.querySelector('.detail-page__title');
    if (pageTitle) {
        observer.observe(pageTitle);
    }

    // プロフィールページタイトルを監視
    const profilePageTitle = document.querySelector('.profile-page-title');
    if (profilePageTitle) {
        observer.observe(profilePageTitle);
    }

    // バナーカルーセルの処理
    const carousel = document.querySelector('.banner-carousel');
    const track = document.querySelector('.banner-carousel__track');
    
    if (track && carousel) {
        const items = Array.from(track.querySelectorAll('.banner-carousel__item'));
        let currentIndex = 0;
        let autoSlideInterval;
        
        // 矢印ボタンを作成
        const prevButton = document.createElement('button');
        prevButton.className = 'banner-carousel__arrow banner-carousel__arrow--prev';
        prevButton.innerHTML = '‹';
        prevButton.setAttribute('aria-label', '前の画像');
        
        const nextButton = document.createElement('button');
        nextButton.className = 'banner-carousel__arrow banner-carousel__arrow--next';
        nextButton.innerHTML = '›';
        nextButton.setAttribute('aria-label', '次の画像');
        
        carousel.appendChild(prevButton);
        carousel.appendChild(nextButton);
        
        // 初期表示の設定
        function updateDisplay() {
            items.forEach((item, index) => {
                item.classList.remove('banner-carousel__item--left', 'banner-carousel__item--center', 'banner-carousel__item--right');
                item.style.visibility = 'hidden';
            });
            
            const prevIndex = (currentIndex - 1 + items.length) % items.length;
            const nextIndex = (currentIndex + 1) % items.length;
            
            items[prevIndex].classList.add('banner-carousel__item--left');
            items[prevIndex].style.visibility = 'visible';
            
            items[currentIndex].classList.add('banner-carousel__item--center');
            items[currentIndex].style.visibility = 'visible';
            
            items[nextIndex].classList.add('banner-carousel__item--right');
            items[nextIndex].style.visibility = 'visible';
        }
        
        // 次の画像へ
        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateDisplay();
        }
        
        // 前の画像へ
        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateDisplay();
        }
        
        // 自動スライドを開始
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        // 自動スライドを停止
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // ボタンイベント
        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
        
        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
        
        // 初期表示
        updateDisplay();
        startAutoSlide();
    }
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});