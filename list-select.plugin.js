(function($){
  $.fn.list_select = function(){
    return this.each(function(){
      $(this).bind('click', function() {
        console.log('elo!');
        $('.list-select').animate({
          height: 60,
          padding: 10
        }, 700);
      });
    });
  }
})(jQuery);


$('#main-input').list_select();
