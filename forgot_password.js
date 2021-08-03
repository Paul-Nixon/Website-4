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
    document.querySelector(".btn-get-password").addEventListener("click", () => {
        if (document.querySelector("#emailInput").value.length !== 0)
        {
            getPassword();
        }
        else
        {
            const modal = document.querySelector(".modal");

            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close">&times;</span>
                        <h2>Item Exists in Cart</h2>
                    </div>
                    <div class="modal-body">
                        <p>
                            The email field is empty. Please enter an email in it.
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
        }
    });
}


function getPassword()
{
    const email = document.querySelector("#emailInput").value,
    customerAccounts = JSON.parse(sessionStorage.getItem("customerAccounts"));

    
}