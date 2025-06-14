//cursor backend
const cursor = document.querySelector('.cursor');
let timer;

document.addEventListener('mousemove', (e) => {
    // Apply scaling and moving effect while moving the cursor
    cursor.style.transform = `translate(-50%, -50%) translate(${e.pageX}px, ${e.pageY}px) scale(0.5)`;

    // Clear the previous timer to reset the scale after some time
    clearTimeout(timer);

    // After 150ms, return to the normal size
    timer = setTimeout(() => {
        cursor.style.transform = `translate(-50%, -50%) translate(${e.pageX}px, ${e.pageY}px) scale(1)`;
    }, 150); // Adjust the time here (150ms) for how fast it returns to normal
});
//cursor backend ends

//slider backend
    const sliderWrapper = document.getElementById('sliderWrapper');
    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicator = document.getElementById('indicator');
    const slides = document.querySelectorAll('.slide');
    const tabLabels = document.querySelectorAll('.toggle-btns label');
    const radioInputs = document.querySelectorAll('.toggle-btns input[type="radio"]');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function scrollToSlide(index) {
      const slideWidth = slides[0].offsetWidth + 20;
      return new Promise(resolve => {
        const handleScroll = () => {
          sliderWrapper.removeEventListener('scroll', handleScroll);
          resolve();
        };
        sliderWrapper.addEventListener('scroll', handleScroll);
        sliderWrapper.scrollTo({
          left: index * slideWidth,
          behavior: 'smooth'
        });
      });
    }

    function updateUI(index, waitForScroll = false) {
      currentSlide = index;
      if (waitForScroll) {
        scrollToSlide(index).then(() => {
          selectRadio(index);
          updateButtons(index);
          updateIndicator(index);
        });
      } else {
        scrollToSlide(index);
        selectRadio(index);
        updateButtons(index);
        updateIndicator(index);
      }
    }

    function updateButtons(index) {
      setTimeout(() => {
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalSlides - 1;
      }, 100);
    }

    function updateIndicator(index) {
      setTimeout(() => {
        indicator.textContent = `${index + 1}/${totalSlides}`;
      }, 100);
    }

    function selectRadio(index) {
      if (radioInputs[index]) radioInputs[index].checked = true;
    }

    prevBtn.onclick = () => {
      if (currentSlide > 0) updateUI(currentSlide - 1, true);
    };

    nextBtn.onclick = () => {
      if (currentSlide < totalSlides - 1) updateUI(currentSlide + 1, true);
    };

    tabLabels.forEach((label) => {
      label.addEventListener('click', () => {
        const index = Number(label.dataset.index);
        if (index !== currentSlide) {
          updateUI(index, true);
        }
      });
    });

    sliderWrapper.addEventListener('scroll', () => {
      const slideWidth = slides[0].offsetWidth + 20;
      const newIndex = Math.round(sliderWrapper.scrollLeft / slideWidth);
      if (newIndex !== currentSlide) {
        currentSlide = newIndex;
        updateIndicator(currentSlide);
        updateButtons(currentSlide);
        selectRadio(currentSlide);
      }
    });

    window.addEventListener('load', () => updateUI(0));
    window.addEventListener('resize', () => scrollToSlide(currentSlide));
    //slider backend ends