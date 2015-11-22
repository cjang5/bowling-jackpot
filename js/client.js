// TEMP: MAGIC BUTTON - for testing features with ease
$('#temp-button').click(function() {
    /*
    $('.add-to-league').toggle();
    $('.add-to-lottery').toggle();*/
    /*
    var diff = $('.bottom').outerHeight() - $('.bottom .placeholder').outerHeight();
    $('.bottom .placeholder').css('padding-top', diff/2);*/
    
    
    // get all leagues
    /*
    client.getLeagues({
        success: function(leagues) {
            console.log(JSON.stringify(leagues, null, 4));
        },
        error: function(xhr)  {
            console.log(JSON.parse(xhr.responseText));
        }
    }); */
    
    /*
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
    
    showDefault();
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
    
    //$('#create-bowler-modal').modal('show');
    
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

// MODAL
$('#create-bowler-modal').on('hidden.bs.modal', function() {
    // Reset the input form FOR DAT GOOD UX
    $('input#create-bowler-id').val('');
});

// If user wants to create a new bowler...
$('#create-bowler-modal #create-bowler-confirm').click(function() {
    var name = $('#create-bowler-modal #create-bowler-id').val();
    client.createBowler ({
        name: name,
        success: function(bowler) {
            // Log success
            console.log(JSON.stringify(bowler, null, 4));
            
            // TODO: Responsive feedback indicating success
            
            // Append new bowler card to main bowler view
            appendBowler(bowler.id.toString(), bowler.name, bowler.user_id.toString());
            
            // Use helper function to revert to default secondary view
            showDefault();
            
            // Dismiss the modal upon success
            $('#create-bowler-modal').modal('hide');
        },
        error: function(xhr) {
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
/*
var refreshSecondary = function() {
    if (currBowler == null) {
        $('.bowlers-secondary .top .curr-bowler').html('Nobody!');
        $('.bowlers-secondary .bottom .placeholder').show();
        $('.add-to-league').hide();
        $('.add-to-lottery').hide();
        $('.bowlers-secondary .bottom').css('background', 'white');
    } 
};*/ // DON'T NEED I THINK BECAUSE OF HELPER FUNCTIONS BELOW

/**
 * These 2 helper functions will save (SO MUCH) space and time
 * by using the necessary show()/hide() calls to update our secondary view properly
 */
// For when no bowler is selected
var showDefault = function() {
    // top stuff
    $('.bowlers-secondary .top input').hide();
    $('.bowlers-secondary .top .curr-bowler').html('Nobody!').show();
    
    // bottom stuff
    $('.bowlers-secondary .bottom').css('background', 'white');
    $('.bowlers-secondary .bottom div').hide();
    $('.bowlers-secondary .bottom .placeholder').show();
};

// For when a bowler is currenly selected
var showCurrent = function() {
    // top stuff
    $('.bowlers-secondary .top #curr-sel').html('Currently selected').show();
    $('.bowlers-secondary .top .curr-bowler').show();
    $('.bowlers-secondary .top input').hide();
    
    // bottom stuff
    $('.bowlers-secondary .bottom').css('background', 'white');
    $('.bowlers-secondary .bottom div').hide();
    $('.bowlers-secondary .bottom .add-to-league').show();
    $('.bowlers-secondary .bottom .add-to-lottery').show();
};

/*
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
});*/

// When bowler items are clicked in the main bowler view...
$('.bowlers-view ul').on('click', 'li.bowler-item', function() {
    // refresh active class and add it to $(this)
    $('.bowlers-view ul li.bowler-item').removeClass('active');
    $(this).addClass('active');
    
    // get the id and name of the selected bowler
    var id = parseInt($(this).find('span#id').text());
    var name = $(this).find('span#name').text();
    
    // change the currently selected bowler name
    $('.bowlers-secondary .top .curr-bowler').html(name).show();
    
    // call helper function to update secondary view
    showCurrent();
    
    // update curr bowler
    currBowler = id;
});

/**
 * This function will handle updating the secondary view accordingly
 * We just return if there's no currBowler to preserve performance
 */
$('body').on('click', function(e) {
    // No current bowler, no point, just return
    if (currBowler == null) {
        return;
    }
    
    // Otherwise, get the id and parent's class
    var el = e.target.getAttribute('id');
    var parent = e.target.parentElement.className;
    
    // If 'Create Bowler' is clicked..
    if (el == 'create-bowler-button') {
        // Remove active <li>
        $('.bowlers-view ul li.bowler-item').removeClass('active');
        showDefault();
    } // Otherwise if anything else is clicked other than another <li>
    else if (parent.indexOf('bowler-item') < 0 &&
             parent.indexOf('confirm-creation') < 0 &&
             parent.indexOf('bowlers-secondary') < 0 &&
             parent.indexOf('bottom') < 0 &&
             parent.indexOf('top') < 0 &&
             parent.indexOf('add-to-league') < 0 &&
             parent.indexOf('add-to-lottery') < 0) 
    {
        // Remove active from <li>s
        $('.bowlers-view ul li.bowler-item').removeClass('active');
        
        // Update currBowler to null
        currBowler = null;
        
        // call helper function to switch secondary view
        showDefault();
    }
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
    // Use helper function to update secondary view properly
    showDefault();
    
    // clear all <li>s from the list
    $('.bowlers-view ul li:not(:first)').remove();
    
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