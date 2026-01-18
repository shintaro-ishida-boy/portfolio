// カルーセル機能
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.banner-carousel');
    const track = document.querySelector('.banner-carousel__track');
    
    if (!track || !carousel) return;
    
    const items = Array.from(track.querySelectorAll('.banner-carousel__item'));
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    // 矢印ボタンを作成（既存のボタンがない場合のみ）
    if (!carousel.querySelector('.banner-carousel__arrow--prev')) {
        const prevButton = document.createElement('button');
        prevButton.className = 'banner-carousel__arrow banner-carousel__arrow--prev';
        prevButton.innerHTML = '‹';
        prevButton.setAttribute('aria-label', '前の画像');
        carousel.appendChild(prevButton);
        
        const nextButton = document.createElement('button');
        nextButton.className = 'banner-carousel__arrow banner-carousel__arrow--next';
        nextButton.innerHTML = '›';
        nextButton.setAttribute('aria-label', '次の画像');
        carousel.appendChild(nextButton);
        
        // ボタンイベント
        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
        
        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    
    // スワイプ対応（モバイルのみ）
    if (isMobile) {
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                stopAutoSlide();
                
                if (swipeDistance > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
                
                startAutoSlide();
            }
        }
    }
    
    // 表示更新
    function updateDisplay() {
        items.forEach((item) => {
            item.classList.remove('banner-carousel__item--left', 'banner-carousel__item--center', 'banner-carousel__item--right');
        });
        
        if (isMobile) {
            // モバイル：中央のみ表示
            items[currentIndex].classList.add('banner-carousel__item--center');
        } else {
            // デスクトップ：3枚表示
            const prevIndex = (currentIndex - 1 + items.length) % items.length;
            const nextIndex = (currentIndex + 1) % items.length;
            
            items[prevIndex].classList.add('banner-carousel__item--left');
            items[currentIndex].classList.add('banner-carousel__item--center');
            items[nextIndex].classList.add('banner-carousel__item--right');
        }
    }
    
    // 次へ
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateDisplay();
    }
    
    // 前へ
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateDisplay();
    }
    
    // 自動スライド開始
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // 自動スライド停止
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // 初期化
    updateDisplay();
    startAutoSlide();
});