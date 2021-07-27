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
    document.querySelector(".btn-purchase").addEventListener("click", () => {
        if (document.querySelector(".shipping-address-form").style.display != "none")
        {
            validateInputs();
        }
        else
        {
            renderConfirmationModal();
        }
    });

    addEventListenersToInputs();

    const tax = 3.95;
    document.querySelector(".tax-price").innerText = "$" + tax;
    renderCheckoutItems(tax);
}


function renderCheckoutItems(tax)
{
    const cartItems = JSON.parse(sessionStorage.getItem("cart"));
    let total = 0;

    for (const cartItem of cartItems)
    {
        total = total + cartItem.price * cartItem.quantity;
        const cartItemContainer = document.createElement("div");
        cartItemContainer.classList.add("checkout-item");
        cartItemContainer.innerHTML = `
            <img class="img checkout-item-img" src="${cartItem.image}">
            <span class="checkout-item-quantity">${cartItem.quantity}</span>
            <h3 class="checkout-item-title">${cartItem.name}</h3>
            <span class="item-price">$${cartItem.price * cartItem.quantity}</span>
            `;
        document.querySelector(".checkout-items-wrapper").appendChild(cartItemContainer);
    }

    document.querySelector(".subtotal").innerText = "$" + total;
    document.querySelector(".total-price").innerText = "$" + (total + tax);
}


function renderConfirmationModal()
{
    const modal = document.querySelector(".modal");

    modal.innerHTML = ``;
}


function validateInputs()
{
    let errorCount = 0;

    if (document.querySelector("#email").validity.typeMismatch)
    {
        errorCount = 1;
    }
    
}


function addEventListenersToInputs()
{
    document.querySelector("#email").onchange = (event) => {
        if (event.target.validity.typeMismatch)
        {
            event.target.style.backgroundColor = "red";
            event.target.setCustomValidity("The email doesn't contain either '@' or a domain.");
        }
        else
        {
            event.target.style.backgroundColor = "white";
            event.target.setCustomValidity("");
        }
    };
    document.querySelector("#firstName").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            event.target.style.backgroundColor = "red";
            event.target.setCustomValidity("First name field cannot be blank.");
        }
        else
        {
            event.target.style.backgroundColor = "white";
            event.target.setCustomValidity("");
        }
    };
    document.querySelector("#lastName").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            event.target.style.backgroundColor = "red";
            event.target.setCustomValidity("Last name field cannot be blank.");
        }
        else
        {
            event.target.style.backgroundColor = "white";
            event.target.setCustomValidity("");
        }
    };
    document.querySelector("#address").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            event.target.style.backgroundColor = "red";
            event.target.setCustomValidity("Address field cannot be blank.");
        }
        else
        {
            event.target.style.backgroundColor = "white";
            event.target.setCustomValidity("");
        }
    };
    document.querySelector("#city").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            event.target.style.backgroundColor = "red";
            event.target.setCustomValidity("City field cannot be blank.");
        }
        else
        {
            event.target.style.backgroundColor = "white";
            event.target.setCustomValidity("");
        }
    };
    document.querySelector("#zipCode").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            event.target.style.backgroundColor = "red";
            event.target.setCustomValidity("Zip code field cannot be blank.");
        }
        else
        {
            event.target.style.backgroundColor = "white";
            event.target.setCustomValidity("");
        }
    };
    document.querySelector("#telNo").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            event.target.style.backgroundColor = "red";
            event.target.setCustomValidity("Phone number field cannot be blank.");
        }
        else
        {
            event.target.style.backgroundColor = "white";
            event.target.setCustomValidity("");
        }
    };
}