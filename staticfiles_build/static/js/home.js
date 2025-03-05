document.addEventListener('DOMContentLoaded', function(){

    const questions = document.querySelectorAll('.question')
    console.log(questions)

    questions.forEach(e => {
        e.addEventListener('click', function(){
            clearOpens(questions)
            const image = e.querySelector('img')
            const p = e.querySelector('p')
            if (!e.classList.contains('q-open'))
            {
                e.classList.add('q-open')

                e.classList.remove('bg-tGray')
                e.classList.remove('hover:bg-darkgray')

                e.classList.add('tGrayLight')

                image.classList.add('rotate-diagonal')
                p.classList.remove('hidden')
            }
            else
            {
                e.classList.remove('q-open')

                e.classList.remove('tGrayLight')
                e.classList.add('hover:bg-darkgray')

                e.classList.add('bg-tGray')

                image.classList.remove('rotate-diagonal')
                p.classList.add('hidden')
            }
        })
    })

    function clearOpens()
    {
        questions.forEach(e => {
            if (e.classList.contains('q-open'))
            {
                e.classList.remove('q-open')
                const image = e.querySelector('img')
                const p = e.querySelector('p')

                e.classList.remove('tGrayLight')
                e.classList.add('hover:bg-darkgray')

                e.classList.add('bg-tGray')

                image.classList.remove('rotate-diagonal')
                p.classList.add('hidden')
            }
        })
    }

    const vslbtn = document.getElementById('vsl-btn')
    vslbtn.addEventListener('click', function(){
        const vsl = document.getElementById('vsl')
        const offsetPosition = vsl.getBoundingClientRect().top + window.scrollY - 300
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })
    })
    const orderbtn = document.getElementById('order-btn')
    const order2btn = document.getElementById('order-2-btn')
    const order3btn = document.getElementById('order-3-btn')
    function scrollToPrices()
    {
        const order = document.getElementById('order')
        const offsetPosition = order.getBoundingClientRect().top + window.scrollY - 50
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })
    }
    orderbtn.addEventListener('click', scrollToPrices)
    order2btn.addEventListener('click', scrollToPrices)
    order3btn.addEventListener('click', scrollToPrices)

    const yt = document.getElementById('yt')
    yt.addEventListener('click', function(){
        window.open('https://www.youtube.com/@KacperChalcarz', '_blank')
    })

    const ig = document.getElementById('ig')
    ig.addEventListener('click', function(){
        window.open('https://www.instagram.com/kacper.chalcarz/', '_blank')
    })
})