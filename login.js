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
                            There are no accounts in the storage.
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

    assignOnChangeEventsToLoginInputs();
    assignOnChangeEventsToRegisterInputs();

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
        const modal = document.querySelector(".modal");

            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close">&times;</span>
                        <h2>Item Exists in Cart</h2>
                    </div>
                    <div class="modal-body">
                        <p>
                            This account exists in the storage!
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
}


function verifyRegisterInputs()
{
    let noInvalidInputs = true;
    const firstName = document.querySelector("#registerFName").value,
    lastName = document.querySelector("#registerLName").value,
    email = document.querySelector("#registerEmail").value,
    password = document.querySelector("#registerPassword").value,
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
    else if (emailExistsInStorage(email))
    {
        noInvalidInputs = false;
        document.querySelector("#registerEmail").style.borderColor = "red";
        document.querySelector(".register-email-exists-error-text").style.display = "block";
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
    const email = document.querySelector("#loginEmail").value,
    password = document.querySelector("#loginPassword").value,
    customerAccounts = JSON.parse(sessionStorage.getItem("customerAccounts"));

    if (email.length === 0)
    {
        document.querySelector("#loginEmail").style.borderColor = "red";
        document.querySelector(".login-email-error-text").style.display = "block";
        return false;
    }
    else if (password.length === 0)
    {
        document.querySelector("#loginPassword").style.borderColor = "red";
        document.querySelector(".login-password-error-text").style.display = "block";
        return false;
    }
    else
    {
        for (customerAcct of customerAccounts)
        {
            if (customerAcct.email === email && customerAcct.password === password)
            {
                return true;
            }
        }
    }

    return false;
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


function assignOnChangeEventsToRegisterInputs()
{
    document.querySelector("#registerFName").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            document.querySelector("#registerFName").style.borderColor = "red";
            document.querySelector(".first-name-error-text").style.display = "block";
        }
        else
        {
            document.querySelector("#registerFName").style.borderColor = "initial";
            document.querySelector(".first-name-error-text").style.display = "none";
        }
    };

    document.querySelector("#registerLName").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            document.querySelector("#registerLName").style.borderColor = "red";
            document.querySelector(".last-name-error-text").style.display = "block";
        }
        else
        {
            document.querySelector("#registerLName").style.borderColor = "initial";
            document.querySelector(".last-name-error-text").style.display = "none";
        }
    };

    document.querySelector("#registerEmail").onchange = (event) => {
        if (event.target.value.length === 0 || (!event.target.value.includes("@") || !event.target.value.includes(".com")))
        {
            document.querySelector("#registerEmail").style.borderColor = "red";
            document.querySelector(".register-email-error-text").style.display = "block";
        }
        else if (emailExistsInStorage(event.target.value))
        {
            document.querySelector("#registerEmail").style.borderColor = "red";
            document.querySelector(".register-email-exists-error-text").style.display = "block";
        }
        else
        {
            document.querySelector("#registerLName").style.borderColor = "initial";
            document.querySelector(".register-email-error-text").style.display = "none";
            document.querySelector(".register-email-exists-error-text").style.display = "none";
        }
    };

    document.querySelector("#registerPassword").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            document.querySelector("#registerPassword").style.borderColor = "red";
            document.querySelector(".register-password-error-text").style.display = "block";
        }
        else
        {
            document.querySelector("#registerPassword").style.borderColor = "initial";
            document.querySelector(".register-password-error-text").style.display = "none";
        }
    };

    document.querySelector("#registerConfirmPassword").onchange = (event) => {
        if (event.target.value.length === 0 || event.target.value !== document.querySelector("#registerPassword").value)
        {
            document.querySelector("#registerConfirmPassword").style.borderColor = "red";
            document.querySelector(".register-confirm-password-error-text").style.display = "block";
        }
        else
        {
            document.querySelector("#registerConfirmPassword").style.borderColor = "initial";
            document.querySelector(".register-confirm-password-error-text").style.display = "none";
        }
    };
}


function assignOnChangeEventsToLoginInputs()
{
    document.querySelector("#loginEmail").onchange = (event) => {
        if (event.target.value.length === 0 || (!event.target.value.includes("@") || !event.target.value.includes(".com")))
        {
            document.querySelector("#loginEmail").style.borderColor = "red";
            document.querySelector(".login-email-error-text").style.display = "block";
        }
        else
        {
            document.querySelector("#loginEmail").style.borderColor = "initial";
            document.querySelector(".login-email-error-text").style.display = "none";
        }
    };

    document.querySelector("#loginPassword").onchange = (event) => {
        if (event.target.value.length === 0)
        {
            document.querySelector("#loginPassword").style.borderColor = "red";
            document.querySelector(".login-password-error-text").style.display = "block";
        }
        else
        {
            document.querySelector("#loginPassword").style.borderColor = "initial";
            document.querySelector(".login-password-error-text").style.display = "none";
        }
    };
}