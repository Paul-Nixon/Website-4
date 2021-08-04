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
        if (document.querySelector("#emailInput").value.length === 0)
        {
            const modal = document.querySelector(".modal");

            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close">&times;</span>
                        <h2>Empty Email Field</h2>
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
        else if (!emailExistsInStorage(document.querySelector("#emailInput").value))
        {
            const modal = document.querySelector(".modal");

            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close">&times;</span>
                        <h2>Email Doesn't Exist</h2>
                    </div>
                    <div class="modal-body">
                        <p>
                            The email doesn't exist in the storage.
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
        else
        {
            getPassword();
        }
    });
}


function getPassword()
{
    const email = document.querySelector("#emailInput").value,
    customerAccounts = JSON.parse(sessionStorage.getItem("customerAccounts"));

    for (customerAcct of customerAccounts)
    {
        if (customerAcct.email === email)
        {
            renderPassword(customerAcct.password);
            break;
        }
    }
}


function renderPassword(password)
{
    const modal = document.querySelector(".modal");

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h2>Password Found!</h2>
            </div>
            <div class="modal-body">
                <p>
                    Your password is ${password}.
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


function emailExistsInStorage(email)
{
    const customerAccounts = JSON.parse(sessionStorage.getItem("customerAccounts"));

    for (customerAcct of customerAccounts)
    {
        if (customerAcct.email === email)
        {
            return true;
        }
    }

    return false;
}