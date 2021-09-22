let stripe;

window.addEventListener('load', () => {
    let stripe = Stripe('pk_test_51Jc7a0L3xesmMHJgbAPWLEn3t20phRDibRXtF4h6cBfYbSV6ZB9dI3VD3hjWL7uTVRYdH0Zz00n14HIeRLmSwv6i00dsOw4Jj9')
});

const purchaseBtn = document.getElementById('makePurchase');

purchaseBtn.addEventListener('click', async () => {
    const response = await fetch('/api/session/new', {
        method: "POST",
        headers: { "Content-Type": "application/json"}
    });
    const { id } = await response.json();
    console.log(id);

});

