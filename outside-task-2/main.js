document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".video-swiper-container")
    .forEach((container, index) => {
      const mySwiper = new Swiper(container.querySelector(".video-swiper"), {
        autoplay: true,
        spaceBetween:20,
        loop: false,
        autoWidth: true,
        slidesPerView: 1,
        on: {
          transitionStart: function () {
            pauseAllVideos(container);
          },
          transitionEnd: function () {
            let activeIndex = this.activeIndex;
            let activeSlide =
              container.querySelectorAll(".swiper-slide")[activeIndex];
              let playOrPauseButton = container.querySelector(".pause-button-js");
              if(playOrPauseButton && !playOrPauseButton.classList.contains('paused'))
              {
                playVideo(activeSlide);
              }
          },
         
          autoplayTimeLeft(s, time, progress) {
            container
              .querySelector(".go-to-buttons ")
              .style.setProperty("--progress", 1 - progress);
          },
        },
      });
      // Function to update active button
      function updateActiveButton(index) {
        container
          .querySelectorAll(".go-to-buttons .slider-accordion-item")
          .forEach((button) => {
            button.classList.remove("active");
            button.classList.remove("playing");
            button.setAttribute("aria-expanded", "false");
          });
        let currentButton = container.querySelector(
          `.go-to-buttons button[data-slide="${index}"]`
        );
        if (currentButton) {
          let parentCOntainer = currentButton.parentElement;
          if (parentCOntainer) {
            parentCOntainer.classList.add("active");
            parentCOntainer.classList.add("playing");
            parentCOntainer.setAttribute("aria-expanded", "true");
          }
        }
      }
      // Initial active button setup
      updateActiveButton(mySwiper.realIndex);
      // Add event listeners to "Go to" buttons
      container.querySelectorAll(".go-to-buttons button").forEach((button) => {
        button.addEventListener("click", function () {
          const slideIndex = this.getAttribute("data-slide");
          if (slideIndex) {
            mySwiper.slideTo(slideIndex);
          }
        });
      });
      // Update active button on slide change
      mySwiper.on("slideChange", function () {
        updateActiveButton(mySwiper.realIndex);
      });
      let playOrPauseButton = container.querySelector(".pause-button-js");
      if (playOrPauseButton) {
        playOrPauseButton.addEventListener("click", function () {
          if (!playOrPauseButton.classList.contains("paused")) {
            playOrPauseButton.classList.add("paused");
            mySwiper.autoplay.stop();
            pauseAllVideos(container);
          } else {
            var timeLeft =mySwiper.autoplay.timeLeft;
            mySwiper.autoplay.start();
            mySwiper.autoplay.timeLeft =timeLeft;
            playOrPauseButton.classList.remove("paused");
            let activeSlide =
              container.querySelectorAll(".swiper-slide")[mySwiper.activeIndex];
            playVideo(activeSlide);
          }
        });
      }
    });
  //For Accordian
  function initializeAccordion(accordionElement) {
    const headers = accordionElement.querySelectorAll(
      ".slider-accordion-header"
    );

    headers.forEach((header) => {
      header.addEventListener("click", function () {
        // Close all open accordion items within this accordion container
        accordionElement
          .querySelectorAll(".slider-accordion-item")
          .forEach((item) => {
            item.classList.remove("active");
            item.classList.remove("playing");

            item.setAttribute("aria-expanded", "false");
          });
        this.closest(".go-to-buttons ").style.setProperty("--progress", 0);
        this.closest(".slider-accordion-item").classList.add("active");
        this.closest(".slider-accordion-item").classList.add("playing");

        this.closest(".slider-accordion-item").setAttribute(
          "aria-expanded",
          "true"
        );
      });
    });
  }

  const accordions = document.querySelectorAll(".slider-accordion");
  accordions.forEach(initializeAccordion);
});

const pauseAllVideos = (container) => {
  const videos = container.querySelectorAll("video");
  const iframes = container.querySelectorAll("iframe");
  videos.forEach((video) => video.pause());
  iframes.forEach((iframe) => {
    const src = iframe.src;
    if (src.includes("vimeo.com")) {
      const player = new Vimeo.Player(iframe);
      player.pause();
    }
  });
};
const playVideo = (activeSlide) => {
  const activeSlideVideo = activeSlide.querySelector("video");
  const activeSlideIframe = activeSlide.querySelector("iframe");
  if (activeSlideVideo) {
    activeSlideVideo.play();
  }
  if (activeSlideIframe) {
    const src = activeSlideIframe.src;
    if (src.includes("vimeo.com")) {
      const player = new Vimeo.Player(activeSlideIframe);
      player.play();
    }
  }
};
const pauseVideo = (activeSlide) => {
  const activeSlideVideo = activeSlide.querySelector("video");
  const activeSlideIframe = activeSlide.querySelector("iframe");
  if (activeSlideVideo) {
    activeSlideVideo.pause();
  }
  if (activeSlideIframe) {
    const src = activeSlideIframe.src;
    if (src.includes("vimeo.com")) {
      const player = new Vimeo.Player(activeSlideIframe);
      player.pause();
    }
  }
};
