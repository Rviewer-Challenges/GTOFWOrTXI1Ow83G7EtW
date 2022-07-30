export function showFontsUI(channelsArray, feed) {
    const fuentes = document.getElementById("fuentes");
    fuentes.id = "fuentes";
    channelsArray.forEach(element => {
        const newFont = document.createElement("li");
        newFont.innerHTML = element.channelName;
        newFont.id = channelsArray.indexOf(element);
        newFont.className = "channelList"
        newFont.addEventListener("click", () => {
            if (newFont.style.textDecoration == "") {
                newFont.style.textDecoration = "line-through"
            } else if (newFont.style.textDecoration == "line-through") {
                newFont.style.textDecoration = "";
            };
            cleanFeed();
            setTimeout(() => {
                feed()
            }, 2500);
        })
        fuentes.appendChild(newFont);
    })
}

export function showUi(item) {
    const feed = document.getElementById("feed");

    const card = document.createElement("div");
    const idCard = item.guid;
    card.id = idCard;
    card.className = "card";

    const image = document.createElement("img");
    image.src = item.thumbnail;
    image.id = "imagen";

    const content = document.createElement("div");
    content.id = "content";

    const info = document.createElement("div");
    info.id = "info";

    const date = document.createElement("p");
    date.id = "date";
    date.innerHTML = "21 Jul";
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
            newFavItem.id = idCard
            favorites.appendChild(newFavItem);
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
title.innerHTML = item.title;

const btnShow = document.createElement("p");
btnShow.innerHTML = "Read more";
btnShow.id = "btn-show";

content.appendChild(info);
content.appendChild(channelTitle);
content.appendChild(title);
content.appendChild(btnShow);

//CARD-DESCRIPTION
const cardDescription = document.createElement("div");
const idCardDescription = "desC" + item.guid;
cardDescription.id = idCardDescription;
cardDescription.className = "card-description";
cardDescription.style.display = "none";

const btnClose = document.createElement("span");
btnClose.id = "btn-close";
btnClose.className = "material-icons";
btnClose.innerHTML = "close";

const titleDescription = document.createElement("h1");
titleDescription.innerHTML = item.title;

const imageDescription = document.createElement("img");
imageDescription.src = item.thumbnail;
imageDescription.id = "imagenDesc";

const description = document.createElement("p");
description.id = "description";
description.innerHTML = item.description;

btnShow.addEventListener("click", () => {
    document.getElementById(idCard.toString()).style.display = "none";
    document.getElementById(idCardDescription.toString()).style.display = "";
});

btnClose.addEventListener("click", () => {
    document.getElementById(idCardDescription.toString()).style.display = "none";
    document.getElementById(idCard.toString()).style.display = "";
});

card.appendChild(image);
card.appendChild(content);
card.appendChild(cardDescription);

cardDescription.appendChild(btnClose);
cardDescription.appendChild(titleDescription);
cardDescription.appendChild(imageDescription);
cardDescription.appendChild(description);

feed.appendChild(card);
feed.appendChild(cardDescription);

}

export function cleanFeed() {
    const app = document.getElementById("feed");
    app.innerHTML = "";
}


