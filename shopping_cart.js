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
    //
    if (sessionStorage.getItem("cart") == null)
    {
        //
        sessionStorage.setItem("cart", JSON.stringify([]));
    }
    else
    {
        loadCart();
    }

    //
    document.querySelectorAll(".btn-add-to-cart").forEach(btn => {
        btn.addEventListener("click", addToCart);
    });
    document.querySelector(".shopping-cart").addEventListener("mouseover", () => {
        document.querySelector(".shopping-cart-dropdown-menu").style.display = "block";
    });
    document.querySelector(".shopping-cart").addEventListener("mouseout", () => {
        document.querySelector(".shopping-cart-dropdown-menu").style.display = "none";
    });
}


function addToCart(event)
{
    //
    if (itemExistsInCart(event.target.parentElement.querySelector(".item-title").innerText))
    {
        //
        const modal = document.querySelector(".modal");

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>Confirmation</h2>
                </div>
                <div class="modal-body">
                    <p>
                        This item has already been added to the cart.
                    </p>
                </div>
            </div>`;
        modal.style.display = "block";
        document.querySelector(".close").addEventListener("click", () => {
            modal.style.display = "none";
        });
        window.onclick = (event) => {
            if (event.target == modal)
            {
                modal.style.display = "none";
            }
        }
    }
    else
    {
        const itemImg = event.target.parentElement.firstElementChild.src,
        itemName = event.target.parentElement.querySelector(".item-title").innerText,
        itemPrice = event.target.parentElement.querySelector(".item-price").innerText.substring(1),
        newCartItem = 
        {
            image: itemImg,
            name: itemName,
            price: itemPrice
        };

        //
        const cart = JSON.parse(sessionStorage.getItem("cart"));
        cart.push(newCartItem);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
}


function itemExistsInCart(itemName)
{
    //
    if (JSON.parse(sessionStorage.getItem("cart")).length === 0)
    {
        return false;
    }
    else
    {
        //
        const cartItems = JSON.parse(sessionStorage.getItem("cart"));
        for (const cartItem of cartItems)
        {
            if (cartItem.name === itemName)
            {
                return true;
            }
        }
    }
}


function loadCart()
{
    //
    if (JSON.parse(sessionStorage.getItem("cart")).length === 0)
    {
        //
        document.querySelector(".shopping-cart-dropdown-menu").innerHTML = ``;
        document.querySelector(".shopping-cart-dropdown-menu").innerText = "no items in cart";
    }
    else
    {
        //
        document.querySelector(".cart-items-wrapper").innerHTML = ``;
        let cartItemContainer;
        const cartItems = JSON.parse(sessionStorage.getItem("cart"));

        for (const cartItem of cartItems)
        {
            cartItemContainer = document.createElement("div");
            cartItemContainer.classList.add("cart-item");
            cartItemContainer.innerHTML = `
                <img class="img cart-modal-img" src="${cartItem.image}">

                <div class="item-title-and-input-wrapper">
                    <h3 class="item-title">${cartItem.name}</h3>
                    <input type="number" min="0" value="1" class="item-quantity">
                </div>

                <span class="item-price">$${cartItem.price}</span>
                `;
            cartItemContainer.querySelector(".item-quantity").onchange = (event) => {
                if (event.target.value == 0)
                {
                    removeCartItem(event);
                }
                else
                {
                    cartItemContainer.querySelector(".item-price").innerText = "$" +
                    (parseFloat(cartItem.price) * event.target.value).toFixed(2);
                }
            }
            document.querySelector(".badge").innerText = JSON.parse(sessionStorage.getItem("cart")).length;
            document.querySelector(".cart-items-wrapper").append(cartItemContainer);
        }
    }
}


function removeCartItem(event)
{
    //
    const cartItems = JSON.parse(sessionStorage.getItem("cart")),
    cartItemName = event.target.parentElement.querySelector(".item-title").innerText;

    //
    for (const cartItem of cartItems)
    {
        if (cartItem.name === cartItemName)
        {
            //
            cartItems.splice(cartItems.indexOf(cartItem), 1);
            document.querySelector(".badge").innerText = cartItems.length;
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
            break;
        }
    }

    //
    event.target.closest(".cart-items-wrapper").removeChild(event.target.closest(".cart-item"));
    if (cartItems.length == 0)
    {
        document.querySelector(".shopping-cart-dropdown-menu").innerHTML = ``;
        document.querySelector(".shopping-cart-dropdown-menu").innerText = "no items in cart";
    }
}