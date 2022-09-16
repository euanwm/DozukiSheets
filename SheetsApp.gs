function getSpreadSheetValues() {
  var values = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName('raw_data')
    .getDataRange()
    .getValues();
  values.shift();
  appendRows(values)
  return values;
}

function appendRows(worklogs) {
  for (var row in worklogs) {
    var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('new_data').appendRow(worklogs[row])
  }
}
