function change_img(site) {
	var image = document.getElementById('home_img');
	if (site == 'wechat') {
		image.src = '/img/wechat.jpg'
	}	else if (site == 'qq') {
		image.src = '/img/qq.jpg'
	}	else if (site == 'outlook') {
		image.src = '/img/outlook.png'
	}	else if (site == 'home') {
		image.src = '/img/texas_blank.png'
	}
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove("active-tab");
    }

    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
    
    document.getElementById(tabName).classList.add("active-tab");
    evt.currentTarget.classList.add("active");
  }

  function centrarV(e){
    var altoCont = $(window).height();
    var altoE = e.height();
    var margen = (altoCont - altoE) / 2;
    e.css('margin-top', margen+'px')
  }