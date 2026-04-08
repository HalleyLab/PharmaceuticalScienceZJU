document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || systemTheme;

    if (initialTheme === 'dark') {
        enableDarkTheme();
    }

    function toggleTheme() {
        body.classList.contains('dark-theme') ? disableDarkTheme() : enableDarkTheme();
    }

    function enableDarkTheme() {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️ 日间模式';
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkTheme() {
        body.classList.remove('dark-theme');
        themeToggle.textContent = '🌙 夜间模式';
        localStorage.setItem('theme', 'light');
    }

    themeToggle.addEventListener('click', toggleTheme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!savedTheme) {
            e.matches ? enableDarkTheme() : disableDarkTheme();
        }
    });
});
(function($) {
  function init() {
    $('.btnMenu').on('click', toggleMenu);
    $('.botonera li').hover(handleHoverIn, handleHoverOut);
    initCentering();
    initAnchors();
    handleMobile();
  }

  function toggleMenu() {
    const $this = $(this);
    const isOpen = $this.hasClass('open');
    $this.toggleClass('open', !isOpen);
    $('nav').stop(true).fadeToggle('fast', function() {
      if (!isOpen){
         centrarV($('nav.botonera'));
          $('.subnav-bar a').addClass('disabled');
    } 
      else {
        $('.subnav-bar a').removeClass('disabled');
      }
    });
  }

  function handleHoverIn() {
    $(this).siblings().addClass('blur');
    $(this).removeClass('blur');
  }

  function handleHoverOut() {
    $('.botonera li').removeClass('blur');
  }

  function initCentering() {
    const $centered = $('.centered');
    let resizeTimeout;

    function updateCentering() {
      $centered.each((i, el) => centrarV($(el)));
    }
    updateCentering();
    $(window).on('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCentering, 200);
    });
  }

  function initAnchors() {
    $('a.arrowDown').on('click', function(e) {
      e.preventDefault();
      smoothScroll($(this).attr('href'), 300);
    });

    $('#casos .headCasos .arrowIr').on('click', function(e) {
      e.preventDefault();
      smoothScroll('.imgPrincipal', 1200);
    });

    $('#inicio, #slide1, #slide2').on('click', function(e) {
      e.preventDefault();
      smoothScroll($(this).attr('data-rel'), 300);
    });
  }

  function smoothScroll(target, duration) {
    const $target = $(target);
    if ($target.length) {
      $('html, body').stop(true).animate({
        scrollTop: $target.offset().top
      }, duration, 'easeOutCirc');
    }
  }

  function handleMobile() {
    const $legal = $('.legal');
    const updateLegal = () => {
      if ($(window).width() <= 480) {
        $legal.html('<strong>Estudio NK</strong>Diseñando con pasión desde el 2006');
      }
    };
    updateLegal();
    $(window).on('resize', updateLegal);
  }
  $(document).ready(init);

  $(function () {
    $('.menu-btn').on('click', function() {
        $('.menu-btn').removeClass('active');
        $(this).addClass('active');
      
        var target = $(this).data('tab');
        $('.general-content').removeClass('active');
        $('#' + target).addClass('active');
    });
  });

    $(function () {
    $('.expand-menu-header').on('click', function() {
      $(this).parent('.expand-menu').toggleClass('open');
    });
  }); 
})(jQuery);

function change_img(site) {
	var image = document.getElementById('home_img');
	if (site == 'wechat') {
		image.src = './img/wechat.jpg'
	}	else if (site == 'qq') {
		image.src = './img/qq.jpg'
	}	else if (site == 'outlook') {
		image.src = './img/outlook.png'
	}	else if (site == 'home') {
		image.src = './img/texas_blank.png'
	}
}
