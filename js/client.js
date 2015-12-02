// TEMP: MAGIC BUTTON - for testing features with ease
$('#temp-button').click(function() {
    alert(currLeagueName);
});

// Make bowler/league-search input clearable with 'X' button
jQuery(function($) {
    function tog(v) {
        return v ? 'addClass':'removeClass';
    } 
    
    $(document).on('input', '.clearable', function() {
        $(this)[tog(this.value)]('x');
    }).on('mousemove', '.x', function(e) {
        $(this)[tog(this.offsetWidth-25 < e.clientX-this.getBoundingClientRect().left)]('onX');   
    }).on('touchstart click', '.onX', function(ev) {
        ev.preventDefault();
        $(this).removeClass('x onX').val('').change();
        
        // if this is bowlers-view
        if ($(this).attr('id') == 'find-bowler-form') {
            // clear all <li>s from the list
            $('.bowlers-view ul li:not(:first)').remove();
            // then prepend the padding li
            prependHeader("bowlers");
            
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
        }
        else if ($(this).attr('id') == 'find-league-form') {
            // Clear all <li>s from the list
            $('.leagues-view ul li:not(:first)').remove();
            
            // Send GET request to get all leagues
            client.getLeagues({
                success: function(leagues) {
                    // Log success
                    console.log(JSON.stringify(leagues, null, 4));
                    
                    // Show all leagues
                    for (var i = 0; i < leagues.length; i++) {
                        var l = leagues[i];
                        
                        appendLeague(l.id.toString(), l.name, l.user_id.toString());
                    }
                },
                error: function(xhr) {
                    console.log(JSON.parse(xhr.responseText));
                }
            })
        }
    }); 
});

// Re-verify login information on load of client
var client = new BowlingApiClient('http://bowling-api.nextcapital.com/api');

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
});

/* Back button for league-detailed */
$('.leagues-detailed-components a').click(function() {
    $('#Leagues-button').click(); 
});

/*
||======================||
||CREATE A BOWLER/LEAGUE||
||======================||*/
/** 
 * This is a helper function to prepend a padding li item
 * so that our list will look better. This will allow for the first
 * li, 'header', to stay fixed at the top of the ul div
 */
var prependHeader = function(view) {
    var html =  '<span id="id">ID</span>' + 
                '<span id="name">Name</span' + 
                '<span id="userid">User ID</span>';
    
    if (view == "bowlers") {
        $('.bowlers-view ul li:nth-child(1)').after(
            $('<li>').attr('class', 'padding-li').attr('tabindex', 1).append(html));
    
        $('.bowlers-view li.padding-li').css('height', $('.bowlers-view ul li.header').height());
        $('.bowlers-view li.padding-li span').css('border', 'none');
    }
    else if (view == "leagues") {
        $('.leagues-view ul li:nth-child(1)').after(
            $('<li>').attr('class', 'padding-li').attr('tabindex', 1).append(html));
        
        $('.leagues-view li.padding-li').css('height', $('.leagues-view ul li.header').height());
        $('.leagues-view li.padding-li span').css('border', 'none');
    }
    else if (view == "bowlers-detailed") {
        $('.leagues-detailed-view  .detailed-left ul li:nth-child(1)').after(
            $('<li>').attr('class', 'padding-li').attr('tabindex', 1).append(html));
    
        $('.leagues-detailed-view .detailed-left li.padding-li').css('height', $('.leagues-detailed-view .detailed-left ul li.header').height());
        $('.leagues-detailed-view .detailed-left li.padding-li span').css('border', 'none');
    }
    else if (view == "lotteries-detailed") {
        $('.leagues-detailed-view .detailed-right ul li:nth-child(1)').after(
            $('<li>').attr('class', 'padding-li').attr('tabindex', 1).append(html));
        
        $('.leagues-detailed-view .detailed-right li.padding-li').css('height', $('.leagues-detailed-view .detailed-right ul li.header').height());
        $('.leagues-detailed-view .detailed-right li.padding-li span').css('border', 'none');
    }
    else if (view == "tickets") {
        $('#detailed-lottery-modal ul li:nth-child(1)').after(
            $('<li>').attr('class', 'padding-li').attr('tabindex', 1).append(html));
        
        $('#detailed-lottery-modal li.padding-li').css('height', $('#detailed-lottery-modal ul li.header').height());
        $('#detailed-lottery-modal li.padding-li span').css('border', 'none');
    }
};
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

