/**
 * The onOpen function runs automatically when the Google Docs document is
 * opened. Use it to add custom menus to Google Docs that allow the user to run
 * custom scripts. For more information, please consult the following two
 * resources.
 *
 * Extending Google Docs developer guide:
 *     https://developers.google.com/apps-script/guides/docs
 *
 * Document service reference documentation:
 *     https://developers.google.com/apps-script/reference/document/
 */
function onOpen() {
  // Add a menu with some items, some separators, and a sub-menu.
  DocumentApp.getUi().createMenu('Utilities')
      .addItem('Insert Date', 'insertAtCursor')
      .addToUi();
}

/**
 * Inserts the date at the current cursor location in boldface.
 */
function insertAtCursor() {
  var cursor = DocumentApp.getActiveDocument().getCursor();

  if (cursor) {
    // Attempt to insert text at the cursor position. If insertion returns null,
    // then the cursor's containing element doesn't allow text insertions.
    var date = (new Date).toLocaleDateString('default', {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); // use your local (browser) date format with month name
    date += " - " + (new Date).toLocaleTimeString();
    var element = cursor.insertText(date + '\n\n');
    if (element) {
      element.setBold(true);
      element.setUnderline(true);
    } else {
      DocumentApp.getUi().alert('Cannot insert text at this cursor location.');
    }
    
    var doc = DocumentApp.getActiveDocument();
    var position = doc.newPosition(element, element.getText().length);
    doc.setCursor(position);
    
    var undoStyles = '';
    element = cursor.insertText(undoStyles);
      if (element) {
      element.setBold(false);
      element.setUnderline(false);
    } else {
      DocumentApp.getUi().alert('Cannot insert text at this cursor location.');
    }
  } else {
    DocumentApp.getUi().alert('Cannot find a cursor in the document.');
  }
  
}
