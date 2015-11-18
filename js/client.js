/*
||===========||
||NAVBAR CODE||
||===========||*/
$(document).ready(function() {
    // Fix pseudo-nav to top of screen
    var newHeight = parseInt($('.main-view').css('padding-top').replace("px", "")) + $('.pseudo-nav').outerHeight() + 5;
    $('.main-view').css('padding-top', newHeight);
    
    // Make Find-Bowler form same height as buttons
    var buttonHeight = $('#create-bowler-button').outerHeight();
    $('#find-bowler-form').css('height', buttonHeight);
    
    // spacing for buttons on pseudo-nav
    /*
    var pseudoWidth = $('.pseudo-nav').outerWidth() / 10;
    pseudoWidth = pseudoWidth + 'px';
    $('#create-bowler-button').css('margin-left', pseudoWidth);*/
});

/*
||===============||
||CREATE A BOWLER||
||===============||*/
$('#create-bowler-button').click(function() {      
    client.createBowler ({
        name: 'Joy Lee',
        success: function(bowler) {
            // log the success
            console.log(JSON.stringify(bowler, null, 4));
            
            var html =  '<span id="id">'.concat(bowler.id.toString().concat('</span>')) +
                        '<span id="name">'.concat(bowler.name).concat('</span>') + 
                        '<span id="userid">'.concat(bowler.user_id.toString()).concat('</span>');
            
            $('.bowlers-view ul').append(
                $('<li>').attr('class', 'bowler-item').append(html));
        },
        error: function(xhr)  {
            console.log(JSON.parse(xhr.responseText));
        }
    });
});

/*
||===================||
||SEARCH FOR A BOWLER||
||===================||*/
$('#submit-find-bowler').click(function() {
    // clear all <li>s from the list
    $('.bowlers-view ul li:not(:first)').remove();
    
    // get the id from the text form
    var id = parseInt($('#find-bowler-form').val());
    
    client.getBowler({
        bowlerId: id,
        success: function(bowler) {
            // log success
            console.log(JSON.stringify(bowler, null, 4));
            
            // append li for the bowler we found
            var html =  '<span id="id">'.concat(bowler.id.toString().concat('</span>')) +
                        '<span id="name">'.concat(bowler.name).concat('</span>') + 
                        '<span id="userid">'.concat(bowler.user_id.toString()).concat('</span>');
            
            $('.bowlers-view ul').append(
                $('<li>').attr('class', 'bowler-item').append(html));
        },
        error: function(xhr) {
            console.log(JSON.parse(xhr.responseText));
        }
    });
});

// Re-verify login information on load of client
var client = new BowlingApiClient('http://bowling-api.nextcapital.com/api');
//console.log("Attempting to log in as: " + sessionStorage.getItem('username') + " with password: " + sessionStorage.getItem('password'));
client.loginUser({
    email: sessionStorage.getItem('username'),
    password: sessionStorage.getItem('password'),
    success: function(user) {
        console.log(JSON.stringify(user, null, 4));
    },
    error: function(xhr)  {
        console.log(JSON.parse(xhr.responseText));
    }
});

/*
$('.Bowlers-button').click(function() {
    currPage = 1;
    // hide the current active view and display this one
    $('.active').removeClass('active');
    $('.bowlers-view').addClass('active');
});*/

// Show the news div first
$(".main-view div").each(function() {
    $(this).hide();
    if ($(this).attr('data-related') == "News Feed") {
        $(".page-title").text('News Feed');
        $(this).show();
    }
});

$(".pseudo-nav div").each(function() {
    $(this).hide();
});

/*
||============||
||SIDEBAR CODE||
||============||*/
// Based on which sidebar button is clicked, show appropriate view
$('.sidebar .view-button').on( "click", function(e) {
    e.preventDefault();
    var id = $(this).attr('data-related'); 
    $(".main-view div").each(function() {
        $(this).hide();
        if ($(this).attr('data-related') == id) {
            $(".page-title").text($(this).attr('data-related'));
            $(this).show();
        }
    });
    $(".pseudo-nav div").each(function() {
        $(this).hide();
        if ($(this).attr('data-related') == id) {
            $(this).show();
            
            $('input').css('height', $('.button2D').outerHeight());
        }
    });
});

$('#Bowlers-button').click(function() {
    // Send GET request for getting all bowlers
    client.getBowlers({
        success: function(bowlers) {
            console.log(JSON.stringify(bowlers, null, 4));
            //alert(typeof(bowlers));
        },
        error: function(xhr) {
            console.log(JSON.parse(xhr.responseText));
        }
    });
});

// Sidebar code
$('.sidebar a.open').click(function(e) {
    e.preventDefault();
    
    $('.sidebar').toggleClass('open-nav');
    $('.right').toggleClass('open-nav2');
    $('.sidebar .s-text').toggleClass('appear');
    
    // Home button
    if ($('#home-span').text() == '') 
        $('#home-span').text('Home');
    else 
        setTimeout(function() { $('#Home').text(''); }, 500);
    
    // Feed button
    if ($('#feed-span').text() == '')
        $('#feed-span').text('Feed');
    else
        setTimeout(function() { $('#Feed').text(''); }, 500);
    
    // Bowlers button
    if ($('#bowlers-span').text() == '')
        $('#bowlers-span').text('Bowlers');
    else
        setTimeout(function() { $('#Bowlers').text(''); }, 500);
    
    // Leagues button
    if ($('#leagues-span').text() == '')
        $('#leagues-span').text('Leagues');
    else
        setTimeout(function() { $('#Leagues').text(''); }, 500);
    
    // Jackpots button
    if ($('#jackpots-span').text() == '')
        $('#jackpots-span').text('Jackpots');
    else
        setTimeout(function() { $('#Jackpots').text(''); }, 500);
    
    // Collapse button
    if ($('#collapse-span').text() == '')
        $('#collapse-span').text('Collapse');
    else
        setTimeout(function() { $('#Collapse').text(''); }, 500);
    
    // make everything look pretty when the sidebar is toggled
    $('.sidebar .sText').toggleClass('toggle');
    $('.sidebar .s-icon').toggleClass('toggle2');
    
    // flip the pointer hand to point left
    $('.sidebar .collapser').toggleClass('rotate')
});