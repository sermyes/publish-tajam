$(document).ready(function() {
  navScroll();
  //navScroll function

  main_Slider();
  // slide function

  video_overlay();
  // video_overlay function

  img_overlay();
  // img_overlay function

  talk_slider();
  // talk_slide function
});

function navScroll() {
  const $headerNav = $('header div nav ul li');
  const $foot_logo = $('.foot_logo h2 a');
  let areaId = '';
  const scroll_duration = 1000;

  $headerNav.eq(0).addClass('active');

  $headerNav.click(function(e) {
    e.preventDefault();

    $(this).addClass('active').siblings().removeClass('active');
    areaId = $(this).attr('data-nav');

    scroll_nav();
  });

  $foot_logo.click(function(e) {
    e.preventDefault();

    scroll_logo();
  });

  function scroll_nav() {
    let areaDistance = $('#' + areaId).offset().top;
    $('html, body').stop().animate(
      {
        scrollTop: areaDistance - 20
      },
      scroll_duration
    );
  }

  function scroll_logo() {
    $('html, body').stop().animate(
      {
        scrollTop: 0
      },
      scroll_duration
    );
  }
  // scroll function fin
}

function main_Slider() {
  const $slideContainer = $('.slideContainer');
  const $slideGroup = $slideContainer.find('.slideGroup'); // ul
  const $slide = $slideGroup.find('li'); // li
  const slideCount = $slide.length; // li 갯수
  const $pagerGroup = $('.pagerGroup'); // ol
  let $pager = $pagerGroup.find('li'); // li
  const $slideArea = $('.slideContainer, .pagerGroup'); // pager, slide 합친 영역
  const duration = 500; // slide 변환속도
  const interval = 3500; // autoSlide interval
  const threshold = 200; // 드래그 양
  let pagerHtml = ''; // pager 추가변수
  let currentIndex = 0; // 현재 slide index위치
  let clickDrag = false; // 마우스이벤트 status
  let startDrag = 0; // 드래그위치
  let endDrag = 0; // 드래그위치

  $slide.each(function(i) {
    var newLeft = i * 100 + '%';
    $(this).css({
      left: newLeft
    });
    // slide position 배치

    pagerHtml += '<li><a href="">' + 'slide ' + (i + 1) + '</a></li>';
    $pagerGroup.html(pagerHtml);
    // pager li 자동추가.
  });

  $pager = $pagerGroup.find('li');
  $pager.eq(0).addClass('active'); // 첫번쨰 pager button active.

  $pager.click(function(e) {
    e.preventDefault();
    var index = $(this).index();

    goToSlide(index);
  });

  autoSlide(); // autoSlide 기능
  draggable(threshold); // 드래그 기능

  function autoSlide() {
    startSlide();

    $slideArea
      .mouseenter(function() {
        stopSlide();
      })
      .mouseleave(function() {
        startSlide();
      });
  }

  function startSlide() {
    timer = setInterval(function() {
      var nextIndex = (currentIndex + 1) % slideCount;
      goToSlide(nextIndex);
    }, interval);
  }

  function stopSlide() {
    clearInterval(timer);
  }

  function goToSlide(index) {
    var newLeft = -100 * index + '%';

    if (currentIndex > index && currentIndex - index >= 2) {
      var preLeft = -100 * (index + 1) + '%';
      $slideGroup.css({
        left: preLeft
      });
    }
    if (index > currentIndex && index - currentIndex >= 2) {
      var preLeft = -100 * (index - 1) + '%';
      $slideGroup.css({
        left: preLeft
      });
    }

    $slideGroup.animate(
      {
        left: newLeft
      },
      duration
    );
    currentIndex = index;

    $pager.eq(currentIndex).addClass('active').siblings().removeClass('active');
    // pager active btn toggle.
  }

  function draggable() {
    $slideGroup.mousedown(function(e) {
      clickDrag = true;
      startDrag = e.clientX;
    });
    $slideGroup.mousemove(function() {
      if (clickDrag === false) return;
    });
    $slideGroup.mouseup(function(e) {
      clickDrag = false;
      endDrag = e.clientX;
      dragCheck(threshold);
    });
  }

  function dragCheck(threshold) {
    if (startDrag > endDrag && startDrag - endDrag >= threshold) {
      if (currentIndex === 3) {
        currentIndex = 0;
      } else {
        currentIndex += 1;
      }
    }
    if (endDrag > startDrag && endDrag - startDrag >= threshold) {
      if (currentIndex === 0) {
        currentIndex = 3;
      } else {
        currentIndex -= 1;
      }
    }
    goToSlide(currentIndex);
  }
  // main_slide function
}

