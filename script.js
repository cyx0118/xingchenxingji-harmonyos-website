document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("themeToggle");
    const downloadBtn = document.getElementById("downloadBtn");
    const html = document.documentElement;
    
    function getInitialTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    }
    
    function setTheme(theme) {
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        updateImages(theme);
    }
    
    function updateImages(theme) {
        const images = document.querySelectorAll(".theme-img");
        images.forEach(function(img) {
            const lightSrc = img.getAttribute("data-light");
            const darkSrc = img.getAttribute("data-dark");
            
            if (!lightSrc || !darkSrc) return;
            
            const newSrc = theme === "dark" ? darkSrc : lightSrc;
            
            if (img.src !== newSrc) {
                img.style.opacity = "0";
                setTimeout(function() {
                    img.src = newSrc;
                    img.onload = function() {
                        img.style.opacity = "1";
                    };
                }, 150);
            }
        });
    }
    
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    
    themeToggle.addEventListener("click", function() {
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    const sectionTitles = document.querySelectorAll(".section-title");
    const showcaseItems = document.querySelectorAll(".showcase-item");
    const featureCards = document.querySelectorAll(".feature-card");

    sectionTitles.forEach(function(el) {
        observer.observe(el);
    });

    showcaseItems.forEach(function(item, index) {
        item.style.animationDelay = (index * 0.1) + "s";
        observer.observe(item);
    });

    featureCards.forEach(function(card, index) {
        card.style.animationDelay = (index * 0.1) + "s";
        observer.observe(card);
    });
});