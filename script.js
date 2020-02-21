const APIKEY = "cB6qLadxxvj7ChzKKw23J6YvRfAepm-qqL65aSQEgUFKojWX";

function createNewsBlock(news) {
  let block = "";
  block += "<div class=newsBlock>";
  block += "<h3 class=title><a href=" + news.url + ">" + news.title + "</a></h3>";
  block += "<h4 class=author>" + news.author + "</h6>";
  block += "<p class=description>" + news.description + "</p>";
  if (news.image !== "None") {
    block += "<img class=image src=" + news.image + " onerror=\"this.src='404Image.png'\"/>";
  }
  block += "</div>"
  return block;
}

function displayNews(json) {
  let results = "";
  results += "<h2>Search Results</h2>";
  results += "<div id=newsList>";
  for (let i=0; i < json.news.length; i++) {
    results += createNewsBlock(json.news[i]);
  }
  results += "</div>";
  document.getElementById("results").innerHTML = results;
}

document.getElementById("searchSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("searchInput").value;
  if (value === "")
    return;

  // Get and display news
  const url1 = "https://api.currentsapi.services/v1/search?keywords=" + value + "&language=en&apiKey=" + APIKEY;
  fetch(url1)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log("got response");
      displayNews(json);
    });
});