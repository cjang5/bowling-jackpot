$('#clickme').click(function() {
    alert(sessionStorage.getItem('logged_in')); 
    console.log('Logged in as: ' + sessionStorage.getItem('username'));
});

$('#home').click(function() {
    window.open('index.html', '_self', false);
});