function video_overlay() {
  const $video_overlay = $('.story .video_overlay');
  const $video_play = $('.story .video_play');
  const $video_close = $video_overlay.find('.video_inner .video_close');

  $video_play.click(function(e) {
    e.preventDefault();
    $video_overlay.addClass('visible');
  });
  $video_close, $video_overlay.click(function(e) {
    e.preventDefault();
    $video_overlay.removeClass('visible');
  });
  // video_overlay function
}

function img_overlay() {
  const $img_overlay = $('.img_overlay');
  const $img_inner = $img_overlay.find('.img_inner');
  const $updateImg = $img_inner.find('.updateImg');
  const $imgs = $('.works ul li');
  let img_src;
  // img_overlay variable

  $imgs.find('a').click(function(e) {
    e.preventDefault();

    img_src = $(this).find('img').attr('src');
    $updateImg.attr('src', img_src);

    $img_overlay.addClass('visible');
  });

  $img_overlay.click(function() {
    $img_overlay.removeClass('visible');
  });
  // img_overlay function
}

function talk_slider() {
  const $prev = $('.slides_container .prev');
  const $next = $('.slides_container .next');
  const $talk_slides = $('.slides_container .talk_slides');
  const $talk_slide = $talk_slides.find('.talk_slide');
  const $talk_slidePages = $('.talk_slidePages');
  const talk_slideCount = $talk_slide.length;
  let $activeSlide;
  let $firstSlide;
  let $lastSlide;
  // talk_slide variable

  $prev.click(function(e) {
    e.preventDefault();
    prevMoveSlide();
    activeSlide();
  });

  $next.click(function(e) {
    e.preventDefault();
    nextMoveSlide();
    activeSlide();
  });

  $talk_slide.click(function(e) {
    e.preventDefault();
    $activeSlide = $(this);
    goToSlide();
    activeSlide();
  });

  function activeSlide() {
    $activeSlide = $talk_slide.filter(':nth-child(3)');
    $talk_slide.removeClass('active');
    $activeSlide.addClass('active');
    activePage();
  }
  function activePage() {
    let activeId = $activeSlide.attr('data-slide');
    $talk_slidePages
      .find('#' + activeId)
      .addClass('active')
      .siblings()
      .removeClass('active');
  }
  function prevMoveSlide() {
    $firstSlide = $talk_slide.filter(':first-child');
    $lastSlide = $talk_slide.filter(':last-child');
    $firstSlide.insertAfter($lastSlide);
  }
  function nextMoveSlide() {
    $firstSlide = $talk_slide.filter(':first-child');
    $lastSlide = $talk_slide.filter(':last-child');
    $lastSlide.insertBefore($firstSlide);
  }
  function goToSlide() {
    let currentIdx = $activeSlide.index();
    let activeIdx = Math.floor(talk_slideCount / 2);
    if (currentIdx < activeIdx) {
      while (currentIdx < activeIdx) {
        nextMoveSlide();
        currentIdx++;
      }
    }
    if (currentIdx > activeIdx) {
      while (currentIdx > activeIdx) {
        prevMoveSlide();
        currentIdx--;
      }
    }
  }
  // talk_slide function
}
