//link in Friends Data
var friendsData = require("../data/friends.js");

//Defining Routes that will be exported to the server
function apiRoutes(app) {

    //A GET route to /api/friends that will be used to display JSON friends data
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    //handle the post request from the survey form
    app.post("/api/friends", function (req, res) {
        
        //Parse new friend input to get integers 
        var newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: []
        };

        var scoresArray = [];
        for(var i=0; i < req.body.scores.length; i++) {
            scoresArray.push(parseInt(req.body.scores[i]));
        }
        newFriend.scores = scoresArray;

        //Cross-check the new friend entry with the existing friends
        var scoreCompareArray = [];
        for(var i =0; i < friendsData.length; i++) {

            //check each friend's scores and sum difference in points
            var currentComparison = 0;
            for(var j=0; j < newFriend.scores.length; j++) {
                currentComparison += Math.abs(newFriend.scores[j] - friendsData[i].scores[j]);
            }

            //Push each comparison between friends to array
            scoreCompareArray.push(currentComparison);
    }

    //Determine the best match using the position of best match in the friendsData array
    var bestMatchPosition = 0;
    for(var i=1; i < scoreCompareArray.length; i++) {

        //Lower number in comparison difference means better match
        if(scoreCompareArray[i] <= scoreCompareArray[bestMatchPosition]) {
            bestMatchPosition = i;
        }
    }


//If 2 friends have the same comparioson, then the NEWEST entry in the friendsData array is chosen
var bestFriendMatch = friendsData[bestMatchPosition];

//reply with a JSON object of the best match
res.json(bestFriendMatch);

//Push the new friend to the friends data array for storage
friendsData.psuh(newFriend);

    
});

}

//Export for use in main server file
module.exports = apiRoutes;
