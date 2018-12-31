// autoscroll to row in table of clicked item
function tableScroll(selectedID) {
  $('.dataTables_scrollBody').animate({
      scrollTop: $('#row_' + selectedID).offset().top - 602
  }, 0)
}

// as scroll down the page add more map divs
var scrollHandler = function(){
  if (currentProperties.featuresLoaded == false) {
    if($(window).scrollTop() >= $(document).height() - $(window).height() - 1000) {
      currentProperties.loadNumber = currentProperties.loadNumber + 1
      loadMapGrid(json, currentProperties.loadNumber, currentProperties.datasetName);
    }
  }
};
