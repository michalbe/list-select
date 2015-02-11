(function($){
  var showTime = 300;

  var showList = function(originalHeight) {
    $('.bp-list-select').animate({
      height: originalHeight,
      padding: 10
    }, showTime);
  };

  var hideList = function() {
    $('.bp-list-select').animate({
      height: 0,
      padding: 0
    }, showTime);
  };

  var render = function(els, settings) {
    var parentElement = $('<div>');
    var child;
    parentElement.addClass('bp-list-select');

    els.forEach(function(el) {
      child = $('<' + settings.listElement + '>');
      child.text(el);
      child.appendTo(parentElement);
    });

    return parentElement;
  };

  $.fn.list_select = function(elements, options) {
    var input = this;

    var settings = $.extend({
      listElement: 'a',
      backgroundColor: "white"
    }, options);

    var renderedList = render(elements, settings);
    input.after(renderedList);
    var originalHeight = renderedList.height();

    renderedList.css({
      height: 0
    });

    var listElements = $('.bp-list-select *');
    var filteredListElements;
    input.bind('focus', function(){ showList(originalHeight); });
    input.bind('blur', hideList);
    input.bind('click', function(){
      $(this).select();
    });

    listElements.bind('click', function(){
      input.val($(this).text());
    });

    input.bind('keyup', function(){
      var inputValue = input.val();
      listElements = $('.bp-list-select *');
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
],
{listElement: 'a'});
