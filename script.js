// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 深色模式切换
    initThemeToggle();
    
    // 轮播图功能
    initCarousel();
    
    // 下拉菜单
    initDropdowns();
    
    // 倒计时功能
    initCountdowns();
    
    // 导航栏滚动效果
    initNavbarScroll();
    
    // 平滑滚动
    initSmoothScroll();
});

// 深色模式切换
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // 检查本地存储中的主题设置
    if (localStorage.getItem('darkMode') === 'true' || 
        (localStorage.getItem('darkMode') === null && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
    
    // 监听切换事件
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
}

// 轮播图功能
function initCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators button');
    let currentIndex = 0;
    const totalItems = carouselItems.length;
    
    // 显示当前幻灯片
    function showSlide(index) {
        // 隐藏所有幻灯片
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // 重置所有指示器
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // 显示当前幻灯片和指示器
        carouselItems[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // 下一张幻灯片
    function nextSlide() {
        let nextIndex = (currentIndex + 1) % totalItems;
        showSlide(nextIndex);
    }
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // 自动轮播
    setInterval(nextSlide, 5000);
}

// 下拉菜单
function initDropdowns() {
    // 点击外部关闭下拉菜单
    document.addEventListener('click', function(event) {
        const userDropdowns = document.querySelectorAll('.user-dropdown');
        userDropdowns.forEach(dropdown => {
            if (!dropdown.closest('.user-profile').contains(event.target)) {
                dropdown.style.display = 'none';
            }
        });
    });
}

// 倒计时功能
function initCountdowns() {
    const countdownElements = document.querySelectorAll('.countdown .time');
    
    countdownElements.forEach(element => {
        // 模拟倒计时，实际项目中应该从服务器获取剩余时间
        let hours = 23;
        let minutes = 59;
        let seconds = 59;
        
        setInterval(() => {
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    if (hours < 0) {
                        hours = 23;
                    }
                }
            }
            
            // 格式化时间
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            element.textContent = formattedTime;
        }, 1000);
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏导航栏
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 搜索功能
function initSearch() {
    const searchBox = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchBox.value.trim();
        if (searchTerm) {
            // 实际项目中这里应该跳转到搜索结果页面
            console.log('搜索:', searchTerm);
            alert('搜索功能已触发，搜索内容: ' + searchTerm);
        }
    });
    
    // 回车键搜索
    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// 游戏卡片悬停效果
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card, .discount-card, .news-card, .live-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 初始化所有功能
window.onload = function() {
    initSearch();
    initGameCards();
};