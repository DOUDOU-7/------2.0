        // 导航栏滚动效果
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled', 'bg-white/90', 'shadow-md', 'py-2');
                navbar.classList.remove('py-4');
                // 改变导航文字颜色
                document.querySelectorAll('#navbar a:not(.font-serif)').forEach(link => {
                    link.classList.remove('text-white');
                    link.classList.add('text-dark', 'hover:text-primary');
                });
                document.querySelector('#menu-toggle').classList.remove('text-white');
                document.querySelector('#menu-toggle').classList.add('text-dark');
            } else {
                navbar.classList.remove('nav-scrolled', 'bg-white/90', 'shadow-md', 'py-2');
                navbar.classList.add('py-4');
                // 恢复导航文字颜色
                document.querySelectorAll('#navbar a:not(.font-serif)').forEach(link => {
                    link.classList.add('text-white');
                    link.classList.remove('text-dark', 'hover:text-primary');
                });
                document.querySelector('#menu-toggle').classList.add('text-white');
                document.querySelector('#menu-toggle').classList.remove('text-dark');
            }
        });
        
        // 移动端菜单切换
        document.getElementById('menu-toggle').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });
        
        // 滚动动画
        function revealElements() {
            const reveals = document.querySelectorAll('.reveal, .map-container, .map-point, .connection-line, .heritage-title, .heritage-content');
            
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active', 'visible');
                }
            });
        }
        
        window.addEventListener('scroll', revealElements);
        window.addEventListener('load', revealElements);