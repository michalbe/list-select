(function($){
  var showTime = 300;

  var showList = function() {
    $('.list-select').animate({
      height: 60,
      padding: 10
    }, showTime);
  };

  var hideList = function(){
    $('.list-select').animate({
      height: 0,
      padding: 0
    }, showTime);
  };

  $.fn.list_select = function(){
    var input = this;
    var listElements = $('.list-select a');
    var filteredListElements;
    input.bind('focus', showList);
    input.bind('blur', hideList);
    input.bind('click', function(){
      $(this).select();
    });

    listElements.bind('click', function(){
      input.val($(this).text());
    });

    input.bind('keyup', function(){
      var inputValue = input.val();
      listElements = $('.list-select a');
      if (!inputValue) {
        listElements.show().animate({
          opacity: 0.7
        }, 200);
      } else {
        filteredListElements = listElements.filter(function(){
          return !($(this).text().match(new RegExp('^' + input.val(), 'i')));
        });
        
        filteredListElements.css({
          opacity: 0.1
        });
      }

    });
  };

})(jQuery);


$('#main-input').list_select();
