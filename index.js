// 导航栏滚动效果
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', function() {
            // 导航栏样式变化
            if (window.scrollY > 100) {
                navbar.classList.add('nav-scrolled');
                navbar.classList.remove('py-4');
                navbar.classList.add('py-2');
                
                // 导航栏文字颜色变化
                const navLinks = navbar.querySelectorAll('.hidden.md\\:flex a');
                navLinks.forEach(link => {
                    link.classList.remove('text-white');
                    link.classList.add('text-dark');
                    link.classList.remove('text-shadow');
                });
                
                // 显示返回顶部按钮
                backToTop.classList.remove('opacity-0', 'translate-y-10');
                backToTop.classList.add('opacity-100', 'translate-y-0');
            } else {
                navbar.classList.remove('nav-scrolled');
                navbar.classList.remove('py-2');
                navbar.classList.add('py-4');
                
                // 导航栏文字颜色恢复
                const navLinks = navbar.querySelectorAll('.hidden.md\\:flex a');
                navLinks.forEach(link => {
                    link.classList.add('text-white');
                    link.classList.remove('text-dark');
                    link.classList.add('text-shadow');
                });
                
                // 隐藏返回顶部按钮
                backToTop.classList.add('opacity-0', 'translate-y-10');
                backToTop.classList.remove('opacity-100', 'translate-y-0');
            }
            
            // 检查元素是否在视口中，添加动画
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });

           // 滚动显示动画
            function revealElements() {
            const reveals = document.querySelectorAll('.reveal');
  
            for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150; // 元素距离视口底部150px时触发显示
    
            if (elementTop < windowHeight - elementVisible) {
               reveals[i].classList.add('active');
                    }
                }
            }

            // 初始加载时检查
            window.addEventListener('load', function() {
            revealElements();
            });

            // 滚动时检查
            window.addEventListener('scroll', function() {
            // 其他滚动相关代码...
  
            // 滚动显示动画
            revealElements();
            });
            
            // 地图相关元素动画
            const mapContainers = document.querySelectorAll('.map-container');
            mapContainers.forEach(container => {
                const containerTop = container.getBoundingClientRect().top;
                const containerVisible = 200;
                if (containerTop < window.innerHeight - containerVisible) {
                    container.classList.add('visible');
                    
                    // 显示地图上的点
                    const mapPoint = container.querySelector('.map-point');
                    if (mapPoint) mapPoint.classList.add('visible');
                    
                    // 显示连接线
                    const connectionLine = container.querySelector('.connection-line');
                    if (connectionLine) connectionLine.classList.add('visible');
                    
                    // 显示标题
                    const heritageSection = container.closest('section');
                    const heritageTitle = heritageSection.querySelector('.heritage-title');
                    if (heritageTitle) heritageTitle.classList.add('visible');
                    
                    // 显示内容
                    const heritageContent = heritageSection.querySelector('.heritage-content');
                    if (heritageContent) heritageContent.classList.add('visible');
                }
            });
        });
        
        // 移动端菜单切换
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 点击移动端菜单项后关闭菜单
        const mobileMenuItems = mobileMenu.querySelectorAll('a');
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // 返回顶部功能
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 页面加载时初始化动画
        window.addEventListener('load', function() {
            // 触发一次滚动事件，初始化可见元素的动画
            window.dispatchEvent(new Event('scroll'));
        });
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#8C1C13', // 传统红色，体现文化底蕴
                        secondary: '#D9B38C', // 暖棕色，体现古朴感
                        overlay: 'rgba(255, 255, 255, 0.7)', // 内容区域白色覆盖层
                        dark: '#2D2A32', // 深色文本
                    },
                    fontFamily: {
                        serif: ['Noto Serif SC', 'serif'],
                        sans: ['Inter', 'sans-serif'],
                    },
                }
            }
        }
        // 获取所有卡片和容器
        const cards = document.querySelectorAll('.stacked-card');
        const container = document.querySelector('.stack-container');
        let activeIndex = 2; // 初始激活的卡片索引（最前面的卡片）
        
        // 卡片状态配置 - 定义不同位置的卡片样式
        const cardStates = [
            { zIndex: 1, top: '60px', rotate: '-4deg', scale: 1 },    // 最后面
            { zIndex: 2, top: '30px', rotate: '-2deg', scale: 1 },    // 中间后
            { zIndex: 3, top: '0px', rotate: '0deg', scale: 1.05 },   // 最前面（激活）
            { zIndex: 0, top: '40px', rotate: '3deg', scale: 1 }      // 中间前
        ];
        
        // 应用卡片状态
        function applyCardStates() {
            cards.forEach((card, index) => {
                // 计算当前卡片应该使用的状态（循环切换）
                const stateIndex = (index - activeIndex + cardStates.length) % cardStates.length;
                const state = cardStates[stateIndex];
                
                // 应用样式
                card.style.zIndex = state.zIndex;
                card.style.top = state.top;
                card.style.transform = `rotate(${state.rotate}) scale(${state.scale})`;
                
                // 添加/移除激活状态的阴影
                if (stateIndex === 0) {
                    card.classList.add('shadow-xl');
                } else {
                    card.classList.remove('shadow-xl');
                }
            });
        }
        
        // 初始化卡片状态
        applyCardStates();
        
        // 监听鼠标滚轮事件
        container.addEventListener('wheel', (e) => {
            e.preventDefault(); // 阻止页面滚动
            
            // 滚轮向上滚动（正值）或向下滚动（负值）
            if (e.deltaY < 0) {
                // 向上滚动 - 上一张卡片
                activeIndex = (activeIndex - 1 + cards.length) % cards.length;
            } else {
                // 向下滚动 - 下一张卡片
                activeIndex = (activeIndex + 1) % cards.length;
            }
            
            // 应用新状态
            applyCardStates();
        }, { passive: false });
        
        // 保持原有的鼠标悬停效果
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const originalZIndex = card.style.zIndex;
                card.style.zIndex = 10;
                card.style.transform = card.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(1.1)';
                card.classList.add('shadow-2xl');
                
                card.addEventListener('mouseleave', () => {
                    card.style.zIndex = originalZIndex;
                    applyCardStates(); // 恢复到当前激活状态
                }, { once: true });
            });
        });

        // 非遗故事卡片堆叠效果
        function initHeritageCardStack() {
            const heritageCards = document.querySelectorAll('#stories .stacked-card');
            const heritageContainer = document.querySelector('#stories .stack-container');
            let heritageActiveIndex = 0;
            const heritageCardCount = heritageCards.length;
            let isHeritageAnimating = false;
            
            // 重置卡片状态配置 - 实现从下方滑入和淡出效果
            const heritageCardStates = [
                { zIndex: 4, translateY: '0%', scale: 1, opacity: 1 },          // 最上面（激活）
                { zIndex: 3, translateY: '110%', scale: 0.95, opacity: 0 },     // 下一张（增加位移距离）
                { zIndex: 2, translateY: '220%', scale: 0.9, opacity: 0 }       // 再下一张（增加位移距离）
            ];
            
            // 初始化所有卡片位置
            heritageCards.forEach((card, index) => {
                const state = heritageCardStates[index % heritageCardStates.length];
                card.style.position = 'absolute';
                card.style.bottom = '0';
                card.style.left = '0';
                card.style.width = '100%';
                card.style.transform = `translateY(${state.translateY}) scale(${state.scale}) rotate(0deg)`;
                // 明确移除任何可能的旋转相关样式
                card.style.rotate = '0deg';
                card.style.transformOrigin = 'center center';
                card.style.opacity = state.opacity;
                card.style.zIndex = state.zIndex;
                card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.rotate = '0deg';
            });
            
            // 应用卡片状态
            function applyHeritageCardStates() {
                heritageCards.forEach((card, index) => {
                    // 计算每个卡片应该应用的状态
                    const stateIndex = (index - heritageActiveIndex + heritageCardCount) % heritageCardCount;
                    const state = heritageCardStates[stateIndex];
                    
                    card.style.zIndex = state.zIndex;
                    card.style.transform = `translateY(${state.translateY}) scale(${state.scale})`;
                    card.style.opacity = state.opacity;
                    
                    if (stateIndex === 0) {
                        card.classList.add('shadow-xl');
                    } else {
                        card.classList.remove('shadow-xl');
                    }
                });
            }
            
            // 鼠标滚轮事件处理
            if (heritageContainer) {
                heritageContainer.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    if (isHeritageAnimating) return;
                    isHeritageAnimating = true;
                    
                    // 向下滚动显示下一张卡片
                    if (e.deltaY > 0) {
                        heritageActiveIndex = (heritageActiveIndex + 1) % heritageCardCount;
                    } else {
                        // 向上滚动显示上一张卡片
                        heritageActiveIndex = (heritageActiveIndex - 1 + heritageCardCount) % heritageCardCount;
                    }
                    
                    applyHeritageCardStates();
                    
                    // 动画完成后重置动画锁
                    setTimeout(() => {
                        isHeritageAnimating = false;
                    }, 500);
                }, { passive: false });
            }
        }

        // 页面加载完成后初始化
        window.addEventListener('load', initHeritageCardStack);