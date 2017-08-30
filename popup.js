function loadEmots(){
  var emotsDiv = document.getElementById('emots');
  emotsDiv.innerHTML = '';
  chrome.storage.sync.get(function(emots){
    var keys = Object.keys(emots);
    keys.forEach(function(key){
      if (key.indexOf('plurkemot') > -10) {
        emotsDiv.innerHTML += '<img src="' + emots[key] + '">';
      }
    });
  });
}

function handleFileSelect(evt) {
  var file = evt.target.files[0]; // FileList object
  var reader = new FileReader();
  reader.onload = function(evt) {
    // TODO : clear the evt
    var id = (new Date()).valueOf();
    var key = "plurkemot" + id.toString();
    var obj = {};
    obj[key] = evt.target.result; 
    chrome.storage.sync.set(obj, function(){
      chrome.storage.sync.get(key, function(item){
        loadEmots();
      });
    });
  }
  reader.readAsDataURL(file, 'utf8');
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
loadEmots();
