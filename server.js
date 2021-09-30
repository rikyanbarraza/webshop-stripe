require('dotenv').config('.env');
const fs = require("fs");

const secretkey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(secretkey)
const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.json());


app.post("/api/session/new", async (req, res) => {

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.line_items,
      mode: "payment",
      success_url: "http://localhost:3000/success.html",
      cancel_url: "http://localhost:3000/"   
    })
    console.log(session)
    res.status(200).json({ id: session.id})
})

app.post("/api/session/verify", async (req, res) => {
    const sessionId = req.body.sessionId;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
  
    if (session.payment_status == "paid") {
        const key = session.payment_intent;
        
    //spara till JSON
      let orderJson = fs.readFileSync("items.json");
      let data = JSON.parse(orderJson);
      let orderItem = data[key]

      if (!orderItem) {
        orderItem = {
          amount: session.amount_total / 100,
          customerId: session.customer,
          customerEmail: session.customer_details.email,
        };
        data.push(orderItem);
        fs.writeFileSync("items.json", JSON.stringify(data));
        res.json(true);

      }
    } else {
      res.status(200).json({ paid: false });
    }
    console.log(session);

});

  //Beställningar 

  app.get("/api/admin/purchases", async (req, res) => {
    
    let orderJson = fs.readFileSync("items.json");
    let data = JSON.parse(orderJson);
    res.status(200).json(data);
  });



app.listen(3000, () => {
    console.log("Server is running")
})