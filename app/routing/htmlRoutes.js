
//Require path to parse directory structures
var path = require("path");

//Defining Routes that will be exported to the server
function htmlRoutes(app) {

    //GET route to /survey which should display the survey page
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });

    //Default to route any other url to home
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
};

//Export for use in main file
module.exports = htmlRoutes;
