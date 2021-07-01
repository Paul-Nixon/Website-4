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
                    <input type="text" class="modal-input">
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
                    <input type="text" class="modal-input">
                </div>

                <div class="input-wrapper">
                    <label>Tell us more</label>
                    <textarea class="modal-input" cols="30" rows="10"></textarea>
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
}