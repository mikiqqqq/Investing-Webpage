var newsArticles = document.getElementsByClassName('other-item');
var links = document.getElementsByClassName('other-link');
var ct = 12;

if(newsArticles.length > 12){
  document.getElementById('read_more-button').style.display = 'inline-block';
}

document.getElementById('read_more-button').addEventListener('click', event => {
  for(let i = ct; i < ct + 8; i++){
    if(newsArticles.length - 1 == i){
      newsArticles[i].style.display = 'block';
      document.getElementById('read_more-button').style.display = 'none';
      break;
    }
    newsArticles[i].style.display = 'block';
  }

  ct += 8;
});

function resetAllFiltersStyle(){
  for(let i = 0; i < links.length; i++){
    links[i].style.backgroundColor = "transparent";
    links[i].style.color = "white";
    links[i].style.pointerEvents = "auto";
  }
  document.getElementById('read_more-button').style.display = 'none';
}

function changeButtonStyle(filter){
  filter.style.backgroundColor = "mintcream";
  filter.style.color = "#cb0000";
  filter.style.pointerEvents = "none";
}

function filterArticlesAndAppend(keyword){
  for (let i = 0; i < newsArticles.length; i++) {
    newsArticles[i].style.display = 'none';
    var newsType = newsArticles[i].querySelector('.class').innerHTML;
    if(newsType == keyword){
      newsArticles[i].style.display = 'block';
    }
  }
}

var stocksFilter = document.getElementById('stocks-filter');
stocksFilter.addEventListener('click', event => {
  resetAllFiltersStyle();
  changeButtonStyle(stocksFilter);
  filterArticlesAndAppend('Stocks');
});

var cryptoFilter = document.getElementById('crypto-filter');
cryptoFilter.addEventListener('click', event => {
  resetAllFiltersStyle();
  changeButtonStyle(cryptoFilter);
  filterArticlesAndAppend('Crypto');
});

var bondsFilter = document.getElementById('bonds-filter');
bondsFilter.addEventListener('click', event => {
  resetAllFiltersStyle();
  changeButtonStyle(bondsFilter);
  filterArticlesAndAppend('Bonds');
});

var commFilter = document.getElementById('comm-filter');
commFilter.addEventListener('click', event => {
  resetAllFiltersStyle();
  changeButtonStyle(commFilter);
  filterArticlesAndAppend('Commodities');
});

var estateFilter = document.getElementById('estate-filter');
estateFilter.addEventListener('click', event => {
  resetAllFiltersStyle();
  changeButtonStyle(estateFilter);
  filterArticlesAndAppend('Real Estate');
});
