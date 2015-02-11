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

  var render = function(els) {
    var parentElement = $('<div>');
    var child;
    parentElement.addClass('list-select');

    els.forEach(function(el) {
      child = $('<a>');
      child.text(el);
      child.appendTo(parentElement);
    });

    return parentElement;
  };

  $.fn.list_select = function(elements){
    var input = this;

    this.after(render(elements));
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
        listElements.css({
          opacity: 0.7
        });
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


$('#main-input').list_select([
  "Amsterdam",
  "New York",
  "Paris",
  "San Francisco",
  "Warsaw"
]);
