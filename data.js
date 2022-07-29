//Site using to parse rss to json.
//https://rss2json.com/#rss_url=https%3A%2F%2Fgithub.com%2Fdjango%2Fdjango%2Freleases.atom

export const URLS = [
    { channelName: "MEDIUM", url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fdailyjs&api_key=p2lpxmy5vpwurnjkynqeecnr3kva3hcbeny6olje&count=50" },
    { channelName: "SITEPOINT", url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.sitepoint.com%2Fsitepoint.rss&api_key=p2lpxmy5vpwurnjkynqeecnr3kva3hcbeny6olje&count=50" },
    { channelName: "INFOWORLD", url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.infoworld.com%2Findex.rss&api_key=p2lpxmy5vpwurnjkynqeecnr3kva3hcbeny6olje&count=50" },
    { channelName: "SMASHING", url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.smashingmagazine.com%2Ffeed%2F&api_key=p2lpxmy5vpwurnjkynqeecnr3kva3hcbeny6olje&count=50" }
];

export function filterChoosedChannels(arrayURLSChannels, arrayChoosedChannels) {
    const choosedChannelsURL = arrayURLSChannels
        .filter(element => arrayChoosedChannels.includes(element.channelName))
        .map(element => element.url);
    return choosedChannelsURL;
};

const fetchChannels = (choosedChannelsArray) => Promise.all(
    choosedChannelsArray.map(url =>
        fetch(url)
            .then(e => e.json()))
)

export function fetchAndPaintItems(showItems, getUserChoosedChanelsURLS) {
    fetchChannels(getUserChoosedChanelsURLS).then(data => {
        data.forEach(channel => {
            channel.items.forEach(item => {
                item.channelTitle = channel.feed.title
            })
        })
        const items =
            data
                .map(element => element.items)
                .flat()
                .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        console.log(items);

        items.forEach((item) => {
            showItems(item);
        })
    });
}

export function getSelectChannels() {
    const fuentes = document.getElementById("fuentes");
    const selectChannels = Array.from(fuentes.childNodes).filter(element =>
        element.style.textDecoration == "").map(element => element.textContent)
    //console.log(selectChannels);
    return selectChannels;
}

