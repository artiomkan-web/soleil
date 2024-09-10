'use strict'
window.addEventListener('DOMContentLoaded', ()=> {
    let sections = document.querySelectorAll('section'),
        index = 0,
        status = true,
        data = {
            price: {
                items: [],
                main: null,
                delivery: null,
                all: null
            },
            email: null,
            address: {
                index: null,
                country: null,
                region: null,
                city: null,
                street: null,
                building: null,
                apartment: null,

                full: null
            },
            delivery: null,
            card: {
                number: null,
                owner: null,
                date: null,
                cvc: null
            }
        }
        
    let information = document.querySelector('.information'),
        informationEmail = information.querySelector('#information_email'),
        informationInputs = information.querySelectorAll('.form__input'),
        informationDropdowns = information.querySelectorAll('.form .dropdown'),
        informationDropdownTitles = information.querySelectorAll('.form .dropdown__title'),
        informationDropdownDefTitles = [],
        informationContinue = information.querySelector('button._continue')

    let delivery = document.querySelector('section.delivery'),
        deliveryEmail = delivery.querySelector('#delivery_email'),
        deliveryGeo = delivery.querySelector('#delivery_geo'),
        deliveryMainPrice = delivery.querySelector('#delivery_main_price'),
        deliveryMethodsList = delivery.querySelector('.methods__list'),    
        deliveryMethodsItems = deliveryMethodsList.querySelectorAll('.methods__item'),
        deliveryPrice = delivery.querySelector('#delivery_delivery_price'),
        deliveryContinue = delivery.querySelector('button._continue'),
        deliveryReturn = delivery.querySelector('button._return')

    let payment = document.querySelector('section.payment'),
        paymentMainPrice = payment.querySelector('#payment_main_price'),
        paymentDeliveryPrice = payment.querySelector('#payment_delivery_price'),
        paymentEmail = payment.querySelector('#payment_email'),
        paymentGeo = payment.querySelector('#payment_geo'),
        paymentDelivery = payment.querySelector('#payment_delivery'),
        paymentCardNumber = payment.querySelector('#payment_card_number'),
        paymentCardOwner = payment.querySelector('#payment_card_owner'),
        paymentCardDate = payment.querySelector('#payment_card_date'),
        paymentCardCVC = payment.querySelector('#payment_card_cvc'),
        paymentContinue = payment.querySelector('button._continue'),
        paymentReturn = payment.querySelector('button._return')

    let success = document.querySelector('section.success'),
        successMainPrice = success.querySelector('#success_main_price'),
        successDeliveryPrice = success.querySelector('#success_delivery_price'),
        successEmail = success.querySelector('#success_email'),
        successGeo = success.querySelector('#success_geo'),
        successDelivery = success.querySelector('#success_delivery')

    informationEmail.addEventListener('input', ()=>{checkEmail(informationEmail)})
    informationDropdownTitles.forEach(title => {
        title = title.querySelector('span')
        informationDropdownDefTitles.push(title.textContent)
    })
    informationDropdowns.forEach(dropdown => {
        let title = dropdown.querySelector('.dropdown__title'),
            items = dropdown.querySelectorAll('.dropdown__item')

        items.forEach(item => {
            item.addEventListener('click', ()=>{
                title.parentNode.classList.remove('_error')
            })
        })
    })
    informationInputs.forEach(input => {
        input.addEventListener('input', ()=>{
            checkEmpty(input, input.value)
        })
    })
    informationContinue.addEventListener('click', ()=>{
        status = true
        
        informationInputs.forEach(input => {
            checkEmpty(input, input.value)
            checkEmpty(input, input.value) ? '' : status = false
        })
        
        for (let n = 0; n < informationDropdownTitles.length; n++){
            let title = informationDropdownTitles[n],
                defTitle = informationDropdownDefTitles[n]
            checkDropdown(title, defTitle)
            checkDropdown(title, defTitle) ? '' : status = false 
        }
        
        checkEmail(informationEmail)
        checkEmail(informationEmail) ? '' : status = false
        if (status){
            data.price.main = document.querySelector('#information_main_price').textContent.replace(/[^0-9]/g,"")*1
            data.email = document.querySelector('#information_email').value
            data.address.index = document.querySelector('#information_index').value
            data.address.country = document.querySelector('#information_country').textContent.replace(/\s{2,}/g, '')
            data.address.region = document.querySelector('#information_region').textContent.replace(/\s{2,}/g, '')
            data.address.city = document.querySelector('#information_city').value
            data.address.street = document.querySelector('#information_street').value
            data.address.building = document.querySelector('#information_building').value
            data.address.apartment = document.querySelector('#information_apartment').value
            data.address.full = data.address.index + ', ' + data.address.country + ', ' + data.address.region + ' обл., ' + data.address.city +  ', ' + data.address.street + ', ' + data.address.building + ', ' + data.address.apartment

            deliveryMainPrice.innerHTML = beautifulNumber(data.price.main) + ' руб.'
            deliveryEmail.innerHTML = data.email
            deliveryGeo.innerHTML = data.address.full

            index++
            changeStep()
        }
    })

    deliveryContinue.addEventListener('click', ()=>{
        status = true

        checkEmail(deliveryEmail)
        checkEmail(deliveryEmail) ? '' : status = false

        checkEmpty(deliveryGeo, deliveryGeo.value)
        checkEmpty(deliveryGeo, deliveryGeo.value) ? '' : status = false
        
        if (status){
            data.delivery = delivery.querySelector('.delivery__methods ._active .methods__name').textContent
            data.price.delivery = delivery.querySelector('.delivery__methods ._active .methods__price').textContent.replace(/[^0-9]/g,"")*1
            data.address.full = delivery.querySelector('#delivery_geo').value
            data.email = delivery.querySelector('#delivery_email').value
    
            paymentMainPrice.innerHTML = data.price.main
            paymentDeliveryPrice.innerHTML = data.price.delivery
            paymentEmail.innerHTML = data.email
            paymentGeo.innerHTML = data.address.full
            paymentDelivery.innerHTML = data.delivery + ', ' + beautifulNumber(data.price.delivery) + ' руб.'
    
            index++
            changeStep()
        }
    })
    deliveryReturn.addEventListener('click', ()=>{
        index--
        changeStep()
    })
    deliveryMethodsList.addEventListener('click', ()=>{
        deliveryMethodsItems.forEach(method => {
            if (method.classList.contains('_active')){
                let name = method.querySelector('.methods__name'),
                    price = method.querySelector('.methods__price')

                data.delivery = name.textContent
                data.price.delivery = price.textContent.replace(/[^0-9]/g,"")*1
                
                deliveryPrice.innerHTML = '+' + beautifulNumber(data.price.delivery) + ' руб.'
            }
        })
    })

    paymentContinue.addEventListener('click', ()=> {
        status = true
        
        checkEmpty(paymentCardNumber, paymentCardNumber.value)
        checkEmpty(paymentCardNumber, paymentCardNumber.value) ? '' : status = false
        checkEmpty(paymentCardOwner, paymentCardOwner.value)
        checkEmpty(paymentCardOwner, paymentCardOwner.value) ? '' : status = false
        checkEmpty(paymentCardDate, paymentCardDate.value)
        checkEmpty(paymentCardDate, paymentCardDate.value) ? '' : status = false
        checkEmpty(paymentCardCVC, paymentCardCVC.value)
        checkEmpty(paymentCardCVC, paymentCardCVC.value) ? '' : status = false

        checkEmpty(paymentGeo, paymentGeo.value)
        checkEmpty(paymentGeo, paymentGeo.value) ? '' : status = false
        
        checkEmail(paymentEmail)
        if (status){
            successMainPrice.innerHTML = data.price.main
            successDeliveryPrice.innerHTML = data.price.delivery
            successEmail.innerHTML = data.email
            successGeo.innerHTML = data.address.full
            successDelivery.innerHTML = data.delivery + ', ' + beautifulNumber(data.price.delivery) + ' руб.'

            data.card.number = paymentCardNumber.value
            data.card.owner = paymentCardOwner.value
            data.card.date = paymentCardDate.value
            data.card.cvc = paymentCardCVC.value
    
            index++
            changeStep()
        }
    })
    paymentReturn.addEventListener('click', ()=>{
        index--
        changeStep()
    })
    $(paymentCardNumber).mask("9999 9999 9999 9999")
    $(paymentCardDate).mask("99/99")
    $(paymentCardCVC).mask("999")

    function checkEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email.value)){
            email.parentNode.classList.add('_error')
            email.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            return false
        }
        else{
            email.parentNode.classList.remove('_error')
            return true
        }
    }
    function checkEmpty(element, text, length = 1) {
        text = text + ''

        if (text.length < length){
            element.parentNode.classList.add('_error')
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            return false
        }
        else{
            element.parentNode.classList.remove('_error')
            return true
        }
    }
    function checkDropdown(title, defTitle) {
        let titleText = title.querySelector('span').textContent
        if (titleText == defTitle){
            title.parentNode.classList.add('_error')
            title.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            return false
        }
        else{
            title.parentNode.classList.remove('_error')
            return true
        }
    }
    function checkCheckbox(checkbox) {
        if (!checkbox.checked){
            checkbox.parentNode.classList.add('_error')
            checkbox.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            return false
        } 
        else{
            checkbox.parentNode.classList.remove('_error')
            return true
        }
    }
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
    function changeStep() {
        if (index > sections.length - 1){

        }
        else if (index < 0){

        }
        else{
            sections.forEach(section => {  section.classList.remove('_active')  })
            sections[index].classList.add('_active')
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    let orders = document.querySelectorAll('.order')
    orders.forEach(order => {
        let titlePrice = order.querySelector('.order_title_price'),
            mainPrice = order.querySelector('.order_main_price'),
            deliveryPrice = order.querySelector('.order_delivery_price'),
            totalPrice = order.querySelector('.order_total_price');

        mainPrice.addEventListener('DOMSubtreeModified', calculatePrice)
        deliveryPrice.addEventListener('DOMSubtreeModified', calculatePrice)
        function calculatePrice() {
            titlePrice.textContent = totalPrice.textContent = beautifulNumber(mainPrice.textContent.replace(/[^0-9]/g,"")*1 + deliveryPrice.textContent.replace(/[^0-9]/g,"")*1) +' руб.'
        }
    })

    let details = document.querySelectorAll('.details')
    details.forEach(details => {
        let detailsItems = details.querySelectorAll('.details__item')
        detailsItems.forEach(item => {
            let change = item.querySelector('.details__change'), 
                status = false
    
            if (change){
                change.addEventListener('click', ()=> {
                    let field = item.querySelector('.details__value')
                    
                    status = !status
                    if (status){
                        item.classList.add('_edit')
                        field.style.pointerEvents = 'auto'
                        change.textContent = 'Готово'
                    }
                    else{
                        if (field.classList.contains('_destination')){
                            field.value.length > 0 ? success() : error()
                        }
                        if(field.classList.contains('_email')){
                            checkEmail(field) ? success() : error()
                        }
                    }
                    function error() {
                        item.classList.remove('_edit')
                        item.classList.add('_error')
                        status = !status
                    }
                    function success() {
                        item.classList.remove('_edit')
                        item.classList.remove('_error')
                        field.style.pointerEvents = 'none'
                        change.textContent = 'Изменить'
                    }
                })
            }
        })
    })
})