'use strict'
window.addEventListener('DOMContentLoaded', ()=> {
    // === HEADER ===
    let header = document.querySelector('header'),
        headerMenu = header.querySelector('.header__menu'),
        headerBurger = header.querySelector('.header__burger'),
        headerClose = header.querySelector('.menu__close'),
        headerMenuIcons = header.querySelector('.menu__icons'),
        headerSearchIcon = header.querySelector('.icons__item._search'),
        headerAccountIcon = header.querySelector('.icons__item._account'),
        headerCartIcon = header.querySelector('.icons__item._cart'),
        headerLikeIcon = header.querySelector('.icons__item._like')
    
    headerBurger.addEventListener('click', ()=>{
        headerMenu.classList.toggle('_active')
        headerBurger.classList.toggle('_active')

        headerMenu.classList.contains('_active') ? document.body.style.overflow = 'hidden' : ''
    })
    document.addEventListener('click', (e) => {
        let withinBoundaries = e.composedPath().includes(headerMenu);
            
        if ( !withinBoundaries && !e.composedPath().includes(headerBurger)) {
            headerMenu.classList.remove('_active')
            headerBurger.classList.remove('_active')
            document.body.style.overflow = ''
        }
    })
    if (headerClose){
        headerClose.addEventListener('click', ()=>{
            headerMenu.classList.remove('_active')
            headerBurger.classList.remove('_active')
            document.body.style.overflow = ''
        })
    }

    
    if (window.matchMedia('(max-width: 768px)').matches){
        headerMenuIcons.insertAdjacentElement('beforeend', headerSearchIcon)
        headerMenuIcons.insertAdjacentElement('beforeend', headerAccountIcon)
        headerMenuIcons.insertAdjacentElement('beforeend', headerLikeIcon)
    }

    // === RADIO BUTTONS === \\
    let radios = document.querySelectorAll('.radio')

    radios.forEach(item => {radio(item)})
    function radio(radio) {
        let radioItems = radio.querySelectorAll('.radio__item')
        radioItems.forEach(item =>{
            item.addEventListener('click', ()=>{
                radioItems.forEach(i => {i.classList.remove('_active')})
                item.classList.add('_active')
            })
        })
    }
    // === COUNTERS === \\
    if (document.querySelector('.cart')){
        let cart = document.querySelector('.cart'),
            cartProducts = cart.querySelectorAll('.products__item')
        
        cartProducts.forEach(item => {
            counter(item)
        })
    }
    if (document.querySelector('.card')){
        let card = document.querySelector('.card'),
            // cardLeft = card.querySelector('.card__left > span'),
            cardCount = card.querySelector('.card__count')
        counter(cardCount)
    }
    function counter(counter, max = 10, min = 1) {
        let plus = counter.querySelector('._plus'),
            minus = counter.querySelector('._minus')

        plus.addEventListener('click', ()=>{
            let field = counter.querySelector('.count__value'),
                startValue = field.value

            startValue++
            field.value = startValue
            startValue > max ? field.value = max : ''
            startValue < min ? field.value = min : ''
        })
        minus.addEventListener('click', ()=>{
            let field = counter.querySelector('.count__value'),
                startValue = field.value

            startValue--
            field.value = startValue
            startValue > max ? field.value = max : ''
            startValue < min ? field.value = min : ''
        }) 
    }
    // === TABS === \\
    let tabs = document.querySelectorAll('.tabs')

    tabs.forEach(item => {tabsCreater(item)})
    function tabsCreater(tabs) {
        let tabsTitles = tabs.querySelectorAll('.tabs__title'),
            tabsItems = tabs.querySelectorAll('.tabs__item')

        tabsTitles.forEach(title => {
            title.addEventListener('click', ()=>{
                for (let n = 0; n < tabsTitles.length; n++){
                    if (tabsTitles[n] == title){
                        tabsTitles[n].classList.add('_active')
                        tabsItems[n].classList.add('_active')
                    }
                    else {
                        tabsTitles[n].classList.remove('_active')
                        tabsItems[n].classList.remove('_active')
                    }
                }
            })
        })
    }

    // === DROPDOWN === \\
    // let dropdowns = document.querySelectorAll('.dropdown') 
    // dropdowns.forEach(item => dropdown(item))
    // function dropdown(dropdown) {
    //     let title = dropdown.querySelector('.dropdown__title span'),
    //         items = dropdown.querySelectorAll('.dropdown__item')

    //     items.forEach(item => {
    //         title.addEventListener('click', ()=>{
    //             title.querySelector('span').textContent = item.textContent
    //             items.forEach(i => {  i.classList.remove('_active')  })
    //             item.classList.add('_active')
    //             dropdown.classList.add('_active')
    //             dropdown.classList.remove('_open')
    //         })
    //     })
    //     document.addEventListener('click', (e) => {
    //         let withinBoundaries = e.composedPath().includes(dropdown);
                
    //         if ( !withinBoundaries) {
    //             dropdown.classList.remove('_open')
    //         }
    //     })

    //     title.addEventListener('click', ()=>{ dropdown.classList.toggle('_open') })
    // }
    let dropdowns = document.querySelectorAll('.dropdown') 
    dropdowns.forEach(item => dropdown(item))

    function dropdown(dropdown) {
        let title = dropdown.querySelector('.dropdown__title'),
            items = dropdown.querySelectorAll('.dropdown__item')

        items.forEach(item => {
            item.addEventListener('click', ()=>{
                title.querySelector('span').textContent = item.textContent
                items.forEach(i => {  i.classList.remove('_active')  })
                item.classList.add('_active')
                dropdown.classList.add('_active')
                dropdown.classList.remove('_open')
            })
        })
        // document.addEventListener('click', (e) => {
        //     let withinBoundaries = e.composedPath().includes(dropdown);
                
        //     if ( !withinBoundaries) {
        //         dropdown.classList.remove('_open')
        //     }
        // })

        title.addEventListener('click', ()=>{ dropdown.classList.toggle('_open') })
    }
    // Media Queries
    function mediaQueries() {
        if (window.matchMedia('(max-width: 1440px)').matches){
            
        }
        if (window.matchMedia('(max-width: 1024px)').matches){
            
        }
        if (window.matchMedia('(max-width: 768px)').matches){
            
        }
        if (window.matchMedia('(max-width: 576px)').matches){
            
        }
        if (window.matchMedia('(max-width: 360px)').matches){
            
        }
    };
    
    mediaQueries()
    window.addEventListener('resize', mediaQueries)
})