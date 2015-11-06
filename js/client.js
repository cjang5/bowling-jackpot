$('#clickme').click(function() {
    alert(sessionStorage.getItem('logged_in')); 
    console.log('Logged in as: ' + sessionStorage.getItem('username'));
});

$('#home').click(function() {
    window.open('index.html', '_self', false);
});

$('.sidebar a.open').click(function(e) {
    e.preventDefault();
    
    $('.sidebar').toggleClass('open-nav');
    $('.right').toggleClass('open-nav2');
    $('.sidebar .s-text').toggleClass('appear');
    
    // make everything look pretty when the sidebar is toggled
    $('.sidebar .sText').toggleClass('toggle');
    $('.sidebar .s-icon').toggleClass('toggle2');
    
    // flip the pointer hand to point left
    $('.sidebar .collapser').toggleClass('rotate')
});