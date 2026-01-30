function postUrl() {

    const siteName = document.getElementById("site_name").value
    const originalURL = document.getElementById("original_url").value
    const aliasInput = document.getElementById("alias_input").value
    const expirationDateInput = document.getElementById("date_input").value

    const data = {
        site_name: siteName,
        original_url: originalURL,
        alias: aliasInput,
        expires_at: expirationDateInput
    }

    fetch("/api/addURL", 
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"content-type": "application/json"}
        }
    )
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Error adding URL: Make sure alias is unique and expiration date is not in the past.")
        }   
    })
    fetchSavedUrls()
}

function onSubmitForm(){
    document.getElementById("shorten_url_form").addEventListener("submit", (e) => {e.preventDefault(); postUrl()})
}

document.addEventListener("DOMContentLoaded", onSubmitForm)