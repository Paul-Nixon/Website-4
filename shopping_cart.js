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
        sessionStorage.setItem("cart", JSON.stringify({}));
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
    if (itemExistsInCart())
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
        let itemImg = event.target.parentElement.querySelector(".shop-item-img").style.backgroundImage;
        let itemName = event.target.parentElement.querySelector(".item-title").innerText;
        let itemPrice = event.target.parentElement.querySelector(".item-price").innerText;
        let newCartItem = 
        {
            image: itemImg,
            name: itemName,
            price: itemPrice
        };

        //
        let oldCart = JSON.parse(sessionStorage.getItem("cart"));
        let newCartItemKeyName = "item" + (Object.keys(oldCart).length + 1);
        let newCart = Object.assign(oldCart, {newCartItemKeyName: newCartItem});
        sessionStorage.setItem("cart", JSON.stringify(newCart));
        document.querySelector(".badge").innerText = Object.keys(JSON.parse(sessionStorage.getItem("cart"))).length;
        loadCart();
    }
}


function itemExistsInCart(itemName)
{
    //
    if (Object.keys(JSON.parse(sessionStorage.getItem("cart"))).length == 0)
    {
        return false;
    }
    else
    {
        //
        const cartItems = Object.keys(JSON.parse(sessionStorage.getItem("cart")));
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
    if (Object.keys(JSON.parse(sessionStorage.getItem("cart"))).length == 0)
    {
        //
        document.querySelector(".shopping-cart-dropdown-menu").innerHTML = ``;
        document.querySelector(".shopping-cart-dropdown-menu").innerText = "no items in cart";
    }
    else
    {
        //
        document.querySelector(".shopping-cart-dropdown-menu").innerHTML = ``;
        let cartItemContainer;
        const cartItems = Object.keys(JSON.parse(sessionStorage.getItem("cart")));

        for (const cartItem of cartItems)
        {
            cartItemContainer = document.createElement("div");
            cartItemContainer.classList.add("cart-item");
            cartItemContainer.innerHTML = `
                <div class="img cart-modal-img"></div>

                <div class="item-title-and-input-wrapper">
                    <h3 class="item-title">${cartItem.name}</h3>
                    <input type="number" min="0" class="item-quantity">
                </div>

                <span class="item-price">${cartItem.price}</span>
                `;
            document.querySelector(".item-quantity").onchange = (event) => {
                if (event.target.value === 0)
                {
                    removeCartItem(event);
                }
            }

            cartItemContainer.querySelector(".cart-modal-img").style.backgroundImage = cartItem.image;
            cartItemContainer.querySelector(".cart-items-wrapper").append(cartItemContainer);
        }
    }
}


function removeCartItem(event)
{
    //
    const cartItems = Object.keys(JSON.parse(sessionStorage.getItem("cart")));
    let cartItemName = event.target.parentElement.querySelector(".item-title").innerText;

    //
    for (const cartItem of cartItems)
    {
        if (cartItem.name === cartItemName)
        {
            //
            cartItems.splice(cartItems.indexOf(cartItem), 1);
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
            document.querySelector(".badge").innerText = Object.keys(JSON.parse(sessionStorage.getItem("cart"))).length;
            break;
        }
    }

    //
    cartItemContainer.querySelector(".cart-items-wrapper").removeChild(event.target.closest(".cart-item"));
}