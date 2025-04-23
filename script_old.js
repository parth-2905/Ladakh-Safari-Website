document.addEventListener('DOMContentLoaded', () => {
    // Journey Cards Carousel
    const journeyGrid = document.querySelector('.destination-grid');
    const prevButton = document.querySelector('.nav-arrow.prev');
    const nextButton = document.querySelector('.nav-arrow.next');
    
    if (journeyGrid && prevButton && nextButton) {
        const cards = journeyGrid.querySelectorAll('.destination-card');
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight) * 2;
        const visibleCards = 3;
        let currentPosition = 0;
        const totalCards = cards.length;
        let isScrolling = false;
        let scrollTimeout;

        // Clone cards for infinite loop
        const cloneFirst = cards[0].cloneNode(true);
        const cloneLast = cards[cards.length - 1].cloneNode(true);
        journeyGrid.insertBefore(cloneLast, cards[0]);
        journeyGrid.appendChild(cloneFirst);

        function updatePosition() {
            journeyGrid.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
        }

        // Navigate to the previous card
        prevButton.addEventListener('click', function(e) {
            e.preventDefault();
            currentPosition--;
            
            // If we've reached the cloned cards at the beginning
            if (currentPosition < 0) {
                currentPosition = totalCards - 1;
                journeyGrid.style.transition = 'none';
                updatePosition();
                setTimeout(() => {
                    journeyGrid.style.transition = 'transform 0.3s ease';
                }, 10);
            } else {
                updatePosition();
            }
        });
        
        // Navigate to the next card
        nextButton.addEventListener('click', function(e) {
            e.preventDefault();
            currentPosition++;
            
            // If we've reached the cloned cards at the end
            if (currentPosition >= totalCards) {
                currentPosition = 0;
                journeyGrid.style.transition = 'none';
                updatePosition();
                setTimeout(() => {
                    journeyGrid.style.transition = 'transform 0.3s ease';
                }, 10);
            } else {
                updatePosition();
            }
        });

        // Add mouse wheel event for scrolling
        journeyGrid.addEventListener('wheel', function(e) {
            e.preventDefault();
            
            // Prevent rapid scrolling
            if (isScrolling) return;
            isScrolling = true;
            
            // Determine scroll direction
            if (e.deltaY > 0) {
                // Scroll right
                currentPosition++;
                if (currentPosition >= totalCards) {
                    currentPosition = 0;
                    journeyGrid.style.transition = 'none';
                    updatePosition();
                    setTimeout(() => {
                        journeyGrid.style.transition = 'transform 0.3s ease';
                    }, 10);
                } else {
                    updatePosition();
                }
            } else {
                // Scroll left
                currentPosition--;
                if (currentPosition < 0) {
                    currentPosition = totalCards - 1;
                    journeyGrid.style.transition = 'none';
                    updatePosition();
                    setTimeout(() => {
                        journeyGrid.style.transition = 'transform 0.3s ease';
                    }, 10);
                } else {
                    updatePosition();
                }
            }
            
            // Reset scroll timeout
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 200);
        }, { passive: false });
        
        // Add touch events for mobile scrolling
        let touchStartX = 0;
        let touchEndX = 0;
        
        journeyGrid.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        journeyGrid.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left (next)
                currentPosition++;
                if (currentPosition >= totalCards) {
                    currentPosition = 0;
                    journeyGrid.style.transition = 'none';
                    updatePosition();
                    setTimeout(() => {
                        journeyGrid.style.transition = 'transform 0.3s ease';
                    }, 10);
                } else {
                    updatePosition();
                }
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right (prev)
                currentPosition--;
                if (currentPosition < 0) {
                    currentPosition = totalCards - 1;
                    journeyGrid.style.transition = 'none';
                    updatePosition();
                    setTimeout(() => {
                        journeyGrid.style.transition = 'transform 0.3s ease';
                    }, 10);
                } else {
                    updatePosition();
                }
            }
        }

        // Update card widths on window resize
        function updateCardWidths() {
            const newCardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight) * 2;
            if (cardWidth !== newCardWidth) {
                cardWidth = newCardWidth;
                updatePosition();
            }
        }

        window.addEventListener('resize', updateCardWidths);
        
        // Initial update
        updateCardWidths();
    }
    
    // Terms & Conditions Toggle
    const activityCards = document.querySelectorAll('.activity-card');
    
    if (activityCards) {
        activityCards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        });
    }
    
    // Team card expansion
    const teamCards = document.querySelectorAll('.team-card');
    
    if (teamCards) {
        teamCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close other cards
                teamCards.forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('expanded')) {
                        otherCard.classList.remove('expanded');
                    }
                });
                
                // Toggle current card
                card.classList.toggle('expanded');
            });
        });
    }
});
