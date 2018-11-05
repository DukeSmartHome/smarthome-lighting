$(function() {
  FastClick.attach(document.body);
  var lights = [
    ['Dirty Lab', '26', 'labs'],
    ['Clean Lab Cabinets', '3', 'labs'],
    ['Clean Lab', '4', 'labs'],
    ['Anuj & Matt', '6', 'living'],          // SW
    ['David & Ricardo', '7', 'living'],      // Downstairs
    ['Flo & Lauren', '9', 'living'],         // NW
    ['Elizabeth & Sakura', '21', 'living'],  // NE
    ['Mac & Rebecca', '28', 'living'],       // SE
    ['West Balcony', '35', 'outside'],
    ['Front Porch', '35', 'outside'],
    ['Back Porch', '36', 'outside'],
    ['Stairs', '12', 'community'],
    ['White Boards', '31', 'community'],
    ['Kitchen', '11', 'community'],
    ['Kitchen Cabinets', '38', 'community'],
    ['Main Room', '11,12,31', 'community'],
    ['Media Room', '20,24', 'community'],
    ['Upper Floor', '0,2', 'community'],
    ['East Upper Bathroom', '17', 'bathrooms'],
    ['West Upper Bathroom', '15', 'bathrooms'],
    ['West Lower Bathroom', '13', 'bathrooms']
  ];
  lights.sort(function(a, b) {
    if (a[0] === b[0]) {
      return 0;
    } else {
      return (a[0] > b[0]) ? -1 : 1;
    }
  });

  function addLights(lightArray) {
    for (var i = 0; i < lights.length; ++i) {
      var html = '<div class="lightGroup" data-light="' + lights[i][1] +
          '" data-type="' + lights[i][2] + '"><div class="name">' +
          lights[i][0] +
          ': <span>OFF</span></div><div class="slider"><div class="slider-handle"></div></div></div>'
      $('#groupContainer').prepend(html);
    }
  }
  addLights(lights);

  // organize categories
  var categories = [
    ['All', 'all'], ['Social', 'community'], ['Rooms', 'living'],
    ['Bath', 'bathrooms'], ['Labs', 'labs'], ['Outside', 'outside']
  ];

  for (var i = 0; i < categories.length; ++i) {
    var html = '<div class="sortButton" id="' + categories[i][1] +
        '"><div class="title">' + categories[i][0] +
        '</div><div class="logow" style="background-image: url(./img/' +
        categories[i][0].toLowerCase() + '_w.svg)"></div></div>'
    $('#sortContainer>div').append(html);
  }
  // select all button
  $('#all').addClass('selected');

  // click behavior
  $('.sortButton').on('click', function() {
    // deal with previous
    $('.selected').removeClass('selected');

    // update clicker
    $(this).addClass('selected');

    if ($(this).attr('id') == 'all') {  // show all
      $('.lightGroup').fadeIn(0);
    } else {
      $('.lightGroup').fadeIn(0);
      $('.lightGroup:not([data-type="' + $(this).attr('id') + '"])').fadeOut(0);
    }
  });

  // initialize socket.io
  var socket = io();

  // handle switching lights
  $('.lightGroup').on('click', function() {
    var status = $(this).children('.name').children('span').html();
    var group = $(this).attr('data-light');
    if (status == 'OFF') {
      socket.emit('change status', 'ON.' + group);
    } else {
      socket.emit('change status', 'OFF.' + group);
    }
  });

  // update status if another user changes it
  socket.on('change status', function(twoMsg) {
    var msgStrs = twoMsg.split('.');
    var msg = msgStrs[0];
    var data = msgStrs[1];
    var $this = $('[data-light=\'' + data + '\']');
    $this.children('.name').children('span').html(msg);
    if (msg == 'ON') {
      $this.addClass('on');
    } else {
      $this.removeClass('on');
    }
  });
});