/**
 * helper function to append a league to our main Leagues view
 */
var appendLeague = function(id, name, userid) {
    var html =  '<span id="id">'.concat(id).concat('</span>') + 
                '<span id="name">'.concat(name).concat('</span>') + 
                '<span id="userid">'.concat(userid).concat('</span');
    
    $('.leagues-view ul').append(
        $('<li>').attr('class', 'league-item').attr('tabindex', 1).append(html));
}

/*
||======||
||MODALS||
||======||*/
$('#create-bowler-modal').on('hidden.bs.modal', function() {
    // Reset the input form FOR DAT GOOD UX
    $('input#create-bowler-id').val('');
});

$('#create-league-modal').on('hidden.bs.modal', function() {
    // Reset the input form FOR EVEN BETTER UX
    $('input#create-league-id').val('');
})

// If user wants to create a new bowler...
$('#create-bowler-modal #create-bowler-confirm').click(function() {
    var name = $('#create-bowler-modal #create-bowler-id').val();
    
    // make sure there is actually a name in the form
    if (name != '') {
        client.createBowler ({
            name: name,
            success: function(bowler) {
                // Log success
                console.log(JSON.stringify(bowler, null, 4));

                // TODO: Responsive feedback indicating success

                // Append new bowler card to main bowler view
                appendBowler(bowler.id.toString(), bowler.name, bowler.user_id.toString());

                // Use helper function to revert to default secondary view
                showDefault("bowlers");

                // Dismiss the modal upon success
                $('#create-bowler-modal').modal('hide');

                // scroll to bottom of bowlers-view div to go to recently added bowler
                $('.bowlers-view').scrollTop($('.bowlers-view')[0].scrollHeight);
                // make most recent bowler active
                $('.bowlers-view ul li.bowler-item').removeClass('active');
                $('.bowlers-view ul li').last().find('span#name').click();
            },
            error: function(xhr) {
                console.log(JSON.parse(xhr.responseText));
            }        
        });
    }
    else {
        // TODO: Some kind of response that we need a name
    }
    
});

// If user wants to create a new league
$('#create-league-modal #create-league-confirm').click(function() {
    var name = $('#create-league-modal #create-league-id').val();
    
    // make sure there is actually a name in the form
    if (name != '') {
        client.createLeague({
            name: name,
            success: function(league) {
                // Log success
                console.log(JSON.stringify(league, null, 4));
                
                // Append new league card
                appendLeague(league.id.toString(), league.name, league.user_id.toString());
                
                // User helper function to revert to default sec view
                showDefault("leagues");
                
                // Dismiss modal on success
                $('#create-league-modal').modal('hide');
                
                // Scroll to bottom of leagues-view div to go to recently added league
                $('.leagues-view').scrollTop($('.leagues-view')[0].scrollHeight);
                // make most recent league active
                $('.leagues-view ul li.league-item').removeClass('active');
                $('.leagues-view ul li').last().find('span#name').click();
            },
            error: function(xhr)  {
                console.log(JSON.parse(xhr.responseText));
            }
        });
    }
    else {
        // TODO: Some kind of response that we need a name
    }
    
});

/*
||==========================||
||SEARCH FOR A BOWLER/LEAGUE||
||==========================||*/
$('#submit-find-bowler').click(function() {
    // make sure input form isn't empty
    if ($('#find-bowler-form').val() != '') {
        
        // clear all <li>s from the list
        $('.bowlers-view ul li').remove();

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
    }
});

