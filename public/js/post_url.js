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
    fetchSavedUrls()
}

function onSubmitForm(){
    document.getElementById("shorten_url_form").addEventListener("submit", (e) => {e.preventDefault(); postUrl()})
}

document.addEventListener("DOMContentLoaded", onSubmitForm)