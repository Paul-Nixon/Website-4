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
    if (sessionStorage.getItem("cart") == null || JSON.parse(sessionStorage.getItem("cart")).length === 0)
    {
        document.querySelector(".cart-items-wrapper").style.display = "none";
        document.querySelector(".subtotal-and-checkout-btn-wrapper").style.display = "none";
    }
    else
    {
        document.querySelector(".cart-message-and-shop-links-wrapper").style.display = "none";
        renderCartItems();
    }
}


function renderCartItems()
{
    const cartItems = JSON.parse(sessionStorage.getItem("cart"));

    for (const cartItem of cartItems)
    {
        const cartItemContainer = document.createElement("div");
        cartItemContainer.classList.add("cart-item");
        cartItemContainer.innerHTML = `
            <img class="img cart-webpage-img" src="${cartItem.image}">

            <div class="item-info-wrapper">
                <h3 class="item-title">${cartItem.name}</h3>
                <span class="item-price">$${cartItem.price}</span>
                <input type="number" min="0" value="${cartItem.quantity}" class="item-quantity">
            </div>`;
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
    }
}


function updateItemQuantity(event)
{
    const cartItems = JSON.parse(sessionStorage.getItem("cart")),
    cartItemName = event.target.previousElementSibling.previousElementSibling.innerText;

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