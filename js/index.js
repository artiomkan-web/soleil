let categoriesSlider = document.querySelector('.categories__slider'),
    categoriesList = categoriesSlider.querySelector('.slider__list'),
    categoriesDots = categoriesSlider.querySelector('.slider__dots')

$(categoriesList).slick({
    arrows : true,
    dots: true,
    appendDots: categoriesDots,
    slidesToShow: 4,
    prevArrow: '<button class="toggle__btn _prev"><i class="icon-arrow-left"></i></button>',
    nextArrow: '<button class="toggle__btn _next _active"><i class="icon-arrow-right"></i></button>',
    infinite: false,
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
})