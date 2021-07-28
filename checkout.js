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
            document.querySelector(".delivery-method-label").innerText = "Shipping";
        }
    };
    document.querySelector("#pickup").onchange = (event) => {
        if (event.target.checked)
        {
            document.querySelector(".shipping-address-form").style.display = "none";
            document.querySelector(".pickup-locations").style.display = "block";
            document.querySelector(".delivery-method-label").innerText = "Pick-up";
        }
    };
    document.querySelector(".btn-purchase").addEventListener("click", () => {
        if (document.querySelector(".shipping-address-form").style.display != "none")
        {
            validateInputs();
        }
        else if (document.querySelector("#email").validity.typeMismatch)
        {
            renderErrorMessage(1);
        }
        else
        {
            renderConfirmationMessage();
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
            <div class="checkout-item-img-wrapper">
                <img class="img checkout-item-img" src="${cartItem.image}">
                <span class="checkout-item-quantity">${cartItem.quantity}</span>
            </div>
            <h3 class="checkout-item-title">${cartItem.name}</h3>
            <span class="item-price">$${cartItem.price * cartItem.quantity}</span>
            `;
        document.querySelector(".checkout-items-wrapper").appendChild(cartItemContainer);
    }

    document.querySelector(".subtotal").innerText = "$" + total;
    document.querySelector(".total-price").innerText = "$" + (total + tax).toFixed(2);
}


function renderConfirmationMessage()
{
    const modal = document.querySelector(".modal");

    modal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <a href="/">
                <span class="close">&times;</span>
            </a>
            <h2>Purchase Confirmed</h2>
        </div>
        <div class="modal-body">
            <p>
                Your purchase has been confirmed! Click this modal's close button to
                view the homepage.
            </p>
        </div>
    </div>`;
    modal.style.display = "block";
}


function validateInputs()
{
    if (document.querySelector("#email").validity.typeMismatch)
    {
        renderErrorMessage(1);
    }
    else if (document.querySelector("#firstName").value.length === 0)
    {
        renderErrorMessage(2);
    }
    else if (document.querySelector("#lastName").value.length === 0)
    {
        renderErrorMessage(3);
    }
    else if (document.querySelector("#address").value.length === 0)
    {
        renderErrorMessage(4);
    }
    else if (document.querySelector("#city").value.length === 0)
    {
        renderErrorMessage(5);
    }
    else if (document.querySelector("#zipCode").value.length === 0)
    {
        renderErrorMessage(6);
    }
    else if (document.querySelector("#telNo").value.length === 0)
    {
        renderErrorMessage(7);
    }
    else
    {
        sessionStorage.removeItem("cart");
        renderConfirmationMessage();
    }
}


function addEventListenersToInputs()
{
    document.querySelector("#email").onchange = (event) => {
        if (event.target.validity.typeMismatch)
        {
            event.target.style.backgroundColor = "red";
        }
        else
        {
            event.target.style.backgroundColor = "white";
        }
    };
    document.querySelector("#firstName").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            event.target.style.backgroundColor = "red";
        }
        else
        {
            event.target.style.backgroundColor = "white";
        }
    };
    document.querySelector("#lastName").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            event.target.style.backgroundColor = "red";
        }
        else
        {
            event.target.style.backgroundColor = "white";
        }
    };
    document.querySelector("#address").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            event.target.style.backgroundColor = "red";
        }
        else
        {
            event.target.style.backgroundColor = "white";
        }
    };
    document.querySelector("#city").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            event.target.style.backgroundColor = "red";
        }
        else
        {
            event.target.style.backgroundColor = "white";
            event.target.setCustomValidity("");
        }
    };
    document.querySelector("#zipCode").onchange = (event) => {
        if (event.target.value.length !== 5 || isNaN(event.target.value))
        {
            event.target.style.backgroundColor = "red";
        }
        else
        {
            event.target.style.backgroundColor = "white";
        }
    };
    document.querySelector("#telNo").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            event.target.style.backgroundColor = "red";
        }
        else
        {
            event.target.style.backgroundColor = "white";
        }
    };
}


function renderErrorMessage(switchValue)
{
    const modal = document.querySelector(".modal");

    switch (switchValue)
    {
        case 1:
            modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>Input Error</h2>
                </div>
                <div class="modal-body">
                    <p>
                        The email you entered doesn't contain either '@' and/or a domain.
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
            break;

        case 2:
            modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>Input Error</h2>
                </div>
                <div class="modal-body">
                    <p>
                        First name field cannot be empty.
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
            break;

        case 3:
            modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>Input Error</h2>
                </div>
                <div class="modal-body">
                    <p>
                        Last name field cannot be empty.
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
            break;

        case 4:
            modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>Input Error</h2>
                </div>
                <div class="modal-body">
                    <p>
                        Address field cannot be blank.
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
            break;

        case 5:
            modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>Input Error</h2>
                </div>
                <div class="modal-body">
                    <p>
                        City field cannot be blank.
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
            break;

        case 6:
            modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>Input Error</h2>
                </div>
                <div class="modal-body">
                    <p>
                        You didn't enter 5 digits in the ZIP code field.
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
            break;

        case 7:
            modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>Input Error</h2>
                </div>
                <div class="modal-body">
                    <p>
                        Phone number field cannot be blank.
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
            break;
    }
}