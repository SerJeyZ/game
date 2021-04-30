(function(){
  document.addEventListener("DOMContentLoaded", (e) => {
    const actionBtn = document.querySelector('#action-btn');
    const pin = document.querySelector('#player-pin');
    
    const action = 10;
    let actionCount=0;

    
    actionBtn.addEventListener('click', () => {
      if (actionCount<=action-1) {
        actionCount++;
        actionBtn.classList.add('btn-disabled');
        pin.classList.add(`university-stage${actionCount}`);
        pin.classList.remove(`university-stage${actionCount-1}`);
        setTimeout(() => {
          actionBtn.classList.remove('btn-disabled');
        }, 1500);
      }
      
    })
    //slider
    const prewSlide = document.querySelector('#arrow-prew');
    const nextSlide = document.querySelector('#arrow-next');
    const slideList = document.querySelector('.friends-list');
    const allSlidesLengt = document.querySelectorAll('.friends-list__item').length;

    const slidesOption = {
      slideWidth: 60,
      visibleSlids: 8,
      slideCount: 0
    }
    let { slideWidth, visibleSlids, slideCount } = slidesOption;

    const widhtTranslate = () => {
      let translateWidthSlide = slideWidth * slideCount;
      slideList.setAttribute('style', `transform: translate3d(-${translateWidthSlide}px, 0, 0);`);
    };
    
    const onNextSlide = () => {
      if (allSlidesLengt - slideCount > visibleSlids) {
        slideCount++;
        widhtTranslate();
      }
    };
    const onPrewSlide = () => {
      if (slideCount > 0) {
        slideCount--;
        widhtTranslate();
      }
    };
    nextSlide.addEventListener('click', onNextSlide);
    prewSlide.addEventListener('click', onPrewSlide);

    //popup render
    const renderRatingTable = () => {
      const dataRating = JSON.parse(JSON.stringify(data.rating));
      const dataFriends = JSON.parse(JSON.stringify(data.friends));
      const rowTemplate = document.querySelector('#template');
      const moralContentArea = document.querySelector('.modal__content-inner');
      
      dataRating.sort((a, b) => b.points - a.points);

      for (let i = 0; i < dataRating.length; i++) {
        let rowEl;
        if ('content' in rowTemplate) {
          rowEl = rowTemplate.content.children[0].cloneNode(true);
        } else {
          rowEl = rowTemplate.children[0].cloneNode(true);
        }

        dataFriends.forEach(el => {
          if (el.id === dataRating[i].id) {
            rowEl.classList.add('content-row--friend');
          }
        });
        rowEl.setAttribute('id', `${dataRating[i].id}`)
        rowEl.querySelector('.modal__content-place').textContent = i + 1;
        rowEl.querySelector('.modal__content-name').textContent = `${dataRating[i].name} ${dataRating[i].lastName}`;
        rowEl.querySelector('.modal__content-exp').textContent = `${dataRating[i].points}`;
        moralContentArea.append(rowEl);
      }
    }

    //popup open
    const openRating = document.querySelector('#rating');
    const popupRating = document.querySelector('#modal-rating');
    const overlay = document.querySelector('#overlay');
    const closeRatingPopup = popupRating.querySelector('#rating-close');

    openRating.addEventListener('click', () => {
      renderRatingTable();
      popupRating.setAttribute('style', `transform: translate3d(-50%, 0, 0);`);
      overlay.classList.remove('hidden');
    })
    closeRatingPopup.addEventListener('click', () => {
      popupRating.setAttribute('style', `transform: translate3d(-50%, -1000px, 0);`);
      overlay.classList.add('hidden');
    })
  });
  
})();


