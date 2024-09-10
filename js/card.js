'use strict'
window.addEventListener('DOMContentLoaded', ()=> {

    let card = document.querySelector('.card'),
        cardTitle = card.querySelector('.card__title'),
        cardSubtitle = card.querySelector('.card__subtitle'),
        cardCountValue = card.querySelector('.card__count .count__value'),
        cardSendBtn = card.querySelector('.card__send')

    cardSendBtn.addEventListener('click', ()=>{
        card.classList.add('_added')
        window.scrollTo({ top: 0, behavior: 'smooth' });
        let addedQuantity = card.querySelectorAll('.added__quantity'),
            addedName = card.querySelector('.added__name'),
            addedSize = card.querySelector('.added__size > span'), 
            addedClose = card.querySelector('.added__close'), 
            startTitle = cardTitle.textContent
            // startCartQuantity = cartIconSpan.textContent

        
        // cartIconSpan.innerHTML = startCartQuantity*1 + cardCountValue.value*1
        addedQuantity.forEach(quantity => {
            quantity.textContent = 'x' + cardCountValue.value
        })
        addedQuantity.textContent = 'x' + cardCountValue.value
        addedName.textContent = cardSubtitle.textContent
        addedSize.textContent = card.querySelector('.size__item._active').textContent
        if (window.matchMedia('(max-width: 768px)').matches){
            cardTitle.textContent = 'Добавлено'
        }
        cardTitle.insertAdjacentHTML('beforeend', 
        `
            <button class="card__close"><i class="icon-close"></i></button>
        `)
        

        
        let cardClose = card.querySelectorAll('.card__close'),
            cardContinue = card.querySelector('.added__continue')

        cardClose.forEach(close => {
            close.addEventListener('click', closeCardAdded)
        })
        cardContinue.addEventListener('click', closeCardAdded)

        function closeCardAdded() {
            card.classList.remove('_added');
            cardTitle.textContent = startTitle
        }
    })
    $('.card__slider .slick').slick({
        dots: true,
        dotsClass: 'slider__dots card__dots',
        arrows : false,
        speed: 500,
    });
    $('.card__carousel  .slick').slick({
        dots: true,
        dotsClass: 'slider__dots card__dots',
        arrows : false,
        speed: 500,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768.1,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 360.1,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    // Media Queries
    function mediaQueries() {
        if (window.matchMedia('(max-width: 1440px)').matches){
            
        }
        if (window.matchMedia('(max-width: 1024px)').matches){
            
        }
        if (window.matchMedia('(max-width: 768px)').matches){

        }
        if (window.matchMedia('(max-width: 360px)').matches){
            
        }
    };
    
    mediaQueries()
    window.addEventListener('resize', mediaQueries)
})