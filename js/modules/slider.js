function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prevBtn = document.querySelector(prevArrow),
          nextBtn = document.querySelector(nextArrow),
          totalSlides = document.querySelector(totalCounter),
          currentSlide = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`;
        currentSlide.textContent = `0${slideIndex}`
    } else {
        totalSlides.textContent = slides.length;
        currentSlide.textContent = slideIndex;
    };

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i <  slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slie-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    };

    function deleteNoteDigits(str) {
        return +str.replace(/\D/g, '');
    }
    function beginingZero(slideCount, current, index) {
        if (slideCount.length < 10) {
            current.textContent = `0${index}`;
        } else {
            current.textContent = index;
        }
    }
    function changeOpacity(arr, index) {
        arr.forEach(dot => dot.style.opacity = '.5');
        arr[index - 1].style.opacity = 1;
    }

    nextBtn.addEventListener('click', () => {
        if (offset == deleteNoteDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNoteDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        beginingZero(slides, currentSlide, slideIndex);

        changeOpacity(dots, slideIndex);
    });

    prevBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoteDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNoteDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        beginingZero(slides, currentSlide, slideIndex);

        changeOpacity(dots, slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slie-to');

            slideIndex = slideTo;
            offset = deleteNoteDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            beginingZero(slides, currentSlide, slideIndex);

            changeOpacity(dots, slideIndex);
        });
    });
}

export default slider;