function deleteURL(){
    const alias = document.getElementById("aliasInput").value;
    fetch(`/api/links/${alias}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            alert("Link deleted successfully!");
            document.getElementById("aliasInput").value = "";
        } else {
            alert("Failed to delete link.");
        }
    })
    .catch(error => {
        console.error("Error deleting link:", error);
        alert("An error occurred while deleting the link.");
    });
}

document.addEventListener("DOMContentLoaded",()=>{document.getElementById("deleteBtn").addEventListener("click",deleteURL)});
