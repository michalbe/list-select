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
    input.bind('focus', showList);
    input.bind('blur', hideList);
    input.bind('click', function(){
      $(this).select();
    });

    $('.list-select a').bind('click', function(){
      input.val($(this).text());
    });

    input.bind('keypress', function(){

    });
  };

})(jQuery);


$('#main-input').list_select();