$('#submit-find-league').click(function() {
    // make sure input form isn't empty
    if ($('#find-league-form').val() != '') {
        
        // clear all <li>s from the list
        $('.leagues-view ul li').remove();
        
        // get the id from the text form
        var id = parseInt($('#find-league-form').val());
        
        // get the league you're searching for
        client.getLeague({
            leagueId: id,
            success: function(league) {
                // Log success
                console.log(JSON.stringify(league, null, 4));
                
                // append the li for the league we found
                appendLeague(league.id.toString(), league.name, league.user_id.toString());
            },
            error: function(xhr)  {
                console.log(JSON.parse(xhr.responseText));
            }
        });
    }
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

/* IMPORTANT: The currently selected league's id */
var currLeague;
var currLeagueName;

/*
||=======================||
||BOWLER/LEAGUE VIEW CODE||
||=======================||*/
// Refresh the secondary bowler view
/**
 * These 2 helper functions will save (SO MUCH) space and time
 * by using the necessary show()/hide() calls to update our secondary view properly
 */
// For when no bowler is selected
var showDefault = function(view) {
    // for bowlers-view
    if (view == "bowlers") {
        // top stuff
        $('.bowlers-secondary .top .curr-bowler').html('Nobody!').show();

        // bottom stuff
        $('.bowlers-secondary .bottom').css('background', 'white');
        $('.bowlers-secondary .bottom .add-to-league input').val('');
        $('.bowlers-secondary .bottom div').hide();
        $('.bowlers-secondary .bottom .placeholder').show();
    }
    else if (view == "leagues") {
        // top stuff
        $('.leagues-secondary .top .curr-league').html('Nobody!').show();
        
        // bottom stuff 
        $('.leagues-secondary .bottom').css('background', 'white');
        $('.leagues-secondary .bottom div').hide();
        $('.leagues-secondary .bottom .placeholder').show();
    }
};

// For when a bowler is currenly selected
var showCurrent = function(view) {
    if (view == "bowlers") {
        // top stuff
        $('.bowlers-secondary .top #curr-sel').html('Currently selected').show();
        $('.bowlers-secondary .top .curr-bowler').show();
        
        // bottom stuff
        $('.bowlers-secondary .bottom').css('background', 'white');
        $('.bowlers-secondary .bottom div').hide();
        $('.bowlers-secondary .bottom .add-to-league').show(); 
        
        var newHeight = $('.bowlers-secondary .bottom').height() - $('.bowlers-secondary .bottom .add-to-league input').outerHeight();
        $('.bowlers-secondary .bottom .add-to-league').css('padding-top', newHeight / 3);
    }
    else if (view == "leagues") {
        // top stuff
        $('.leagues-secondary .top #curr-sel').html('Currently selected').show();
        $('.leagues-secondary .top .curr-league').show();
        
        // bottom stuff
        $('.leagues-secondary .bottom').css('background', 'white');
        $('.leagues-secondary .bottom div').hide();
        $('.leagues-secondary .bottom .add-to-league').show();
        $('.leagues-secondary .bottom .league-detailed').show();
    }
    
};

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
    showCurrent("bowlers");
    
    // update curr bowler
    currBowler = id;
});

// When league items are clicked in the main bowler view...
$('.leagues-view ul').on('click', 'li.league-item', function() {
    // refresh active class and add it to $(this)
    $('.leagues-view ul li.league-item').removeClass('active');
    $(this).addClass('active');
    
    // get the id and name of the selected league
    var id = parseInt($(this).find('span#id').text());
    var name = $(this).find('span#name').text();
    
    // change the currently selected league name
    $('.leagues-secondary .top .curr-league').html(name).show();
    
    // call helper function to update secondary view
    showCurrent("leagues");
    
    var buttonHeight = $('.leagues-secondary .bottom .add-to-league a').outerHeight();
    $('.leagues-secondary .bottom .add-to-league #bowler-league-form2').css('height', buttonHeight);
    
    // update currLeague
    currLeague = id;
    currLeagueName = name;
});

/* ADD Bowler to a League */
$('.bowlers-secondary .bottom .add-to-league a').click(function() {
    // Make sure that the league id is not empty
    var league_id = parseInt($('.bowlers-secondary .bottom .add-to-league input').val());
    if (!isNaN(league_id)) {
        // attempt to add selected bowler to the specified league
        client.joinLeague({
            bowlerId: currBowler,
            leagueId: league_id,
            success: function(bowlers) {
                // Log success
                console.log(JSON.stringify(bowlers, null, 4));
                
                // go back to default
                showDefault("bowlers");
            },
            error: function(xhr)  {
                console.log(JSON.parse(xhr.responseText));
                
                //TODO: Change this
                alert("Failed to join league!");
            }
        });
    }
});

/**
 * This function will handle updating the secondary view accordingly
 * We just return if there's no currBowler to preserve performance
 */
