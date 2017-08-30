chrome.contextMenus.create({
  title: "Save emoticon",
  contexts : ["image"],
  onclick : function(content) {
    var id = (new Date()).valueOf();
    var key = "plurkemotURL" + id.toString();
    var obj = {};
    obj[key] = content.srcUrl; 
    chrome.storage.sync.set(obj, function(){
      console.log('Emot saved successfuly (dance)');
    });
  }
});
