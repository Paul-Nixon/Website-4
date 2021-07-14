if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready);
}
else
{
    ready();
}

/*
    Function ready() simply adds an event listener to the webpage's button that'll call renderModal()
    when it's clicked.
    Precondition: The webpage's fully loaded.
    Postcondition: An event listener is added to the webpage's button that'll call renderModal()
    when it's clicked.
*/
function ready()
{
    document.querySelector(".btn-get-in-touch").addEventListener("click", renderModal);
}

/*
    Function renderModal() renders a modal, calls assignOnChangeEventsToModalInputs(), & adds an event
    listener to the modal's button that'll call renderConfirmationMessage() when it's clicked.
    Precondition: The webpage's button is clicked.
    Postcondition: A modal is rendered, assignOnChangeEventsToModalInputs() is called, & an event listener is
    added to the modal's button that'll call renderConfirmationMessage() when it's clicked.
*/
function renderModal()
{
    //
    const modal = document.querySelector(".modal");

    //
    modal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <span class="close">&times;</span>
            <h2>Submit a request</h2>
        </div>

        <div class="modal-body">
            <div class="input-wrapper">
                <label class="required">Your email address</label>
                <input type="text" class="modal-input" id="email-input">
                <div class="email-error-text">
                    The email field either is empty or doesn't contain "@" or ".com."
                </div>
            </div>

            <div class="input-wrapper">
                <label for="help">What can we help you with today?</label>
                <select name="help" class="modal-input">
                    <option value="products-and-fit">Products &amp; Fit</option>
                    <option value="returns-and-exchanges">Returns &amp; Exchanges</option>
                    <option value="change-cancel-order">Change/Cancel My Order</option>
                    <option value="billing-and-payment">Billing &amp; Payment</option>
                    <option value="shipping-and-tracking">Shipping &amp; Tracking</option>
                    <option value="order-status">Order Status</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="input-wrapper">
                <label class="required">Subject</label>
                <input type="text" class="modal-input" id="subject-input">
                <div class="subject-error-text">The text field is empty.</div>
            </div>

            <div class="input-wrapper">
                <label class="required">Tell us more</label>
                <textarea class="modal-input" cols="15" rows="5" id="textarea-input"></textarea>
                <div class="textarea-error-text">The textarea is empty.</div>
            </div>
        </div>

        <div class="modal-footer">
            <button class="btn btn-submit">Submit</button>
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
    };

    //
    assignOnChangeEventsToModalInputs();

    // 
    document.querySelector(".btn-submit").addEventListener("click", renderConfirmationMessage);
}

/*
    Function renderConfirmationMessage() calls verifyInputs() to verify whether all the modal's inputs were
    correctly filled and, if so, modifies it to display a confirmation message to the user.
    Precondition: The modal's button is clicked.
    Postcondition: If all the modal's inputs were correctly filled, a confirmation message will be displayed to
    the user. Otherwise, a respective error message will display under each incorrectly filled input.
*/
function renderConfirmationMessage()
{
    //
    let noInvalidInputs = verifyInputs();

    if (noInvalidInputs)
    {
        //
        let modal = document.querySelector(".modal");
        modal.querySelector(".btn-submit").style.display = "none";
        modal.querySelector(".modal-body").innerHTML = ``;
        modal.querySelector(".modal-body").innerHTML = `
        <p>Your message has been sent! Click outside this window or the button at the top right to close it.</p>`;
    }
}

/*
    Function verifyInputs() verifies each of the modal's inputs to determine whether they were correctly filled.
    If an input was incorrectly filled, a respective error message will render below it. Also, the function returns
    a boolean variable to renderConfirmationMessage().
    Precondition: The modal's button is clicked.
    Postcondition: If an input was incorrectly filled, a respective error message will render below it. Also, a
    boolean variable is returned to renderConfirmationMessage().
*/
function verifyInputs()
{
    let noInvalidInputs = true;
    let email = document.querySelector("#email-input").value;
    let subject = document.querySelector("#subject-input").value;
    let textarea = document.querySelector("#textarea-input").value;

    if (parseInt(email.length) === 0 || (!email.includes("@") || !email.includes(".com")))
    {
        // 
        noInvalidInputs = false;
        document.querySelector("#email-input").style.borderColor = "red";
        document.querySelector(".email-error-text").style.display = "block";
    }

    if (parseInt(subject.length) === 0)
    {
        //
        noInvalidInputs = false;
        document.querySelector("#subject-input").style.borderColor = "red";
        document.querySelector(".subject-error-text").style.display = "block";
    }

    if (parseInt(textarea.length) === 0)
    {
        //
        noInvalidInputs = false;
        document.querySelector("#textarea-input").style.borderColor = "red";
        document.querySelector(".textarea-error-text").style.display = "block";
    }

    return noInvalidInputs;
}

/*
    Function assignOnChangeEventsToModalInputs() assigns an onchange event to each of the modal's inputs that'll
    render a respective error message if it's incorrectly filled.
    Precondition: The webpage's button is clicked.
    Postcondition: An onchange event is assigned to each of the modal's inputs.
*/
function assignOnChangeEventsToModalInputs()
{
    document.querySelector("#email-input").onchange = (event) => {
        if (parseInt(event.target.value.length) === 0 || (!event.target.value.includes("@") || !event.target.value.includes(".com")))
        {
            event.target.style.borderColor = "red";
            document.querySelector(".email-error-text").style.display = "block";
        }
        else
        {
            event.target.style.borderColor = "black";
            document.querySelector(".email-error-text").style.display = "none";
        }
    }

    document.querySelector("#subject-input").onchange = (event) => {
        if (parseInt(event.target.value.length) === 0)
        {
            event.target.style.borderColor = "red";
            document.querySelector(".subject-error-text").style.display = "block";
        }
        else
        {
            event.target.style.borderColor = "black";
            document.querySelector(".subject-error-text").style.display = "none";
        }
    }

    document.querySelector("#textarea-input").onchange = (event) => {
        if (parseInt(event.target.value.length) === 0)
        {
            event.target.style.borderColor = "red";
            document.querySelector(".textarea-error-text").style.display = "block";
        }
        else
        {
            event.target.style.borderColor = "black";
            document.querySelector(".textarea-error-text").style.display = "none";
        }
    }
}