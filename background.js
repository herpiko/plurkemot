chrome.contextMenus.create({
  title: "Save emoticon",
  contexts : ["image"],
  onclick : function(content) {
    if (content.srcUrl.indexOf('https://emos.plurk.com') < 0) {
      return alert('Failed to save. The emot should be a custom plurk emot from emos.plurk.com');
    }
    try {
      var key = "plurkemot_emosplurk_" + content.srcUrl.split('com/')[1].split('.')[0];
      var obj = {};
      obj[key] = content.srcUrl; 
      chrome.storage.sync.get(key, function(existing){
        if (Object.keys(existing).length > 0) {
          return alert('The emot is already exists');
        }
        chrome.storage.sync.set(obj, function(){
          alert('Emot saved successfuly (dance)');
        });
      });
    } catch(e) {
      console.log(e);
      alert('Failed to save the emot.');
    }
  }
});
