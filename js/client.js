// TEMP: MAGIC BUTTON - for testing features with ease
$('#temp-button').click(function() {
    /*
    $('.add-to-league').toggle();
    $('.add-to-lottery').toggle();*/
    /*
    var diff = $('.bottom').outerHeight() - $('.bottom .placeholder').outerHeight();
    $('.bottom .placeholder').css('padding-top', diff/2);*/
    
    /*
    // get all leagues
    client.getLeagues({
        success: function(leagues) {
            console.log(JSON.stringify(leagues, null, 4));
        },
        error: function(xhr)  {
            console.log(JSON.parse(xhr.responseText));
        }
    });
    
    // attempt to add nonexistent bowler to existing league
    client.joinLeague({
        bowlerId: 1444,
        leagueId: 979,
        success: function(bowlers) {
            console.log(JSON.stringify(bowlers, null, 4));
        },
        error: function(xhr)  {
            console.log(JSON.parse(xhr.responseText));
        }
    });*/
    
    /*
    client.getBowlers({
        leagueId: 979,
        success: function(bowlers) {
            console.log(JSON.stringify(bowlers, null, 4));
        },
        error: function(xhr)  {
            console.log(JSON.parse(xhr.responseText));
        }
    });*/
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
/** 
 * helper function to append a bowler to our main Bowlers view
 * created because we repeat this same process 3 times
 * Also, we assume that id, userid are Numbers and name is a String
 */
var appendBowler = function(id, name, userid) {
    var html =  '<span id="id">'.concat(id).concat('</span>') + 
                '<span id="name">'.concat(name).concat('</span>') + 
                '<span id="userid">'.concat(userid).concat('</span');
    
    $('.bowlers-view ul').append(
        $('<li>').attr('class', 'bowler-item').attr('tabindex', 1).append(html));
};

$('#create-bowler-button').click(function() {
    $('.bowlers-secondary #curr-sel').html('Create new bowler');
    $('.bowlers-secondary .curr-bowler').hide();
    $('.placeholder').hide();
    $('#new-bowler-name').show();
    $('.confirm-creation').show();
    
    
    $('.bowlers-secondary .bottom').css('background', '#333333');
});

// If user wants to create a new bowler...
$('.bowlers-secondary .bottom .confirm-creation #confirm').click(function() {
    var name = $('#new-bowler-name').val();
    client.createBowler ({
        name: name,
        success: function(bowler) {
            // Log success
            console.log(JSON.stringify(bowler, null, 4));
            
            // Append new bowler card to main bowler view
            appendBowler(bowler.id.toString(), bowler.name, bowler.user_id.toString());
            
            // Toggle appropriate elements
            $('.confirm-creation').hide();
            $('#new-bowler-name').hide();
            $('.bowlers-secondary .bottom').css('background', 'white');
            $('.bowlers-secondary #curr-sel').html('Currently Selected');
            $('.bowlers-secondary .top .curr-bowler').show();
            $('.placeholder').show();
            
            // reset new bowler name text form
            $('#new-bowler-name').val('');
        },
        error: function(xhr)  {
            console.log(JSON.parse(xhr.responseText));
        }        
    });
});

// If user wants to cancel new bowler creation...
$('.bowlers-secondary .bottom .confirm-creation #cancel').click(function() {
    // Hide appropriate secondary divs
    $('.add-to-league').hide();
    $('.add-to-lottery').hide();
    $('.confirm-creation').hide();
    $('#new-bowler-name').hide();
    $('.bowlers-secondary .bottom').css('background', 'white');
    $('.bowlers-secondary #curr-sel').html('Currently Selected');
    $('.bowlers-secondary .top .curr-bowler').show();
    $('.placeholder').show();
    
    // reset the new bowler name form
    $('#new-bowler-name').val('');
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
            appendBowler(bowler.id.toString(), bowler.name, bowler.user_id.toString());
        },
        error: function(xhr) {
            console.log(JSON.parse(xhr.responseText));
        }
    });
});

// Show the news div first
$(".main-view div").each(function() {
    $(this).hide();
    if ($(this).attr('data-related') == "News Feed") {
        $(".page-title").text('News Feed');
        $(this).show();
    }
});

// hide all divs in pseudo-nav initially
$(".pseudo-nav div").each(function() {
    $(this).hide();
});

/* IMPORTANT: The currently selected bowler's id */
var currBowler;

/*
||================||
||BOWLER VIEW CODE||
||================||*/
// Refresh the secondary bowler view
var refreshSecondary = function() {
    if (currBowler == null) {
        $('.bowlers-secondary .top .curr-bowler').html('Nobody!');
        $('.bowlers-secondary .bottom .placeholder').show();
        $('.add-to-league').hide();
        $('.add-to-lottery').hide();
    } 
};

// Handle secondary view elements when a bowler is selected from main view
$('.bowlers-view ul').on('click', 'li.bowler-item', function() {
    var name = $(this).find('span#name').text();
    var id = parseInt($(this).find('span#id').text());
    
    // change the currently selected bowler name
    $('.bowlers-secondary .top .curr-bowler').html(name);
    
    // show the options in the secondary view
    $('.bowlers-secondary .bottom .placeholder').hide();
    $('.add-to-league').show();
    $('.add-to-lottery').show();
    
    // update currently selected bowler id
    currBowler = id;
});

// Handle when bowler li's are focused out
$('.bowlers-view ul').on('focusout', 'li.bowler-item', function() {
    currBowler = null;
    setTimeout(refreshSecondary, 1000); // current delay: 1 second
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

// boolean flag for whether .placeholder's height has been set yet
var set = false;

/* When the Bowlers button is clicked in the Sidebar */
$('#Bowlers-button').click(function() {
    // Hide appropriate secondary divs
    $('.add-to-league').hide();
    $('.add-to-lottery').hide();
    $('.confirm-creation').hide();
    $('#new-bowler-name').hide();
    $('.bowlers-secondary .bottom').css('background', 'white');
    $('.bowlers-secondary #curr-sel').html('Currently Selected');
    $('.bowlers-secondary .top .curr-bowler').show();
    
    
    // if the height hasn't been set yet for .placeholder
    if (!set) {
        var diff = $('.bottom').outerHeight() - $('.bottom .placeholder').outerHeight();
        var comb = $('.bottom').outerHeight() + $('.bottom .placeholder').outerHeight();
        $('.bottom .placeholder').css('padding-top', diff/2);
        $('.bottom .placeholder').css('height', comb);
        
        // flip the flag
        set = true;
    }
    
    // Send GET request for getting all bowlers
    client.getBowlers({
        success: function(bowlers) {
            console.log(JSON.stringify(bowlers, null, 4));
            
            // show all bowlers
            for (var i = 0; i < bowlers.length; i++) {
                var b = bowlers[i];
                
                appendBowler(b.id.toString(), b.name, b.user_id.toString());
            }
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