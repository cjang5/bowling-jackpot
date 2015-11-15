/**
 * Main view handling code
 * On load, the current view will be the News Feed
 * 0 = News Feed
 * 1 = Bowlers
 * 2 = Leagues
 * 3 = Jackpots
 */
var currPage = 0;
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
    if($(this).attr('id') == "news") {
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
            $(this).show();
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
    if ($('#Home').text() == '') 
        $('#Home').text('Home');
    else 
        setTimeout(function() { $('#Home').text(''); }, 500);
    
    // Feed button
    if ($('#Feed').text() == '')
        $('#Feed').text('Feed');
    else
        setTimeout(function() { $('#Feed').text(''); }, 500);
    
    // Bowlers button
    if ($('#Bowlers').text() == '')
        $('#Bowlers').text('Bowlers');
    else
        setTimeout(function() { $('#Bowlers').text(''); }, 500);
    
    // Leagues button
    if ($('#Leagues').text() == '')
        $('#Leagues').text('Leagues');
    else
        setTimeout(function() { $('#Leagues').text(''); }, 500);
    
    // Jackpots button
    if ($('#Jackpots').text() == '')
        $('#Jackpots').text('Jackpots');
    else
        setTimeout(function() { $('#Jackpots').text(''); }, 500);
    
    // Collapse button
    if ($('#Collapse').text() == '')
        $('#Collapse').text('Collapse');
    else
        setTimeout(function() { $('#Collapse').text(''); }, 500);
    
    // make everything look pretty when the sidebar is toggled
    $('.sidebar .sText').toggleClass('toggle');
    $('.sidebar .s-icon').toggleClass('toggle2');
    
    // flip the pointer hand to point left
    $('.sidebar .collapser').toggleClass('rotate')
});