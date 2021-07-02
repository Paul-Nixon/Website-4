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
                <label>Your email address</label>
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
                <label>Subject</label>
                <input type="text" class="modal-input" id="subject-input">
                <div class="subject-error-text">The text field is empty.</div>
            </div>

            <div class="input-wrapper">
                <label>Tell us more</label>
                <textarea class="modal-input" cols="30" rows="10" id="textarea-input"></textarea>
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
    document.querySelector(".btn-submit").addEventListener("click", renderConfirmationMessage);
}


function renderConfirmationMessage()
{
    //
    let noInvalidInputs = verifyInputs();

    if (noInvalidInputs)
    {
        //
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