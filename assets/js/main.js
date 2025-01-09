
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    const isDropdownLink = event.target.closest('.dropdown > a');
    if (!isDropdownLink) {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }
mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  document.querySelectorAll('.dropdown > a').forEach(dropdownLink => {
    dropdownLink.addEventListener('click', function(e) {
      e.preventDefault();
      const parentDropdown = this.parentElement;
      parentDropdown.classList.toggle('active');
      const dropdownMenu = parentDropdown.querySelector('ul');
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('dropdown-active');
      }
    });
  });
  
  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

window.calculateZakat = function(state) {
      const kadar = parseFloat(document.getElementById(`${state}-kadar`).value);
      const tanggungan = parseInt(document.getElementById(`${state}-tanggungan`).value);
      const result = kadar * tanggungan;

      document.getElementById(`${state}-result`).innerText = `Jumlah Zakat: RM${result.toFixed(2)}`;
  };

  

  document.querySelectorAll('.collapsible').forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const collapsibleSectionButton = document.querySelector('.collapsible-section');
    const collapsibleContent = document.querySelector('.collapsible-content');
  
    collapsibleSectionButton.addEventListener('click', () => {
      collapsibleContent.classList.toggle('active');
      if (collapsibleContent.classList.contains('active')) {
        collapsibleSectionButton.textContent = 'Zakat Fitrah';
      } else {
        collapsibleSectionButton.textContent = 'Zakat Fitrah';
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Toggle Pendapatan Section
    const pendapatanSectionButton = document.querySelector('.collapsible-pendapatan-section');
    const pendapatanContent = document.querySelector('.pendapatan-collapsible-content');
  
    pendapatanSectionButton.addEventListener('click', () => {
      pendapatanContent.classList.toggle('active');
      pendapatanContent.style.display = pendapatanContent.classList.contains('active') ? 'block' : 'none';
    });
  
    // Toggle Inner Collapsible for States
    document.querySelectorAll('.collapsible-pendapatan').forEach(button => {
      button.addEventListener('click', function () {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      });
    });
  
    // Calculation for Zakat Pendapatan
    window.calculatePendapatan = function (state) {
      const gaji = parseFloat(document.getElementById(`${state}-pendapatan1`).value) || 0;
      const bonus = parseFloat(document.getElementById(`${state}-pendapatan2`).value) || 0;
      const lain = parseFloat(document.getElementById(`${state}-pendapatan3`).value) || 0;
  
      const pendapatanTahunan = gaji + bonus + lain;
  
      const perbelanjaanDiri = parseFloat(document.getElementById(`${state}-perbelanjaan1`).value) || 0;
      const nafkahIsteri = parseFloat(document.getElementById(`${state}-perbelanjaan2`).value) || 0;
      const anakRendah = parseFloat(document.getElementById(`${state}-perbelanjaan3`).value) * 1000 || 0;
      const anakUniversiti = parseFloat(document.getElementById(`${state}-perbelanjaan4`).value) * 4000 || 0;
  
      const perbelanjaanTahunan = perbelanjaanDiri + nafkahIsteri + anakRendah + anakUniversiti;
  
      const pendapatanLayak = pendapatanTahunan - perbelanjaanTahunan;
      const zakatTahunan = pendapatanLayak * 0.025;
      const zakatBulanan = zakatTahunan / 12;
  
      document.getElementById(
        `${state}-result-pendapatan`
      ).innerHTML = `
        <strong>Jumlah Pendapatan Bersih Layak Dizakat:</strong> RM${pendapatanLayak.toFixed(2)}<br>
        <strong>Jumlah Zakat Setahun:</strong> RM${zakatTahunan.toFixed(2)}<br>
        <strong>Jumlah Zakat Bulanan:</strong> RM${zakatBulanan.toFixed(2)}
      `;
    };
  });

// Function to calculate Zakat KWSP
window.calculateKwsp = function (state) {
  const kwspAmount = parseFloat(document.getElementById(`${state}-kwsp`).value) || 0; // Get the KWSP amount
  const zakat = kwspAmount * 0.025; // Calculate Zakat (2.5%)

  // Update the result display
  document.getElementById(`${state}-result-kwsp`).innerHTML = `
    <strong>Jumlah KWSP Dikeluarkan:</strong> RM${kwspAmount.toFixed(2)}<br>
    <strong>Kiraan Zakat (2.5%):</strong> RM${zakat.toFixed(2)}<br>
    <strong>Jumlah Zakat:</strong> <span style="color: green; font-weight: bold;">RM${zakat.toFixed(2)}</span>
  `;
};


document.addEventListener('DOMContentLoaded', () => {
  // Toggle KWSP Section
  const kwspSectionButton = document.querySelector('.collapsible-kwsp-section');
  const kwspContent = document.querySelector('.kwsp-collapsible-content');

  kwspSectionButton.addEventListener('click', () => {
    kwspContent.classList.toggle('active');
    kwspContent.style.display = kwspContent.classList.contains('active') ? 'block' : 'none';
  });

  // Toggle Inner Collapsible for States
  document.querySelectorAll('.collapsible-kwsp').forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Add event listeners for the calculation buttons for each state
  ['kelantan', 'pahang', 'terengganu'].forEach(state => {
    const calcButton = document.querySelector(`#${state}-kwsp-button`);
    if (calcButton) {
      calcButton.addEventListener('click', () => calculateKwsp(state));
    }
  });
});

})();