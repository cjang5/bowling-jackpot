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
    
    //TEMP
    $('h1.PLS').toggleClass('appear');
    $('.right .WTF').toggleClass('appear');
    
    //$('.sidebar a.open').toggleClass('appear');
    
    $('.sidebar .s-text').toggleClass('appear');
});