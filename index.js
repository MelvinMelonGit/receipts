/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "public/views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/form", (req, res) => {
    res.render("form", { title: "Form" });
});

app.post("/form", (req, res) => {
    res.render("form", { title: "Form", submitted: "I Submitted!" });
});


/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

// Export the Express API
module.exports = app;