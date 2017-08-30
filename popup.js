function fireEmot(){
  var url = this.getAttribute('src');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: url});
  });
}

function loadEmots(cb){
  var emotsDiv = document.getElementById('emots');
  emotsDiv.innerHTML = '';
  chrome.storage.sync.get(function(emots){
    var keys = Object.keys(emots);
    keys.forEach(function(key){
      if (key.indexOf('plurkemotURL') > -1 && emots[key].indexOf('https://emos.plurk.com') > -1) {
        emotsDiv.innerHTML += '<img style="width:30px;" class="emot" src="' + emots[key] + '">';
      }
    });
    cb();
  });
}

function handleFileSelect(evt) {
  var file = evt.target.files[0]; // FileList object
  var reader = new FileReader();
  reader.onload = function(evt) {
    // TODO : clear the evt
    var id = (new Date()).valueOf();
    var key = 'plurkemotB64' + id.toString();
    var obj = {};
    obj[key] = evt.target.result; 
    chrome.storage.sync.set(obj, function(){
      chrome.storage.sync.get(key, function(item){
        // TODO push to plurk API
        loadEmots();
      });
    });
  }
  reader.readAsDataURL(file, 'utf8');
}


document.getElementById('files').addEventListener('change', handleFileSelect, false);

setTimeout(function(){
  loadEmots(function(){
    Array.from(document.getElementsByClassName('emot')).forEach(function(item) {
      item.addEventListener('click', fireEmot, false);
    });
  });
}, 500);
