//Site using to parse rss to json.
//https://rss2json.com/#rss_url=https%3A%2F%2Fgithub.com%2Fdjango%2Fdjango%2Freleases.atom

import { showChannelsList, showNews } from "./Ui";

export const CHANNELS_URLS = [
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fdailyjs&api_key=p2lpxmy5vpwurnjkynqeecnr3kva3hcbeny6olje&count=10",
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.sitepoint.com%2Fsitepoint.rss&api_key=p2lpxmy5vpwurnjkynqeecnr3kva3hcbeny6olje&count=10",
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.infoworld.com%2Findex.rss&api_key=p2lpxmy5vpwurnjkynqeecnr3kva3hcbeny6olje&count=10",
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.smashingmagazine.com%2Ffeed%2F&api_key=p2lpxmy5vpwurnjkynqeecnr3kva3hcbeny6olje&count=10"
];

export const fetchChannels = (choosedChannelsArray) => Promise.all(
    choosedChannelsArray.map(url =>
        fetch(url)
            .then(e => e.json()))
)

export function getSelectChannels() {
    const fuentes = document.getElementById("fuentes");
    const selectChannels = Array.from(fuentes.childNodes).filter(element =>
        element.style.textDecoration == "").map(element => element.textContent)
    return selectChannels;
}

export function fetchAndShowChannelList(renderFeed) {
    fetchChannels(CHANNELS_URLS).then(data => {
        const channelsTitles = data.map(channel => channel.feed.title);
        showChannelsList(channelsTitles, renderFeed);
    });
}

export function fetchAndShowItems() {
    fetchChannels(CHANNELS_URLS).then(data => {
        data.forEach(channel => {
            channel.items.forEach(item => {
                item.channelTitle = channel.feed.title
            })
        })
        const items = data.map(channel => channel.items).flat().sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        const userChoosedChanels = getSelectChannels();
        const channelsTitles = data.map(channel => channel.feed.title);
        if (userChoosedChanels.length == 0) {
            document.getElementById("feed").innerHTML = `<h1>Choose a channel...</h1>`;
        } else {
            const choosedChannels = channelsTitles.filter(channelsTitles => userChoosedChanels.includes(channelsTitles));
            const itemsFiltered = items.filter(item => choosedChannels.includes(item.channelTitle));
            itemsFiltered.forEach(item => {
                showNews(item)
            })
        }
    })
}







