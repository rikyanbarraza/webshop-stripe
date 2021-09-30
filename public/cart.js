let stripe = Stripe('pk_test_51Jc7a0L3xesmMHJgbAPWLEn3t20phRDibRXtF4h6cBfYbSV6ZB9dI3VD3hjWL7uTVRYdH0Zz00n14HIeRLmSwv6i00dsOw4Jj9')

const toCartBtn = document.getElementById('toCart');

const cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
    noProducts = document.getElementById("noProducts")
    noProductsText = document.createElement("p") 
    noProductsText.innerText = "Varukorgen är tom"
    noProducts.appendChild(noProductsText)
} 



//Betalning - Gå till kassan

const checkout = async () => {
    try {
    if (Object.keys(cart).lenght == 0) {
        throw new Error("No products added");
    }

    const response = await fetch('/api/session/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            line_items: Object.values(cart)
        })
    });
    const { id } = await response.json();
    localStorage.setItem("session", id)
    stripe.redirectToCheckout({ sessionId: id})
} 
catch (err) {
    console.error(err)
}
}

toCartBtn.addEventListener('click', () => checkout())

