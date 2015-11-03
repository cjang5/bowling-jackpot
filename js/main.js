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
$('#login_button').click(function() {
    // get the text from the two input forms
    var userText = $('#username').val();
    var passText = $('#password').val();
    
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
            window.location.reload();
        },
        error: function(xhr) { 
            alert('Login failed'); // TODO: Determine whether it was incorrect email or password using 
            console.log(JSON.parse(xhr.responseText));
        }
    });
    
    //window.location.reload();
});

// Logout button
$('#logout_button').click(function() {
    // close the session
    sessionStorage.clear();
    
    // reload the page
    window.location.reload();
})

// Register button
$('#register_button').click(function() {
    // get the text from the two input forms
    var userText = $('#username').val();
    var passText = $('#password').val();
    
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