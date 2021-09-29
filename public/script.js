const purchaseBtn = document.getElementById('makePurchase');
const toCartBtn = document.getElementById('toCart');


let stripe = Stripe('pk_test_51JZCj6R0RVPaP51XFkZ9qfFI7WntpFa3Osz40iSeOUMe12nGR1E8UUyY7yOpkGflsvPSiQBqnAmBQZ5XngLway4I00dnyqVSls')



const productList = 
    {
"Candy Bars": {
    description: 'Mumsiga candy bars',
    
    price_data: {
        currency: 'sek',
            product_data: {
                name: "Candy Bars",
                images: ['http://localhost:3000/Content/bars.jpg'],
                },
            unit_amount: 1000
        }
    },
"Chips": {
    description: 'Krispiga potatisar',

    price_data: {
        currency: 'sek',
            product_data: {
                name: "Chips",   
                images: ['http://localhost:3000/Content/chips.jpg'],  
            },
            unit_amount: 1000
        }
    },
    "Cookie": {
        description: 'Kaka',
    
        price_data: {
            currency: 'sek',
                product_data: {
                    name: "Cookie",   
                    images: ['http://localhost:3000/Content/cookie.jpg'],  
                },
                unit_amount: 1000
            }
        },
    "Cube": {
        description: 'Kub',
    
        price_data: {
            currency: 'sek',
                product_data: {
                    name: "Cube",   
                    images: ['http://localhost:3000/Content/cube.jpg'],  
                },
                unit_amount: 1000
            }
        },    
    "Mask": {
        description: 'Ansiktsmask',
    
        price_data: {
            currency: 'sek',
                product_data: {
                    name: "Mask",   
                    images: ['http://localhost:3000/Content/mask.jpg'],  
                },
                unit_amount: 1000
            }
        },  
        "Soda": {
            description: 'Läskande dryck',
        
            price_data: {
                currency: 'sek',
                    product_data: {
                        name: "Soda",   
                        images: ['http://localhost:3000/Content/soda.jpg'],  
                    },
                    unit_amount: 1000
                }
            },   
    
}



let cart = {};

const addProduct = async (productKey) => {
    const product = productList[productKey]
    if (!product) {
        throw new Error("Product does not exist")
    }
    cart[productKey] = product
    cart[productKey].quantity = cart[productKey].quantity || 0;
    cart[productKey].quantity++;
    console.log({ cart, line_items: Object.values(cart)})

    localStorage.setItem("cart", JSON.stringify(cart));
    cartQuantity = cart[productKey].quantity
    
    if (cartQuantity) {
        document.getElementById('cartQuantity').innerText = cartQuantity;
    }
}


toCartBtn.addEventListener('click', () => checkout())

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
    stripe.redirectToCheckout({ sessionId: id})
    } 
    catch (err) {
        console.error(err)
    }
}


const renderProduct = () => {
const product = productList

Object.entries(productList).map((products) => {
    

    let productContainer = document.getElementById('productContainer')
    let productOutput = document.createElement('div')
    productOutput.setAttribute("class", "col");
    let productCard = document.createElement('div')
    productCard.setAttribute("class", "card shadow-sm");
    let cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body");

    let productTitle = document.createElement('h3')
    productTitle.setAttribute("class", "card-text");
    productTitle.innerText = products[0]

    let descriptionText = document.createElement('p')
    descriptionText.setAttribute("class", "card-text");
    descriptionText.innerText = products[1].description

    let priceText = document.createElement('h4')
    priceText.innerText = products[1].price_data.unit_amount /100 + " kr"
    

    let productImg = document.createElement('img')
    productImg.setAttribute("class", "bd-placeholder-img card-img-top");
    productImg.src = products[1].price_data.product_data.images

    let purchaseBtn = document.createElement('button')
    
    purchaseBtn.setAttribute("class", "btn btn-sm btn-outline-secondary");
    purchaseBtn.setAttribute("id", "makePurchase");
    purchaseBtn.addEventListener('click', () => addProduct(products[0]))
    purchaseBtn.innerHTML = "Lägg till"
    

productContainer.appendChild(productOutput)
productOutput.appendChild(productCard)

productCard.appendChild(cardBody)
cardBody.appendChild(productImg)
cardBody.appendChild(productTitle)
cardBody.appendChild(descriptionText)
cardBody.appendChild(priceText)
cardBody.appendChild(purchaseBtn)

    })
}

renderProduct()


function renderReceipt() {

    let receiptContainer = document.getElementById('receiptContainer') //Product-card
    let receiptOutputOne = document.createElement('li') // Prod-text-container
    receiptOutputOne.setAttribute('class', 'list-group-item d-flex justify-content-between lh-sm')
    let  receiptOutputTwo = document.createElement('div')
    let  receiptOutputTwoOne = document.createElement('h6') // Prod-title
    receiptOutputTwoOne.setAttribute('class', 'my-0')
    let  receiptOutputTwoTwo = document.createElement('small') // Prod-descr.
    receiptOutputTwoTwo.setAttribute('class', 'text-muted')
    let  receiptOutputTwoThree = document.createElement('span') // Prod-price
    receiptOutputTwoThree.setAttribute('class', 'text-muted)') 
    let receiptOutputThree = document.createElement('li') // Prod-price-container
    receiptOutputThree.setAttribute('class', 'list-group-item d-flex justify-content-between')
    let  receiptOutputThreeOne = document.createElement('span') // Prod-price-text
    receiptOutputThreeOne.innerHTML = Total (Sek);
    let  receiptOutputThreeTwo = document.createElement('strong') // Prod-price

    receiptContainer.appendChild(receiptOutputOne)
    receiptOutputOne.appendChild(receiptOutputTwo)
    receiptOutputTwo.appendChild(receiptOutputTwoOne)
    receiptOutputTwo.appendChild(receiptOutputTwotTwo)
    receiptOutputOne.appendChild(receiptOutputTwoTwo)
    receiptOutputOne.appendChild(receiptOutputTwoThree)
    receiptOutputThree.appendChild(receiptOutputThreeOne)
    receiptOutputThree.appendChild(receiptOutputThreeTwo)

    
   

}


async function main() {
    

    const isVerified = await verify();
    console.log("isVerified", isVerified);

    if (isVerified) {
        alert("Tack för ditt köp!")
    } else {
        alert("Ajdå!")
    }
    localStorage.removeItem("session");
}

main;

function renderReceipt() {

}

function saveReceipt()  {

}

/* const line_items = { 
        quantity: item.quantity, 
        price_data: {
            currency: 'sek',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.imageUrl], 
            }
        }
    } */

