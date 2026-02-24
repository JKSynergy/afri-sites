// Packages page functionality

// ─── Global filter function (callable from inline onclick or event delegation) ───
function filterPackages(category) {
    var buttons = document.querySelectorAll('.category-btn');
    var cards   = document.querySelectorAll('.package-card');

    // Update active button
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });

    // Show / hide cards
    var visibleCount = 0;
    cards.forEach(function(card) {
        var cardCategories = (card.getAttribute('data-category') || '').split(' ');

        if (category === 'all' || cardCategories.indexOf(category) !== -1) {
            card.style.display = 'grid';
            card.style.opacity = '1';
            card.style.transform = 'none';
            card.style.animation = 'none';
            void card.offsetWidth;               // force reflow
            card.style.animation = 'fadeIn 0.5s ease';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Update counter
    var counter = document.getElementById('visibleCount');
    if (counter) counter.textContent = visibleCount;
}
// Expose globally so inline onclick can reach it
window.filterPackages = filterPackages;

// ─── Event-delegation fallback on the pill container ───
(function() {
    function attachDelegation() {
        var container = document.querySelector('.package-categories');
        if (!container) return;
        container.addEventListener('click', function(e) {
            var btn = e.target.closest('.category-btn');
            if (!btn) return;
            var cat = btn.getAttribute('data-category');
            if (cat) filterPackages(cat);
        });
    }
    // Attach as soon as the DOM is ready – two entry points for reliability
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachDelegation);
    } else {
        attachDelegation();   // DOM already parsed
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    // Apply URL parameter filters on page load
    applyURLFilters();

    // Auto-open modal if a package hash is in the URL (e.g. from index.html "View Details")
    if (window.location.hash) {
        const hashId = window.location.hash.slice(1);
        const target = document.getElementById(hashId);
        if (target && target.classList.contains('package-card')) {
            setTimeout(function() {
                window.showPackageDetails(hashId);
            }, 300);
        }
    }
    
    // Legacy per-button listeners (kept for belt-and-suspenders reliability)
    const categoryButtons = document.querySelectorAll('.category-btn');
    const packageCards = document.querySelectorAll('.package-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterPackages(this.getAttribute('data-category'));
        });
    });

    function updateVisibleCount() {
        const visible = [...packageCards].filter(c => c.style.display !== 'none').length;
        const counter = document.getElementById('visibleCount');
        if (counter) counter.textContent = visible;
    }

    // Package details data
    const packageDetails = {
        'gorilla-2day': {
            title: '2-Day Gorilla Trekking Safari – Bwindi National Park',
            duration: '2 Days / 1 Night',
            itinerary: [
                {
                    day: 'Day 1: Kigali → Bwindi Impenetrable National Park',
                    activities: `
                        <strong>Morning:</strong> Pickup from your hotel in Kigali, Rwanda. Drive through scenic landscapes crossing the Uganda-Rwanda border.<br>
                        <strong>Afternoon:</strong> Arrive at Bwindi Impenetrable National Park. Check in at your mid-range lodge near the park.<br>
                        <strong>Evening:</strong> Briefing from your guide on gorilla trekking rules and expectations. Dinner and overnight at lodge.
                    `
                },
                {
                    day: 'Day 2: Gorilla Trekking → Return to Kigali',
                    activities: `
                        <strong>Early Morning:</strong> Hearty breakfast before trekking begins. Report to the Uganda Wildlife Authority briefing point.<br>
                        <strong>Morning:</strong> Guided trek into Bwindi's dense forest to find and spend one hour with a mountain gorilla family.<br>
                        <strong>Afternoon:</strong> Return to lodge for lunch. Drive back to Kigali, Rwanda, arriving in the evening.
                    `
                }
            ],
            pricing: [
                { type: 'Solo (1 room)', price: '$1,750', includes: 'Park fees, gorilla permit, lodge accommodation (full board), private guide/driver, 4WD vehicle, all transportation, and roundtrip airport transfer.' },
                { type: '2+ people (per person)', price: '$1,580', includes: 'Park fees, gorilla permit, shared lodge accommodation (full board), private guide/driver, 4WD vehicle, all transportation, and roundtrip airport transfer.' }
            ]
        },
        'gorilla-3day-batwa': {
            title: '3-Day Gorilla Trekking & Batwa Experience – Bwindi NP',
            duration: '3 Days / 2 Nights',
            itinerary: [
                {
                    day: 'Day 1: Entebbe/Kampala → Bwindi Impenetrable Forest',
                    activities: `
                        <strong>Morning:</strong> Depart Kampala or Entebbe early morning. Scenic drive through Uganda's rolling hills and lush countryside.<br>
                        <strong>Afternoon:</strong> Arrive at Bwindi. Check in at your lodge with private en-suite facilities and hot water. Full board.<br>
                        <strong>Evening:</strong> Trek briefing with your guide. Dinner and overnight at lodge.
                    `
                },
                {
                    day: 'Day 2: Gorilla Trekking & Batwa Cultural Visit',
                    activities: `
                        <strong>Early Morning:</strong> Breakfast and transfer to briefing point at Uganda Wildlife Authority headquarters.<br>
                        <strong>Morning:</strong> Trek into Bwindi Impenetrable Forest to encounter a habituated mountain gorilla family. Spend 1 hour observing and photographing these magnificent primates.<br>
                        <strong>Afternoon:</strong> Visit the Batwa pygmies — the original forest-dwellers of Bwindi. Experience traditional dances, medicinal plant knowledge, and forest skills.
                    `
                },
                {
                    day: 'Day 3: Return to Entebbe/Kampala',
                    activities: `
                        <strong>Morning:</strong> Leisurely breakfast. Optional nature walk around the lodge grounds.<br>
                        <strong>Afternoon:</strong> Drive back to Entebbe or Kampala, with stops along the way for lunch and scenic views.
                    `
                }
            ],
            pricing: [
                { type: 'Solo (1 room)', price: '$1,640', includes: 'Park fees, gorilla permit, Batwa cultural experience, full board lodge accommodation, private guide/driver, 4WD vehicle, and all transportation.' },
                { type: '2 people (per person)', price: '$1,530', includes: 'Park fees, gorilla permit, Batwa cultural experience, shared lodging (full board), private guide/driver, 4WD vehicle, and all transportation.' },
                { type: '3 people (per person)', price: '$1,430', includes: 'Park fees, gorilla permit, Batwa experience, shared lodging (full board), private guide/driver, 4WD vehicle, and all transportation.' },
                { type: '4+ people (per person)', price: '$1,330', includes: 'Park fees, gorilla permit, Batwa experience, shared lodging (full board), private guide/driver, 4WD vehicle, and all transportation.' }
            ]
        },
        'gorilla-chimp-4day': {
            title: '4-Day Gorillas & Chimpanzee Trekking Safari in Uganda',
            duration: '4 Days / 3 Nights',
            itinerary: [
                {
                    day: 'Day 1: Entebbe → Kibale National Park',
                    activities: `
                        <strong>Morning:</strong> Depart from Entebbe/Kampala heading to Kibale National Park — the primate capital of the world.<br>
                        <strong>Afternoon:</strong> Arrive and check in at your lodge. Rest and settle in.<br>
                        <strong>Evening:</strong> Dinner and safari briefing.
                    `
                },
                {
                    day: 'Day 2: Chimp Trekking in Kibale → Bwindi Impenetrable NP',
                    activities: `
                        <strong>Early Morning:</strong> Chimpanzee trekking in Kibale Forest — home to over 1,500 chimps. Also look out for red-tailed monkeys, grey-cheeked mangabeys, and 350+ bird species.<br>
                        <strong>Afternoon:</strong> Drive to Bwindi Impenetrable National Park. Check in at Lodge near the park.
                    `
                },
                {
                    day: 'Day 3: Gorilla Trekking in Bwindi',
                    activities: `
                        <strong>Early Morning:</strong> Briefing at Uganda Wildlife Authority. Trek into the dense forest in search of a habituated mountain gorilla family.<br>
                        <strong>Morning/Afternoon:</strong> One magical hour with the gorillas. Return to lodge for lunch and relaxation.<br>
                        <strong>Late Afternoon:</strong> Drive to scenic Lake Bunyonyi.
                    `
                },
                {
                    day: 'Day 4: Lake Bunyonyi → Entebbe/Kampala',
                    activities: `
                        <strong>Morning:</strong> Breakfast overlooking stunning Lake Bunyonyi. Optional boat ride or canoe trip on the lake's calm waters.<br>
                        <strong>Afternoon:</strong> Drive back to Entebbe or Kampala. End of safari.
                    `
                }
            ],
            pricing: [
                { type: 'Solo (1 room)', price: '$2,145', includes: 'Park fees, gorilla & chimp permits, mid-range lodge accommodation (full board), private guide/driver, 4WD vehicle, and all transportation.' },
                { type: '2 people (per person)', price: '$1,705', includes: 'Park fees, gorilla & chimp permits, shared accommodation (full board), private guide/driver, 4WD vehicle, and all transportation.' },
                { type: '3 people (per person)', price: '$1,672', includes: 'Park fees, gorilla & chimp permits, shared accommodation (full board), private guide/driver, 4WD vehicle, and all transportation.' },
                { type: '4 people (per person)', price: '$1,639', includes: 'Park fees, gorilla & chimp permits, shared accommodation (full board), private guide/driver, 4WD vehicle, and all transportation.' },
                { type: '5 people (per person)', price: '$1,595', includes: 'Park fees, gorilla & chimp permits, shared accommodation (full board), private guide/driver, 4WD vehicle, and all transportation.' },
                { type: '6 people (per person)', price: '$1,540', includes: 'Park fees, gorilla & chimp permits, shared accommodation (full board), private guide/driver, 4WD vehicle, and all transportation.' }
            ]
        },
        'primate-4day-rw': {
            title: '4-Day Primate Safari – Uganda & Rwanda',
            duration: '4 Days / 3 Nights',
            itinerary: [
                {
                    day: 'Day 1: Kigali City Tour → Bwindi Impenetrable NP',
                    activities: `
                        <strong>Morning:</strong> Arrive in Kigali or start from Entebbe — flexible start country. Optional Kigali city tour including local markets and cultural sites.<br>
                        <strong>Afternoon:</strong> Drive to Bwindi Impenetrable National Park crossing the Uganda-Rwanda border. Check in at lodge.
                    `
                },
                {
                    day: 'Day 2: Gorilla Trekking in Bwindi',
                    activities: `
                        <strong>Early Morning:</strong> Report to the UWA briefing point. Trek into Bwindi in search of mountain gorillas.<br>
                        <strong>Morning:</strong> Spend one unforgettable hour with a gorilla family in their natural habitat.<br>
                        <strong>Afternoon:</strong> Return to lodge. Drive to the beautiful Lake Bunyonyi.
                    `
                },
                {
                    day: 'Day 3: Lake Bunyonyi → Kibale National Park',
                    activities: `
                        <strong>Morning:</strong> Relaxing breakfast at Lake Bunyonyi. Optional boat ride.<br>
                        <strong>Afternoon:</strong> Drive to Kibale National Park — primate capital of the world. Check in at lodge near the park.
                    `
                },
                {
                    day: 'Day 4: Chimpanzee Trekking → Entebbe',
                    activities: `
                        <strong>Early Morning:</strong> Chimp trekking in Kibale Forest — encounter hundreds of chimpanzees along with other primates.<br>
                        <strong>Afternoon:</strong> Drive back to Entebbe International Airport. End of tour.
                    `
                }
            ],
            pricing: [
                { type: 'Solo (1 room)', price: '$3,402', includes: 'Park fees, gorilla & chimp permits, mid-range lodge accommodation (full board), private guide/driver, 4WD vehicle, all transportation, and border fees.' },
                { type: '2 people (per person)', price: '$2,518', includes: 'Park fees, gorilla & chimp permits, shared accommodation (full board), private guide/driver, 4WD vehicle, all transportation, and border fees.' },
                { type: '3 people (per person)', price: '$2,224', includes: 'Park fees, gorilla & chimp permits, shared accommodation (full board), private guide/driver, 4WD vehicle, all transportation, and border fees.' },
                { type: '4 people (per person)', price: '$2,072', includes: 'Park fees, gorilla & chimp permits, shared accommodation (full board), private guide/driver, 4WD vehicle, all transportation, and border fees.' },
                { type: '5 people (per person)', price: '$1,997', includes: 'Park fees, gorilla & chimp permits, shared accommodation (full board), private guide/driver, 4WD vehicle, all transportation, and border fees.' },
                { type: '6 people (per person)', price: '$1,939', includes: 'Park fees, gorilla & chimp permits, shared accommodation (full board), private guide/driver, 4WD vehicle, all transportation, and border fees.' }
            ]
        },
        'gorilla-wildlife-5day': {
            title: '5-Day Amazing Wildlife & Gorilla Trekking Safari',
            duration: '5 Days / 4 Nights',
            itinerary: [
                {
                    day: 'Day 1: Entebbe → Queen Elizabeth National Park',
                    activities: `
                        <strong>Morning:</strong> Depart Entebbe. Drive through Uganda's scenic landscapes to Queen Elizabeth National Park.<br>
                        <strong>Afternoon:</strong> Arrive at QE NP. Afternoon game drive spotting elephants, buffaloes, and the famous tree-climbing lions of Ishasha sector.<br>
                        <strong>Overnight:</strong> Mid-range lodge near QE NP.
                    `
                },
                {
                    day: 'Day 2: Kazinga Channel Boat Safari & Game Drive',
                    activities: `
                        <strong>Morning:</strong> Early morning game drive in QE NP.<br>
                        <strong>Afternoon:</strong> Boat safari along the legendary Kazinga Channel — spot hippos, crocodiles, elephants, and over 600 bird species.<br>
                        <strong>Overnight:</strong> Same lodge.
                    `
                },
                {
                    day: 'Day 3–4: Bwindi Impenetrable NP – Gorilla Trekking',
                    activities: `
                        <strong>Day 3 Morning:</strong> Drive to Bwindi Impenetrable National Park (UNESCO World Heritage Site). Check in at forest lodge.<br>
                        <strong>Day 4 Morning:</strong> Gorilla trekking — guided trek through the dense forest to spend one hour with a habituated gorilla family. Afternoon: relax, photography, and cultural interactions.
                    `
                },
                {
                    day: 'Day 5: Lake Mburo NP Walking Safari → Entebbe',
                    activities: `
                        <strong>Morning:</strong> Drive to Lake Mburo National Park — the only park in Uganda where walking safaris inside the park are possible. Spot zebras, impalas, elands, and hippos on foot.<br>
                        <strong>Afternoon:</strong> Continue to Entebbe/Kampala. End of safari.
                    `
                }
            ],
            pricing: [
                { type: 'Solo (1 room)', price: '$2,891', includes: 'Gorilla & chimp permits, mid-range lodge accommodation (full board), private 4WD vehicle with guide, Kazinga Channel boat cruise, walking safari, and all park entry fees.' },
                { type: '2 people (per person)', price: '$2,090', includes: 'Gorilla & chimp permits, shared accommodation (full board), private 4WD vehicle with guide, Kazinga Channel cruise, walking safari, and all park entry fees.' },
                { type: '3 people (per person)', price: '$1,891', includes: 'Gorilla & chimp permits, shared accommodation (full board), private 4WD vehicle with guide, Kazinga Channel cruise, walking safari, and all park entry fees.' },
                { type: '4 people (per person)', price: '$1,782', includes: 'Gorilla & chimp permits, shared accommodation (full board), private 4WD vehicle with guide, Kazinga Channel cruise, walking safari, and all park entry fees.' },
                { type: '5 people (per person)', price: '$1,713', includes: 'Gorilla & chimp permits, shared accommodation (full board), private 4WD vehicle with guide, Kazinga Channel cruise, walking safari, and all park entry fees.' },
                { type: '6 people (per person)', price: '$1,650', includes: 'Gorilla & chimp permits, shared accommodation (full board), private 4WD vehicle with guide, Kazinga Channel cruise, walking safari, and all park entry fees.' }
            ]
        },
        'flying-6day': {
            title: '6-Day Flying Safari – Gorillas, Chimps and Wildlife',
            duration: '6 Days / 5 Nights',
            itinerary: [
                {
                    day: 'Day 1: Entebbe → Bwindi (by charter flight)',
                    activities: `
                        <strong>Morning:</strong> Transfer to Entebbe airport for charter flight to an airstrip near Bwindi Impenetrable National Park.<br>
                        <strong>Afternoon:</strong> Check in at your lodge. Briefing on gorilla trekking rules.<br>
                        <strong>Overnight:</strong> Mid-range lodge near Bwindi.
                    `
                },
                {
                    day: 'Day 2: Gorilla Trekking in Bwindi',
                    activities: `
                        <strong>Morning:</strong> Trek into Bwindi's impenetrable forest to track a habituated mountain gorilla family. Spend one hour observing these gentle giants.<br>
                        <strong>Afternoon:</strong> Return to lodge. Optional community walks or relaxation.<br>
                        <strong>Overnight:</strong> Same lodge.
                    `
                },
                {
                    day: 'Day 3: Bwindi → Queen Elizabeth NP (by charter flight)',
                    activities: `
                        <strong>Morning:</strong> Depart by charter flight to Queen Elizabeth National Park.<br>
                        <strong>Afternoon:</strong> Arrive and embark on an afternoon game drive — home to elephants, lions, leopards, buffaloes, and the famous Kazinga Channel.<br>
                        <strong>Overnight:</strong> Mid-range lodge in QE NP.
                    `
                },
                {
                    day: 'Day 4: Queen Elizabeth NP – Game Drives & Boat Cruise',
                    activities: `
                        <strong>Morning:</strong> Full morning game drive in Queen Elizabeth NP.<br>
                        <strong>Afternoon:</strong> Kazinga Channel boat cruise — an iconic wildlife experience with hippos, elephants, and 600+ bird species along the shores.<br>
                        <strong>Overnight:</strong> Same lodge.
                    `
                },
                {
                    day: 'Day 5: QE NP → Kibale NP (by charter flight)',
                    activities: `
                        <strong>Morning:</strong> Charter flight to Kibale National Park — the primate capital of the world.<br>
                        <strong>Afternoon:</strong> Afternoon guided nature walk in Bigodi Wetland Sanctuary.<br>
                        <strong>Overnight:</strong> Mid-range lodge near Kibale.
                    `
                },
                {
                    day: 'Day 6: Chimp Trekking → Entebbe',
                    activities: `
                        <strong>Morning:</strong> Chimpanzee trekking in Kibale Forest — encounter large chimp communities in their natural forest habitat.<br>
                        <strong>Afternoon:</strong> Drive or fly back to Entebbe International Airport. End of safari.
                    `
                }
            ],
            pricing: [
                { type: 'Solo (1 room)', price: '$4,653', includes: '3 internal charter flights, gorilla & chimp permits, mid-range lodge accommodation (full board), game drives, Kazinga Channel cruise, and all park entry fees.' },
                { type: '2 people (per person)', price: '$3,625', includes: '3 internal charter flights, gorilla & chimp permits, shared lodging (full board), game drives, Kazinga Channel cruise, and all park entry fees.' },
                { type: '3 people (per person)', price: '$3,388', includes: '3 internal charter flights, gorilla & chimp permits, shared lodging (full board), game drives, Kazinga Channel cruise, and all park entry fees.' },
                { type: '4 people (per person)', price: '$3,245', includes: '3 internal charter flights, gorilla & chimp permits, shared lodging (full board), game drives, Kazinga Channel cruise, and all park entry fees.' },
                { type: '5 people (per person)', price: '$3,190', includes: '3 internal charter flights, gorilla & chimp permits, shared lodging (full board), game drives, Kazinga Channel cruise, and all park entry fees.' },
                { type: '6 people (per person)', price: '$3,119', includes: '3 internal charter flights, gorilla & chimp permits, shared lodging (full board), game drives, Kazinga Channel cruise, and all park entry fees.' }
            ]
        },
        'chimps-gorilla-big5-7day': {
            title: '7-Day Chimpanzee, Gorillas and Big 5 Safari',
            duration: '7 Days / 6 Nights',
            itinerary: [
                {
                    day: 'Day 1: Entebbe → Kibale National Park',
                    activities: `
                        <strong>Morning:</strong> Depart Entebbe/Kampala. Head southwest to Kibale National Park — home to the world's largest concentration of primates.<br>
                        <strong>Afternoon:</strong> Arrive and check in at lodge. Afternoon Bigodi Wetland nature walk (optional).<br>
                        <strong>Overnight:</strong> Mid-range lodge near Kibale.
                    `
                },
                {
                    day: 'Day 2: Chimp Trekking in Kibale → Queen Elizabeth NP',
                    activities: `
                        <strong>Morning:</strong> Chimpanzee trekking in Kibale Forest — observe chimps, colobus monkeys, red-tailed monkeys, and 350+ bird species.<br>
                        <strong>Afternoon:</strong> Drive to Queen Elizabeth National Park — home to big game including the famous tree-climbing lions of Ishasha.<br>
                        <strong>Overnight:</strong> Lodge in QE NP.
                    `
                },
                {
                    day: 'Day 3: Queen Elizabeth NP – Big Five Game Drives & Kazinga Cruise',
                    activities: `
                        <strong>Morning:</strong> Early morning game drive in QE NP's Kasenyi plains — spot elephants, lions, leopards, buffaloes, and hippos.<br>
                        <strong>Afternoon:</strong> Kazinga Channel boat cruise. Hundreds of hippos, crocodiles, and enormous diversity of birdlife along the water's edge.<br>
                        <strong>Overnight:</strong> Same QE NP lodge.
                    `
                },
                {
                    day: 'Days 4–5: Bwindi Impenetrable NP – Gorilla Trekking',
                    activities: `
                        <strong>Day 4 Morning:</strong> Drive to Bwindi Impenetrable National Park (UNESCO World Heritage Site). Scenic views of the Albertine Rift Valley en route.<br>
                        <strong>Day 5 Morning:</strong> Gorilla trekking — guided expedition into Bwindi forest to find and spend one hour with a habituated mountain gorilla family.
                    `
                },
                {
                    day: 'Day 6: Return Journey & Cultural Encounter',
                    activities: `
                        <strong>Morning:</strong> Optional community walk or Batwa cultural visit in Bwindi.<br>
                        <strong>Afternoon:</strong> Drive toward Kampala, stopping at local markets and scenic viewpoints.
                    `
                },
                {
                    day: 'Day 7: Kampala City Tour → Entebbe Departure',
                    activities: `
                        <strong>Morning:</strong> Optional Kampala city tour — visit markets, cultural sites, and the Uganda Museum.<br>
                        <strong>Afternoon:</strong> Transfer to Entebbe International Airport for departure.
                    `
                }
            ],
            pricing: [
                { type: 'Group of 5 (per person)', price: '$3,729', includes: 'Gorilla & chimp permits, mid-range lodge accommodation (full board), private 4WD safari vehicle with guide, game drives, boat cruise, and all park entry fees.' }
            ]
        },
        'rwanda-7day': {
            title: '7-Day Rwanda Golden Monkeys, Uganda Gorillas & Chimps',
            duration: '7 Days / 6 Nights',
            itinerary: [
                {
                    day: 'Day 1: Kigali → Volcanoes National Park',
                    activities: `
                        <strong>Morning:</strong> Arrive in Kigali. Briefing and transfer to Volcanoes National Park in northern Rwanda.<br>
                        <strong>Afternoon:</strong> Check in at lodge with views of the Virunga volcanoes. Optional village walk.<br>
                        <strong>Overnight:</strong> Mid-range lodge near Volcanoes NP.
                    `
                },
                {
                    day: 'Day 2: Golden Monkey Tracking → Cross to Uganda',
                    activities: `
                        <strong>Morning:</strong> Track the endangered golden monkeys in Rwanda's Volcanoes NP — playful and highly photogenic primates unique to the Virunga region.<br>
                        <strong>Afternoon:</strong> Cross the Rwanda-Uganda border. Drive to Bwindi Impenetrable National Park.
                    `
                },
                {
                    day: 'Days 3–4: Gorilla Trekking in Bwindi',
                    activities: `
                        <strong>Day 3:</strong> Arrive in Bwindi. Check in and afternoon rest or community walk.<br>
                        <strong>Day 4 Morning:</strong> Guided gorilla trek in Bwindi Impenetrable Forest. One hour with a mountain gorilla family — one of Africa's greatest wildlife experiences.
                    `
                },
                {
                    day: 'Days 5–6: Queen Elizabeth National Park',
                    activities: `
                        <strong>Day 5:</strong> Drive to Queen Elizabeth NP. Afternoon game drive in the Kasenyi sector — spot lions, elephants, and buffaloes.<br>
                        <strong>Day 6:</strong> Morning game drive. Afternoon Kazinga Channel boat cruise with spectacular wildlife viewing.
                    `
                },
                {
                    day: 'Day 7: Kibale NP Chimp Trekking → Entebbe',
                    activities: `
                        <strong>Morning:</strong> Chimpanzee trekking in Kibale National Park — the primate capital of East Africa.<br>
                        <strong>Afternoon:</strong> Drive to Entebbe International Airport. End of memorable East Africa safari.
                    `
                }
            ],
            pricing: [
                { type: 'Solo (1 room)', price: '$4,862', includes: 'Golden monkey tracking, gorilla & chimp permits, mid-range lodge accommodation (full board), private guide/driver, 4WD vehicle, game drives, boat cruise, and all park/border fees.' },
                { type: '2 people (per person)', price: '$3,190', includes: 'Golden monkey tracking, gorilla & chimp permits, shared lodging (full board), private guide/driver, 4WD vehicle, game drives, boat cruise, and all park/border fees.' },
                { type: '3 people (per person)', price: '$2,998', includes: 'Golden monkey tracking, gorilla & chimp permits, shared lodging (full board), private guide/driver, 4WD vehicle, game drives, boat cruise, and all park/border fees.' },
                { type: '4 people (per person)', price: '$2,849', includes: 'Golden monkey tracking, gorilla & chimp permits, shared lodging (full board), private guide/driver, 4WD vehicle, game drives, boat cruise, and all park/border fees.' },
                { type: '5 people (per person)', price: '$2,783', includes: 'Golden monkey tracking, gorilla & chimp permits, shared lodging (full board), private guide/driver, 4WD vehicle, game drives, boat cruise, and all park/border fees.' },
                { type: '6 people (per person)', price: '$2,635', includes: 'Golden monkey tracking, gorilla & chimp permits, shared lodging (full board), private guide/driver, 4WD vehicle, game drives, boat cruise, and all park/border fees.' }
            ]
        },
        'uganda-8day': {
            title: '8-Day Best of Uganda Gorilla and Chimp Trekking Safari',
            duration: '8 Days / 7 Nights',
            itinerary: [
                {
                    day: 'Days 1–2: Entebbe → Murchison Falls National Park',
                    activities: `
                        <strong>Day 1 Morning:</strong> Depart Entebbe in a private vehicle with complimentary Wi-Fi. Stop at Ziwa Rhino Sanctuary for white rhino tracking.<br>
                        <strong>Day 1 Afternoon:</strong> Arrive at Murchison Falls NP — Uganda's largest national park. Check in at lodge.<br>
                        <strong>Day 2:</strong> Morning game drive spotting lions, elephants, giraffes, and buffaloes. Afternoon Nile boat cruise to the base of Murchison Falls — spot hippos, Nile crocodiles, and birds.
                    `
                },
                {
                    day: 'Day 3: Kibale National Park – Chimpanzee Trekking',
                    activities: `
                        <strong>Morning:</strong> Drive south to Kibale National Park.<br>
                        <strong>Afternoon:</strong> Arrive and check in. Optional late afternoon nature walk or Bigodi wetland sanctuary visit.
                    `
                },
                {
                    day: 'Day 4: Chimp Trekking → Queen Elizabeth NP',
                    activities: `
                        <strong>Morning:</strong> Chimp trekking in Kibale Forest — engage with habituated chimp communities.<br>
                        <strong>Afternoon:</strong> Drive to Queen Elizabeth National Park. Check in at lodge.
                    `
                },
                {
                    day: 'Days 5–6: Queen Elizabeth NP – Ishasha Tree-Climbing Lions',
                    activities: `
                        <strong>Day 5:</strong> Explore Ishasha sector — famous for Uganda's unique tree-climbing lions lounging in fig trees. Afternoon Kazinga Channel boat cruise.<br>
                        <strong>Day 6:</strong> Full-day game drives in Kasenyi plains and Mweya Peninsula area.
                    `
                },
                {
                    day: 'Day 7: Bwindi Impenetrable NP – Gorilla Trekking',
                    activities: `
                        <strong>Morning:</strong> Drive to Bwindi. Report to UWA briefing point and trek into the impenetrable forest.<br>
                        <strong>Morning/Afternoon:</strong> One hour with mountain gorillas. Return to lodge. Afternoon relaxation by Lake Bunyonyi.
                    `
                },
                {
                    day: 'Day 8: Lake Bunyonyi → Entebbe',
                    activities: `
                        <strong>Morning:</strong> Leisurely breakfast on the shores of spectacular Lake Bunyonyi. Optional canoe ride.<br>
                        <strong>Afternoon:</strong> Drive back to Entebbe/Kampala. End of safari.
                    `
                }
            ],
            pricing: [
                { type: '2+ people (per person)', price: '$3,245', includes: 'Gorilla & chimp permits, in-vehicle Wi-Fi, mid-range lodge accommodation (full board), private 4WD safari vehicle with guide, Nile & Kazinga boat cruises, rhino tracking, and all park entry fees.' }
            ]
        },
        'uganda-9day': {
            title: '9-Day Best of Uganda Gorilla, Chimps & Wildlife',
            duration: '9 Days / 8 Nights',
            itinerary: [
                {
                    day: 'Day 1: Entebbe → Kampala',
                    activities: `
                        <strong>Afternoon:</strong> Arrive at Entebbe International Airport. Meet your guide and transfer to your hotel in Kampala.<br>
                        <strong>Evening:</strong> Orientation briefing, dinner, and rest.
                    `
                },
                {
                    day: 'Days 2–3: Kibale National Park – Chimp Trekking',
                    activities: `
                        <strong>Day 2:</strong> Drive from Kampala to Kibale National Park. Afternoon Bigodi Wetland Sanctuary walk.<br>
                        <strong>Day 3:</strong> Full-day chimp trekking experience in Kibale Forest. Track habituated chimpanzee communities alongside other primates.
                    `
                },
                {
                    day: 'Days 4–5: Semuliki & Queen Elizabeth National Parks',
                    activities: `
                        <strong>Day 4:</strong> Visit Semuliki National Park — a lowland rainforest harboring Central African forest species. Guided forest walk.<br>
                        <strong>Day 5:</strong> Queen Elizabeth NP game drives and Kazinga Channel boat cruise. Spot Big Five wildlife.
                    `
                },
                {
                    day: 'Day 6: Bwindi Impenetrable NP – Gorilla Trekking & Batwa Experience',
                    activities: `
                        <strong>Morning:</strong> Gorilla trekking in Bwindi Impenetrable Forest. One unforgettable hour with a mountain gorilla family.<br>
                        <strong>Afternoon:</strong> Batwa cultural experience — join the original Bwindi forest dwellers and learn about their forest knowledge and heritage.
                    `
                },
                {
                    day: 'Days 7–8: Lake Bunyonyi – Canoe & Relaxation',
                    activities: `
                        <strong>Day 7:</strong> Drive to Lake Bunyonyi — one of Africa's most scenic lakes. Check in at lakeside lodge.<br>
                        <strong>Day 8:</strong> Full day canoe tour on Lake Bunyonyi — paddle to hilltop islands, visit local communities, and enjoy stunning scenery.
                    `
                },
                {
                    day: 'Day 9: Lake Bunyonyi → Entebbe Departure',
                    activities: `
                        <strong>Morning:</strong> Final breakfast at Lake Bunyonyi. Drive back to Entebbe International Airport.<br>
                        <strong>Afternoon:</strong> Arrive at Entebbe. End of 9-day Uganda safari.
                    `
                }
            ],
            pricing: [
                { type: 'Solo (1 room)', price: '$3,630', includes: 'Gorilla & chimp permits, Batwa cultural experience, mid-range lodge accommodation (full board), private 4WD safari vehicle with guide, all game drives, boat cruise, canoe tour, and park entry fees.' },
                { type: '2+ people (per person)', price: '$3,135', includes: 'Gorilla & chimp permits, Batwa cultural experience, shared lodging (full board), private 4WD safari vehicle with guide, all game drives, boat cruise, canoe tour, and park entry fees.' }
            ]
        },
        'gorilla-chimp-big5-10day': {
            title: "10-Day Gorillas, Chimps & the Big 5",
            duration: '10 Days / 9 Nights',
            itinerary: [
                {
                    day: 'Day 1: Arrival in Entebbe',
                    activities: `
                        <strong>Afternoon:</strong> Arrive at Entebbe International Airport. Meet your Afrisites Tours representative. Transfer to hotel for rest.<br>
                        <strong>Evening:</strong> Briefing for the 10-day adventure ahead.
                    `
                },
                {
                    day: 'Days 2–3: Murchison Falls National Park',
                    activities: `
                        <strong>Day 2:</strong> Drive north to Murchison Falls NP, stopping at Ziwa Rhino Sanctuary for white rhino tracking.<br>
                        <strong>Day 3:</strong> Full game drive on the northern bank. Nile boat cruise to the base of the thundering Murchison Falls.
                    `
                },
                {
                    day: 'Days 4–5: Kibale National Park – Chimpanzee Trekking',
                    activities: `
                        <strong>Day 4:</strong> Drive south to Kibale National Park. Afternoon Bigodi Wetland walk.<br>
                        <strong>Day 5:</strong> Chimpanzee trekking in Kibale Forest. Observe hundreds of chimps and other primates in their natural forest home.
                    `
                },
                {
                    day: 'Days 6–7: Queen Elizabeth National Park',
                    activities: `
                        <strong>Day 6:</strong> Drive to Queen Elizabeth NP. Afternoon game drive — spot lions, elephants, leopards, buffaloes, and hippos.<br>
                        <strong>Day 7:</strong> Kazinga Channel boat cruise & Ishasha tree-climbing lions sector.
                    `
                },
                {
                    day: 'Days 8–9: Bwindi Impenetrable NP – Gorilla Trekking',
                    activities: `
                        <strong>Day 8:</strong> Drive to Bwindi Impenetrable NP. Afternoon community walk or Batwa experience.<br>
                        <strong>Day 9:</strong> Gorilla trekking — trek into the ancient forest to encounter Uganda's mountain gorillas.
                    `
                },
                {
                    day: 'Day 10: Return to Entebbe',
                    activities: `
                        <strong>Morning:</strong> Drive from Bwindi back toward Entebbe, stopping along the way for lunch and scenic photography.<br>
                        <strong>Afternoon/Evening:</strong> Arrive at Entebbe. Transfer to airport for departure.
                    `
                }
            ],
            pricing: [
                { type: 'Solo (1 room)', price: '$4,950', includes: 'Gorilla & chimp permits, rhino tracking, mid-range lodge accommodation (full board), private 4WD safari vehicle with guide, Nile & Kazinga boat cruises, and all park entry fees.' },
                { type: '2+ people (per person)', price: '$3,993', includes: 'Gorilla & chimp permits, rhino tracking, shared lodging (full board), private 4WD safari vehicle with guide, Nile & Kazinga boat cruises, and all park entry fees.' }
            ]
        },
        'primates-big5-11day': {
            title: '11-Day Uganda Primates & Big Five Safari',
            duration: '11 Days / 10 Nights',
            itinerary: [
                {
                    day: 'Day 1: Arrival in Entebbe',
                    activities: `
                        <strong>Afternoon:</strong> Arrive at Entebbe International Airport. Transfer to hotel. Evening briefing.
                    `
                },
                {
                    day: 'Day 2: Mabamba Swamp – Shoebill Boat Safari',
                    activities: `
                        <strong>Morning:</strong> Boat safari in Mabamba Swamp — one of the best places in the world to spot the prehistoric-looking Shoebill stork. Also see papyrus birds and wetland wildlife.
                    `
                },
                {
                    day: 'Days 3–4: Murchison Falls National Park',
                    activities: `
                        <strong>Day 3:</strong> Drive north with a stop at Ziwa Rhino Sanctuary for white rhino tracking.<br>
                        <strong>Day 4:</strong> Morning game drive + Nile boat cruise to the base of Murchison Falls. Spot lions, elephants, giraffes, and massive crocodiles.
                    `
                },
                {
                    day: 'Day 5: Kibale National Park – Chimp Trekking',
                    activities: `
                        <strong>Morning:</strong> Drive to Kibale NP. Afternoon chimp trekking — encounter habituated chimp communities in their rainforest home.
                    `
                },
                {
                    day: 'Day 6: Queen Elizabeth National Park',
                    activities: `
                        <strong>Morning:</strong> Game drives in QE NP. Afternoon Kazinga Channel boat cruise — world-class hippo, croc, and bird viewing.
                    `
                },
                {
                    day: 'Days 7–9: Bwindi Impenetrable NP – Gorilla Trekking',
                    activities: `
                        <strong>Day 7:</strong> Drive to Bwindi. Afternoon optional Batwa cultural experience.<br>
                        <strong>Day 8:</strong> Gorilla trekking — trek into Bwindi's dense forest for one hour with mountain gorillas.<br>
                        <strong>Day 9:</strong> Drive to Mgahinga Gorilla National Park — spot golden monkeys and enjoy scenic Virunga volcano views.
                    `
                },
                {
                    day: 'Day 10: Lake Mburo National Park',
                    activities: `
                        <strong>Morning:</strong> Drive to Lake Mburo NP. Game drive spotting zebras, impalas, topis, and hippos. Afternoon lake boat cruise.
                    `
                },
                {
                    day: 'Day 11: Return to Entebbe',
                    activities: `
                        <strong>Morning:</strong> Morning game walk in Lake Mburo. Drive back to Entebbe for departure.
                    `
                }
            ],
            pricing: [
                { type: 'Per Person', price: 'Contact Us', includes: 'All primate trekking permits (gorilla, chimp, golden monkey), rhino tracking, Shoebill boat safari, mid-range lodge accommodation (full board), private 4WD safari vehicle, game drives, boat cruises, and all park entry fees.' }
            ]
        },
        'eastern-northern-12day': {
            title: '12-Day Eastern & Northern Uganda Discovery Safari',
            duration: '12 Days / 11 Nights',
            itinerary: [
                {
                    day: 'Day 1: Arrival in Kampala',
                    activities: `
                        <strong>Afternoon:</strong> Arrive at Entebbe and meet your guide. Transfer to Kampala hotel.<br>
                        <strong>Evening:</strong> Orientation and briefing for the cultural & heritage journey ahead.
                    `
                },
                {
                    day: 'Days 2–3: Eastern Uganda – Cultural Heritage',
                    activities: `
                        <strong>Day 2:</strong> Drive east to Jinja — the source of the Nile. Visit Bujagali Falls area and local craft markets. Optional white-water rafting.<br>
                        <strong>Day 3:</strong> Explore Mount Elgon National Park foothills. Visit the Sipi Falls — a dramatic set of three waterfalls. Hike to the base and surrounding viewpoints.
                    `
                },
                {
                    day: 'Days 4–5: Kidepo Valley National Park',
                    activities: `
                        <strong>Day 4:</strong> Long, scenic drive north through Karamoja region to Kidepo Valley NP — Uganda's most remote and spectacular park.<br>
                        <strong>Day 5:</strong> Full day game drives in Kidepo. Spot cheetahs, ostriches, lions, Burchell's zebras, and more — wildlife rarely found in other Uganda parks.
                    `
                },
                {
                    day: 'Days 6–7: Karamojong Cultural Experience & Rock Art',
                    activities: `
                        <strong>Day 6:</strong> Visit a traditional Karamojong homestead (manyatta). Experience warrior dances, beadwork crafts, and pastoral culture.<br>
                        <strong>Day 7:</strong> Explore ancient Karamoja rock art sites — some of the oldest rock paintings in East Africa.
                    `
                },
                {
                    day: 'Days 8–9: Murchison Falls National Park',
                    activities: `
                        <strong>Day 8:</strong> Drive from Kidepo through northern Uganda to Murchison Falls NP. Stop at Karuma Falls en route.<br>
                        <strong>Day 9:</strong> Game drives and Nile boat cruise. View the powerful Murchison Falls.
                    `
                },
                {
                    day: 'Days 10–11: Ziwa Rhino Sanctuary & Return',
                    activities: `
                        <strong>Day 10:</strong> Rhino tracking at Ziwa Rhino Sanctuary — walk with southern white rhinos on foot.<br>
                        <strong>Day 11:</strong> Drive back toward Kampala. Cultural lunch stop in Luwero. Arrive Kampala/Entebbe.
                    `
                },
                {
                    day: 'Day 12: Departure',
                    activities: `
                        <strong>Morning:</strong> Final breakfast. Transfer to Entebbe International Airport. End of eastern and northern Uganda discovery safari.
                    `
                }
            ],
            pricing: [
                { type: 'Per Person', price: 'Contact Us', includes: 'Mid-range lodge & hotel accommodation (full board), private 4WD safari vehicle, professional cultural & wildlife guide, all park entry fees, rhino tracking, community visits, and cultural activity fees.' }
            ]
        },
        'gorilla-chimp-wildlife-12day': {
            title: '12-Day Gorillas, Chimps & Wildlife Epic Safari',
            duration: '12 Days / 11 Nights',
            itinerary: [
                {
                    day: 'Day 1: Arrival in Entebbe',
                    activities: `
                        <strong>Afternoon:</strong> Arrive in Entebbe. Meet guide. Transfer to hotel. Rest and briefing.
                    `
                },
                {
                    day: 'Days 2–3: Murchison Falls National Park',
                    activities: `
                        <strong>Day 2:</strong> Drive north, stopping at Ziwa Rhino Sanctuary for rhino tracking. Arrive Murchison Falls NP.<br>
                        <strong>Day 3:</strong> Game drive and Nile boat cruise to the base of the thundering Murchison Falls.
                    `
                },
                {
                    day: 'Days 4–5: Kibale National Park',
                    activities: `
                        <strong>Day 4:</strong> Drive to Kibale NP. Bigodi Wetland birdwatching walk.<br>
                        <strong>Day 5:</strong> Chimpanzee trekking in Kibale Forest, including L'Hoest's monkeys and other primates.
                    `
                },
                {
                    day: 'Days 6–7: Queen Elizabeth National Park',
                    activities: `
                        <strong>Day 6:</strong> Morning game drive. Afternoon Kazinga Channel boat cruise for hippos, crocs, and hundreds of bird species.<br>
                        <strong>Day 7:</strong> Ishasha sector — Victoria Nile and the famous tree-climbing lions of Ishasha.
                    `
                },
                {
                    day: 'Days 8–9: Bwindi & Mgahinga – Gorilla Trekking',
                    activities: `
                        <strong>Day 8:</strong> Drive to Bwindi Impenetrable NP. Community walk and afternoon rest.<br>
                        <strong>Day 9:</strong> Gorilla trekking in Bwindi. One hour with mountain gorillas deep in the ancient forest.
                    `
                },
                {
                    day: 'Day 10: Mgahinga Gorilla NP – Golden Monkeys',
                    activities: `
                        <strong>Morning:</strong> Drive to Mgahinga Gorilla NP at the foot of the Virunga volcanoes. Track golden monkeys through bamboo forest.<br>
                        <strong>Afternoon:</strong> Batwa cultural experience and volcano hike options.
                    `
                },
                {
                    day: 'Day 11: Lake Mburo National Park',
                    activities: `
                        <strong>Morning:</strong> Drive to Lake Mburo NP. Afternoon game drive — spot zebras, impalas, elands, topis, hippos, and Burchell's zebras.
                    `
                },
                {
                    day: 'Day 12: Return to Entebbe',
                    activities: `
                        <strong>Morning:</strong> Lake Mburo morning game walk. Drive to Entebbe for departure.
                    `
                }
            ],
            pricing: [
                { type: 'Solo (1 room)', price: '$5,600', includes: 'Gorilla & chimp permits, golden monkey tracking, rhino tracking, mid-range lodge accommodation (full board), private 4WD vehicle with guide, Nile & Kazinga boat cruises, and all park entry fees.' },
                { type: '2 people (per person)', price: '$3,950', includes: 'Gorilla & chimp permits, golden monkey tracking, rhino tracking, shared lodging (full board), private 4WD vehicle with guide, Nile & Kazinga boat cruises, and all park entry fees.' },
                { type: '3 people (per person)', price: '$3,785', includes: 'Gorilla & chimp permits, golden monkey tracking, rhino tracking, shared lodging (full board), private 4WD vehicle with guide, Nile & Kazinga boat cruises, and all park entry fees.' },
                { type: '4 people (per person)', price: '$3,500', includes: 'Gorilla & chimp permits, golden monkey tracking, rhino tracking, shared lodging (full board), private 4WD vehicle with guide, Nile & Kazinga boat cruises, and all park entry fees.' },
                { type: '5 people (per person)', price: '$3,433', includes: 'Gorilla & chimp permits, golden monkey tracking, rhino tracking, shared lodging (full board), private 4WD vehicle with guide, Nile & Kazinga boat cruises, and all park entry fees.' },
                { type: '6 people (per person)', price: '$3,235', includes: 'Gorilla & chimp permits, golden monkey tracking, rhino tracking, shared lodging (full board), private 4WD vehicle with guide, Nile & Kazinga boat cruises, and all park entry fees.' }
            ]
        },
        'rwanda-uganda-14day': {
            title: '14-Day Rwanda and Uganda with Gorillas, Chimps & Big Five',
            duration: '14 Days / 13 Nights',
            itinerary: [
                {
                    day: 'Day 1: Arrival in Kigali, Rwanda',
                    activities: `
                        <strong>Afternoon:</strong> Arrive at Kigali International Airport. Meet your guide and transfer to hotel.<br>
                        <strong>Evening:</strong> Kigali city orientation and briefing for the 14-day adventure.
                    `
                },
                {
                    day: 'Days 2–3: Akagera National Park – Rwanda Wildlife',
                    activities: `
                        <strong>Day 2:</strong> Drive to Akagera NP in eastern Rwanda. Afternoon game drive — spot lions, elephants, giraffes, buffaloes, and Rwanda's recently reintroduced rhinos.<br>
                        <strong>Day 3:</strong> Morning boat cruise on Lake Ihema — excellent birding with hippos and crocodile viewing.
                    `
                },
                {
                    day: 'Day 4: Lake Bunyonyi, Uganda',
                    activities: `
                        <strong>Morning:</strong> Cross into Uganda. Drive to the stunning Lake Bunyonyi for a rest day.<br>
                        <strong>Afternoon:</strong> Boat ride on the lake and relax at lakeside lodge.
                    `
                },
                {
                    day: 'Days 5–6: Bwindi Impenetrable NP – Gorilla Trekking',
                    activities: `
                        <strong>Day 5:</strong> Drive to Bwindi. Afternoon Batwa cultural experience.<br>
                        <strong>Day 6:</strong> Gorilla trekking — one incredible hour with a mountain gorilla family in the dense Bwindi forest.
                    `
                },
                {
                    day: 'Day 7: Ishasha – Tree-Climbing Lions (Queen Elizabeth NP)',
                    activities: `
                        <strong>Morning:</strong> Drive to Ishasha sector of Queen Elizabeth NP. Afternoon game drive to spot Uganda's famous tree-climbing lions in fig trees.
                    `
                },
                {
                    day: 'Days 8–9: Queen Elizabeth National Park',
                    activities: `
                        <strong>Day 8:</strong> Morning game drive on Kasenyi plains — lions, leopards, elephants, and Cape buffaloes.<br>
                        <strong>Day 9:</strong> Kazinga Channel boat cruise — spectacular hippos, crocodiles, and 600+ bird species.
                    `
                },
                {
                    day: 'Days 10–11: Kibale National Park – Chimpanzee Trekking',
                    activities: `
                        <strong>Day 10:</strong> Drive to Kibale NP. Afternoon Bigodi Wetland Sanctuary birdwatching.<br>
                        <strong>Day 11:</strong> Full chimpanzee trekking experience in Kibale Forest — East Africa's primate capital.
                    `
                },
                {
                    day: 'Days 12–13: Murchison Falls National Park',
                    activities: `
                        <strong>Day 12:</strong> Drive to Murchison Falls NP, stopping at Ziwa Rhino Sanctuary for rhino tracking on foot.<br>
                        <strong>Day 13:</strong> Morning game drive on the northern bank. Afternoon Nile boat cruise to the base of Murchison Falls.
                    `
                },
                {
                    day: 'Day 14: Return to Entebbe',
                    activities: `
                        <strong>Morning:</strong> Drive from Murchison Falls to Entebbe International Airport.<br>
                        <strong>Afternoon:</strong> Arrive at Entebbe. End of the Grand East Africa Tour.
                    `
                }
            ],
            pricing: [
                { type: 'Solo (1 room)', price: '$6,600', includes: 'Gorilla & chimp permits, rhino tracking, mid-range lodge accommodation throughout (full board), private 4WD safari vehicle with professional guide, Nile, Kazinga & Akagera boat cruises, and all park/border fees.' },
                { type: '2+ people (per person)', price: '$5,500', includes: 'Gorilla & chimp permits, rhino tracking, shared lodging throughout (full board), private 4WD safari vehicle with professional guide, Nile, Kazinga & Akagera boat cruises, and all park/border fees.' }
            ]
        },
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
        const modalDuration = document.getElementById('modalDuration');
        const modalBody = document.getElementById('modalBody');

        const packageData = packageDetails[packageId];
        if (!packageData) return;

        modalTitle.textContent = packageData.title;
        if (packageData.itinerary && packageData.itinerary.length) {
            const nights = packageData.itinerary.length - 1;
            modalDuration.innerHTML = `<i class="fas fa-calendar-alt"></i> ${packageData.itinerary.length} Days${nights > 0 ? ' / ' + nights + ' Nights' : ''}`;
        } else {
            modalDuration.textContent = '';
        }

        let html = '';

        // --- Itinerary ---
        if (packageData.itinerary && packageData.itinerary.length) {
            html += `<div class="modal-section-title"><i class="fas fa-map-marked-alt"></i> Detailed Itinerary</div>`;
            packageData.itinerary.forEach(day => {
                html += `
                    <div class="itinerary-day">
                        <div class="day-header">${day.day}</div>
                        <div class="day-activities">${day.activities}</div>
                    </div>`;
            });
        }

        // --- Pricing ---
        if (packageData.pricing && packageData.pricing.length) {
            html += `
                <div class="pricing-section">
                    <div class="modal-section-title"><i class="fas fa-tag"></i> Pricing Details</div>
                    <div class="pricing-grid">`;
            packageData.pricing.forEach(price => {
                html += `
                    <div class="pricing-item">
                        <div class="pricing-item-type">${price.type}</div>
                        <div class="pricing-item-price">${price.price}</div>
                        <div class="pricing-item-includes">${price.includes}</div>
                    </div>`;
            });
            html += `</div></div>`;
        }

        // --- Premium Services ---
        if (packageData.premiumServices && packageData.premiumServices.length) {
            html += `
                <div class="modal-list-section premium">
                    <div class="modal-section-title"><i class="fas fa-star"></i> Optional Premium Add-ons</div>
                    <ul>`;
            packageData.premiumServices.forEach(s => { html += `<li>${s}</li>`; });
            html += `</ul></div>`;
        }

        // --- Exclusions ---
        if (packageData.exclusions && packageData.exclusions.length) {
            html += `
                <div class="modal-list-section exclusions">
                    <div class="modal-section-title"><i class="fas fa-times-circle"></i> Not Included</div>
                    <ul>`;
            packageData.exclusions.forEach(e => { html += `<li>${e}</li>`; });
            html += `</ul></div>`;
        }

        // --- CTA ---
        html += `
            <div class="modal-cta">
                <button class="modal-cta-book" onclick="bookPackage('${packageData.title.replace(/'/g, "\\'")}')">
                    <i class="fas fa-calendar-check"></i> Book This Package
                </button>
                <a href="index.html#contact" class="modal-cta-contact">
                    <i class="fas fa-envelope"></i> Send Enquiry
                </a>
            </div>`;

        modalBody.innerHTML = html;
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
        const existingOverlay = document.querySelector('.book-modal-overlay');
        if (existingOverlay) existingOverlay.remove();

        const overlay = document.createElement('div');
        overlay.className = 'book-modal-overlay';
        overlay.innerHTML = `
            <div class="book-modal-card">
                <div class="book-modal-header">
                    <button class="book-modal-close" aria-label="Close"><i class="fas fa-times"></i></button>
                    <div class="book-modal-icon"><i class="fas fa-calendar-check"></i></div>
                    <h3>Book Your Adventure</h3>
                    <p>${packageName}</p>
                </div>
                <div class="book-modal-body">
                    <a href="tel:+256393101000" class="book-modal-option call">
                        <div class="book-opt-icon"><i class="fas fa-phone-alt"></i></div>
                        <div class="book-opt-text">
                            <strong>Call Us</strong>
                            <span>+256 393101000 — Instant booking</span>
                        </div>
                    </a>
                    <a href="https://wa.me/256393101000?text=Hi!%20I'd%20like%20to%20book%3A%20${encodeURIComponent(packageName)}" target="_blank" class="book-modal-option whatsapp">
                        <div class="book-opt-icon"><i class="fab fa-whatsapp"></i></div>
                        <div class="book-opt-text">
                            <strong>WhatsApp</strong>
                            <span>Chat with our team directly</span>
                        </div>
                    </a>
                    <a href="mailto:Info@afrisitestoursandtravel.org?subject=Booking%20Inquiry%3A%20${encodeURIComponent(packageName)}" class="book-modal-option email">
                        <div class="book-opt-icon"><i class="fas fa-envelope"></i></div>
                        <div class="book-opt-text">
                            <strong>Email Us</strong>
                            <span>Info@afrisitestoursandtravel.org</span>
                        </div>
                    </a>
                    <a href="index.html#contact" class="book-modal-option form">
                        <div class="book-opt-icon"><i class="fas fa-paper-plane"></i></div>
                        <div class="book-opt-text">
                            <strong>Contact Form</strong>
                            <span>Fill in our enquiry form</span>
                        </div>
                    </a>
                </div>
            </div>`;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        overlay.querySelector('.book-modal-close').addEventListener('click', () => {
            overlay.remove();
            document.body.style.overflow = 'auto';
        });
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                document.body.style.overflow = 'auto';
            }
        });
    };

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('packageModal');
        if (e.target === modal) {
            closePackageModal();
        }
    });

    // Cards are always visible — no scroll-based hide/show
    // (opacity animation was causing cards to remain invisible after filter toggle)
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

    // Update counter
    const counter = document.getElementById('visibleCount');
    if (counter) counter.textContent = visibleCount;

    // Show message if no packages match
    if (visibleCount === 0) {
        showFilterNotification('No packages match your search criteria. Showing all packages.', 'warning');
        packageCards.forEach(card => card.style.display = 'grid');
        if (counter) counter.textContent = packageCards.length;
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