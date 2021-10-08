// Global Variables
const main = document.querySelector('main');
const navBar = document.getElementById('navbar__list');
const loadMore = document.querySelector('#loadmore');


// Helper Functions
// Scrolling to anchor
function scrollToAnchor() {
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Checking whether a section is being viewed
function isInView(section) {
    const distance = section.getBoundingClientRect();
    return (
        distance.top > -250 &&
        distance.top < window.innerHeight * 0.8
    );
}

// Adding class 'active' to section when near top of viewport
function setActiveClass() {
    let allSections = document.querySelectorAll('section');
    let allSectionsArray = Array.from(allSections);
    for (i = 0; i < allSectionsArray.length; i++) {
        if (isInView(allSectionsArray[i])) {
            allSectionsArray[i].classList.add("active");
        } else {
            allSectionsArray[i].classList.remove("active");
        }
    }
}

// Main Functions
// Loading more HTML content to the landing page
function loadContent() {
    let allSections = document.querySelectorAll('section');
    for (let i = allSections.length + 1; i <= allSections.length + 2; i++) {
        let newSection = document.createElement('section');
        newSection.id = "section" + i;
        newSection.dataset.nav = "section " + i;
        newSection.innerHTML = `
        <div class="landing__container">
          <h2>Section ${i}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

          <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>`
        main.appendChild(newSection);
    }
    if (allSections.length + 2 >= 8) {
        loadMore.style.display = 'none';
    }
    navBar.innerHTML = ``;
    fillNavigationBar();
}

// Building the navigation bar
function fillNavigationBar() {
    let allSections = document.querySelectorAll('section');
    let navItems = Array.from(allSections).map(section => {
        let navItem = document.createElement('li');
        navItem.className = 'menu__link';
        navItem.innerHTML = `<a href="#${section.id}">${section.dataset.nav}</a>`;
        return navItem;
    })
    navBar.append(...navItems)
    scrollToAnchor()
}

// Events
// Building the bar on load
window.addEventListener('load', function () {
    // Handling the load more button
    loadMore.addEventListener('click', loadContent);
    fillNavigationBar();
});

// Setting sections as active
window.addEventListener('scroll', () => {
    setActiveClass()
});

// Hiding navigayion bar on scroll down
let prevScrollpos = window.pageYOffset;
window.addEventListener('scroll', function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("header").style.top = "0";
    } else {
        document.getElementById("header").style.top = "-150px";
    }
    prevScrollpos = currentScrollPos;
});