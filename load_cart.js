if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready)
}
else
{
    ready();
}

/*
    Function ready() creates a cart in storage if it doesn't exist (calls loadCart() otherwise) and
    adds a mouseover & mouseout event listener to the header's cart.
    Precondition: The webpage's fully rendered.
    Postcondition: Either the cart is created in storage or loadCart() is called, and the header's cart contains
    a mouseover & mouseout event.
*/
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

/*
    Function loadCart() either writes text in the header's cart's dropdown menu notifying the user there're no
    items in it or renders each of the cart's items in the dropdown menu.
    Precondition: The webpage's fully rendered.
    Postcondition: The header's cart's dropdown menu contains either text indicating the cart has no items or
    each item's info.
*/
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

/*
    Function updateItemQuantity(event) updates the input's respective cart item's quantity and total price.
    Precondition: In the header's cart's dropdown menu, a cart item's input was updated.
    Postcondition: If the cart item's input was updated to zero, removeCartItem(event) is called to
    remove it from the dropdown menu. Otherwise, it's quantity and total price is updated.
*/
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

/*
    Function removeCartItem(event) removes a cart item from storage and the header's cart's dropdown menu.
    Precondition: In the header's cart's dropdown menu, a cart item's input was updated to zero.
    Postcondition: A cart item is removed from storage and the header's cart's dropdown menu.
*/
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