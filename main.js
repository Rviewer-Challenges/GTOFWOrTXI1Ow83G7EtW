import { fetchAndPaintItems, filterChoosedChannels, getSelectChannels, URLS } from "./data";
import { showFontsUI, showUi } from "./js/Ui";

function feed() {
  const userChoosedChanels = getSelectChannels();
  const getUserChoosedChanelsURLS = filterChoosedChannels(URLS, userChoosedChanels);
  if (getUserChoosedChanelsURLS == "") {
    document.getElementById("feed").innerHTML = `<h1>Elige un canal de noticias</h1>`;
  } else {
    fetchAndPaintItems(showUi, getUserChoosedChanelsURLS);
  }
}

function main() {
  showFontsUI(URLS, feed);
  feed()
}

main();

