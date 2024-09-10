'use strict'
window.addEventListener('DOMContentLoaded', ()=> {
    let products = document.querySelector('.products'),
        productsItems = products.querySelectorAll('.products__item'),
        productsDeleteBtns = products.querySelectorAll('.products__delete'),
        productsList = products.querySelector('.products__list')
    

    productsDeleteBtns.forEach(btn => {
        btn.addEventListener('click', ()=>{
            for (let n = 0; n < productsDeleteBtns.length; n++){
                if (productsDeleteBtns[n] == btn){
                    productsItems[n].remove()
                }
            }
        })
    })

    productsItems.forEach(item => {
        let actualPrice = item.querySelector('.price__actual'),
            oldPrice = item.querySelector('.price__old'),
            startActualPrice = actualPrice.textContent.replace(/[^0-9]/g,"")*1,
            startOldPrice = oldPrice.textContent.replace(/[^0-9]/g,"")*1,
            count = item.querySelector('.products__count .count__value')

        item.addEventListener('click', ()=>{
            actualPrice.textContent = beautifulNumber(count.value * startActualPrice) + ' руб.'
            oldPrice.textContent = beautifulNumber(count.value * startOldPrice) + ' руб.'
            calculatePrice()

            if (productsList.textContent.replace(/\s{2,}/g, '').length < 1){
                productsList.innerHTML = '<h5>Корзина пуста</h5>'
            }
        })
    })
    
    function calculatePrice() {
        let result = 0,
            actualPrices = products.querySelectorAll('.price__actual')

        actualPrices.forEach(price => {
            result += price.textContent.replace(/[^0-9]/g,"")*1
        })
        result += ''
        
        result = beautifulNumber(result)
        
        document.querySelector('.cart__result > span').textContent = result
    };calculatePrice()

    function beautifulNumber(value) {
        value += ''
        if (value.length == 4){
            let valueFirst = value.slice(0,1),
                valueLast = value.slice(-3)
            value = valueFirst + '.' + valueLast;
        }
        else if (value.length == 5){
            let valueFirst = value.slice(0,-3),
                valueLast = value.slice(-3)
            value = valueFirst + '.' + valueLast;
        }
        else if (value.length == 6){
            let valueFirst = value.slice(0,-3),
                valueLast = value.slice(-3)
            value = valueFirst + '.' + valueLast;
        }
        else if (value.length == 7){
            let valueFirst = value.slice(0,1),
                valueSecond = value.slice(1, -3),
                valueLast = value.slice(-3)
            value = valueFirst + '.' + valueSecond + '.' + valueLast;
        }
        return value
    }
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