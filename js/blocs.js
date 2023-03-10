function setUpSpecialNavs() {
  $(".navbar-toggle").click(function (t) {
    var e,
      i,
      a,
      o = $(this).closest("nav"),
      l = o.find("ul.site-navigation"),
      n = l.clone();
    l.parent().hasClass("nav-special") &&
      (t.stopPropagation(),
      $(this).hasClass("selected-nav")
        ? ($(".blocsapp-special-menu blocsnav").removeClass("open"),
          $(".selected-nav").removeClass("selected-nav"),
          setTimeout(function () {
            $(".blocsapp-special-menu").remove(),
              $("body").removeClass("lock-scroll"),
              $(".selected-nav").removeClass("selected-nav");
          }, 300))
        : ($(this).addClass("selected-nav"),
          (o = o.attr("class").replace("navbar", "").replace("row", "")),
          (l = l
            .parent()
            .attr("class")
            .replace("navbar-collapse", "")
            .replace("collapse", "")),
          ($(".content-tint").length = -1),
          $("body").append('<div class="content-tint"></div>'),
          n
            .insertBefore(".page-container")
            .wrap(
              '<div class="blocsapp-special-menu ' +
                o +
                '"><blocsnav class="' +
                l +
                '">'
            ),
          $("blocsnav").prepend(
            '<a class="close-special-menu animated fadeIn" style="animation-delay:0.5s;"><div class="close-icon"></div></a>'
          ),
          (e = "fadeInRight"),
          (i = 0),
          (a = 60),
          $(".blocsapp-special-menu blocsnav").hasClass("fullscreen-nav")
            ? ((e = "fadeIn"), (a = 100))
            : $(".blocsapp-special-menu").hasClass("nav-invert") &&
              (e = "fadeInLeft"),
          $(".blocsapp-special-menu blocsnav li").each(function () {
            $(this).parent().hasClass("dropdown-menu")
              ? $(this).addClass("animated fadeIn")
              : ((i += a),
                $(this)
                  .attr("style", "animation-delay:" + i + "ms")
                  .addClass("animated " + e));
          }),
          setTimeout(function () {
            $(".blocsapp-special-menu blocsnav").addClass("open"),
              $(".content-tint").addClass("on"),
              $("body").addClass("lock-scroll");
          }, 10)));
  }),
    $("body")
      .on(
        "mousedown touchstart",
        ".content-tint, .close-special-menu",
        function (t) {
          $(".content-tint").removeClass("on"),
            $(".selected-nav").click(),
            setTimeout(function () {
              $(".content-tint").remove();
            }, 10);
        }
      )
      .on("click", ".blocsapp-special-menu a", function (t) {
        $(t.target).closest(".dropdown-toggle").length ||
          $(".close-special-menu").mousedown();
      });
}
function extraNavFuncs() {
  $(".site-navigation a").click(function (t) {
    $(t.target).closest(".dropdown-toggle").length ||
      $(".navbar-collapse").collapse("hide");
  }),
    $("a.dropdown-toggle").click(function (t) {
      $(this).parent().addClass("target-open-menu"),
        $(this)
          .closest(".dropdown-menu")
          .find(".dropdown.open")
          .each(function (t) {
            $(this).hasClass("target-open-menu") || $(this).removeClass("open");
          }),
        $(".target-open-menu").removeClass("target-open-menu");
    });
}
function setFillScreenBlocHeight() {
  $(".bloc-fill-screen").each(function (t) {
    var e = $(this);
    (window.fillBodyHeight = 0),
      $(this)
        .find(".container")
        .each(function (t) {
          (fillPadding = 2 * parseInt($(this).css("padding-top"))),
            (fillBodyHeight = e.hasClass("bloc-group")
              ? fillPadding + $(this).outerHeight() + 50
              : fillBodyHeight + fillPadding + $(this).outerHeight() + 50);
        }),
      $(this).css("height", getFillHeight() + "px");
  });
}
function getFillHeight() {
  var t = $(window).height();
  return t < fillBodyHeight && (t = fillBodyHeight + 100), t;
}
function scrollToTarget(t) {
  1 == t
    ? (t = 0)
    : 2 == t
    ? (t = $(document).height())
    : ((t = $(t).offset().top),
      $(".sticky-nav").length &&
        (t -= $(".sticky-nav .navbar-header").height())),
    $("html,body").animate({ scrollTop: t }, "slow"),
    $(".navbar-collapse").collapse("hide");
}
function animateWhenVisible() {
  hideAll(),
    inViewCheck(),
    $(window).scroll(function () {
      inViewCheck(), scrollToTopView(), stickyNavToggle();
    });
}
function setUpDropdownSubs() {
  $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (t) {
    t.preventDefault(),
      t.stopPropagation(),
      $(this).parent().siblings().removeClass("open"),
      $(this).parent().toggleClass("open"),
      (t = $(this).parent().children(".dropdown-menu")).offset().left +
        t.width() >
        $(window).width() && t.addClass("dropmenu-flow-right");
  });
}
function stickyNavToggle() {
  var t,
    e = 0,
    i = "sticky";
  $(".sticky-nav").hasClass("fill-bloc-top-edge") &&
    ("rgba(0, 0, 0, 0)" ==
      (t = $(".fill-bloc-top-edge.sticky-nav")
        .parent()
        .css("background-color")) && (t = "#FFFFFF"),
    $(".sticky-nav").css("background", t),
    (e = $(".sticky-nav").height()),
    (i = "sticky animated fadeInDown")),
    $(window).scrollTop() > e
      ? ($(".sticky-nav").addClass(i),
        "sticky" == i &&
          $(".page-container").css("padding-top", $(".sticky-nav").height()))
      : ($(".sticky-nav").removeClass(i).removeAttr("style"),
        $(".page-container").removeAttr("style"));
}
function hideAll() {
  $(".animated").each(function (t) {
    $(this).closest(".hero").length ||
      $(this).removeClass("animated").addClass("hideMe");
  });
}
function inViewCheck() {
  $($(".hideMe").get().reverse()).each(function (t) {
    var e,
      i = jQuery(this),
      a = i.offset().top + i.height(),
      o = $(window).scrollTop() + $(window).height();
    i.height() > $(window).height() && (a = i.offset().top),
      a < o &&
        ((e = i.attr("class").replace("hideMe", "animated")),
        i.css("visibility", "hidden").removeAttr("class"),
        setTimeout(function () {
          i.attr("class", e).css("visibility", "visible");
        }, 0.01));
  });
}
function scrollToTopView() {
  $(window).scrollTop() > $(window).height() / 3
    ? $(".scrollToTop").hasClass("showScrollTop") ||
      $(".scrollToTop").addClass("showScrollTop")
    : $(".scrollToTop").removeClass("showScrollTop");
}
function setUpVisibilityToggle() {
  $(document).on("click", "[data-toggle-visibility]", function (t) {
    var e;
    function i(t) {
      t.is("img") ? t.toggle() : t.slideToggle();
    }
    t.preventDefault(),
      -1 != (t = $(this).attr("data-toggle-visibility")).indexOf(",")
        ? ((e = t.split(",")),
          $.each(e, function (t) {
            i($("#" + e[t]));
          }))
        : i($("#" + t));
  });
}
function setUpLightBox() {
  window.targetLightbox,
    $(document)
      .on("click", "[data-lightbox]", function (t) {
        t.preventDefault(), (targetLightbox = $(this));
        var e = targetLightbox.attr("data-lightbox"),
          i = targetLightbox.attr("data-autoplay"),
          a =
            '<p class="lightbox-caption">' +
            targetLightbox.attr("data-caption") +
            "</p>",
          o = "no-gallery-set",
          l = targetLightbox.attr("data-frame");
        targetLightbox.attr("data-gallery-id") &&
          (o = targetLightbox.attr("data-gallery-id")),
          targetLightbox.attr("data-caption") || (a = ""),
          (t = 1 == i ? "autoplay" : ""),
          (a = $(
            '<div id="lightbox-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content ' +
              l +
              ' blocs-lb-container"><button id="blocs-lightbox-close-btn" type="button" class="close-lightbox" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="modal-body"><a href="#" class="prev-lightbox" aria-label="prev"><span class="fa fa-chevron-left"></span></a><a href="#" class="next-lightbox" aria-label="next"><span class="fa fa-chevron-right"></span></a><img id="lightbox-image" class="img-responsive" src="' +
              e +
              '"><div id="lightbox-video-container" class="embed-responsive embed-responsive-16by9"><video controls ' +
              t +
              ' class="embed-responsive-item"><source id="lightbox-video" src="' +
              e +
              '" type="video/mp4"></video></div>' +
              a +
              "</div></div></div></div>"
          )),
          $("body").append(a),
          "fullscreen-lb" == l &&
            ($("#lightbox-modal")
              .addClass("fullscreen-modal")
              .append(
                '<a class="close-full-screen-modal animated fadeIn" style="animation-delay:0.5s;" onclick="$(\'#lightbox-modal\').modal(\'hide\');"><div class="close-icon"></div></a>'
              ),
            $("#blocs-lightbox-close-btn").remove()),
          ".mp4" == e.substring(e.length - 4)
            ? ($("#lightbox-image, .lightbox-caption").hide(),
              $("#lightbox-video-container").show())
            : ($("#lightbox-image,.lightbox-caption").show(),
              $("#lightbox-video-container").hide()),
          $("#lightbox-modal").modal("show"),
          "no-gallery-set" == o
            ? (0 == $("a[data-lightbox]").index(targetLightbox) &&
                $(".prev-lightbox").hide(),
              $("a[data-lightbox]").index(targetLightbox) ==
                $("a[data-lightbox]").length - 1 && $(".next-lightbox").hide())
            : (0 == $('a[data-gallery-id="' + o + '"]').index(targetLightbox) &&
                $(".prev-lightbox").hide(),
              $('a[data-gallery-id="' + o + '"]').index(targetLightbox) ==
                $('a[data-gallery-id="' + o + '"]').length - 1 &&
                $(".next-lightbox").hide()),
          addLightBoxSwipeSupport();
      })
      .on("hidden.bs.modal", "#lightbox-modal", function () {
        $("#lightbox-modal").remove();
      }),
    $(document).on("click", ".next-lightbox, .prev-lightbox", function (t) {
      t.preventDefault();
      var e = "no-gallery-set",
        i = $("a[data-lightbox]").index(targetLightbox),
        a = $("a[data-lightbox]").eq(i + 1);
      targetLightbox.attr("data-gallery-id") &&
        ((e = targetLightbox.attr("data-gallery-id")),
        (i = $('a[data-gallery-id="' + e + '"]').index(targetLightbox)),
        (a = $('a[data-gallery-id="' + e + '"]').eq(i + 1))),
        $(this).hasClass("prev-lightbox") &&
          ((a = $('a[data-gallery-id="' + e + '"]').eq(i - 1)),
          "no-gallery-set" == e && (a = $("a[data-lightbox]").eq(i - 1))),
        ".mp4" == (t = a.attr("data-lightbox")).substring(t.length - 4)
          ? ((i = ""),
            1 == a.attr("data-autoplay") && (i = "autoplay"),
            $("#lightbox-image, .lightbox-caption").hide(),
            $("#lightbox-video-container")
              .show()
              .html(
                "<video controls " +
                  i +
                  ' class="embed-responsive-item"><source id="lightbox-video" src="' +
                  t +
                  '" type="video/mp4"></video>'
              ))
          : ($("#lightbox-image").attr("src", t).show(),
            $(".lightbox-caption").html(a.attr("data-caption")).show(),
            $("#lightbox-video-container").hide()),
        (targetLightbox = a),
        $(".next-lightbox, .prev-lightbox").hide(),
        "no-gallery-set" == e
          ? ($("a[data-lightbox]").index(a) !=
              $("a[data-lightbox]").length - 1 && $(".next-lightbox").show(),
            0 < $("a[data-lightbox]").index(a) && $(".prev-lightbox").show())
          : ($('a[data-gallery-id="' + e + '"]').index(a) !=
              $('a[data-gallery-id="' + e + '"]').length - 1 &&
              $(".next-lightbox").show(),
            0 < $('a[data-gallery-id="' + e + '"]').index(a) &&
              $(".prev-lightbox").show());
    });
}
function addSwipeSupport() {
  $(".carousel-inner").length &&
    $(".carousel-inner").swipe({
      swipeLeft: function (t, e, i, a, o) {
        $(this).parent().carousel("next");
      },
      swipeRight: function () {
        $(this).parent().carousel("prev");
      },
      threshold: 0,
    });
}
function addKeyBoardSupport() {
  $(window).keydown(function (t) {
    37 == t.which
      ? $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click()
      : 39 == t.which &&
        $(".next-lightbox").is(":visible") &&
        $(".next-lightbox").click();
  });
}
function addLightBoxSwipeSupport() {
  $("#lightbox-image").length &&
    $("#lightbox-image").swipe({
      swipeLeft: function (t, e, i, a, o) {
        $(".next-lightbox").is(":visible") && $(".next-lightbox").click();
      },
      swipeRight: function () {
        $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click();
      },
      threshold: 0,
    });
}
$(document).ready(function () {
  $("#scroll-hero").click(function (t) {
    t.preventDefault(),
      $("html,body").animate(
        { scrollTop: $("#scroll-hero").closest(".bloc").height() },
        "slow"
      );
  }),
    extraNavFuncs(),
    setUpSpecialNavs(),
    setUpDropdownSubs(),
    setUpLightBox(),
    setUpVisibilityToggle(),
    addSwipeSupport(),
    addKeyBoardSupport(),
    -1 != navigator.userAgent.indexOf("Safari") &&
      -1 == navigator.userAgent.indexOf("Chrome") &&
      $("#page-loading-blocs-notifaction").remove();
}),
  $(window)
    .load(function () {
      setFillScreenBlocHeight(),
        animateWhenVisible(),
        $("#page-loading-blocs-notifaction").remove();
    })
    .resize(function () {
      setFillScreenBlocHeight();
    }),
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
