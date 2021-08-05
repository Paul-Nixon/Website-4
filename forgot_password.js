if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready)
}
else
{
    ready();
}

/*
    Function ready() adds an event listener to the Get Password button which validates the webpage's input.
    Precondition: The webpage's fully rendered.
    Postcondition: If the input contains an error, a modal will render explaining what's wrong w/its value.
    Otherwise, getPassword() is called to find the user's password.
*/
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

/*
    Function getPassword() searches through the array of customer accounts until it finds the password
    corresponding to the email entered in the input.
    Precondition: The user clicked the Get Password button and the webpage's input was correctly filled.
    Postcondition: Once the password is found, it's passed to renderPassword(password) to 
    render it in a modal.
*/
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

/*
    Function renderPassword() renders the password received from getPassword() in a modal.
    Precondition: The password corresponding to the email given in the webpage's input was found and
    passed to this function.
    Postcondition: A modal is rendered displaying the password corresponding to the email given
    in the webpage's input.
*/
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

/*
    Function emailExistsInStorage(email) searches for the email given in the webpage's input to see if it's
    in storage.
    Precondition: The user clicked the Get Password button.
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