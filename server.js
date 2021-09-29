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
      success_url: "http://localhost:3000/receipt.html",
      cancel_url: "http://localhost:3000/index.html"   
    })
    console.log(session)
    res.status(200).json({ id: session.id})
})

app.post("/api/session/verify", async (req, res) => {
    const sessionId = req.body.sessionId;

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status == "paid") {
        //spara lämplig info i JSON
        res.status(200).json({ paid: true });
    } else {
        res.status(200).json({ paid: false });
    }
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log("Server is running")
})