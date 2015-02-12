module('bpListSelect initial tests',{
  setup:function() {
    // Prepare proper HTML for the plugin
    this.$qf = $('#qunit-fixture');
    this.$qf.append(
      $('<div><input type="text" id="main-input"></div>')
    );
    this.$el = $('#main-input');
  }
});

test('bpListSelect plugin is installed correctly', function() {
  ok(
    'bpListSelect' in this.$el,
    'bpListSelect should be a method of jQuery object'
  );
});

module('bpListSelect UI tests',{
  setup:function() {
    // Prepare proper HTML for the plugin
    this.$qf = $('#qunit-fixture');
    this.$qf.append(
      $('<div><input type="text" id="main-input"></div>')
    );
    this.$el = $('#main-input');

    // and initialize it
    this.$el.bpListSelect(this.listElements);
    this.$bpListSelect = this.$qf.find('.bp-list-select');

  },
  listElements: [
    'machame',
    'shira',
    'barranco',
    'barafu',
    'mweka',
    'mweka gate'
  ],
  showTime: 700
});

test('list elements are correctly added to DOM', function() {
  equal(
    this.$bpListSelect.children().length, this.listElements.length,
    'proper number of list elements should be created'
  );

  ok(
    this.$bpListSelect.height() === 0,
    'list should be hidden at the beginning'
  );
});

test('list shows and hides', function(assert) {
  var done = assert.async();
  var that = this;
  that.$el.focus();

  // I know it's ugly, but since there is an animation going on, we
  // stuck with timeout-spaghetti
  setTimeout(function() {
    ok(
      that.$bpListSelect.height() > 0,
      'list should be visible when input is focused'
    );

    that.$el.blur();
    setTimeout(function(){
      ok(
        that.$bpListSelect.height() === 0,
        'list should be invisible when input is blured'
      );
      done();
    }, that.showTime);
  }, that.showTime);
});

test('highlighting elements', function(){
  // we change the value of the input and then run 'keyup' event to
  // simulate writing on a keyboard
  this.$el.val('machame');
  this.$el.keyup();
  equal(
    this.$bpListSelect.find('.bp-active').length, 1,
    'there should be one active element'
  );

  this.$el.val('m');
  this.$el.keyup();
  equal(
    this.$bpListSelect.find('.bp-active').length, 3,
    'there should be three active elements'
  );

  this.$el.val('mw');
  this.$el.keyup();
  equal(
    this.$bpListSelect.find('.bp-active').length, 2,
    'there should be two active elements'
  );

  this.$el.val('');
  this.$el.keyup();
  equal(
    this.$bpListSelect.find('.bp-active').length, this.listElements.length,
    'all the elements should be active'
  );
});

test('click on the element to change input value', function() {
  var singleElement = this.$bpListSelect.find(':first-child');
  singleElement.click();

  equal(
    this.$el.val(), singleElement.text(),
    'input should have element\'s value'
  );
});

test('proper element should be highlighted afteng clicked ', function() {
  this.$el.val('ba');
  this.$el.keyup();

  equal(
    this.$bpListSelect.find('.bp-active').length, 2,
    'two elements should be active at the beginning'
  );

  var singleElement = this.$bpListSelect.find(':first-child'); //'machame
  singleElement.click();

  equal(
    this.$el.val(), singleElement.text(),
    'input should have element\'s value'
  );

  equal(
    this.$bpListSelect.find('.bp-active').length, 1,
    'one element should be active'
  );
});
