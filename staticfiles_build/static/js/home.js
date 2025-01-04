document.addEventListener("DOMContentLoaded", function(){

    const Benefits = document.getElementById("Benefits")
    const CaseStudies = document.getElementById("Case-Studies")
    const Testimonials = document.getElementById("Testimonials")
    const FAQ = document.getElementById("FAQ")
    const BookACall = document.getElementById("BookACall")
    const home = document.getElementById("home")

    const BenefitsBtn = document.getElementById("BenefitsBtn")
    const CaseStudiesBtn = document.getElementById("CaseStudiesBtn")
    const TestimonialsBtn = document.getElementById("TestimonialsBtn")
    const FAQBtn = document.getElementById("FAQBtn")
    const BookACallBtn = document.getElementById("BookACallBtn")
    const HomeBtn = document.getElementById("HomeBtn")
    const upBtn = document.getElementById("upBtn")

    const BenefitsBtn2 = document.getElementById("BenefitsBtn2")
    const CaseStudiesBtn2 = document.getElementById("CaseStudiesBtn2")
    const TestimonialsBtn2 = document.getElementById("TestimonialsBtn2")
    const FAQBtn2 = document.getElementById("FAQBtn2")
    const BookACallBtn2 = document.getElementById("BookACallBtn2")
    const HomeBtn2 = document.getElementById("HomeBtn2")

    BenefitsBtn2.addEventListener("click", function(){
        Benefits.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'nearest'})
    })
    CaseStudiesBtn2.addEventListener("click", function(){
        CaseStudies.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'nearest'})
    })
    TestimonialsBtn2.addEventListener("click", function(){
        Testimonials.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'nearest'})
    })
    FAQBtn2.addEventListener("click", function(){
        FAQ.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'nearest'})
    })
    BookACallBtn2.addEventListener("click", function(){
        BookACall.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'nearest'})
    })
    HomeBtn2.addEventListener('click', function(){
        scrollHome()
    })




    BenefitsBtn.addEventListener("click", function(){
        Benefits.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'nearest'})
    })
    CaseStudiesBtn.addEventListener("click", function(){
        CaseStudies.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'nearest'})
    })
    TestimonialsBtn.addEventListener("click", function(){
        Testimonials.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'nearest'})
    })
    FAQBtn.addEventListener("click", function(){
        FAQ.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'nearest'})
    })
    BookACallBtn.addEventListener("click", function(){
        BookACall.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'nearest'})
    })

    function scrollHome(){
        home.scrollIntoView({behavior : 'smooth', block: 'start', inline: 'nearest'})
    }

    HomeBtn.addEventListener("click", function(){
        scrollHome()
    })
    upBtn.addEventListener("click", function(){
        scrollHome()
    })

    function getScrollPercentage() {
        const scrollTop = window.scrollY; // Current vertical scroll position
        const docHeight = document.documentElement.scrollHeight; // Total height of the document
        const winHeight = window.innerHeight; // Height of the visible window
        return (scrollTop / (docHeight - winHeight)) * 100;
    }

    // Function to show or hide the button based on scroll percentage
    function toggleButtonVisibility() {
        const scrollPercent = getScrollPercentage();
        if (scrollPercent >= 20) {
            upBtn.classList.remove("pointer-events-none")
            upBtn.classList.add("pointer-events-auto")
            upBtn.classList.remove("opacity-0")
            upBtn.classList.add("opacity-100")
            upBtn.classList.remove("scale-0")
        } else {
            upBtn.classList.remove("pointer-events-auto")
            upBtn.classList.add("pointer-events-none")
            upBtn.classList.remove("opacity-100")
            upBtn.classList.add("opacity-0")
            upBtn.classList.add("scale-0")
        }
    }

    const navBig = document.getElementById("nav-big")
    const navSmall = document.getElementById("nav-small")
    function toggleNavVisibility() {
        const scrollPercent = getScrollPercentage();
        if (scrollPercent >= 5)
        {
            navSmall.classList.remove("pointer-events-none")
            navSmall.classList.remove("-top-24")
            navSmall.classList.remove("xl:opacity-0")
            navSmall.classList.add("xl:opacity-100")
            
            navBig.classList.remove("xl:opacity-100")
            navBig.classList.add("xl:opacity-0")
            navBig.classList.add("pointer-events-none")
            navBig.classList.add("-translate-y-24")
        } else {
            navSmall.classList.add("pointer-events-none")
            navSmall.classList.add("-top-24")
            navSmall.classList.remove("xl:opacity-100")
            navSmall.classList.add("xl:opacity-0")

            navBig.classList.remove("xl:opacity-0")
            navBig.classList.add("xl:opacity-100")
            navBig.classList.remove("pointer-events-none")
            navBig.classList.remove("-translate-y-24")
        }
    }

    // Scroll event listener
    window.addEventListener('scroll', function(){
        toggleNavVisibility()
        toggleButtonVisibility()
    })


})