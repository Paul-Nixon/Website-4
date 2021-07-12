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
        //
    }

    //
    document.querySelectorAll(".btn-add-to-cart").forEach(btn => {
        btn.addEventListener("click", addToCart);
    });
    document.querySelector(".shopping-cart").addEventListener("mouseover", () => {
        document.querySelector(".shopping-cart-dropdown-menu").style.display = "block";
        renderCartModal();
    });
}


function addToCart(event)
{
    //
    if (itemExistsInCart())
    {
        //
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
    }
}


function clearCart()
{
    sessionStorage.setItem("cart", JSON.stringify({}));
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
        let cartItems = Object.keys(JSON.parse(sessionStorage.getItem("cart")));
        for (cartItem of cartItems)
        {
            if (cartItem.name === itemName)
            {
                return true;
            }
        }
    }
}


function renderCartModal()
{
    //
    if (Object.keys(JSON.parse(sessionStorage.getItem("cart"))).length == 0)
    {
        // 
    }
    else
    {
        //
    }
}