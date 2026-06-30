document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || systemTheme;

    const lightThemeLabel = '\u2600\uFE0F \u65E5\u95F4\u6A21\u5F0F';
    const darkThemeLabel = '\uD83C\uDF19 \u591C\u95F4\u6A21\u5F0F';

    if (initialTheme === 'dark') {
        enableDarkTheme();
    } else {
        themeToggle.textContent = darkThemeLabel;
    }

    function toggleTheme() {
        body.classList.contains('dark-theme') ? disableDarkTheme() : enableDarkTheme();
    }

    function enableDarkTheme() {
        body.classList.add('dark-theme');
        themeToggle.textContent = lightThemeLabel;
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkTheme() {
        body.classList.remove('dark-theme');
        themeToggle.textContent = darkThemeLabel;
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
    $('.botonera > ul > li').hover(handleHoverIn, handleHoverOut);
    initBackgroundMusic();
    initCentering();
    initAnchors();
    handleMobile();
  }

  function initBackgroundMusic() {
    if (document.querySelector('.bgm-record-button')) {
      return;
    }

    let playlist = window.backgroundMusicPlaylist || [
      'songs/AYANE - \u3054\u3081\u3093\u306d.mp3'
    ];

    const musicStateKey = 'backgroundMusicState';
    const savedMusicState = readMusicState();
    let currentIndex = 0;
    let failedTracks = 0;
    let wantsPlayback = !!savedMusicState.isPlaying;
    let pendingResumeTime = Number(savedMusicState.currentTime) || 0;
    let volumeLevel = typeof savedMusicState.volume === 'number' ? savedMusicState.volume : 0.6;
    const audio = new Audio();
    const panel = document.createElement('div');
    const button = document.createElement('button');
    const icon = document.createElement('span');
    const volumeKnob = document.createElement('button');
    const volumeMarker = document.createElement('span');
    const playlistPanel = document.createElement('div');
    const playlistTitle = document.createElement('div');
    const playlistList = document.createElement('div');

    audio.preload = 'metadata';
    audio.volume = volumeLevel;
    audio.src = playlist[currentIndex];
    panel.className = 'bgm-control-panel';
    button.className = 'bgm-record-button';
    button.type = 'button';
    button.setAttribute('aria-label', '\u5F00\u542F\u80CC\u666F\u97F3\u4E50');
    button.title = '\u5F00\u542F\u80CC\u666F\u97F3\u4E50';
    icon.className = 'bgm-record-icon';
    icon.textContent = '\u266A';
    button.appendChild(icon);
    volumeKnob.className = 'bgm-volume-knob';
    volumeKnob.type = 'button';
    volumeKnob.setAttribute('aria-label', '\u8C03\u8282\u80CC\u666F\u97F3\u4E50\u97F3\u91CF');
    volumeKnob.setAttribute('aria-valuemin', '0');
    volumeKnob.setAttribute('aria-valuemax', '100');
    volumeKnob.setAttribute('role', 'slider');
    volumeMarker.className = 'bgm-volume-marker';
    volumeKnob.appendChild(volumeMarker);
    playlistPanel.className = 'bgm-playlist-panel';
    playlistTitle.className = 'bgm-playlist-title';
    playlistTitle.textContent = '\u6B4C\u5355';
    playlistList.className = 'bgm-playlist-list';
    playlistPanel.append(playlistTitle, playlistList);
    panel.append(button, volumeKnob, playlistPanel);
    document.body.append(panel, audio);
    updateVolumeKnob();
    renderPlaylist();
    restoreSavedTrack();
    if (wantsPlayback) {
      updateMusicButton(true);
      setTimeout(function() {
        if (wantsPlayback) {
          playCurrentTrack();
        }
      }, 150);
    }

    button.addEventListener('click', function() {
      if (audio.paused) {
        wantsPlayback = true;
        updateMusicButton(true);
        playCurrentTrack();
      } else {
        wantsPlayback = false;
        audio.pause();
        updateMusicButton(false);
        saveMusicState();
      }
    });

    audio.addEventListener('ended', function() {
      playNextTrack();
    });

    audio.addEventListener('timeupdate', throttleSaveMusicState);
    audio.addEventListener('play', saveMusicState);
    audio.addEventListener('pause', saveMusicState);
    audio.addEventListener('loadedmetadata', function() {
      if (pendingResumeTime > 0 && Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(pendingResumeTime, Math.max(0, audio.duration - 1));
        pendingResumeTime = 0;
      }
    });

    window.addEventListener('pagehide', saveMusicState);
    window.addEventListener('beforeunload', saveMusicState);

    volumeKnob.addEventListener('wheel', function(e) {
      e.preventDefault();
      setVolume(volumeLevel + (e.deltaY < 0 ? 0.05 : -0.05));
    }, { passive: false });

    volumeKnob.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        e.preventDefault();
        setVolume(volumeLevel + 0.05);
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setVolume(volumeLevel - 0.05);
      }
    });

    volumeKnob.addEventListener('pointerdown', function(e) {
      e.preventDefault();
      volumeKnob.setPointerCapture(e.pointerId);
      setVolumeFromPointer(e);
      volumeKnob.addEventListener('pointermove', setVolumeFromPointer);
      volumeKnob.addEventListener('pointerup', stopVolumeDrag, { once: true });
      volumeKnob.addEventListener('pointercancel', stopVolumeDrag, { once: true });
    });

    audio.addEventListener('error', function() {
      if (!wantsPlayback) {
        return;
      }
      failedTracks += 1;
      if (failedTracks >= playlist.length) {
        wantsPlayback = false;
        failedTracks = 0;
        updateMusicButton(false);
        saveMusicState();
        button.title = '\u672A\u627E\u5230\u53EF\u64AD\u653E\u7684\u97F3\u4E50\u6587\u4EF6';
        return;
      }
      playNextTrack();
    });

    function playCurrentTrack() {
      button.title = '\u5173\u95ED\u80CC\u666F\u97F3\u4E50';
      audio.volume = volumeLevel;
      audio.play().then(function() {
        failedTracks = 0;
        updateMusicButton(true);
        saveMusicState();
      }).catch(function() {
        audio.dispatchEvent(new Event('error'));
      });
    }

    function playNextTrack() {
      currentIndex = (currentIndex + 1) % playlist.length;
      audio.src = playlist[currentIndex];
      renderPlaylist();
      if (wantsPlayback) {
        playCurrentTrack();
      }
      saveMusicState();
    }

    function updateMusicButton(isPlaying) {
      button.classList.toggle('is-playing', isPlaying);
      panel.classList.toggle('is-playing', isPlaying);
      button.setAttribute('aria-label', isPlaying ? '\u5173\u95ED\u80CC\u666F\u97F3\u4E50' : '\u5F00\u542F\u80CC\u666F\u97F3\u4E50');
      button.title = isPlaying ? '\u5173\u95ED\u80CC\u666F\u97F3\u4E50' : '\u5F00\u542F\u80CC\u666F\u97F3\u4E50';
      icon.textContent = isPlaying ? '\u275A\u275A' : '\u266A';
      renderPlaylist();
    }

    loadPlaylist();

    function loadPlaylist() {
      discoverPlaylistFromDirectory()
        .then(function(foundTracks) {
          if (foundTracks.length) {
            setPlaylist(foundTracks);
            return null;
          }
          return fetch('songs/playlist.json', { cache: 'no-store' });
        })
        .then(function(response) {
          if (!response) {
            return null;
          }
          return response.ok ? response.json() : null;
        })
        .then(function(items) {
          if (!Array.isArray(items) || !items.length) {
            return;
          }

          setPlaylist(items);
        })
        .catch(function() {});
    }

    function discoverPlaylistFromDirectory() {
      return fetch('songs/', { cache: 'no-store' })
        .then(function(response) {
          return response.ok ? response.text() : '';
        })
        .then(function(html) {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          return Array.from(doc.querySelectorAll('a[href]'))
            .map(function(link) {
              return link.getAttribute('href');
            })
            .filter(function(href) {
              return href && /\.(mp3|m4a|ogg|wav|mp4|flac)$/i.test(href);
            });
        })
        .catch(function() {
          return [];
        });
    }

    function setPlaylist(items) {
      const tracks = items
        .filter(function(item) {
          return typeof item === 'string' && /\.(mp3|m4a|ogg|wav|mp4|flac)$/i.test(item);
        })
        .map(normalizeTrackPath)
        .filter(Boolean);
      const uniqueTracks = dedupeTracks(tracks);

      if (!uniqueTracks.length) {
        return;
      }

      playlist = uniqueTracks;
      restoreSavedTrack();
      audio.src = playlist[currentIndex];
      renderPlaylist();
      if (wantsPlayback) {
        playCurrentTrack();
      }
    }

    function normalizeTrackPath(item) {
      let track = item.split('#')[0].split('?')[0];
      try {
        track = decodeURIComponent(track);
      } catch (e) {}

      track = track.replace(/\\/g, '/');
      const songsIndex = track.lastIndexOf('/songs/');
      if (songsIndex !== -1) {
        track = track.slice(songsIndex + 7);
      }
      track = track.replace(/^\.?\/*/, '');
      track = track.replace(/^songs\//i, '');

      return /\.(mp3|m4a|ogg|wav|mp4|flac)$/i.test(track) ? 'songs/' + track : '';
    }

    function dedupeTracks(tracks) {
      const priority = {
        mp3: 6,
        m4a: 5,
        ogg: 4,
        wav: 3,
        mp4: 2,
        flac: 1
      };
      const byName = new Map();

      tracks.forEach(function(track) {
        const key = getTrackKey(track);
        const ext = getTrackExtension(track);
        const existing = byName.get(key);
        if (!existing || (priority[ext] || 0) > (priority[getTrackExtension(existing)] || 0)) {
          byName.set(key, track);
        }
      });

      return Array.from(byName.values());
    }

    function getTrackKey(track) {
      return track
        .replace(/^songs\//i, '')
        .replace(/\.(mp3|m4a|ogg|wav|mp4|flac)$/i, '')
        .replace(/[_\-\s,，]+/g, '')
        .toLowerCase();
    }

    function getTrackExtension(track) {
      const match = track.match(/\.([a-z0-9]+)$/i);
      return match ? match[1].toLowerCase() : '';
    }

    function setVolume(value) {
      volumeLevel = Math.max(0, Math.min(1, value));
      audio.volume = volumeLevel;
      updateVolumeKnob();
      saveMusicState();
    }

    function setVolumeFromPointer(e) {
      const angle = getClampedKnobAngle(e);
      setVolume((angle + 135) / 270);
    }

    function getClampedKnobAngle(e) {
      const rect = volumeKnob.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const degrees = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI + 90;
      const normalized = ((degrees + 180) % 360 + 360) % 360 - 180;
      return Math.max(-135, Math.min(135, normalized));
    }

    function stopVolumeDrag(e) {
      volumeKnob.releasePointerCapture(e.pointerId);
      volumeKnob.removeEventListener('pointermove', setVolumeFromPointer);
    }

    function updateVolumeKnob() {
      const degrees = -135 + volumeLevel * 270;
      volumeKnob.style.setProperty('--volume-rotation', degrees + 'deg');
      volumeKnob.setAttribute('aria-valuenow', Math.round(volumeLevel * 100));
      volumeKnob.title = '\u97F3\u91CF\uFF1A' + Math.round(volumeLevel * 100) + '%';
    }

    function renderPlaylist() {
      playlistList.innerHTML = '';
      playlist.forEach(function(track, index) {
        const songButton = document.createElement('button');
        songButton.type = 'button';
        songButton.className = 'bgm-playlist-item';
        songButton.textContent = formatTrackName(track);
        songButton.classList.toggle('active', index === currentIndex);
        songButton.addEventListener('click', function() {
          currentIndex = index;
          failedTracks = 0;
          wantsPlayback = true;
          audio.src = playlist[currentIndex];
          updateMusicButton(true);
          renderPlaylist();
          playCurrentTrack();
          saveMusicState();
        });
        playlistList.appendChild(songButton);
      });
    }

    function formatTrackName(track) {
      const name = track.split('/').pop() || track;
      return name.replace(/\.(mp3|m4a|ogg|wav|mp4|flac)$/i, '');
    }

    function restoreSavedTrack() {
      if (!savedMusicState.src) {
        return;
      }

      const savedTrack = normalizeTrackPath(savedMusicState.src);
      const savedIndex = playlist.findIndex(function(track) {
        return normalizeTrackPath(track) === savedTrack;
      });
      if (savedIndex !== -1) {
        currentIndex = savedIndex;
        audio.src = playlist[currentIndex];
      }
    }

    function readMusicState() {
      try {
        return JSON.parse(localStorage.getItem(musicStateKey)) || {};
      } catch (e) {
        return {};
      }
    }

    function saveMusicState() {
      try {
        localStorage.setItem(musicStateKey, JSON.stringify({
          src: playlist[currentIndex],
          currentTime: audio.currentTime || 0,
          volume: volumeLevel,
          isPlaying: wantsPlayback && !audio.paused
        }));
      } catch (e) {}
    }

    function throttleSaveMusicState() {
      if (!throttleSaveMusicState.lastSaved || Date.now() - throttleSaveMusicState.lastSaved > 1000) {
        throttleSaveMusicState.lastSaved = Date.now();
        saveMusicState();
      }
    }
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
    $('.botonera > ul > li').removeClass('blur');
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
        $legal.html('<strong>Estudio NK</strong>Dise帽ando con pasi贸n desde el 2006');
      }
    };
    updateLegal();
    $(window).on('resize', updateLegal);
  }

  $(document).ready(init);

  $(function () {
    $('.general-content').each(function() {
      const $content = $(this);
      const $firstMenu = $content.children('.expand-menu').first();
      if (!$firstMenu.length || $content.children('.overview-menu').length) {
        $content.children('.expand-menu').each(function(index) {
          const $menu = $(this);
          $menu.addClass('bookmark-index-' + index);
          if (!$menu.hasClass('overview-menu') && !$menu.find('.bookmark-page-title').length) {
            const title = $menu.children('.expand-menu-header').clone().children().remove().end().text().trim();
            $menu.children('.expand-menu-body').prepend($('<h2 class="bookmark-page-title"></h2>').text(title));
          }
        });
        return;
      }

      const $overviewItems = $firstMenu.prevAll().get().reverse();
      if (!$overviewItems.length) {
        return;
      }

      const $overview = $('<div class="expand-menu overview-menu open"></div>');
      const $header = $('<div class="expand-menu-header">\u6982\u8FF0<span class="expand-arrow">\u25BC</span></div>');
      const $body = $('<div class="expand-menu-body"></div>');
      $body.append($overviewItems);
      $overview.append($header, $body);
      $firstMenu.before($overview);
      $content.children('.expand-menu').each(function(index) {
        const $menu = $(this);
        $menu.addClass('bookmark-index-' + index);
        if (!$menu.hasClass('overview-menu') && !$menu.find('.bookmark-page-title').length) {
          const title = $menu.children('.expand-menu-header').clone().children().remove().end().text().trim();
          $menu.children('.expand-menu-body').prepend($('<h2 class="bookmark-page-title"></h2>').text(title));
        }
      });
    });
    $('.menu-btn').on('click', function() {
        $('.menu-btn').removeClass('active');
        $(this).addClass('active');
      
        var target = $(this).data('tab');
        $('.general-content').removeClass('active page-turning');
        const $target = $('#' + target);
        $target.find('.expand-menu').removeClass('open page-opening');
        $target.find('.overview-menu').addClass('open');
        $target.addClass('active page-turning');
    });
  });

    $(function () {
    $('.expand-menu-header').on('click', function() {
      const $menu = $(this).parent('.expand-menu');
      const isOpen = $menu.hasClass('open');
      $menu.siblings('.expand-menu').removeClass('open page-opening');
      $menu.removeClass('page-opening');
      void $menu[0].offsetWidth;
      $menu.toggleClass('open', !isOpen);
      if (!isOpen) {
        $menu.addClass('page-opening');
      }
    });
  }); 
})(jQuery);

function setHomeAvatar(src) {
  const image = document.getElementById('home_img');
  if (!image) {
    return;
  }
  image.src = src;
}

function change_img(site) {
  if (site == 'wechat') {
    setHomeAvatar('./img/wechat.jpg');
  } else if (site == 'qq') {
    setHomeAvatar('./img/qq.jpg');
  } else if (site == 'outlook') {
    setHomeAvatar('./img/outlook.png');
  } else if (site == 'home') {
    setHomeAvatar('./img/texas_blank.png');
  }
}

