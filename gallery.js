// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Layout toggle functionality
    const layoutButtons = document.querySelectorAll('.layout-btn');
    const galleryGrid = document.getElementById('galleryGrid');
    
    layoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            layoutButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const layout = this.getAttribute('data-layout');
            
            if (layout === 'masonry') {
                galleryGrid.classList.add('masonry');
            } else {
                galleryGrid.classList.remove('masonry');
            }
        });
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxInfo = document.getElementById('lightboxInfo');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    // Zoom functionality
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const zoomResetBtn = document.getElementById('zoomReset');
    let currentZoom = 1;
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    
    let currentImageIndex = 0;
    let visibleImages = [];

    // Update visible images array
    function updateVisibleImages() {
        visibleImages = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none'
        );
    }

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            updateVisibleImages();
            currentImageIndex = visibleImages.indexOf(this);
            showLightbox(this);
        });
    });

    function showLightbox(item) {
        const img = item.querySelector('img');
        const info = item.querySelector('.gallery-info');
        
        // Use higher resolution image for lightbox
        const highResUrl = img.src.replace('w=600', 'w=1200').replace('w=800', 'w=1200');
        lightboxImage.src = highResUrl;
        lightboxImage.alt = img.alt;
        
        // Reset zoom
        currentZoom = 1;
        lightboxImage.style.transform = 'scale(1)';
        lightboxImage.classList.remove('zoomed');
        
        if (info) {
            lightboxInfo.querySelector('h3').textContent = info.querySelector('h3').textContent;
            lightboxInfo.querySelector('p').textContent = info.querySelector('p').textContent;
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Zoom functionality
    zoomInBtn.addEventListener('click', function() {
        currentZoom = Math.min(currentZoom * 1.5, 3);
        updateZoom();
    });
    
    zoomOutBtn.addEventListener('click', function() {
        currentZoom = Math.max(currentZoom / 1.5, 1);
        updateZoom();
    });
    
    zoomResetBtn.addEventListener('click', function() {
        currentZoom = 1;
        updateZoom();
    });
    
    function updateZoom() {
        lightboxImage.style.transform = `scale(${currentZoom})`;
        if (currentZoom > 1) {
            lightboxImage.classList.add('zoomed');
        } else {
            lightboxImage.classList.remove('zoomed');
        }
    }
    
    // Pan functionality when zoomed
    lightboxImage.addEventListener('mousedown', function(e) {
        if (currentZoom > 1) {
            isDragging = true;
            startX = e.pageX - lightboxImage.offsetLeft;
            startY = e.pageY - lightboxImage.offsetTop;
            scrollLeft = lightboxImage.scrollLeft;
            scrollTop = lightboxImage.scrollTop;
        }
    });
    
    lightboxImage.addEventListener('mousemove', function(e) {
        if (!isDragging || currentZoom <= 1) return;
        e.preventDefault();
        const x = e.pageX - lightboxImage.offsetLeft;
        const y = e.pageY - lightboxImage.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        lightboxImage.scrollLeft = scrollLeft - walkX;
        lightboxImage.scrollTop = scrollTop - walkY;
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentZoom = 1;
        lightboxImage.style.transform = 'scale(1)';
        lightboxImage.classList.remove('zoomed');
    }

    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation in lightbox
    lightboxNext.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        showLightbox(visibleImages[currentImageIndex]);
    });

    lightboxPrev.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        showLightbox(visibleImages[currentImageIndex]);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                lightboxNext.click();
                break;
            case 'ArrowLeft':
                lightboxPrev.click();
                break;
        }
    });

    // Load more functionality
    let hiddenImages = [];
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Initially hide some images to demonstrate load more
    function initializeLoadMore() {
        const allImages = Array.from(galleryItems);
        const visibleCount = 9; // Show first 9 images
        
        allImages.forEach((item, index) => {
            if (index >= visibleCount) {
                item.style.display = 'none';
                item.classList.add('hidden-item');
                hiddenImages.push(item);
            }
        });
        
        if (hiddenImages.length === 0) {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    loadMoreBtn.addEventListener('click', function() {
        const loadCount = 6; // Load 6 more images each time
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        
        let loaded = 0;
        hiddenImages = hiddenImages.filter(item => {
            if (loaded >= loadCount) return true;
            
            const itemCategory = item.getAttribute('data-category');
            if (activeFilter === 'all' || itemCategory === activeFilter) {
                item.style.display = 'block';
                item.classList.remove('hidden-item');
                item.style.animation = 'fadeInUp 0.5s ease';
                loaded++;
                return false; // Remove from hiddenImages array
            }
            return true; // Keep in hiddenImages array
        });
        
        if (hiddenImages.length === 0) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // Initialize load more
    initializeLoadMore();

    // Video gallery functionality
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            showVideoModal(videoId);
        });
    });

    function showVideoModal(videoId) {
        // Video data (in a real application, you'd have actual video URLs)
        const videoData = {
            'gorilla-trekking': {
                title: 'Gorilla Trekking Adventure',
                description: 'Experience the thrill of meeting mountain gorillas in their natural habitat.',
                embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Placeholder URL
            },
            'big-five-safari': {
                title: 'Big Five Safari Experience',
                description: 'Witness Africa\'s most iconic animals in their natural environment.',
                embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Placeholder URL
            },
            'murchison-falls': {
                title: 'Murchison Falls Boat Cruise',
                description: 'Experience the power of the mighty Nile at Murchison Falls.',
                embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Placeholder URL
            },
            'cultural-encounters': {
                title: 'Cultural Encounters',
                description: 'Immerse yourself in Uganda\'s rich cultural heritage.',
                embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Placeholder URL
            }
        };

        const video = videoData[videoId];
        if (!video) return;

        // Create video modal
        const videoModal = document.createElement('div');
        videoModal.className = 'video-modal';
        videoModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            animation: fadeIn 0.3s ease;
        `;

        videoModal.innerHTML = `
            <div class="video-modal-content" style="position: relative; width: 90%; max-width: 800px; background: white; border-radius: 15px; overflow: hidden;">
                <button class="video-modal-close" style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 2rem; color: white; cursor: pointer; z-index: 1; background: rgba(0,0,0,0.5); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">&times;</button>
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                    <iframe src="${video.embedUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allowfullscreen></iframe>
                </div>
                <div style="padding: 1.5rem;">
                    <h3 style="color: #333; margin-bottom: 0.5rem;">${video.title}</h3>
                    <p style="color: #666; line-height: 1.6;">${video.description}</p>
                </div>
            </div>
        `;

        document.body.appendChild(videoModal);
        document.body.style.overflow = 'hidden';

        // Close video modal
        const closeBtn = videoModal.querySelector('.video-modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(videoModal);
            document.body.style.overflow = 'auto';
        });

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                document.body.removeChild(videoModal);
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Add loading animation to images
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    // Gallery item animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        galleryObserver.observe(item);
    });

    // Mobile optimizations
    function handleMobileView() {
        if (window.innerWidth <= 768) {
            // Hide navigation arrows on mobile
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
            
            // Add touch gestures for lightbox
            let touchStartX = 0;
            let touchEndX = 0;
            
            lightbox.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            lightbox.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleGesture();
            });
            
            function handleGesture() {
                if (touchEndX < touchStartX - 50) {
                    // Swipe left - next image
                    lightboxNext.click();
                }
                if (touchEndX > touchStartX + 50) {
                    // Swipe right - previous image
                    lightboxPrev.click();
                }
            }
        }
    }

    // Initialize mobile optimizations
    handleMobileView();
    window.addEventListener('resize', handleMobileView);

    // Add CSS animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .gallery-item.loaded img {
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .gallery-item img {
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .video-modal {
            animation: fadeIn 0.3s ease;
        }
        
        .nav-menu a.active {
            color: #e74c3c !important;
        }
        
        .nav-menu a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(animationStyles);
});

// Initialize gallery when page loads
window.addEventListener('load', function() {
    // Trigger any additional loading animations
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});