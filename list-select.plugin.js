(function($){
  $.fn.list_select = function(){
    return this.each(function(){
      $(this).bind('click', function(){
        console.log('elo!');
        $('.list-select').animate({
          height: "toggle",
          padding: 10
        }, 1);
      });
    });
  }
})(jQuery);


$('#main-input').list_select();
