//In this application, I have uploaded one or more than one file to Google Drive at once. I have also uploaded multiple files to more than one Google Drives at once. I have deleted one or more than files from One or More than one Google Drives at once. Basically, I have created a CRUD Application to Google Drive using "googleapis" module of NodeJS. I have created a splitting Algorithm(Create chunks or small files of big file) using NodeJS.
const DrivesDetails = [
  {
      "jatin345anand":{"client_id":"221886488437-sk21jrm78p4o43s4p91lkq1t1k8iaona.apps.googleusercontent.com","project_id":"quickstart-1575102754813","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"KblB1LvF1Zyg85LAZa5KoLzl","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"] 
  }
  },
  {
      "javatomcat36":{"client_id":"142434681406-0h69iinrf7kg14qfturdc0sm8sqtpttf.apps.googleusercontent.com","project_id":"quickstart-1575267930855","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"nvOaMH5ICqiZCobZXZAL18Fa",
      "redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}
  },
  {
      "javascriptangular36":{"client_id":"935829242553-lnnkbjc7p41njkrbu5fmlj3hqa00g6rg.apps.googleusercontent.com","project_id":"quickstart-1575268026610","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"x_3Q6Jk2EyHEnkZxu3bFrDht","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}
  }
];
undefined
Srtinged = JSON.stringify(DrivesDetails[1])
"{"javatomcat36":{"client_id":"142434681406-0h69iinrf7kg14qfturdc0sm8sqtpttf.apps.googleusercontent.com","project_id":"quickstart-1575267930855","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"nvOaMH5ICqiZCobZXZAL18Fa","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}"
ParsedJ = JSON.parse(Srtinged)
{javatomcat36: {…}}
Object.keys(DrivesDetails[1])[0]
"javatomcat36"
ParsedJ.javatomcat36
{client_id: "142434681406-0h69iinrf7kg14qfturdc0sm8sqtpttf.apps.googleusercontent.com", project_id: "quickstart-1575267930855", auth_uri: "https://accounts.google.com/o/oauth2/auth", token_uri: "https://oauth2.googleapis.com/token", auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs", …}
 const {client_secret, client_id, redirect_uris} = ParsedJ.javatomcat36;
undefined
redirect_uris
(2) ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
