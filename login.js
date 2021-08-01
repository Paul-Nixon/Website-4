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

    document.querySelector(".btn-login").addEventListener("click", signIn);
    document.querySelector(".btn-register").addEventListener("click", registerAccount);
}


function registerAccount()
{
    //
}


function signIn()
{
    //
}


function verifyRegisterInputs()
{

}


function verifyLoginInputs()
{

}