/* Show Menu */
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu Show */
if (navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu Hidden */
if (navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* Remove menu mobile */
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* Shadow Header */
const shadowHeader = () =>{
    //When the scroll is greater than 50 viewport height, add the shadow-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('shadow-header')
                        : header.classList.remove('shadow-header') 
}

window.addEventListener('scroll', shadowHeader)

/* EMAIL JS */
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault()

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_kbnpjmy','template_8ta5ygc','#contact-form','FKlcLUbZedV_wNlJU')
    .then(() =>{
        // Show sent message
        contactMessage.textContent = 'Message sent successfully ✅';

        // Remove message after 5 seconds
        setTimeout(() =>{
            contactMessage.textContent = ''
        }, 5000);

        // Clear input fields
        contactForm.reset();

    }, () =>{
        // Show error message
        contactMessage.textContent = 'Message not sent (service error) ❌'

    })
}

contactForm.addEventListener('submit', sendEmail)

/* SHOW SCROLL UP */
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    //when scroll is higher than 350 vieewport height, add show-scroll class to the a tag with scrollup class
    this.scrollY >=350 ? scrollUp.classList.add('show-scroll')
                        :scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach((current, index) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            // Add active-link class to the corresponding navigation link
            navLinks[index].classList.add('active-link');
        } else {
            // Remove active-link class from other navigation links
            navLinks[index].classList.remove('active-link');
        }
    });
};

window.addEventListener('scroll', scrollActive);

/* DARK LIGHT THEME */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// Validate if the user previously chose a topic
if (selectedTheme) {
    //If the validation is fulfilled, to know if Dark is activated or deactivated
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

//Activate / deactivates the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark/ icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // Saving the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurentIcon())
})

/* SCROLL REVEAL ANIMATION */
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    //reset: true // Animations repeat
})

sr.reveal('.home__perfil, .about__image, .contact__mail', {origin: 'right'})
sr.reveal('.home__name, .home__info, .about__container, .section__title-1, .about__info, .contact__social, .contact__data', { origin: 'left'})
sr.reveal('.projects__card', {interval: 100})