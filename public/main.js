$(function () {
    FastClick.attach(document.body);
    var lights = [["Clean Lab", "26", "labs"], ["Dirty Lab Cabinets", "3", "labs"], ["Dirty Lab", "4", "labs"], ["Harvey and Owen's Room", "6", "living"], ["Lavanya's Room", "7", "living"], ["Ani and Suyash's Room", "9", "living"], ["Stephanie's Room", "21", "living"], ["Lauren and Tierney's Room", "28", "living"], ["Front Porch", "35", "outside"], ["West Balcony", "19", "outside"], ["Back Porch", "36", "outside"], ["Kitchen", "11", "community"], ["Front Indoor Lights", "12", "community"], ["White Board Lights", "31", "community"], ["Kitchen Under Cabinets", "38", "community"], ["Main Room", "11,12,31", "community"], ["Media Room", "20,24", "community"], ["Upper Floor", "8", "community"], ["East Upper Bathroom", "17", "bathrooms"], ["West Upper Bathroom", "15", "bathrooms"], ["West Lower Bathroom", "13", "bathrooms"]];
    lights.sort(function (a, b) {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    });

    for (var i = 0; i < lights.length; ++i) {
        var html = '<div class="lightGroup" data-light="' + lights[i][1] + '" data-type="' + lights[i][2] + '"><div class="name">' + lights[i][0] + ': <span>OFF</span></div><div class="onoff"><div class="slider"></div></div></div>'
        $('#groupContainer').append(html);
    }

    var categories = [["All", "all"], ["Social", "community"], ["Rooms", "living"], ["Bath", "bathrooms"], ["Labs", "labs"], ["Outside", "outside"]];

    for (var i = 0; i < categories.length; ++i) {
        var html = '<div class="sortButton" id="' + categories[i][1] + '"><div class="title">' + categories[i][0] + '</div><div class="logo" style="background: url(' + categories[i][0].toLowerCase() + '.svg) no-repeat center center;background-size: 33px 33px;"></div></div>'
        $('#sortContainer>div').append(html);
    }
    $('#all').addClass('selected');
    $('#all .logo').css('background-image', 'url(all_w.svg)');

    $(".sortButton").on('click', function () {
        // deal with previous
        var prevName = $('.selected').children('.title').html().toLowerCase();
        $('.selected .logo').css('background', '');
        $('.selected .logo').css('background', 'url(' + prevName + '.svg) no-repeat center center');
        $('.selected .logo').css('background-size', '33px 33px');
        $('.selected').removeClass('selected');

        // update clicker
        var newName = $(this).children('.title').html().toLowerCase();
        $(this).addClass('selected');
        $('.selected .logo').css('background-image', 'url(' + newName + '_w.svg)');

        if ($(this).attr('id') == 'all') { // show all
            $('.lightGroup').fadeIn(0);
        } else {
            $('.lightGroup').fadeIn(0);
            $('.lightGroup:not([data-type="' + $(this).attr('id') + '"])').fadeOut(0);
        }
    });

    // initialize socket.io
    var socket = io();
    
    // handle switching lights
    $(".lightGroup").on('click', function () {
        var status = $(this).children('.name').children('span').html();
        var group = $(this).attr('data-light');
        if (status == "OFF") {
            socket.emit('change status', 'ON.' + group);
        } else {
            socket.emit('change status', 'OFF.' + group);
        }
    });

    // update status if another user changes it
    socket.on('change status', function (twoMsg) {
        var msgStrs = twoMsg.split(".");
        var msg = msgStrs[0];
        var data = msgStrs[1];
        var $this = $("[data-light='" + data + "']");
        $this.children('.name').children('span').html(msg);
        if (msg == "ON") {
            $this.addClass('on');
        } else {
            $this.removeClass('on');
        }
    });
});