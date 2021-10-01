const purchaseBtn = document.getElementById('makePurchase');
const toCartBtn = document.getElementById('toCart');

let stripe = Stripe('pk_test_51Jc7a0L3xesmMHJgbAPWLEn3t20phRDibRXtF4h6cBfYbSV6ZB9dI3VD3hjWL7uTVRYdH0Zz00n14HIeRLmSwv6i00dsOw4Jj9')

//Produktlista

const productList = 
    {
"Candybars": {
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
"Energidryck": {
description: 'Läskande energidryck',

price_data: {
    currency: 'sek',
        product_data: {
            name: "Energidryck",   
            images: ['http://localhost:3000/Content/energidryck.jpg'],  
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
"Espresso": {
    description: 'En kopp Espresso',

    price_data: {
        currency: 'sek',
            product_data: {
                name: "Espresso",   
                images: ['http://localhost:3000/Content/espresso.jpg'],  
            },
            unit_amount: 1000
        }
    },  
"Sandwich": {
    description: 'För jävla go macka',

    price_data: {
        currency: 'sek',
            product_data: {
                name: "Sandwich",   
                images: ['http://localhost:3000/Content/sandwich.jpg'],  
            },
            unit_amount: 1000
        }
    }, 
                        
}

//Kundkorg

let cart = {};

const addProduct = async (productKey) => {
    const product = productList[productKey]
    
    if (!product) {
        throw new Error("Product does not exist")
        
    }
    cart[productKey] = product
    cart[productKey].quantity = cart[productKey].quantity || 0;
    cart[productKey].quantity++;
    console.log({ line_items: Object.values(cart)})

    /* localStorage.setItem("cart", JSON.stringify(cart)); */
    

     
    // Varukorg totalt antal varor - totalt pris
    
    let totalPrice = 0
    let totalCartQuantity = 0

    Object.entries(cart).map((products) => {
        totalPrice = totalPrice + products[1].price_data.unit_amount * products[1].quantity;
        totalCartQuantity = totalCartQuantity + products[1].quantity
        document.getElementById('cartQuantity').innerText = totalCartQuantity;
                
    })

    // Rendera ut varor i varukorgsmodal

    document.getElementById("toCart").style.display = 'block';
    document.getElementById("noProducts").innerText = ""

    productCartUl = document.getElementById("productInCartUl")
    productCartLi = document.createElement('li')
    productCartLi.setAttribute("class", "list-group-item d-flex justify-content-between lh-sm");
    productInCart = document.createElement('div')
    productInCartTitle = document.createElement('h6')
    productInCartTitle.setAttribute("class", "my-0");
    productInCartTitle.innerText = product.price_data.product_data.name
  

    productCartUl.appendChild(productCartLi)
    productCartLi.appendChild(productInCart)
    productInCart.appendChild(productInCartTitle)
    
    productInCartDescription = document.createElement('small')
    productInCartDescription.setAttribute("class", "text-muted");
    productInCartDescription.innerText = product.description
    productInCart.appendChild(productInCartDescription)
    
  
    productInCartPriceText = document.createElement('span')
    productInCartPriceText.setAttribute("class", "text-muted"); 
    productInCartPriceText.innerText = product.price_data.unit_amount /100 + " kr"
    productCartLi.appendChild(productInCartPriceText)

   
    totalPriceLi = document.getElementById("totalPriceLi")
    totalPriceLi.setAttribute("class", "list-group-item d-flex justify-content-between");
    totalPriceText = document.getElementById("totalPriceText")
    totalPriceText.innerText = "Totalt"



    productInCartTotalPriceText = document.getElementById("InCartTotalPriceText")
    productInCartTotalPriceText.setAttribute("class", "text-muted");
    productInCartTotalPriceText.innerText = totalPrice /100 + " kr"

    
    totalPriceLi.appendChild(productInCartTotalPriceText)




   
}


//Rendera ut produkter 

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
    productTitle.setAttribute("class", "card-text mt-2");
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
    purchaseBtn.innerHTML = "Lägg till i kundvagn"
    

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


