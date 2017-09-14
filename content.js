// Taken from : http://stackoverflow.com/questions/7404366/how-do-i-insert-some-text-where-the-cursor-is
function insertTextAtCursor(text) {
  text = text + ' ';
  var el = document.activeElement;
  var val = el.value;
  var endIndex;
  var range;
  var doc = el.ownerDocument;
  if (typeof el.selectionStart === 'number' &&
      typeof el.selectionEnd === 'number') {
      endIndex = el.selectionEnd;
      el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
      el.selectionStart = el.selectionEnd = endIndex + text.length;
  } else if (doc.selection !== 'undefined' && doc.selection && doc.selection.createRange) {
      el.focus();
      range = doc.selection.createRange();
      range.collapse(false);
      range.text = text;
      range.select();
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  if (request.data) {
    insertTextAtCursor(request.data);
  }
});
