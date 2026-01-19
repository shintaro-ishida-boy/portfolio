// DOMの読み込み完了を待つ
document.addEventListener('DOMContentLoaded', () => {
    // モバイルデバイスの判定
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    // ハンバーガーメニューの処理
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav__list');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav__link');
    const dropdownItems = document.querySelectorAll('.nav__item--dropdown');
    const dropdownLinks = document.querySelectorAll('.nav__dropdown-link');
    
    if (hamburger && navList) {
        // ハンバーガーボタンのクリックイベント
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navList.classList.toggle('is-active');
            body.classList.toggle('menu-open');
        });
        
        // メニューリンクをクリックしたらメニューを閉じる
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                navList.classList.remove('is-active');
                body.classList.remove('menu-open');
            });
        });
        
        // ドロップダウンのサブメニューリンクをクリックしたらメニューを閉じる
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                navList.classList.remove('is-active');
                body.classList.remove('menu-open');
            });
        });
        
        // モバイルでのドロップダウン処理
        if (isMobile) {
            dropdownItems.forEach(item => {
                const link = item.querySelector('.nav__link');
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    item.classList.toggle('is-open');
                });
            });
        }
    }
    
    // スクロールアニメーション(モバイル以外のみ)
    if (!isMobile) {
        // FVテキストを一文字ずつに分割してランダムアニメーション
        const heroTitle = document.querySelector('.hero__title');
        const heroNameJp = document.querySelector('.hero__name-jp');
        const heroNameEn = document.querySelector('.hero__name-en');
        const heroSection = document.querySelector('.hero');
        
        // テキストを一文字ずつspanで囲む関数
        function splitTextToChars(element) {
            const text = element.textContent;
            element.textContent = '';
            
            const chars = text.split('');
            chars.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'char';
                span.style.display = 'inline-block';
                
                // ランダムな初期位置を設定
                const randomX = (Math.random() - 0.5) * 1000;
                const randomY = (Math.random() - 0.5) * 1000;
                span.style.setProperty('--random-x', `${randomX}px`);
                span.style.setProperty('--random-y', `${randomY}px`);
                span.classList.add('random-char');
                
                element.appendChild(span);
                
                // 順番にアニメーション開始
                setTimeout(() => {
                    span.classList.add('is-visible');
                }, 100 + (index * 100)); // 100msずつ遅延
            });
        }
        
        if (heroTitle) {
            splitTextToChars(heroTitle);
        }
        
        if (heroNameJp) {
            setTimeout(() => {
                splitTextToChars(heroNameJp);
            }, 100); // タイトルと同時に開始
        }
        
        // 英語名はそのまま表示
        if (heroNameEn) {
            setTimeout(() => {
                heroNameEn.style.opacity = '1';
            }, 1500); // 日本語名の後にフェードイン
        }
        
        // ファーストビューのスクロール監視（戻る時のアニメーション）
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const chars = entry.target.querySelectorAll('.char');
                const enName = entry.target.querySelector('.hero__name-en');
                
                if (!entry.isIntersecting) {
                    // 画面から消える時：文字を非表示
                    chars.forEach((char) => {
                        char.classList.remove('is-visible');
                    });
                    
                    if (enName) {
                        enName.style.opacity = '0';
                    }
                } else {
                    // 画面に戻る時：再度集まる
                    chars.forEach((char, index) => {
                        setTimeout(() => {
                            char.classList.add('is-visible');
                        }, index * 50);
                    });
                    
                    if (enName) {
                        setTimeout(() => {
                            enName.style.opacity = '1';
                        }, chars.length * 50);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        if (heroSection) {
            heroObserver.observe(heroSection);
        }
        
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

        // アニメーション対象要素を監視
        const sectionTitles = document.querySelectorAll('.section-title');
        const categoryTitles = document.querySelectorAll('.works__category-title');
        const bannerItems = document.querySelectorAll('.works__banner-item');
        const moreLinkIcons = document.querySelectorAll('.more-link__icon');
        const worksIntro = document.querySelector('.works__intro');
        
        sectionTitles.forEach(title => {
            observer.observe(title);
        });
        
        categoryTitles.forEach(title => {
            observer.observe(title);
        });
        
        bannerItems.forEach(item => {
            observer.observe(item);
        });
        
        moreLinkIcons.forEach(icon => {
            observer.observe(icon);
        });
        
        if (worksIntro) {
            observer.observe(worksIntro);
        }

        // 矢印アイコンのホバーアニメーション
        const moreLinks = document.querySelectorAll('.more-link');
        
        moreLinks.forEach(link => {
            const icon = link.querySelector('.more-link__icon');
            
            link.addEventListener('mouseenter', () => {
                icon.classList.remove('slide-in');
                icon.classList.add('slide-out');
            });
            
            link.addEventListener('mouseleave', () => {
                icon.classList.remove('slide-out');
                icon.classList.add('slide-in');
            });
        });
    }

    // ページ読み込み時にURLハッシュがあれば対応するセクションへスクロール
    function scrollToHash(hash) {
        if (!hash || hash === '#') return;
        
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            // ヘッダーの高さを取得（10vh）
            const headerHeight = window.innerHeight * 0.1;
            
            // ターゲット要素の位置を取得
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            let offsetPosition;
            
            // aboutとprofileの場合は画面中央に配置
            if (hash === '#about' || hash === '#profile') {
                const viewportCenterOffset = (window.innerHeight - headerHeight) / 2;
                const elementHalfHeight = targetElement.offsetHeight / 2;
                offsetPosition = targetPosition - headerHeight - viewportCenterOffset + elementHalfHeight;
            } else {
                offsetPosition = targetPosition - headerHeight;
            }
            
            // スムーズにスクロール
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // ページ読み込み時のハッシュ処理
    if (window.location.hash) {
        // DOM構築完了後に少し遅延させてスクロール
        setTimeout(() => {
            scrollToHash(window.location.hash);
        }, 100);
    }

    // スムーススクロール（ヘッダーオフセット対応）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            console.log('クリックされたリンク:', targetId); // デバッグ用
            
            if (targetId === '#') return; // #のみの場合は何もしない
            
            e.preventDefault(); // ページ内リンクの場合のみpreventDefault
            
            const targetElement = document.querySelector(targetId);
            console.log('ターゲット要素:', targetElement); // デバッグ用
            
            if (targetElement) {
                // ヘッダーの高さを取得（10vh）
                const headerHeight = window.innerHeight * 0.1;
                
                // ターゲット要素の位置を取得
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                let offsetPosition;
                
                // aboutとprofileの場合は画面中央に配置
                if (targetId === '#about' || targetId === '#profile') {
                    // ヘッダーを除いた画面の高さの半分
                    const viewportCenterOffset = (window.innerHeight - headerHeight) / 2;
                    // 要素の高さの半分
                    const elementHalfHeight = targetElement.offsetHeight / 2;
                    // 画面中央に配置するための計算
                    offsetPosition = targetPosition - headerHeight - viewportCenterOffset + elementHalfHeight;
                } else {
                    // その他のセクションはヘッダー分上にオフセット
                    offsetPosition = targetPosition - headerHeight;
                }
                
                console.log('スクロール位置:', offsetPosition); // デバッグ用
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューが開いている場合は閉じる
                if (navList && navList.classList.contains('is-active')) {
                    hamburger.classList.remove('is-active');
                    navList.classList.remove('is-active');
                    body.classList.remove('menu-open');
                }
            } else {
                console.log('ターゲット要素が見つかりません:', targetId); // デバッグ用
            }
        });
    });
});