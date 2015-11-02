// Create instance of the Bowling-Api-Client
var client = new BowlingApiClient('http://bowling-api.nextcapital.com/api');

// current user's username (email) and password
var username = '';
var password = '';
// is the user logged in? Defaulted to 'false'
var logged_in = false;

// update the status of user
var updateStatus = function() {
    if (logged_in) {
        $('#userStatus').text('Logged in as: ' + username);
    } else {
        $('#userStatus').text('Not logged in.');
    }
}

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
            
            // flip the 'logged_in' flag and update status
            logged_in = true;
            username = userText; // update username
            password = passText; // update password
            updateStatus();
        },
        error: function(xhr) { 
            alert('Login failed'); // TODO: Determine whether it was incorrect email or password using 
            console.log(JSON.parse(xhr.responseText));
        }
    });
});

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
            updateStatus();
        },
        error: function(xhr) {
            alert('Account with provided email already exists!');
            console.log(JSON.parse(xhr.responseText));
        }
    });
});