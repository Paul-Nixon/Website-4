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
    //
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

/*
    Function addToCart(event) adds an item's info to the cart if it doesn't exist, and calls
    addToCartDropdownMenu(newCartItem) to render it in the header's cart's dropdown menu.
    Precondition: An Add to Cart button is clicked.
    Postcondition: If the item doesn't exist in the cart, then it's added to it and rendered in the
    header's cart's dropdown menu. Otherwise, a modal is rendered notifying the user that it already exists
    in the cart.
*/
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
                    <h2>Item Exists in Cart</h2>
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
            price: itemPrice,
            quantity: 1
        };

        //
        const cart = JSON.parse(sessionStorage.getItem("cart"));
        cart.push(newCartItem);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        addToCartDropdownMenu(newCartItem);
    }
}

/*
    Function itemExistsInCart(itemName) searches for an item in the cart by using it's name. If it's in
    the cart, then the function returns true, false otherwise.
    Precondition: An Add to Cart button is clicked.
    Postcondition: If the item exists in the cart, then the function returns true, false otherwise.
*/
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

/*
    Function loadCart() either writes text in the header's cart's dropdown menu notifying the user there're no
    items in it or renders each of the cart's items in the dropdown menu.
    Precondition: The webpage's fully rendered and the cart exists in storage.
    Postcondition: If the cart contains no items, then header's cart's dropdown menu will contain text telling the
    user that there're no items in the cart. Else, each cart item's info is rendered in the header's cart's
    dropdown menu.
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

/*
    Function addToCartDropdownMenu(newCartItem) renders a new cart item's info to the header's cart's
    dropdown menu.
    Precondition: An Add to Cart button is clicked.
    Postcondition: A new cart item's info is rendered in the header's cart's dropdown menu.
*/
function addToCartDropdownMenu(newCartItem)
{
    if (document.querySelector(".btn-checkout-wrapper").style.display === "none")
    {
        document.querySelector(".btn-checkout-wrapper").style.display = "block";
        document.querySelector(".cart-items-wrapper").innerText = "";
    }

    const cartItemContainer = document.createElement("div");
    cartItemContainer.classList.add("cart-item");
    cartItemContainer.innerHTML = `
        <img class="img cart-modal-img" src="${newCartItem.image}">

        <div class="item-title-and-input-wrapper">
            <h3 class="item-title">${newCartItem.name}</h3>
            <input type="number" min="0" value="1" class="item-quantity">
        </div>

        <span class="item-price">$${newCartItem.price}</span>
        `;
    cartItemContainer.querySelector(".item-quantity").onchange = (event) => {
        if (event.target.value == 0)
        {
            removeCartItem(event);
        }
        else
        {
            event.target.closest(".cart-item").querySelector(".item-price").innerText = "$" +
            (parseFloat(newCartItem.price) * event.target.value).toFixed(2);
            updateItemQuantity(event);
        }
    };

    const modal = document.querySelector(".modal");

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h2>Confirmation</h2>
            </div>
            <div class="modal-body">
                <p>
                    New item added to the cart!
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

    document.querySelector(".badge").innerText = "(" + JSON.parse(sessionStorage.getItem("cart")).length + ")";
    document.querySelector(".cart-items-wrapper").appendChild(cartItemContainer);
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