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
    document.querySelector("#shipping").onchange = (event) => {
        if (event.target.checked)
        {
            document.querySelector(".shipping-address-form").style.display = "block";
            document.querySelector(".pickup-locations").style.display = "none";
        }
    };
    document.querySelector("#pickup").onchange = (event) => {
        if (event.target.checked)
        {
            document.querySelector(".shipping-address-form").style.display = "none";
            document.querySelector(".pickup-locations").style.display = "block";
        }
    };
    document.querySelector(".btn-purchase").addEventListener("click", renderConfirmationModal);

    renderCheckoutItems();
}


function renderCheckoutItems()
{
    const cartItems = JSON.parse(sessionStorage.getItem("cart"));

    for (const cartItem of cartItems)
    {
        const cartItemContainer = document.createElement("div");
            cartItemContainer.classList.add("");
            cartItemContainer.innerHTML = `
                <img class="img cart-modal-img" src="${cartItem.image}">

                <div class="item-title-and-input-wrapper">
                    <h3 class="item-title">${cartItem.name}</h3>
                    <input type="number" min="0" value="${cartItem.quantity}" class="item-quantity">
                </div>

                <span class="item-price">$${cartItem.price * cartItem.quantity}</span>
                `;
    }
}


function renderConfirmationModal()
{
    //
}


function calculateCheckoutTotal()
{
    //
}