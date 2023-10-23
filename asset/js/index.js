function activeMainTab(activeIndex) {
  const filterTexts = [
    [
      { label: '법령명', placeholder: '예) 119구조ㆍ구급에 관한 법률' },
      { label: '소관부처', placeholder: '예) 행정안전부, 인사혁신처, 소방청' },
    ],
    [
      { label: '법규명', placeholder: '예) 100년거제디자인 자문단 구성 및 운영 조례' },
      { label: '자치단체', placeholder: '예) 경상남도 거제시' },
    ],
    [
      { label: '행정규칙명', placeholder: '예) 119구조견 관리운용 규정' },
      { label: '소관부처', placeholder: '예) 소방청' },
    ],
    [
      { label: '법령명', placeholder: '예) 해양환경공단 위임전결규정' },
      { label: '기관명', placeholder: '예) 해양환경공단' },
    ],
  ];
  const currentFilterText = filterTexts[activeIndex - 1];

  // 상단 탭 active class
  $('.main-tab-list > li').removeClass('active');
  $('.main-tab-list > li').eq(activeIndex - 1).addClass('active');

  // 검색 설정 text change
  $('#filter1 .filter-label').text(currentFilterText[0].label);
  $('#filter1 .filter-input').attr('placeholder', currentFilterText[0].placeholder);
  $('#filter2 .filter-label').text(currentFilterText[1].label);
  $('#filter2 .filter-input').attr('placeholder', currentFilterText[1].placeholder);
}

function filterAutocomplete() {
  const filterKeyword1 = ['국세법', '국세기본법', '국세기본법2', '소프트웨어 진흥법', '법인기본법', '부동산법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법', '소비자법'];
  const filterKeyword2 = ['고용노동부', '과학기술정보통신부', '교육부', '국가보훈부', '농촌진흥청', '산림청', '소방청'];

  // 검색 설정 input autocomplete
  $('#filter1 .filter-input').autocomplete({
    source: filterKeyword1,
    minLength: 0,
    focus: function (e, ui) {
      return false;
    },
    select: function (e, ui) {
      console.log(ui.item);
    },
    // delay: 100,
    // autoFocus: true,
  }).focus(function() {
    $(this).autocomplete('search', $(this).val());
  });
  $('#filter2 .filter-input').autocomplete({
    source: filterKeyword2,
    minLength: 0,
    focus: function (e, ui) {
      return false;
    },
    select: function (e, ui) {
      console.log(ui.item);
    },
    // delay: 100,
    // autoFocus: true,
  }).focus(function() {
    $(this).autocomplete('search', $(this).val());
  });
}

function initMainResultLawText() {
  // 결과 텍스트 5줄 이상 시 안보이게
  $('.main-result-law-list .list-text').each(function () {
    const thisEl = $(this);
    const thieHeight = thisEl.children('p').height();

    if (!thisEl.hasClass('checked')) {
      if (thieHeight > 105) {
        thisEl.addClass('cut-toggle');
        thisEl.children('.list-text-toggle-button').addClass('show');
      }
      thisEl.addClass('checked');
    }
  });

  // 결과 텍스트 toggle
  $('.main-result-law-list .list-text-toggle-button').on('click', function () {
    const thisTextEl = $(this).parent('.list-text');

    if (!thisTextEl.hasClass('cut-toggle')) return;

    if (thisTextEl.hasClass('open')) {
      thisTextEl.removeClass('open');
    } else {
      thisTextEl.addClass('open');
    }
  });
}

function activeResultSummaryTab(activeIndex) {
  // active class
  $('.main-result-summary .summary-tab-list > li').removeClass('active');
  $('.main-result-summary .summary-tab-list > li').eq(activeIndex - 1).addClass('active');
}

$(document).ready(function () {
  // init
  activeMainTab(1);
  filterAutocomplete();

  // 상단 탭 click
  $('.main-tab-list .list-button').on('click', function () {
    const activeIndex = $(this).data('tab-index');
    activeMainTab(activeIndex);
  });

  // 검색 설정 open
  $('.main-form-search .search-filter-button').on('click', function () {
    $('.main-filter').addClass('show');
  });

  // 검색 설정 close
  $('.main-filter .filter-close-button').on('click', function () {
    $('.main-filter').removeClass('show');
  });

  // 검색 설정 키워드 delete
  $('.main-filter .filter-keyword-close-button').on('click', function () {
    $(this).parent('.filter-keyword').remove();
  });

  // 검색 submit
  $('.main-form').on('submit', function (e) {
    e.preventDefault();

    $('.main-result-summary').removeClass('show');
    $('.main-result-law').removeClass('show');

    // 스켈레톤 show
    $('.main-result-summary-skeleton').addClass('show');
    $('.main-result-law-skeleton').addClass('show');

    // 결과 show
    setTimeout(() => {
      $('.main-result-summary-skeleton').removeClass('show');
      $('.main-result-summary').addClass('show');
      activeResultSummaryTab(1);

      // 답변 tab
      $('.main-result-summary .summary-tab-list .list-button').on('click', function () {
        const activeIndex = $(this).data('tab-index');
        activeResultSummaryTab(activeIndex);
      });
    }, 2000);
    setTimeout(() => {
      $('.main-result-law-skeleton').removeClass('show');
      $('.main-result-law').addClass('show');
      initMainResultLawText();

      // 다른 내용 더보기 click
      $('.main-result-law-list .list-more-button').on('click', function () {
        const thisEl = $(this);
        const lawListEl = thisEl.parent('.list-foot').siblings('.main-result-law-list.depth2');
        
        if (!lawListEl.hasClass('show')) {
          lawListEl.addClass('show');
          thisEl.text('닫기');
        } else {
          lawListEl.removeClass('show');
          thisEl.text('다른 내용도 더 볼까요?');
        }
      });
    }, 3000);
  });
});
