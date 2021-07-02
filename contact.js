if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready);
}
else
{
    ready();
}


function ready()
{
    document.querySelector(".btn-get-in-touch").addEventListener("click", renderModal);
}


function renderModal()
{
    //
    let modal = document.querySelector(".modal");

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
    }

    if (parseInt(subject.length) === 0)
    {
        //
        noInvalidInputs = false;
        document.querySelector("#subject-input").style.borderColor = "red";
    }

    if (parseInt(textarea.length) === 0)
    {
        //
        noInvalidInputs = false;
        document.querySelector("#textarea-input").style.borderColor = "red";
    }

    return noInvalidInputs;
}


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