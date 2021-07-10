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
        sessionStorage.setItem("cart", "");
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

    //
}


function clearCart()
{
    // 
}