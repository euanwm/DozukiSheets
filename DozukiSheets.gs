function login() {
  const user_login_details = {"email": "person@email.com", "password": "deezNuts"}
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

function getAllWorklogs(token) {
  const req_details = {'method': 'get', 'headers': token}
  const req_url = "https://automata.dozuki.com/api/2.0/work_log"
  const req = UrlFetchApp.fetch(req_url, req_details)
  var worklogs = JSON.parse(req) 
  return req
}

function getSingleWorklog(id, token) {
  const req_details = {'method': 'get', 'headers': token}
  const req_url = "https://automata.dozuki.com/api/2.0/work_log/" + id
  Logger.log(req_url)
  const req = UrlFetchApp.fetch(req_url, req_details)
  var worklogs = JSON.parse(req) 
  return req
}

function run() {
  var dozuki_session = login()
  var worklogs = getAllWorklogs(dozuki_session)
  // we're looking for guide 542
  Logger.log(getSingleWorklog(921, dozuki_session))
}