$('body').on('click', function(e) {
    // No current bowler, no point, just return
    
    if (currBowler == null && currLeague == null) {
        return;
    }
    
    // Otherwise, get the id and parent's class
    var el = e.target.getAttribute('id');
    var parent = e.target.parentElement.className;
    
    //TEMP
    //alert($(this).attr('id'));
    //alert(parent);
    
    // If 'Create Bowler' is clicked..
    if (el == 'create-bowler-button') {
        // Remove active <li>
        $('.bowlers-view ul li.bowler-item').removeClass('active');
        showDefault("bowlers");
    } 
    else if (el == 'create-league-button') {
        // Remove active <li>
        $('.leagues-view ul li.league-item').removeClass('active');
        showDefault("leagues");
    } // Otherwise if anything else is clicked other than another <li>
    else if (parent.indexOf('bowler-item') < 0 &&
             parent.indexOf('league-item') < 0 &&
             parent.indexOf('bowlers-secondary') < 0 &&
             parent.indexOf('leagues-secondary') < 0 &&
             parent.indexOf('league-detailed') < 0 &&
             parent.indexOf('bottom') < 0 &&
             parent.indexOf('top') < 0 &&
             parent.indexOf('add-to-league') < 0 &&
             parent.indexOf('add-to-lottery') < 0) 
    {
        // Remove active from <li>s for both bowlers/leagues
        $('.bowlers-view ul li.bowler-item').removeClass('active');
        $('.leagues-view ul li.league-item').removeClass('active');
        
        // Update currBowler to null
        currBowler = null;
        // Update currLeague to null
        currLeague = null;
        currLeagueName = "";
        
        // call helper function to switch secondary view
        showDefault("bowlers");
        // call helper functino to switch secondary view
        showDefault("leagues");
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
            
            $('input').css('height', $(this).find('a').outerHeight());
        }
    });
});

// boolean flag for whether .placeholder's height has been set yet
var set = false;

