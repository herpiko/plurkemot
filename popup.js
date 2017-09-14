function fireEmot(){
  var url = this.getAttribute('src');
  console.log(url);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: url});
    window.close();
  });
}

function loadEmots(cb){
  var emotsDiv = document.getElementById('emots');
  emotsDiv.innerHTML = '';
  chrome.storage.sync.get(function(emots){
    var keys = Object.keys(emots);
    if (keys.length > 0) {
      keys.forEach(function(key){
        if (key.indexOf('plurkemot') > -1 && emots[key].indexOf('https://emos.plurk.com') > -1) {
          emotsDiv.innerHTML += '<img class="emot" src="' + emots[key] + '">';
        }
      });
      cb();
    } else {
      emotsDiv.innerHTML += '<p>No emot yet.</p>';
    } 
  });
}

setTimeout(function(){
  loadEmots(function(){
    Array.from(document.getElementsByClassName('emot')).forEach(function(item) {
      item.addEventListener('click', fireEmot, false);
    });
  });
}, 500);
