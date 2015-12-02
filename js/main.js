// Create instance of the Bowling-Api-Client
var client = new BowlingApiClient('http://bowling-api.nextcapital.com/api');

// is the user logged in? Defaulted to 'false'
var logged_in = false;

// TEMP initialize session
if (sessionStorage.getItem('logged_in') == null) {
    sessionStorage.setItem('logged_in', 'false');
    $('#userStatus').text('Not logged in.');
} else if (sessionStorage.getItem('logged_in') == 'false') {
    $('#userStatus').text('Not logged in.');
} else {
    $('#userStatus').text('Logged in as: ' + sessionStorage.getItem('username'));
    
    // if user is logged in, we must hide the login and register buttons in the navbar
    $('#login-button').hide();
    $('#register-button').hide();
    
    // show the options and dashboard buttons
    $('#options-button').show();
    $('#dashboard-button').show();
}

// TEMP
$('#session').click(function() {
    console.log(sessionStorage.getItem('logged_in'));
    console.log(typeof(sessionStorage.getItem('logged_in')));
    if (sessionStorage.getItem('logged_in') == 'true') {
        alert('Logged in!');
    } else {
        alert('Not logged in!');
    }
});

// helper function to use client.login call
var login = function(username, password) {
    client.loginUser({
        email: username,
        password: password,
        success: function(user) {
            // log success
            console.log(JSON.stringify(user, null, 4));
            
            // Use sessionStorage to keep data we need
            sessionStorage.setItem('logged_in', 'true');
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
            
            // flip logged_in flag
            logged_in = true;
            
            // redirect to client dashboard
            window.open('client.html', '_self', false);
        },
        error: function(xhr) {
            // TEMP
            alert('Login failed');
            
            console.log(JSON.parse(xhr.responseText));
        }
    });
};

// Login button
$('#submit-login').click(function() {
    // get the text from the two input forms
    var userText = $('#login-username').val();
    var passText = $('#login-password').val();
    
    console.log('Logging in...');
    
    // attempt login via Bowling Api
    login(userText, passText);
});

// Allow for 'enter' keypress to login
$('#login-modal #login-password').keypress(function(e) {
    if (e.which == 13) {
        $('#submit-login').click();
        return false;
    } 
});

// Redirect to registration modal when 'New?' button is clicked
$('#login-modal .login-modal-footer a').click(function() {
    $('#login-modal').modal('hide');
    $('#register-modal').modal('show');
});

// Logout button
$(document).on('click', '#logout-button', function() {
    // close the session
    sessionStorage.clear();

    // reload the page
    window.location.reload();
});

// Register button
$('#submit-register').click(function() {
    // get the text from the two input forms
    var userText = $('#register-username').val();
    var passText = $('#register-password').val();
    
    console.log('Registering...');
    
    // attempt to register with given credentials
    client.createUser({
        email: userText,
        password: passText,
        success: function(user) {
            console.log(JSON.stringify(user, null, 4));
            
            // flip 'logged_in' flag and update status
            logged_in = true;
            
            // call helper function to login
            login(userText, passText);
        },
        error: function(xhr) {
            alert('Account with provided email already exists!');
            console.log(JSON.parse(xhr.responseText));
        }
    });
});

// Allow for keypress 'Enter' to register
$('#register-modal #register-password').keypress(function(e) {
    if (e.which == 13) {
        $('#submit-register').click();
        return false;
    } 
});

// Redirect to login modal when 'Already a user?' button is clicked
$('#register-modal .register-modal-footer a').click(function() {
    $('#register-modal').modal('hide');
    $('#login-modal').modal('show');
})

/*
||======||
||MDOALS||
||======||*/
$('.modal').on('hidden.bs.modal', function() {
    $(this).find('input').val(''); 
});

/* Make options button trigger on hover instead of click */
$(document).ready(function(){
    $('.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(100);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(100);
    });  
});