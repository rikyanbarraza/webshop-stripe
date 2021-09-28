require('dotenv').config('.env');

const secretkey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(secretkey)
const express = require('express');

const app = express();
app.use("/api", express.json());

/* app.get("/api", (req, res) => {
    res.status(200).send("Hello göfab")
}); */

app.post("/api/session/new", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.line_items,
      mode: "payment",
      success_url: "http://localhost:3000/success.html",
      cancel_url: "http://localhost:3000/index.html"   
    })
    console.log(session)
    res.status(200).json({ id: session.id})
})

app.use(express.static('public'));

app.listen(3000, () => {
    console.log("Server is running")
})