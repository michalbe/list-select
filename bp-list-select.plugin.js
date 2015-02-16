(function($) {
  // Duration of the show/hide animation
  var showTime = 300;

  // Methods responsible for showing and hiding the list
  var showList = function(originalHeight) {
    $('.bp-list-select').animate({
      // originalHeight is height of the list element
      // calculated at loadtime
      height: originalHeight
    }, showTime);
  };

  var hideList = function() {
    $('.bp-list-select').animate({
      height: 0,
    }, showTime);
  };

  // `render` function is responsible for creating the
  // list and it's elements
  var render = function(els, settings) {
    // parentElement is the main list container
    var parentElement = $('<div>');
    // child is a single list element
    var child;
    parentElement.addClass('bp-list-select');

    // if custom classes are defined in options, we add
    // them in here
    if (settings.parentClass) {
      parentElement.addClass(settings.parentClass);
    }

    // for all the list elements...
    els.forEach(function(el) {
      // ... create a new element (default <a>, but any can
      // be specyfied in options)...
      child = $('<' + settings.listElement + '>');
      // ... make the text content of the node equal to the
      // list element...
      child.text(el);
      child.addClass('bp-active');

      // ... add custom classes to the element if needed...
      if (settings.listElementsClass) {
        child.addClass(settings.listElementsClass);
      }
      // ... and append the single list element to the list
      // container
      child.appendTo(parentElement);
    });

    return parentElement;
  };

  $.fn.bpListSelect = function(elements, options) {
    // 'input' is the element the plugin is used on
    var input = this;

    // create `settings` object that will use also custom
    // options passed to the plugin by final user
    var settings = $.extend({
      listElement: 'a',
      parentClass: '',
      listElementsClass: ''
    }, options);

    // render the list and it's elements
    var renderedList = render(elements, settings);
    // include the list just after the input
    // TODO: Issue #23
    // User should be able to specify different place in the
    // DOM to append the list
    input.after(renderedList);

    // remember the list's height so it can be expanded to the
    // proper size when shown
    var originalHeight = renderedList.height();

    // hide the list - we don't want it to be visible from start
    // it cannot be hidden when created becauseoriginalHeight will
    // not be calculated correctly
    renderedList.css({
      height: 0
    });

    // get all the list elements
    var listElements = $('.bp-list-select *');
    var filteredListElements;
    var visibleElements;

    // set listeners for list container visibility
    input.on('focus', function() {
      showList(originalHeight);
    });
    input.on('blur', hideList);

    // When input will be clicked, all the text in there
    // should be selected so no additional actions are
    // required to enter the new item's name
    input.on('click', function() {
      $(this).select();
    });

    listElements.on('click', function() {
      var selectedElement = $(this);
      // when any of the list elements will be clicked, put it's
      // value to the input..,
      input.val(selectedElement.text());
      // ... and highlight should be set to only this element
      // (Issue #34 on Github)
      listElements.removeClass('bp-active');
      selectedElement.addClass('bp-active');

      // And emit an event...
      // (Issue #39 on Github)
      $(window).trigger('element-selected', [selectedElement.text()]);
    });

    // with every letter putted in the input, list elements
    // should be filtered and only those that match should be visible
    input.on('keyup', function() {
      var inputValue = input.val();
      listElements = $('.bp-list-select *');

      // if input is empty, show all the elements...
      if (!inputValue) {
        listElements.addClass('bp-active');
      } else {
        // ...in other case...
        // assign all the elements that don't match the patter
        // to filteredListElements
        filteredListElements = listElements.filter(function() {
          return !($(this).text().match(new RegExp('^' + input.val(), 'i')));
        });

        // and all those that match to visibleElements
        visibleElements = listElements.filter(function() {
          return $(this).text().match(new RegExp('^' + input.val(), 'i'));
        });

        // hide elements that don't match the input value
        filteredListElements.removeClass('bp-active');

        // show the rest. This is needed because whenever the character
        // is removed from the input, some elements that were hidden
        // already can now match
        visibleElements.addClass('bp-active');
      }

    });
  };

})(jQuery);
