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
}


function addToCart(event)
{
    // 
    let itemImg = event.target.parentElement.querySelector(".shop-item-img").style.backgroundImage;
    let itemName = event.target.parentElement.querySelector(".item-title").innerText;
    let itemPrice = event.target.parentElement.querySelector(".item-price").innerText;
    let newItem = 
    {
        image: itemImg,
        name: itemName,
        price: itemPrice
    };

    //
    let oldCart = JSON.parse(sessionStorage.getItem("cart"));
    let newItemKeyName = "item" + (Object.keys(oldCart).length + 1);
    let newCart = Object.assign(oldCart, {newItemKeyName: newItem});
    sessionStorage.setItem("cart", JSON.stringify(newCart));
}


function clearCart()
{
    sessionStorage.removeItem("cart");
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
        Object.keys(JSON.parse(sessionStorage.getItem("cart"))).forEach(item => {

        });
    }
}