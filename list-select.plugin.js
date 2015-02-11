(function($){
  var showList = function() {
    $('.list-select').animate({
      height: 60,
      padding: 10
    }, 700);
  };

  var hideList = function(){
    $('.list-select').animate({
      height: 0,
      padding: 0
    }, 700);
  };

  $.fn.list_select = function(){
    var that = this;

    $('.list-select a').bind('click', function(){
      that.val($(this).text());
    });

    return that.each(function(){
      var input = $(this);
      input.bind('focus', showList);
      input.bind('blur', hideList);
    });
  };

})(jQuery);


$('#main-input').list_select();
