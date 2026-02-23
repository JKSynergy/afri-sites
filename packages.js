// Packages page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Apply URL parameter filters on page load
    applyURLFilters();
    
    // Package filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const packageCards = document.querySelectorAll('.package-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            packageCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Package details data
    const packageDetails = {
        'kidepo-murchison': {
            title: '5-Day Expedition to Kidepo Valley & Murchison Falls National Parks',
            duration: '5 Days / 4 Nights',
            itinerary: [
                {
                    day: 'Day 1: Arrival in Entebbe',
                    activities: `
                        <strong>Afternoon:</strong> Arrive at Entebbe International Airport. Meet and greet by Afrisites Tours and Travel representative. Transfer to your hotel for check-in.<br>
                        <strong>Evening:</strong> Briefing about the upcoming safari. Relax and prepare for the adventure ahead.<br>
                        <strong>Accommodation:</strong> Mid-range hotel in Entebbe.
                    `
                },
                {
                    day: 'Day 2: Entebbe to Murchison Falls National Park',
                    activities: `
                        <strong>Morning:</strong> Depart Entebbe at 7:00 AM. Drive to Murchison Falls National Park, with a stopover at Ziwa Rhino Sanctuary for rhino tracking.<br>
                        <strong>Afternoon:</strong> Continue to the park. Visit the top of Murchison Falls for breathtaking views.<br>
                        <strong>Accommodation:</strong> Mid-range lodge within the park.
                    `
                },
                {
                    day: 'Day 3: Murchison Falls to Kidepo Valley National Park',
                    activities: `
                        <strong>Morning:</strong> Early game drive in Murchison Falls to spot wildlife such as lions, elephants, and giraffes.<br>
                        <strong>Afternoon:</strong> Drive to Kidepo Valley National Park, enjoying scenic landscapes en route.<br>
                        <strong>Accommodation:</strong> Mid-range lodge in Kidepo Valley.
                    `
                },
                {
                    day: 'Day 4: Exploring Kidepo Valley National Park',
                    activities: `
                        <strong>Morning:</strong> Game drive in Kidepo Valley to observe unique wildlife like cheetahs and ostriches.<br>
                        <strong>Afternoon:</strong> Cultural visit to a local Karamojong village to experience traditional dances and crafts.<br>
                        <strong>Accommodation:</strong> Mid-range lodge in Kidepo Valley.
                    `
                },
                {
                    day: 'Day 5: Return to Entebbe',
                    activities: `
                        <strong>Morning:</strong> Leisurely breakfast. Begin the journey back to Entebbe.<br>
                        <strong>Afternoon:</strong> Arrive in Entebbe. Depending on flight schedules, optional visit to local markets or botanical gardens.<br>
                        <strong>Evening:</strong> Transfer to Entebbe International Airport for departure.
                    `
                }
            ],
            pricing: [
                { type: 'Single Traveler', price: '$2,200', includes: 'Accommodation, transportation, park entry fees, activities, and meals as per itinerary. Profit margin: 10% included.' },
                { type: 'Couple', price: '$3,800', includes: 'Shared accommodation and transportation, individual activity fees, and meals as per itinerary. Profit margin: 10% included.' },
                { type: 'Group (8+ people)', price: '$1,800 per person', includes: 'Shared accommodation and transportation, group activity fees, and meals as per itinerary. Profit margin: 10% included.' }
            ],
            premiumServices: [
                'Luxury Accommodation Upgrade: Additional $500 per person',
                'Private Safari Vehicle: Additional $300 per group',
                'Chartered Flights Between Parks: Price upon request'
            ]
        },
        'uganda-rwanda-gorilla': {
            title: 'Pristine Adventures: 7-Day Uganda & Rwanda Gorilla and Wildlife Safari',
            duration: '7 Days / 6 Nights',
            itinerary: [
                {
                    day: 'Day 1: Arrival in Entebbe, Uganda',
                    activities: `
                        <strong>Morning:</strong> Arrive at Entebbe International Airport. Meet Afrisites Tours & Travel representative for a warm welcome.<br>
                        <strong>Afternoon:</strong> Transfer to your hotel in Kampala or Entebbe for rest and orientation.<br>
                        <strong>Evening:</strong> Safari briefing and preparation for the adventure ahead.<br>
                        <strong>Accommodation:</strong> Mid-range hotel in Entebbe or Kampala.
                    `
                },
                {
                    day: 'Day 2: Kampala to Bwindi Impenetrable National Park',
                    activities: `
                        <strong>Morning:</strong> Begin the journey to Bwindi Impenetrable Forest, with scenic stops en route through Uganda's rolling hills.<br>
                        <strong>Afternoon:</strong> Lunch break at Mbarara town. Continue the drive to Bwindi, arriving in the evening.<br>
                        <strong>Accommodation:</strong> Mid-range lodge near Bwindi.
                    `
                },
                {
                    day: 'Day 3: Gorilla Trekking in Bwindi Impenetrable Forest',
                    activities: `
                        <strong>Morning:</strong> Briefing on gorilla trekking rules, followed by a guided trek into the forest to encounter a mountain gorilla family.<br>
                        <strong>Afternoon:</strong> Return to the lodge for lunch and relaxation or optional community walk to meet the Batwa people.<br>
                        <strong>Accommodation:</strong> Mid-range lodge near Bwindi.
                    `
                },
                {
                    day: 'Day 4: Bwindi to Volcanoes National Park, Rwanda',
                    activities: `
                        <strong>Morning:</strong> Drive across the Uganda-Rwanda border into Rwanda's Volcanoes National Park.<br>
                        <strong>Afternoon:</strong> Relax at the lodge and enjoy panoramic views of the Virunga Mountains. Optional activities include a village visit or short nature walk.<br>
                        <strong>Accommodation:</strong> Mid-range lodge near Volcanoes National Park.
                    `
                },
                {
                    day: 'Day 5: Golden Monkey Trekking & Cultural Experience in Rwanda',
                    activities: `
                        <strong>Morning:</strong> Guided trek to observe the playful golden monkeys in their natural habitat.<br>
                        <strong>Afternoon:</strong> Visit the Iby'Iwacu Cultural Village for an immersive experience in Rwanda's traditional culture.<br>
                        <strong>Accommodation:</strong> Mid-range lodge near Volcanoes National Park.
                    `
                },
                {
                    day: 'Day 6: Transfer to Lake Kivu',
                    activities: `
                        <strong>Morning:</strong> Short drive to Lake Kivu, Rwanda's largest freshwater lake.<br>
                        <strong>Afternoon:</strong> Enjoy a boat ride, explore nearby islands, or relax by the lake.<br>
                        <strong>Accommodation:</strong> Mid-range lodge on the shores of Lake Kivu.
                    `
                },
                {
                    day: 'Day 7: Return to Kigali & Departure',
                    activities: `
                        <strong>Morning:</strong> Drive to Kigali. Optional city tour, including the Kigali Genocide Memorial and local markets.<br>
                        <strong>Afternoon:</strong> Lunch in Kigali, followed by transfer to Kigali International Airport for departure.
                    `
                }
            ],
            pricing: [
                { type: 'Single Traveler', price: '$3,400', includes: 'Gorilla and golden monkey permits, accommodation, transportation, meals, park fees, and activities as per itinerary.' },
                { type: 'Couple', price: '$5,800', includes: 'Shared accommodation and transportation, individual activity fees, and meals as per itinerary.' },
                { type: 'Group (8+ people)', price: '$2,700 per person', includes: 'Shared accommodation and transportation, group activity fees, and meals as per itinerary.' }
            ],
            premiumServices: [
                'Luxury lodge upgrades: Additional $700 per person',
                'Chartered flights: Prices available upon request'
            ]
        },
        'big-five': {
            title: '5-day, 4-night Uganda Big Five Safari',
            duration: '5 Days / 4 Nights',
            itinerary: [
                {
                    day: 'Day 1: Entebbe → Ziwa Rhino Sanctuary → Murchison Falls',
                    activities: `
                        <strong>Morning (7:00 AM):</strong> Depart Entebbe by private vehicle, heading north toward Ziwa Rhino Sanctuary.<br>
                        <strong>Late Morning:</strong> Arrive at Ziwa Rhino Sanctuary for a guided rhino tracking experience. Stroll through the savannah to see these majestic creatures up close, accompanied by a trained ranger.<br>
                        <strong>Afternoon:</strong> Enjoy lunch en route, then continue to Murchison Falls National Park.<br>
                        <strong>Evening (5:00 PM):</strong> Arrive at your lodge in Murchison Falls. Relax, soak in the sunset over the Nile.<br>
                        <strong>Overnight:</strong> A comfortable safari lodge (e.g., Pakuba Safari Lodge or Sambiya River Lodge).
                    `
                },
                {
                    day: 'Day 2: Murchison Falls – Game Drive & Nile Boat Cruise',
                    activities: `
                        <strong>Early Morning (6:00 AM):</strong> Wake up to a hearty breakfast, then head out for an early game drive on the northern bank of the Nile. Spot lions, elephants, giraffes, buffaloes, and more.<br>
                        <strong>Mid-Morning:</strong> Return to the lodge for brunch or relaxation.<br>
                        <strong>Afternoon (2:00 PM):</strong> Embark on a boat cruise on the Nile River to the base of Murchison Falls. Marvel at hippos, crocodiles, and diverse birdlife.<br>
                        <strong>Late Afternoon:</strong> Option to hike to the top of the falls for panoramic views (if time and energy permit).<br>
                        <strong>Evening:</strong> Dinner and storytelling by the campfire.<br>
                        <strong>Overnight:</strong> Same lodge as Day 1.
                    `
                },
                {
                    day: 'Day 3: Murchison Falls – Cultural Immersion & Scenic Exploration',
                    activities: `
                        <strong>Morning (7:00 AM):</strong> Enjoy a leisurely breakfast.<br>
                        <strong>Mid-Morning:</strong> Optional second game drive or a nature walk along the Nile's edge for close-up wildlife encounters and photography.<br>
                        <strong>Afternoon:</strong> Visit a local community near the park for a cultural experience—learn about traditional crafts, dances, and the way of life. Lunch at a local restaurant or back at the lodge.<br>
                        <strong>Evening:</strong> Sunset viewing at a scenic lookout, perfect for capturing breathtaking photos of the park.<br>
                        <strong>Overnight:</strong> Same lodge in Murchison Falls.
                    `
                },
                {
                    day: 'Day 4: Murchison Falls → Ziwa Rhino Sanctuary (Second Visit) → Kampala/Entebbe',
                    activities: `
                        <strong>Morning (6:30 AM):</strong> Early breakfast, check out of the lodge.<br>
                        <strong>8:00 AM:</strong> Depart Murchison Falls, driving back toward Ziwa Rhino Sanctuary (optional second visit).<br>
                        <strong>Option:</strong> If you'd like a second rhino tracking or a nature walk in Ziwa's wetlands to spot birdlife.<br>
                        <strong>Afternoon:</strong> Lunch at Ziwa's restaurant or along the route.<br>
                        <strong>Evening:</strong> Arrive in Kampala/Entebbe and check in to a hotel for an overnight stay.
                    `
                },
                {
                    day: 'Day 5: Departure or Additional Adventure',
                    activities: `
                        <strong>Morning:</strong> Relaxed breakfast at your hotel.<br>
                        <strong>Mid-Morning:</strong> Optional city tour of Kampala or Entebbe (if flight schedule permits).<br>
                        <strong>Afternoon:</strong> Depart for the airport or continue onward travel.
                    `
                }
            ],
            pricing: [
                { type: 'Per Person', price: '$1,200', includes: 'Transportation: 4WD safari vehicle with English-speaking driver/guide. Accommodation: 4 nights in mid-range lodge. Meals: Full board at safari lodges. Park Entry Fees: Murchison Falls NP + Ziwa Rhino Sanctuary. Activities: Game drives, Nile boat cruise, rhino tracking. Miscellaneous: Bottled water, ranger fees, and guided cultural tours.' }
            ],
            exclusions: [
                'Gorilla/chimp permits (not applicable in this package)',
                'Alcoholic beverages & personal expenses (souvenirs, tips)',
                'International flights & visa fees'
            ]
        },
        'lake-bunyonyi': {
            title: '3-Day Lake Bunyonyi Escape',
            duration: '3 Days / 2 Nights',
            itinerary: [
                {
                    day: 'Day 1: Kampala to Lake Bunyonyi',
                    activities: `
                        <strong>Morning:</strong> Depart early from Kampala in a comfortable private vehicle. Enjoy a scenic drive through Uganda's picturesque countryside.<br>
                        <strong>Afternoon:</strong> Stop for lunch in Mbarara, then continue the journey to Lake Bunyonyi. Arrive at your mid-range lakeside lodge (e.g., Lake Bunyonyi Paradise Resort or similar) and check in.<br>
                        <strong>Late Afternoon:</strong> Enjoy a leisurely boat ride on the lake to soak in the serene atmosphere and capture stunning photos.<br>
                        <strong>Evening:</strong> Savor a delicious dinner at the lodge and unwind while watching the sunset over the lake.<br>
                        <strong>Overnight:</strong> Stay at the lodge with full board.
                    `
                },
                {
                    day: 'Day 2: Explore Lake Bunyonyi & Nearby Attractions',
                    activities: `
                        <strong>Morning:</strong> Enjoy a hearty breakfast at the lodge. Set out on a guided canoe trip or boat tour to explore the lake's scenic islands and hidden coves.<br>
                        <strong>Mid-Morning:</strong> Visit a nearby local village to experience authentic Ugandan culture, interact with friendly locals, and learn about traditional crafts.<br>
                        <strong>Afternoon:</strong> Hike or drive to one of the lake's popular viewpoints for panoramic vistas and memorable photo opportunities. Enjoy a picnic lunch or return to the lodge for a meal.<br>
                        <strong>Evening:</strong> Relax with an optional nature walk along the lakeshore or simply unwind by the water with a sunset cocktail.<br>
                        <strong>Overnight:</strong> Stay at your lakeside lodge.
                    `
                },
                {
                    day: 'Day 3: Return to Kampala',
                    activities: `
                        <strong>Morning:</strong> After breakfast, check out from the lodge. Optionally, take a short guided nature walk near the lodge to enjoy the morning calm and capture final scenic shots.<br>
                        <strong>Afternoon:</strong> Begin the return journey to Kampala, stopping en route for lunch and a final cultural encounter if time permits.<br>
                        <strong>Evening:</strong> Arrive in Kampala, marking the end of your serene Lake Bunyonyi escape.
                    `
                }
            ],
            pricing: [
                { type: 'Per Person', price: 'Contact Us', includes: 'This 3-day package offers a perfect blend of relaxation, scenic beauty, and cultural immersion—ideal for a rejuvenating escape from the hustle and bustle of everyday life.' }
            ]
        },
        'queen-elizabeth': {
            title: 'Queen Elizabeth Escape – A 3-Day Wildlife Adventure',
            duration: '3 Days / 2 Nights',
            itinerary: [
                {
                    day: 'Day 1: Kampala → Queen Elizabeth National Park',
                    activities: `
                        <strong>Morning:</strong> Depart from Kampala around 7:00 AM in a private 4WD safari vehicle.<br>
                        <strong>Midday:</strong> Enjoy a scenic drive with a brief stop along the way (optional photo stop near local landmarks).<br>
                        <strong>Afternoon:</strong> Arrive at Queen Elizabeth National Park by approximately 1:00 PM and check in at your chosen mid-range lodge (for example, Enganzi Game Lodge or Pumba Safari Cottages – estimated rate: ~$150 per night, full board). Have lunch at the lodge.<br>
                        <strong>Evening:</strong> Embark on an introductory game drive along the park's renowned wildlife corridors. Enjoy a sunset viewing along the park's scenic areas before returning for dinner.<br>
                        <strong>Overnight:</strong> At the lodge.
                    `
                },
                {
                    day: 'Day 2: Full Day Safari & Boat Cruise',
                    activities: `
                        <strong>Early Morning:</strong> Begin your day with breakfast at the lodge. Head out on an early morning game drive to explore the rich diversity of wildlife including elephants, buffaloes, and antelope.<br>
                        <strong>Late Morning:</strong> Return to the lodge briefly for refreshments.<br>
                        <strong>Afternoon:</strong> Enjoy a relaxing boat cruise along the Kazinga Channel – famed for its abundant birdlife, hippos, and occasional crocodile sightings. A light lunch is served on board or at the lodge post-cruise.<br>
                        <strong>Evening:</strong> Optional: A second game drive or simply relax and enjoy the lodge amenities. Dinner served at the lodge under the stars.<br>
                        <strong>Overnight:</strong> At the lodge.
                    `
                },
                {
                    day: 'Day 3: Morning Safari & Return to Kampala',
                    activities: `
                        <strong>Morning:</strong> Enjoy an early breakfast followed by a short, final game drive, offering one last chance to capture stunning wildlife photographs.<br>
                        <strong>Late Morning:</strong> Check out from the lodge and depart for the return journey.<br>
                        <strong>Afternoon:</strong> Stop for lunch en route to Kampala.<br>
                        <strong>Evening:</strong> Arrive back in Kampala by late afternoon or early evening, concluding your adventure.
                    `
                }
            ],
            pricing: [
                { type: 'Per Person', price: 'Contact Us', includes: 'Mid-range lodge accommodation with full board, game drives, Kazinga Channel boat cruise, park entry fees, professional guide, and private 4WD transportation.' }
            ]
        }
    };

    // Show package details modal
    window.showPackageDetails = function(packageId) {
        const modal = document.getElementById('packageModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        const packageData = packageDetails[packageId];
        
        if (!packageData) return;
        
        modalTitle.textContent = packageData.title;
        
        let modalContent = `
            <div class="itinerary-section">
                <h3 style="font-family: 'Playfair Display', serif; color: #e74c3c; margin-bottom: 2rem;">Detailed Itinerary</h3>
        `;
        
        packageData.itinerary.forEach(day => {
            modalContent += `
                <div class="itinerary-day">
                    <div class="day-header">${day.day}</div>
                    <div class="day-activities">${day.activities}</div>
                </div>
            `;
        });
        
        modalContent += `</div>`;
        
        if (packageData.pricing) {
            modalContent += `
                <div class="pricing-section">
                    <h3 style="font-family: 'Playfair Display', serif; color: #e74c3c; margin-bottom: 1rem;">Pricing Details</h3>
                    <div class="pricing-grid">
            `;
            
            packageData.pricing.forEach(price => {
                modalContent += `
                    <div class="pricing-item">
                        <h4 style="color: #333; margin-bottom: 0.5rem;">${price.type}</h4>
                        <div style="font-size: 1.5rem; font-weight: 700; color: #e74c3c; margin-bottom: 0.5rem;">${price.price}</div>
                        <p style="font-size: 0.9rem; color: #666;">${price.includes}</p>
                    </div>
                `;
            });
            
            modalContent += `</div></div>`;
        }
        
        if (packageData.premiumServices) {
            modalContent += `
                <div style="margin-top: 2rem;">
                    <h4 style="color: #333; margin-bottom: 1rem;">Optional Premium Services:</h4>
                    <ul style="color: #666; line-height: 1.6;">
            `;
            
            packageData.premiumServices.forEach(service => {
                modalContent += `<li>${service}</li>`;
            });
            
            modalContent += `</ul></div>`;
        }
        
        if (packageData.exclusions) {
            modalContent += `
                <div style="margin-top: 2rem;">
                    <h4 style="color: #333; margin-bottom: 1rem;">Exclusions:</h4>
                    <ul style="color: #666; line-height: 1.6;">
            `;
            
            packageData.exclusions.forEach(exclusion => {
                modalContent += `<li>${exclusion}</li>`;
            });
            
            modalContent += `</ul></div>`;
        }
        
        modalContent += `
            <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #eee;">
                <button onclick="bookPackage('${packageData.title}')" style="background: #e74c3c; color: white; border: none; padding: 1rem 2rem; border-radius: 25px; font-weight: 600; cursor: pointer; font-size: 1.1rem;">
                    Book This Package
                </button>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close package details modal
    window.closePackageModal = function() {
        const modal = document.getElementById('packageModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Book package function
    window.bookPackage = function(packageName) {
        // Create booking modal
        const bookingContent = `
            <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px;">
                <h3 style="color: #e74c3c; margin-bottom: 1rem;">Book: ${packageName}</h3>
                <p style="margin-bottom: 2rem; color: #666;">Ready to embark on this incredible adventure? Contact us to book your safari!</p>
                
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <a href="tel:+256393101000" style="background: #e74c3c; color: white; padding: 1rem; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 600;">
                        <i class="fas fa-phone"></i> Call: +256 393101000
                    </a>
                    <a href="mailto:Info@afrisitestoursandtravel.org?subject=Booking Inquiry: ${encodeURIComponent(packageName)}" style="background: #3498db; color: white; padding: 1rem; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 600;">
                        <i class="fas fa-envelope"></i> Email Us
                    </a>
                    <a href="index.html#contact" style="background: #27ae60; color: white; padding: 1rem; border-radius: 10px; text-decoration: none; text-align: center; font-weight: 600;">
                        <i class="fas fa-form"></i> Contact Form
                    </a>
                </div>
            </div>
        `;
        
        showCustomModal(bookingContent);
    };

    // Custom modal function (reused from main script)
    function showCustomModal(content) {
        const existingModal = document.querySelector('.custom-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10002;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div class="modal-content" style="position: relative;">
                <button class="modal-close" style="position: absolute; top: -10px; right: -10px; background: #e74c3c; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center;">&times;</button>
                ${content}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('packageModal');
        if (e.target === modal) {
            closePackageModal();
        }
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const packageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    packageCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        packageObserver.observe(card);
    });
});

// Apply URL parameter filters
function applyURLFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');
    const experience = urlParams.get('experience');
    const tourClass = urlParams.get('class');
    
    // If no filters, show all packages
    if (!destination && !experience && !tourClass) {
        return;
    }
    
    // Show notification about applied filters
    const filters = [];
    if (destination) filters.push(`Destination: ${formatDestination(destination)}`);
    if (experience) filters.push(`Experience: ${formatExperience(experience)}`);
    if (tourClass) filters.push(`Class: ${tourClass.charAt(0).toUpperCase() + tourClass.slice(1)}`);
    
    if (filters.length > 0) {
        showFilterNotification('Showing packages for: ' + filters.join(', '));
    }
    
    // Filter packages based on URL parameters
    const packageCards = document.querySelectorAll('.package-card');
    let visibleCount = 0;
    
    packageCards.forEach(card => {
        let shouldShow = true;
        
        // Check destination match (in title or highlights)
        if (destination) {
            const cardText = card.textContent.toLowerCase();
            const destMap = {
                'bwindi': ['bwindi', 'gorilla'],
                'queen-elizabeth': ['queen elizabeth', 'kazinga'],
                'murchison': ['murchison', 'falls'],
                'kidepo': ['kidepo', 'valley'],
                'lake-mburo': ['lake mburo', 'mburo'],
                'jinja': ['jinja', 'nile', 'source']
            };
            
            if (destMap[destination]) {
                const keywords = destMap[destination];
                shouldShow = keywords.some(keyword => cardText.includes(keyword));
            }
        }
        
        // Check experience match
        if (experience && shouldShow) {
            const cardText = card.textContent.toLowerCase();
            const expMap = {
                'gorilla': ['gorilla', 'trekking', 'tracking'],
                'safari': ['safari', 'wildlife', 'game drive', 'big five'],
                'adventure': ['adventure', 'hiking', 'climbing', 'rafting'],
                'cultural': ['cultural', 'community', 'village'],
                'water': ['water', 'boat', 'cruise', 'lake']
            };
            
            if (expMap[experience]) {
                const keywords = expMap[experience];
                shouldShow = keywords.some(keyword => cardText.includes(keyword));
            }
        }
        
        // Check tour class match
        if (tourClass && shouldShow) {
            const cardCategories = card.getAttribute('data-category') || '';
            const hasPremiumBadge = card.querySelector('.package-badge.premium');
            
            if (tourClass === 'premium' || tourClass === 'luxury') {
                shouldShow = hasPremiumBadge !== null || cardCategories.includes('luxury');
            } else if (tourClass === 'budget') {
                shouldShow = !hasPremiumBadge;
            }
        }
        
        // Show or hide the card
        if (shouldShow) {
            card.style.display = 'grid';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show message if no packages match
    if (visibleCount === 0) {
        showFilterNotification('No packages match your search criteria. Showing all packages.', 'warning');
        packageCards.forEach(card => card.style.display = 'grid');
    }
}

// Format destination names
function formatDestination(dest) {
    const names = {
        'bwindi': 'Bwindi Forest',
        'queen-elizabeth': 'Queen Elizabeth NP',
        'murchison': 'Murchison Falls',
        'kidepo': 'Kidepo Valley',
        'lake-mburo': 'Lake Mburo',
        'jinja': 'Jinja'
    };
    return names[dest] || dest;
}

// Format experience names
function formatExperience(exp) {
    const names = {
        'gorilla': 'Gorilla Trekking',
        'safari': 'Wildlife Safari',
        'adventure': 'Adventure',
        'cultural': 'Cultural Tours',
        'water': 'Water Activities'
    };
    return names[exp] || exp;
}

// Show filter notification
function showFilterNotification(message, type = 'info') {
    // Remove existing filter notifications
    const existing = document.querySelector('.filter-notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'filter-notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'warning' ? '#f39c12' : '#27ae60'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideDown 0.3s ease;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-filter"></i>
        <span>${message}</span>
        <button onclick="clearFilters()" style="margin-left: 1rem; background: rgba(255,255,255,0.3); border: none; color: white; padding: 0.25rem 0.75rem; border-radius: 15px; cursor: pointer; font-weight: 600;">Clear</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 8000);
}

// Clear filters and show all packages
function clearFilters() {
    window.location.href = 'packages.html';
}

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
    
    .nav-menu a.active {
        color: #e74c3c !important;
    }
    
    .nav-menu a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(animationStyles);