// Create instance of the Bowling-Api-Client
var client = new BowlingApiClient('http://bowling-api.nextcapital.com/api');

// create a user on button click
$("#createUser").click(function() {
    console.log("Creating user...");
    
    client.createUser({
        email: 'test43@example.com',
        password: 'password',
        success: function(user) {
            console.log(user);
        },
        error: function(xhr) {
            console.log("ERROR: " + JSON.parse(xhr.responseText));
        }
    });
});

$('#getBowlers').click(function() {
    console.log('Getting leagues...');
    
    client.getBowlers({
        success: function(bowlers) {
            console.log(bowlers);
        },
        error: function(xhr) {
            console.log('ERROR: ' + JSON.parse(xhr.responseText));
        }
    });
});

$('#getBowler390').click(function() {
    console.log('Getting bowler with id 390...');
    
    client.getBowler({
        bowlerId: 731,
        success: function(bowler) {
            $('#paragraph').text(JSON.stringify(bowler, null, 4));
            console.log(JSON.stringify(bowler, null, 4));
        },
        error: function(xhr) {
            console.log('ERROR: ' + JSON.parse(xhr.responseText));
        }
    });
});