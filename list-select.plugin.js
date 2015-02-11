(function($){
  $.fn.list_select = function(){
    return this.each(function(){
      var input = $(this);
      input.bind('focus', function() {
        $('.list-select').animate({
          height: 60,
          padding: 10
        }, 700);
      });

      input.bind('blur', function(){
        $('.list-select').animate({
          height: 0,
          padding: 0
        }, 700);
      })
    });
  };

  
})(jQuery);


$('#main-input').list_select();
