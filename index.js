/**
 * Required External Modules
 */
require('dotenv').config()
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const { createClient } = require('@supabase/supabase-js');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "public/views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Routes Definitions
 */
app.get("/", async(req, res) => {
    const { data, error } = await supabase.from('receipt').select()

    res.render("index", { data });
});

app.get("/form", (req, res) => {
    res.render("form");
});

app.post("/delete", async(req, res) => {
    const { id } = req.body 

    const { err } = await supabase
    .from('receipt')
    .delete()
    .eq('id', id)

    const { data, error } = await supabase.from('receipt').select()

    res.render("index", { data, message: `${id} deleted!` });
});


app.post("/form", async(req, res) => {

const {title, description, price} = req.body
console.log(title, description, price)

if (!title || !description || !price )
   return res.render("form", { message: "Fill up all fields" });

const { data, error } = await supabase
    .from('receipt')
    .insert([
    { title, description, price: parseInt(price) },
    ])
    .select()

    console.log(data, error)
        
    res.render("form", { message: "Item Added Successfully" });
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

// Export the Express API
module.exports = app;