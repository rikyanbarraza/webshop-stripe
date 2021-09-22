require('dotenv').config('.env');

const secretkey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(secretkey)
const express = require('express');

const app = express();

app.get("/api", (req, res) => {
    res.status(200).send("Hello göfab")
});

app.post("/api/session/new", async (reg, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
          {
          description: "Tiokronorsprodukt", 
          price_data: {
              currency: "sek",
              product_data: {
                  name: "Tiokronorsprodukt"
              },
              unit_amount: 10000
          },
          quantity: 1
      }
    ],
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