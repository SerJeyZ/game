"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", function (e) {
    var actionBtn = document.querySelector('#action-btn');
    var pin = document.querySelector('#player-pin');
    actionBtn.addEventListener('click', function () {
      pin.classList.add('university-stage1');
    }); //slider

    var prewSlide = document.querySelector('#arrow-prew');
    var nextSlide = document.querySelector('#arrow-next');
    var slideList = document.querySelector('.friends-list');
    var allSlidesLengt = document.querySelectorAll('.friends-list__item').length;
    var slidesOption = {
      slideWidth: 60,
      visibleSlids: 8,
      slideCount: 0
    };
    var slideWidth = slidesOption.slideWidth,
      visibleSlids = slidesOption.visibleSlids,
      slideCount = slidesOption.slideCount;

    var widhtTranslate = function widhtTranslate() {
      var translateWidthSlide = slideWidth * slideCount;
      slideList.setAttribute('style', "transform: translate3d(-".concat(translateWidthSlide, "px, 0, 0);"));
    };

    var onNextSlide = function onNextSlide() {
      if (allSlidesLengt - slideCount > visibleSlids) {
        slideCount++;
        widhtTranslate();
      }
    };

    var onPrewSlide = function onPrewSlide() {
      if (slideCount > 0) {
        slideCount--;
        widhtTranslate();
      }
    };

    nextSlide.addEventListener('click', onNextSlide);
    prewSlide.addEventListener('click', onPrewSlide); //popup render

    var renderRatingTable = function renderRatingTable() {
      var dataRating = JSON.parse(JSON.stringify(data.rating));
      var dataFriends = JSON.parse(JSON.stringify(data.friends));
      var rowTemplate = document.querySelector('#template');
      var moralContentArea = document.querySelector('.modal__content-inner');
      dataRating.sort(function (a, b) {
        return b.points - a.points;
      });

      var _loop = function _loop(i) {
        var rowEl = void 0;

        if ('content' in rowTemplate) {
          rowEl = rowTemplate.content.children[0].cloneNode(true);
        } else {
          rowEl = rowTemplate.children[0].cloneNode(true);
        }

        dataFriends.forEach(function (el) {
          if (el.id === dataRating[i].id) {
            rowEl.classList.add('content-row--friend');
          }
        });
        rowEl.setAttribute('id', "".concat(dataRating[i].id));
        rowEl.querySelector('.modal__content-place').textContent = i + 1;
        rowEl.querySelector('.modal__content-name').textContent = "".concat(dataRating[i].name, " ").concat(dataRating[i].lastName);
        rowEl.querySelector('.modal__content-exp').textContent = "".concat(dataRating[i].points);
        moralContentArea.appendChild(rowEl);
      };

      for (var i = 0; i < dataRating.length; i++) {
        _loop(i);
      }
    }; //popup open


    var openRating = document.querySelector('#rating');
    var popupRating = document.querySelector('#modal-rating');
    var overlay = document.querySelector('#overlay');
    var closeRatingPopup = popupRating.querySelector('#rating-close');
    openRating.addEventListener('click', function () {
      renderRatingTable();
      popupRating.setAttribute('style', "transform: translate3d(-50%, 0, 0);");
      overlay.classList.remove('hidden');
    });
    closeRatingPopup.addEventListener('click', function () {
      popupRating.setAttribute('style', "transform: translate3d(-50%, -1000px, 0);");
      overlay.classList.add('hidden');
    });
  });
})();