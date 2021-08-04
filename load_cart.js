if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready)
}
else
{
    ready();
}


function ready()
{
    if (sessionStorage.getItem("cart") == null)
    {
        //
        sessionStorage.setItem("cart", JSON.stringify([]));
        document.querySelector(".cart-items-wrapper").innerText = "no items in cart";
        document.querySelector(".btn-checkout-wrapper").style.display = "none";
    }
    else
    {
        loadCart();
    }

    document.querySelector(".shopping-cart").addEventListener("mouseover", () => {
        document.querySelector(".shopping-cart-dropdown-menu").style.display = "block";
    });
    document.querySelector(".shopping-cart").addEventListener("mouseout", () => {
        document.querySelector(".shopping-cart-dropdown-menu").style.display = "none";
    });
}


function loadCart()
{
    //
    if (JSON.parse(sessionStorage.getItem("cart")).length == 0)
    {
        //
        document.querySelector(".shopping-cart-dropdown-content").style.display = "none";
        document.querySelector(".shopping-cart-dropdown-menu").innerText = "no items in cart";
    }
    else
    {
        //
        const cartItems = JSON.parse(sessionStorage.getItem("cart"));
        document.querySelector(".badge").innerText = "(" + cartItems.length + ")";

        for (const cartItem of cartItems)
        {
            const cartItemContainer = document.createElement("div");
            cartItemContainer.classList.add("cart-item");
            cartItemContainer.innerHTML = `
                <img class="img cart-modal-img" src="${cartItem.image}">

                <div class="item-title-and-input-wrapper">
                    <h3 class="item-title">${cartItem.name}</h3>
                    <input type="number" min="0" value="${cartItem.quantity}" class="item-quantity">
                </div>

                <span class="item-price">$${cartItem.price * cartItem.quantity}</span>
                `;
            cartItemContainer.querySelector(".item-quantity").onchange = (event) => {
                if (event.target.value == 0)
                {
                    removeCartItem(event);
                }
                else
                {
                    event.target.closest(".cart-item").querySelector(".item-price").innerText = "$" +
                    (parseFloat(cartItem.price) * event.target.value).toFixed(2);
                    updateItemQuantity(event);
                }
            };

            document.querySelector(".cart-items-wrapper").appendChild(cartItemContainer);
            document.querySelector(".shopping-cart-dropdown-menu").style.display = "block";
        }
    }
}


function updateItemQuantity(event)
{
    const cartItems = JSON.parse(sessionStorage.getItem("cart")),
    cartItemName = event.target.previousElementSibling.innerText;

    for (const cartItem of cartItems)
    {
        if (cartItem.name === cartItemName)
        {
            cartItem.quantity = event.target.value;
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
            break;
        }
    }
}


function removeCartItem(event)
{
    //
    const cartItems = JSON.parse(sessionStorage.getItem("cart")),
    cartItemName = event.target.previousElementSibling.innerText;

    //
    for (const cartItem of cartItems)
    {
        if (cartItem.name === cartItemName)
        {
            //
            cartItems.splice(cartItems.indexOf(cartItem), 1);
            document.querySelector(".badge").innerText = "(" + cartItems.length + ")";
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
            break;
        }
    }

    //
    event.target.closest(".cart-items-wrapper").removeChild(event.target.closest(".cart-item"));
    if (cartItems.length == 0)
    {
        document.querySelector(".cart-items-wrapper").innerText = "no items in cart";
        document.querySelector(".btn-checkout-wrapper").style.display = "none";
    }
}