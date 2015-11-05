// Create instance of the Bowling-Api-Client
var client = new BowlingApiClient('http://bowling-api.nextcapital.com/api');

// current user's username (email) and password
var username = '';
var password = '';
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
}

//TEMP
//console.log('loading main.js...');
console.log(sessionStorage.getItem('logged_in'));

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

// update the status of user
/*
var updateStatus = function() {
    if (logged_in) {
        $('#userStatus').text('Logged in as: ' + username);
    } else {
        $('#userStatus').text('Not logged in.');
    }
} */

// Login button
$('#submit-login').click(function() {
    // get the text from the two input forms
    var userText = $('#login-username').val();
    var passText = $('#login-password').val();
    
    console.log('Logging in...');
    
    // attempt login via Bowling Api
    client.loginUser({
        email: userText,
        password: passText,
        success: function(user) {
            alert('Successfully logged in: ' + userText);
            console.log(JSON.stringify(user, null, 4));
            
            //TEMP
            sessionStorage.setItem('logged_in', 'true');
            sessionStorage.setItem('username', userText);
            
            // flip the 'logged_in' flag and update status
            logged_in = true;
            username = userText; // update username
            password = passText; // update password
            //updateStatus();
            
            // open client.html
            window.open('client.html', '_self', false);
            //window.location.reload();
        },
        error: function(xhr) { 
            alert('Login failed'); // TODO: Determine whether it was incorrect email or password using 
            console.log(JSON.parse(xhr.responseText));
        }
    });
    
    //window.location.reload();
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
            alert('Successfully registered as: ' + userText);
            console.log(user);
            
            // flip 'logged_in' flag and update status
            logged_in = true;
            username = userText; // update username
            password = passText; // update password
            //updateStatus();
            window.location.reload();
        },
        error: function(xhr) {
            alert('Account with provided email already exists!');
            console.log(JSON.parse(xhr.responseText));
        }
    });
    
    //TEMP
    //window.location.reload();
});

$('#options-button').popover({
    html: true,
    trigger: 'manual',
    container: $(this).attr('id'),
    placement: 'bottom',
    animation: true,
    content: function () {
        return $('#popover-content').html();
    }
}).on("mouseenter", function () {
    var _this = this;
    $(this).popover("show");
    $(this).siblings(".popover").on("mouseleave", function () {
        $(_this).popover('hide');
    });
}).on("mouseleave", function () {
    var _this = this;
    var some_function = function() {
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide")
            } else {
                some_function();
            }
        }, 50);
    };
    some_function();
});