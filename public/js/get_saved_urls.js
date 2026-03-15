let filter = ""
async function fetchSavedUrls() {
    


    const savedLinksList = document.getElementById('saved_links');
    try {
        await fetch('/api/links')
            .then(response => response.json())
            .then(data => {

                let linkData = data

                if (filter.length > 0) {
                    linkData = data.filter(link => 
                        link.site_name.toLowerCase().includes(filter) ||
                        link.original_url.toLowerCase().includes(filter) ||
                        link.alias.toLowerCase().includes(filter)
                    )
                }

                savedLinksList.innerHTML = '';
                linkData.forEach(link => {
                    const listItem = document.createElement('li');
                    const itemContainer = document.createElement('div');
                    itemContainer.classList.add('link-item');

                    const icon = document.createElement("img")
                    icon.src = "https://favicon.im/" + link.original_url
                    icon.classList.add("icon")
                    itemContainer.append(icon)

                    const name = document.createElement('p');
                    name.textContent = `${link.site_name}`;
                    name.classList.add("equal_width")
                    itemContainer.appendChild(name);


                    const originalLink = document.createElement('a');
                    originalLink.textContent = `${link.original_url}`;
                    originalLink.href = link.original_url;
                    originalLink.target = '_blank';
                    itemContainer.appendChild(originalLink);
                    originalLink.classList.add("original_link")

                    const alias = document.createElement('a');
                    alias.href = `/${link.alias}`;
                    alias.textContent = `${link.alias}`;
                    alias.target = '_blank';
                    alias.classList.add("equal_width")
                    itemContainer.appendChild(alias);

                    const createdAt = document.createElement('p');
                    createdAt.textContent = `${new Date(link.created_at).toLocaleDateString()}`;
                    createdAt.classList.add("equal_width")
                    itemContainer.appendChild(createdAt);

                    const expiration = document.createElement('p');
                    expiration.textContent = `${link.expires_at ? new Date(link.expires_at).toLocaleDateString() : "Never"}`;
                    expiration.classList.add("equal_width")
                    itemContainer.appendChild(expiration);

                    const deleteBtn = document.createElement("button")
                    deleteBtn.classList.add("delete_btn")
                    deleteBtn.textContent = "🗑️ Delete"

                    itemContainer.append(deleteBtn)

                    deleteBtn.addEventListener("click", async () => {
                        await fetch(`/api/deleteURL/${link.alias}`, {
                            method: "DELETE"
                        })
                        fetchSavedUrls()
                    })

                    listItem.appendChild(itemContainer);


                    savedLinksList.appendChild(listItem);
                });
                });
    } catch (error) {
        console.error('Error fetching saved URLs:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
        fetchSavedUrls();
        document.getElementById("search_input").addEventListener("input", (e => {
        filter = e.target.value.toLowerCase()
        fetchSavedUrls()
    }))
});