/* When the Bowlers button is clicked in the Sidebar */
$('#Bowlers-button').click(function() {
    // Use helper function to update secondary view properly
    showDefault("bowlers");
    
    // clear all <li>s from the list
    $('.bowlers-view ul li').remove();
    
    // if the height hasn't been set yet for .placeholder
    if (!set) {
        var diff = $('.bottom').outerHeight() - $('.bottom .placeholder').outerHeight();
        //var comb = $('.bottom').outerHeight() + $('.bottom .placeholder').outerHeight();
        $('.bottom .placeholder').css('padding-top', diff/2);
        //$('.bottom .placeholder').css('height', comb);
        
        // flip the flag
        set = true;
        
        // adjust height of ul
        $('.bowlers-view ul').css('height', $('.bowlers-view').height() - $('.bowlers-view .ul-header').outerHeight());
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

// TODO CHANGE THIS VAR AND THE OTHER 'SET' VAR
var league_set = false;

/* When the Leagues button is clicked in the sidebar */
$('#Leagues-button').click(function() {
    // Use helper function to update secondary view properly
    showDefault("leagues");
    
    // clear all <li>s from the list
    $('.leagues-view ul li').remove();
    
    // if the height hasn't been set yet for .placeholder
    if (!league_set) {
        var diff = $('.leagues-secondary .bottom').outerHeight() - $('.leagues-secondary .bottom .placeholder').outerHeight();
        //var comb = $('.leagues-secondary .bottom').outerHeight() + $('.leagues-secondary .bottom .placeholder').outerHeight();
        $('.leagues-secondary .bottom .placeholder').css('padding-top', diff/2);
        //$('.leagues-secondary .bottom .placeholder').css('height', comb);
        
        // flip the flag
        league_set = true;
        
        // Adjust height of the ul
        $('.leagues-view ul').css('height', $('.leagues-view').height() - $('.leagues-view .ul-header').outerHeight());
    }
    
    // Send GET request for getting all leagues
    client.getLeagues({
        success: function(leagues) {
            // log all leagues
            console.log(JSON.stringify(leagues, null, 4));
            
            // show all leagues
            for (var i = 0; i < leagues.length; i++) {
                var l = leagues[i];
                
                // append the league to the main view
                appendLeague(l.id.toString(), l.name, l.user_id.toString());
            }
        },
        error: function(xhr)  {
            console.log(JSON.parse(xhr.responseText));
        }
    });
});

// Helper function to append bowlers (with option to buy ticket)
var appendBowler2 = function(id, name, userid) {
    var html =  '<span id="id">'.concat(id).concat('</span>') + 
                '<span id="name">'.concat(name).concat('</span>') + 
                '<span id="userid"><a data-id="'.concat(id).concat('" class="button2D spotify-green"><span><i class="fa fa-ticket"></span></a></span>');
    
    $('.leagues-detailed-view .detailed-left ul').append(
        $('<li>').attr('class', 'bowler-item').attr('tabindex', 1).append(html));
};

// buy ticket
$('.leagues-detailed-view .detailed-left ul').on('click', 'li.bowler-item .button2D', function() {
    var bId = parseInt($(this).attr('data-id'));
    
    client.purchaseTicket({
        bowlerId: bId,
        leagueId: detailedLeague,
        lotteryId: currLottery,
        success: function(ticket) {
            // Log success
            console.log(JSON.stringify(ticket, null, 4));
            
            // TEMP
            alert("Successfully bought ticket for: " + bId);
            
            // get current balance
            var balance = parseInt($('.leagues-detailed-view .detailed-right ul li:nth-child(3) span#balance').text());
            
            // Update balance
            $('.leagues-detailed-view .detailed-right ul li:nth-child(3) span#balance').html(balance + 10);
        },
        error: function(xhr)  {
            console.log(JSON.parse(xhr.responseText));
        }
    });
});

// Variable representing current league (detailed)
var detailedLeague = null;
// Variable representing current lottery
var currLottery = null;

// Helper function to prepend lotteries
var prependLottery = function(id, balance, payout) {
    var html =  '<span id="id">'.concat(id).concat('</span>') + 
                '<span id="balance">'.concat(balance).concat('</span>');
                
    // depending on payout status, append different status html
    if (payout == null) {
        html = html + '<span id="status">Current</span>';
        currLottery = parseInt(id);
    }
    else {
        html = html + '<span id="status">Completed</span>';
    }
    
    // Details button
    html = html + '<span id="details"><a data-id="'.concat(id).concat('" class="button2D spotify-green" data-toggle="modal" data-target="#detailed-lottery-modal"><span><i class="fa fa-search"></span></a></span>');
    
    $('.leagues-detailed-view .detailed-right ul').prepend(
        $('<li>').attr('class', 'lottery-item').attr('tabindex', 1).append(html));
};

/* Detailed lottery modal */
// Helper function to append ticket items
var appendTicket = function(id, buyer, price, isWinner) {
    var html =  '<span id="id">'.concat(id).concat('</span>') + 
                '<span id="buyer">'.concat(buyer).concat('</span>') +
                '<span id="price">'.concat(price).concat('</span>');

    // Check if current ticket is a winner
    if (isWinner) {
        $('#detailed-lottery-modal ul').append(
            $('<li>').attr('class', 'ticket-item').attr('id', 'winner').attr('tabindex', 1).append(html));
    }
    else {
        $('#detailed-lottery-modal ul').append(
            $('<li>').attr('class', 'ticket-item').attr('tabindex', 1).append(html));
    }
};

$('.leagues-detailed-view .detailed-right ul').on('click', 'li.lottery-item .button2D', function() {
    $('#detailed-lottery-modal .body ul li.header').css('width', '500px');
    
    // Adjust max-height of ul of tickets
    $('#detailed-lottery-modal ul').css('height', "500px");
    
    // Clear ul of tickets
    $('#detailed-lottery-modal .body ul li').remove();
    
    // Variables representing current lottery
    var lottery_id = parseInt($(this).attr('data-id'));

    // Update header
    $('#detailed-lottery-modal .body .ul-header span#title').html('Lottery #' + lottery_id);
    
    // Send GET request to get all tickets for selected lottery
    client.getTickets({
        leagueId: detailedLeague,
        lotteryId: lottery_id,
        success: function(lotteries) {
            // Log success
            console.log(JSON.stringify(lotteries, null, 4));
            
            // Append all tickets
            lotteries.forEach(function(lottery) {
                if (lottery.is_winner) {
                    appendTicket(lottery.id.toString(), lottery.bowler_id + " - WINNER!", lottery.price, lottery.is_winner);
                }
                else {
                    appendTicket(lottery.id.toString(), lottery.bowler_id, lottery.price, lottery.is_winner);
                }
            });
        },
        error: function(xhr)  {
            console.log(JSON.parse(xhr.responseText));
        }
    });
});

/*
||====================||
||LEAGUE DETAILED VIEW||
||====================||*/
$('.leagues-secondary .bottom .league-detailed a').click(function() {
    // First hide all league view divs
    $('.main-view div').each(function() {
        $(this).hide();
        if ($(this).attr('data-related') == "Detailed") {
            $(this).show();
        }
    });
    
    // Show pseudo-nav elements
    $(".pseudo-nav div").each(function() {
        $(this).hide();
        if ($(this).attr('data-related') == "Detailed") {
            $(this).show();
            
            $('input').css('height', $(this).find('a').outerHeight());
        }
    });
    
    // update detailedLeague
    detailedLeague = currLeague;
    
    // Change header text
    $('.leagues-detailed-view .detailed-top .detailed-header').html(currLeagueName);
    // Change header id text
    $('.leagues-detailed-view .detailed-top .detailed-id').html("League ID: " + currLeague);
    
    // clear all <li>s from the list
    $('.leagues-detailed-view .detailed-left ul li').remove();
    
    // Adjust height of ul of bowlers
    $('.leagues-detailed-view .detailed-left ul').css('height', $('.leagues-detailed-view .detailed-left').height() - $('.leagues-detailed-view .detailed-left .ul-header').outerHeight());
    
    // Send GET request to get all bowlers in selected league
    client.getBowlers({
        leagueId: currLeague,
        success: function(bowlers) {
            // Log success
            console.log(JSON.stringify(bowlers, null, 4));
            
            // show all bowlers
            for (var i = 0; i < bowlers.length; i++) {
                var b = bowlers[i];
                
                appendBowler2(b.id.toString(), b.name, b.user_id.toString());
            }
        },
        error: function(xhr)  {
            console.log(JSON.parse(xhr.responseText));
        }
    });
    
    // CLear li's in ul for lotteries
    $('.leagues-detailed-view .detailed-right ul li').remove();
    
    // Adjust height of ul of lotteries
    $('.leagues-detailed-view .detailed-right ul').css('height', $('.leagues-detailed-view .detailed-right').height() - $('.leagues-detailed-view .detailed-right .ul-header').outerHeight());
    
    // Send GET request to get all lotteries in the selected league
    client.getLotteries({
        leagueId: currLeague,
        success: function(lotteries) {
            // Log success
            console.log(JSON.stringify(lotteries, null, 4));
            
            // then we prepend lotteries so the most current one is at the top
            for (var i = 0; i < lotteries.length; i++) {
                var l = lotteries[i];
                
                prependLottery(l.id.toString(), Math.round(l.balance).toString(), l.payout);
            }
        },
        error: function(xhr)  {
            console.log(JSON.parse(xhr.responseText));
        }
    });
    
});

/* Roll for a winner */
$('.leagues-detailed-view .detailed-top a').click(function() {
    // pick a bowler to roll
    client.drawWinner({
        leagueId: detailedLeague,
        lotteryId: currLottery,
        success: function(roll) {
            // Log success
            console.log(JSON.stringify(roll, null, 4));
            
            // "Bowl" for the selected bowler
            var roll = Math.floor(Math.random() * 11);
            
            // Record the roll
            client.updateRoll({
                leagueId: detailedLeague,
                lotteryId: currLottery,
                pinCount: roll,
                success: function(roll) {
                    // Log success
                    console.log(JSON.stringify(roll, null, 4));
                    
                    alert("Bowler #" + roll.bowler_id + " won $" + roll.payout + "!");
                    
                    $('.leagues-detailed-view .detailed-right ul li:not(:first)').remove();
    
                    // prepend header
                    prependHeader("lotteries-detailed");

                    // Send GET request to get all lotteries in the selected league
                    client.getLotteries({
                        leagueId: detailedLeague,
                        success: function(lotteries) {
                            // Log success
                            console.log(JSON.stringify(lotteries, null, 4));

                            // then we prepend lotteries so the most current one is at the top
                            for (var i = 0; i < lotteries.length; i++) {
                                var l = lotteries[i];

                                prependLottery(l.id.toString(), Math.round(l.balance).toString(), l.payout);
                            }
                        },
                        error: function(xhr)  {
                            console.log(JSON.parse(xhr.responseText));
                        }
                    });
                },
                error: function(xhr)  {
                    console.log(JSON.parse(xhr.responseText));
                }
            });
        },
        error: function(xhr)  {
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