export function showChannelsList(channelsTitlesArray, feed) {
    const fuentes = document.getElementById("fuentes");
    channelsTitlesArray.forEach(title => {
        const newFont = document.createElement("li");
        newFont.innerHTML = title;
        newFont.className = "channelList"
        newFont.addEventListener("click", () => {
            if (newFont.style.textDecoration == "") {
                newFont.style.textDecoration = "line-through"
                newFont.style.color = "red";
            } else if (newFont.style.textDecoration == "line-through") {
                newFont.style.textDecoration = "";
                newFont.style.color = "";
            };
            cleanFeed();
            feed()
        })
        fuentes.appendChild(newFont);
        fuentes.style.display = "none";
    })
}

export function showNews(item) {
    const feed = document.getElementById("feed");

    const card = document.createElement("div");
    const idCard = item.guid;
    card.id = idCard;
    card.className = "card";

    const linkOnImage = document.createElement("a");
    linkOnImage.href = item.link;
    linkOnImage.target = "_blank";
    linkOnImage.id = "linkImagen";

    const image = document.createElement("img");
    image.src = item.thumbnail;
    image.id = "imagen";

    linkOnImage.appendChild(image);

    const content = document.createElement("div");
    content.id = "content";

    const info = document.createElement("div");
    info.id = "info";

    const date = document.createElement("p");
    const getDate = new Date(item.pubDate);
    const getMonth = getDate.toLocaleString("en-US", { month: "short" });;
    const getDay = getDate.getDate();
    date.id = "date";
    date.className = "dateCircle"
    date.innerHTML = getMonth + ". " + getDay;

    const favIcon = document.createElement("span");
    favIcon.id = "fav-icon";
    favIcon.className = "material-icons";
    favIcon.innerHTML = "favorite";
    favIcon.addEventListener("click", () => {
        const favorites = document.getElementById("fav");

        if (!favIcon.classList.contains("red600")) {
            favIcon.classList.add("red600");
            card.classList.add("fav");
            const newFavItem = document.createElement("div");
            newFavItem.innerHTML = card.outerHTML;
            newFavItem.id = idCard;
            const favCard = card.cloneNode(true);
            const getFavIcon = favCard.childNodes[1].childNodes[0].childNodes[1];
            getFavIcon.addEventListener("click", () => {
                favIcon.classList.remove("red600");
                const getItemToRemove = document.getElementById(idCard.toString());
                favorites.removeChild(getItemToRemove);
                if (favorites.childNodes.length == 3) {
                    document.getElementById("fav-message").style.display = "";
                } else {
                    document.getElementById("fav-message").style.display = "none";
                }
            })
            favorites.appendChild(favCard);
        } else {
            favIcon.classList.remove("red600");
            const getItemToRemove = document.getElementById(idCard.toString());
            favorites.removeChild(getItemToRemove);
        }
    });

    info.appendChild(date);
    info.appendChild(favIcon);

    const channelTitle = document.createElement("h2");
    channelTitle.innerHTML = item.channelTitle;

    const title = document.createElement("h1");
    title.id = "newsTitle";
    title.innerHTML = item.title;

    content.appendChild(info);
    content.appendChild(channelTitle);
    content.appendChild(title);

    card.appendChild(linkOnImage);
    card.appendChild(content);

    feed.appendChild(card);
}

function cleanFeed() {
    const app = document.getElementById("feed");
    app.innerHTML = "";
}

export function showBookMarks() {
    const bookmarks = document.getElementById("bookmarks")
    const favSection = document.getElementById("fav");
    const favMessage = document.getElementById("fav-message")

    favMessage.style.display = "none";

    bookmarks.addEventListener("click", () => {

        if (favSection.childNodes.length == 3) {
            document.getElementById("fav-message").style.display = "";
        } else {
            document.getElementById("fav-message").style.display = "none";
        }
    })
}

export function fakeSpa() {
    const bookmarks = document.getElementById("bookmarks")
    const favSection = document.getElementById("fav");
    const settings = document.getElementById("set");
    const navSettings = document.getElementById("settings");
    const feed = document.getElementById("feed");
    const news = document.getElementById("news");
    const fuentes = document.getElementById("fuentes");

    bookmarks.addEventListener("click", () => {
        feed.style.display = "none";
        favSection.style.display = "";
        settings.style.display = "none";
    })

    news.addEventListener("click", () => {
        feed.style.display = "";
        favSection.style.display = "none";
        settings.style.display = "none";
    })

    navSettings.addEventListener("click", () => {
        feed.style.display = "none";
        favSection.style.display = "none";
        settings.style.display = "";
        fuentes.style.display = "";
    })
}

export function darkLightMode() {
    document.getElementById("darkMode").addEventListener("click", () => {
        if (document.body.style.backgroundColor != "black") {
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";

            const getDateCircles = document.getElementsByClassName("dateCircle");
            Array.from(getDateCircles).forEach(element => {
                element.style.border = "1px solid white";
            });

            document.getElementById("darkMode").textContent = "light_mode";
            document.getElementById("headerWeb").style.borderBottom = "1px solid white"

        } else {
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
            document.getElementById("darkMode").textContent = "dark_mode";

            const getDateCircles = document.getElementsByClassName("dateCircle");
            Array.from(getDateCircles).forEach(element => {
                element.style.border = "1px solid black";
            });

            document.getElementById("headerWeb").style.borderBottom = "1px solid black"
        }
    })
}

