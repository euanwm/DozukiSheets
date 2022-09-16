// Dozuki API guide below
// I've realised that you'll need to offset and cycle through "pages" of results by using the offset and limit flags
// https://help.dozuki.com/api/2.0/doc/Work_Log

var globalToken; // Lazy, I know.

function login() {
  const user_login_details = {"email": "yourEmail", "password": "yourPassword"}
  const login_payload = { 
    'method' : 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(user_login_details)
  }

  const req = UrlFetchApp.fetch("https://automata.dozuki.com/api/2.0/user/token/", login_payload)
  var data = JSON.parse(req)
  const apiToken = {"Authorization": "api " + data['authToken']}
  return apiToken
}

function getAllWorklogs() {
  const req_details = {'method': 'get', 'headers': globalToken}
  const req_url = "https://automata.dozuki.com/api/2.0/work_log"
  const req = UrlFetchApp.fetch(req_url, req_details)
  var worklogs = JSON.parse(req)
  return worklogs
}

function getSingleWorklog(id) {
  const req_details = {'method': 'get', 'headers': globalToken, 'muteHttpExceptions': true}
  const req_url = "https://automata.dozuki.com/api/2.0/work_log/" + id
  const req = UrlFetchApp.fetch(req_url, req_details)
  var resp_code = req.getResponseCode()
  if (resp_code === 200) {
    var worklogs = JSON.parse(req)
    return worklogs
  }
}

function iterateWorklogs(numTotalWorklogs) {
  const arrayWorklogs = []
  for (let i=0; i < numTotalWorklogs; i++) {
    arrayWorklogs.push(getSingleWorklog(i))
  }
  return arrayWorklogs
}

function run() {
  globalToken = login()
  var worklogs = getAllWorklogs()
  //var worklog = getSingleWorklog(926)
  //var allLogs = iterateWorklogs(300)
  //Logger.log(allLogs)
}