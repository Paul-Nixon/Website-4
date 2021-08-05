if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready)
}
else
{
    ready();
}

/*
    Function ready() adds an event listener to the Purchase button, calls addEventListenersToInputs() to
    add an onchange event to each of the form's inputs, and calls renderCheckoutItems(tax) to render each
    of the user's cart items on the webpage.
    Precondition: The webpage's fully rendered.
    Postcondition: Event listeners are added to the Purchase button & the form's inputs, and all the user's
    cart items are rendered on the webpage.
*/
function ready()
{
    document.querySelector(".btn-purchase").addEventListener("click", () => {
        const email = document.querySelector("#email").value;
        
        if (document.querySelector(".shipping-address-form").style.display != "none")
        {
            validateInputs();
        }
        else if (email.length === 0 || (!email.includes("@") || !email.includes(".com")))
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

/*
    Function renderCheckoutItems(tax) renders the user's cart items' respective info on the webpage.
    Precondition: The webpage's fully rendered.
    Postcondition: All the user's cart items are rendered on the webpage.
*/
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

/*
    Function renderConfirmationMessage() renders a modal confirming to the user their purchase is completed.
    Precondition: The user clicked the Purchase button and all the inputs were filled correctly.
    Postcondition: A modal is rendered confirming to the user their purchase is completed.
*/
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

/*
    Function validateInputs() validates each of the form's inputs.
    Precondition: The user clicked the Purchase button.
    Postcondition: If all the form's inputs were correctly filled, renderConfirmationMessage() is called to
    inform the reader their purchase was successful. Otherwise, a number is passed to
    renderErrorMessage(switchValue) which renders an error message corresponding to the incorrectly filled
    input.
*/
function validateInputs()
{
    if (document.querySelector("#email").value.length === 0 || (document.querySelector("#email").value.includes("@") || !document.querySelector("#email").value.includes(".com")))
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
    else if (document.querySelector("#zipCode").value.length !== 5 || isNaN(document.querySelector("#zipCode").value))
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

/*
    Function addEventListenersToInputs() adds an onchange event to each of the form's inputs for input validation.
    Precondition: The webpage's fully rendered.
    Postcondition: Each input has an onchange event which validates its value.
*/
function addEventListenersToInputs()
{
    document.querySelector("#email").onchange = (event) => {
        if (event.target.value.length === 0 || (!event.target.value.includes("@") || !event.target.value.includes(".com")))
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
}

/*
    Function renderErrorMessage(switchValue) renders a modal telling the user what error they made on one of the
    form's inputs.
    Precondition: The user clicked the Purchase button.
    Postcondition: A modal is rendered which explains the error a user made on an input.
*/
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