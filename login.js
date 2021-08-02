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
    if (sessionStorage.getItem("customerAccounts") == null)
    {
        sessionStorage.setItem("customerAccounts", JSON.stringify([]));
    }

    document.querySelector(".btn-login").addEventListener("click", () => {
        if (JSON.parse(sessionStorage.getItem("customerAccounts")).length !== 0)
        {
            signIn();
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
                            There are no accounts in the system.
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
    document.querySelector(".btn-register").addEventListener("click", registerNewAccount);
}


function registerNewAccount()
{
    const noInvalidInputs = verifyRegisterInputs();

    if (noInvalidInputs)
    {
        const customerAccounts = JSON.parse(sessionStorage.getItem("customerAccounts")),
        firstName = document.querySelector("#registerFName").value,
        lastName = document.querySelector("#registerLName").value,
        Email = document.querySelector("#registerEmail").value,
        Password = document.querySelector("#registerEmail").value,
        newUserAcct = 
        {
            fName: firstName,
            lName: lastName,
            email: Email,
            password: Password
        };

        customerAccounts.push(newUserAcct);
        sessionStorage.setItem("customerAccounts", JSON.stringify(customerAccounts));
        renderRegisterConfirmationMessage();
    }
}


function signIn()
{
    const noInvalidInputs = verifyLoginInputs();

    if (noInvalidInputs)
    {
        const customerAccounts = JSON.parse(sessionStorage.getItem("customerAccounts"));
    }
}


function verifyRegisterInputs()
{
    let noInvalidInputs = true;
    const firstName = document.querySelector("#registerFName").value,
    lastName = document.querySelector("#registerLName").value,
    email = document.querySelector("#registerEmail").value,
    password = document.querySelector("#registerEmail").value,
    confirmPassword = document.querySelector("#registerConfirmPassword").value;

    if (firstName.length === 0)
    {
        noInvalidInputs = false;
        document.querySelector("#registerFName").style.borderColor = "red";
        document.querySelector(".first-name-error-text").style.display = "block";
    }

    if (lastName.length === 0)
    {
        noInvalidInputs = false;
        document.querySelector("#registerLName").style.borderColor = "red";
        document.querySelector(".last-name-error-text").style.display = "block";
    }

    if (email.length === 0 || (!email.includes("@") || !email.includes(".com")))
    {
        noInvalidInputs = false;
        document.querySelector("#registerEmail").style.borderColor = "red";
        document.querySelector(".register-email-error-text").style.display = "block";
    }

    if (password.length === 0)
    {
        noInvalidInputs = false;
        document.querySelector("#registerPassword").style.borderColor = "red";
        document.querySelector(".register-password-error-text").style.display = "block";
    }

    if (confirmPassword.length === 0 || confirmPassword !== password)
    {
        noInvalidInputs = false;
        document.querySelector("#registerConfirmPassword").style.borderColor = "red";
        document.querySelector(".register-confirm-password-error-text").style.display = "block";
    }

    return noInvalidInputs;
}


function verifyLoginInputs()
{
    let noInvalidInputs = true;
    const email = document.querySelector("#loginEmail").value,
    password = document.querySelector("#loginPassword").value,
    customerAccounts = JSON.parse(sessionStorage.getItem("customerAccounts"));

    if (email.length === 0)
    {
        document.querySelector("#loginEmail").style.borderColor = "red";
        document.querySelector(".login-email-error-text").style.display = "block";
    }

    if (password.length === 0)
    {
        document.querySelector("#loginPassword").style.borderColor = "red";
        document.querySelector(".login-password-error-text").style.display = "block";
    }
}


function renderRegisterConfirmationMessage()
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
                    Your account has been registered!
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