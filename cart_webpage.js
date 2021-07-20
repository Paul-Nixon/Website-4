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
        renderEmptyCartMessage();
    }
    else
    {
        renderCartItems();
    }
}


function renderEmptyCartMessage()
{
    const mainContentContainer = document.querySelector(".cart-main-content");

    mainContentContainer.innerHTML = `
        <span class="cart-message">There are no items in your cart.</span>
        
        <div class="shop-links-wrapper">
            <button class="btn btn-shop-link">men's shop</button>
            <button class="btn btn-shop-link">women's shop</button>
        </div>`;
}


function renderCartItems()
{
    const mainContentContainer = document.querySelector(".cart-main-content");

    
}