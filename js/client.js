// Fix pseudo-nav to top of screen
$(document).ready(function() {
    var newHeight = parseInt($('.main-view').css('padding-top').replace("px", "")) + $('.pseudo-nav').outerHeight();
    $('.main-view').css('padding-top', newHeight);
});

/**
 * Main view handling code
 * On load, the current view will be the News Feed
 * 0 = News Feed
 * 1 = Bowlers
 * 2 = Leagues
 * 3 = Jackpots
 */
var currPage = 0;

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
$(".main-view div").each(function(){
    $(this).hide();
    if($(this).attr('id') == "News Feed") {
        $(".page-title").text('News Feed');
        $(this).show();
    }
});

// Based on which sidebar button is clicked, show appropriate view
$('.sidebar .view-button').on( "click", function(e) {
    e.preventDefault();
    var id = $(this).attr('data-related'); 
    $(".main-view div").each(function(){
        $(this).hide();
        if($(this).attr('id') == id) {
            $(".page-title").text($(this).attr('id'));
            $(this).show();
        }
    });
});

$('#Bowlers-button').click(function() {
    // Send GET request for getting all bowlers
    client.getBowlers({
        success: function(bowlers) {
            console.log(JSON.stringify(bowlers, null, 4));
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