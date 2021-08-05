if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready)
}
else
{
    ready();
}

/*
    Function ready() creates an array which contains each customer's account info in storage if it
    doesn't exist, adds an event listener to the Login & register buttons, and calls
    assignOnChangeEventsToLoginInputs() & assignOnChangeEventsToRegisterInputs() to add event listeners to
    both forms' respective inputs.
    Precondition: The webpage's fully rendered.
    Postcondition: An array consisting of each customer's account info is created in storage, and the buttons
    and each of both forms' respective inputs have event listeners.
*/
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
                        <h2>No Accounts in Storage</h2>
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

/*
    Function registerNewAccount() calls verifyRegisterInputs() to verify whether the Register form's inputs
    are all valid. If so, its info is stored in storage, renderRegisterConfirmationMessage() is called
    to confirm to the customer that their account's been created, and clearRegisterInputs() is called
    to clear each of the Register form's inputs' field.
    Precondition: The Register button is clicked.
    Postcondition: If each of the Register form's inputs are all valid, then the user's account is created
    in storage, a confirmation message is rendered to them, and all the Register form's inputs are cleared.
    Otherwise, nothing occurs.
*/
function registerNewAccount()
{
    const noInvalidInputs = verifyRegisterInputs();

    if (noInvalidInputs)
    {
        const customerAccounts = JSON.parse(sessionStorage.getItem("customerAccounts")),
        firstName = document.querySelector("#registerFName").value,
        lastName = document.querySelector("#registerLName").value,
        Email = document.querySelector("#registerEmail").value,
        Password = document.querySelector("#registerPassword").value,
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
        clearRegisterInputs();
    }
}

/*
    Function signIn() calls verifyLoginInputs() to verify whether both of the Login form's inputs are valid.
    If so, a modal is rendered confirming to the user that their account exists in storage.
    Precondition: The Login button is clicked.
    Postcondition: If both the Login form's inputs are valid, then a confirmation modal is rendered.
*/
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
                    <h2>Account Exists</h2>
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

        clearLoginInputs();
    }
}

/*
    Function verifyRegisterInputs() verifies each of the Register form's inputs to see if they were filled
    correctly. If so, the function returns true, false otherwise.
    Precondition: The Register button is clicked.
    Postcondition: If all the Register form's inputs are valid, then the function returns true.
    Otherwise, it returns false and each incorrectly filled input's border color turns red & a corresponding
    error message is rendered below it.
*/
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

/*
    Function verifyLoginInputs() verifies each of the Login form's inputs to see if they were filled
    correctly. If so, the function returns true, false otherwise.
    Precondition: The Login button is clicked.
    Postcondition: If all the Login form's inputs are valid, then the function returns true.
    Otherwise, it returns false and each incorrectly filled input's border color turns red & a corresponding
    error message is rendered below it.
*/
function verifyLoginInputs()
{
    const email = document.querySelector("#loginEmail").value,
    password = document.querySelector("#loginPassword").value,
    customerAccounts = JSON.parse(sessionStorage.getItem("customerAccounts"));

    if (email.length === 0 || (!email.includes("@") || !email.includes(".com")))
    {
        document.querySelector("#loginEmail").style.borderColor = "red";
        document.querySelector(".login-email-error-text").style.display = "block";
        return false;
    }
    else if (!emailExistsInStorage(email))
    {
        document.querySelector("#loginEmail").style.borderColor = "red";
        document.querySelector(".login-email-nonexistent-error-text").style.display = "block";
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

/*
    Function renderRegisterConfirmationMessage() renders a modal confirming to the user that their account
    has been created.
    Precondition: The Register button is clicked and all the Register form's inputs are correctly filled.
    Postcondition: A modal is rendered confirming to the user that their account has been created.
*/
function renderRegisterConfirmationMessage()
{
    const modal = document.querySelector(".modal");

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h2>Account Confirmation</h2>
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

/*
    Function emailExistsInStorage(email) searches for the email given in the Login form's email input
    to see if it's in storage.
    Precondition: The user clicked the Login button.
    Postcondition: If the email exists in storage, the function returns true. Otherwise, it returns false.
*/
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

/*
    Function assignOnChangeEventsToRegisterInputs() adds an onchange event listener to each
    of the Register form's inputs for input validation.
    Precondition: The webpage's fully rendered.
    Postcondition: Each of the Register form's inputs have an onchange event listener.
*/
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
            document.querySelector("#registerEmail").style.borderColor = "initial";
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

/*
    Function assignOnChangeEventsToLoginInputs() adds an onchange event listener to each
    of the Login form's inputs for input validation.
    Precondition: The webpage's fully rendered.
    Postcondition: Each of the Login form's inputs have an onchange event listener.
*/
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
            document.querySelector(".login-email-nonexistent-error-text").style.display = "none";
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

/*
    Function clearRegisterInputs() clears each of the Register form's inputs' respective field.
    Precondition: The Register button is clicked and all the Register form's inputs are correctly filled.
    Postcondition: Each of the Register form's inputs' respective field are cleared.
*/
function clearRegisterInputs()
{
    document.querySelector("#registerFName").value = "";
    document.querySelector("#registerLName").value = "";
    document.querySelector("#registerEmail").value = "";
    document.querySelector("#registerPassword").value = "";
    document.querySelector("#registerConfirmPassword").value = "";
}

/*
    Function clearLoginInputs() clears both of the Login form's inputs' respective field.
    Precondition: The Login button is clicked and both of the Login form's inputs are valid.
    Postcondition: Each of the Login form's inputs' respective field are cleared.
*/
function clearLoginInputs()
{
    document.querySelector("#loginEmail").value = "";
    document.querySelector("#loginPassword").value = "";
}