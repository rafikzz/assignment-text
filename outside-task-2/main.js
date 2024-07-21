document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".video-swiper-container")
    .forEach((container, index) => {
      const mySwiper = new Swiper(container.querySelector(".video-swiper"), {
        autoplay: {
          delay: 8000,
        },
        loop: false,
        autoWidth: true,
        slidesPerView: 1,
        on: {
          transitionStart: function () {
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
          },
          transitionEnd: function () {
            const activeIndex = this.activeIndex;
            const activeSlide =
              container.querySelectorAll(".swiper-slide")[activeIndex];
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
          });
        container
          .querySelector(`.go-to-buttons button[data-slide="${index}"]`)
          .parentElement.classList.add("active");
      }
      // Initial active button setup
      updateActiveButton(mySwiper.realIndex);
      // Add event listeners to "Go to" buttons
      container.querySelectorAll(".go-to-buttons button").forEach((button) => {
        button.addEventListener("click", function () {
          const slideIndex = this.getAttribute("data-slide");
          mySwiper.slideTo(slideIndex);
        });
      });
      // Update active button on slide change
      mySwiper.on("slideChange", function () {
        updateActiveButton(mySwiper.realIndex);
      });
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
          });
        this.closest(".slider-accordion-item").classList.add("active");
      });
    });
  }

  const accordions = document.querySelectorAll(".slider-accordion");
  accordions.forEach(initializeAccordion);
});
