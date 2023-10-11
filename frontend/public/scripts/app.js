function handleClick() {
    const scrollPosition = window.scrollY;
    if (scrollPosition < 1200) {
        window.scrollTo({
            top: 1200,
            behavior: 'smooth'
        });
    }
}

const button = document.querySelector('#my-button');
button.addEventListener('click', handleClick);

var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
      invert: false,
    },
    // autoHeight: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    }
  });
