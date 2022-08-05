import { fetchAndShowItems, fetchAndShowChannelList } from "./js/data";
import { darkLightMode, fakeSpa, showBookMarks } from "./js/Ui";

function renderFeed() {
  fetchAndShowItems();
}

function main() {
  darkLightMode();
  fakeSpa();
  showBookMarks();
  fetchAndShowChannelList(renderFeed);
  renderFeed();
}

main();
