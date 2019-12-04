const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const path  = require('path');
// If modifying these scopes, delete token.json.

// const SCOPES = ['https://www.googleapis.com/auth/drive'];
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
const DrivesDetails = [
  {
    "jatin345anand": {
      "client_id": "221886488437-sk21jrm78p4o43s4p91lkq1t1k8iaona.apps.googleusercontent.com", "project_id": "quickstart-1575102754813", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_secret": "KblB1LvF1Zyg85LAZa5KoLzl", "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
    }
  },
  {
    "javatomcat36": {
      "client_id": "142434681406-0h69iinrf7kg14qfturdc0sm8sqtpttf.apps.googleusercontent.com", "project_id": "quickstart-1575267930855", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_secret": "nvOaMH5ICqiZCobZXZAL18Fa",
      "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
    }
  },
  {
    "javascriptangular36": { "client_id": "935829242553-lnnkbjc7p41njkrbu5fmlj3hqa00g6rg.apps.googleusercontent.com", "project_id": "quickstart-1575268026610", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_secret": "x_3Q6Jk2EyHEnkZxu3bFrDht", "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"] }
  }
];
const DrivesTokenDetails = [
  "./assets/GoogleDrives/jatin345anand/token.json",
  "./assets/GoogleDrives/javatomcat/token.json",
  "./assets/GoogleDrives/javascriptangular/token.json",
  
];

// Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Drive API.
//   // authorize(JSON.parse(content), listFiles);
//   authorize(JSON.parse(content), uploadFile);
//   // authorize(JSON.parse(content), UploadFileOfficial);
//   // authorize(JSON.parse(content), DownloadFile);
// });
var fileNameMain = "";
var Files=[],fname='',fileid='';
// public/uploads/myImage-1575204233038.jpeg (1CaO1-a4i3Q9uTWh267SEOWEPcQxObgDb)
// public/uploads/myImage-1575204233038.jpeg (17KWoED9X3p2jw9gql_xqR6qv9J1ZyFRe)
// public/uploads/myImage-1575204233038.jpeg (1LigHHmR2IooaFuM2qZnjKHq8VU_L8Psq)
// public/uploads/myImage-1575204233038.jpeg (1WLwOkQbgGoZGDc40NDAa4x9f1_NwaVoN)
// public/uploads/myImage-1575204233038.jpeg (1YVL5NKafd_FywhGf1tPrIRNmFKiTfAPp)
// j1.jpg (1SJQYyDGkOaBwrC894hBrE60WjGeklfLe)
// files/j1.jpg (12XSNG89HEWEym2BQ-z016Bt0CLsDihBm)
// files/j1.jpg (1emJ1DX3VBeLzKYgtSfJRggtvROl3QAY5)
// j1.jpg (1vw-dJbWkCvIBupODj1OhAi8nI0xba2TI)
// GAS Project: Upload a single file multiple Google Drives (17UXOk8TuDMuXABSOmnv-zOwpI3Ndv5u6gOQb2nLKBko)
oAuthsforDrives=[];
const CRUDforGoogleDrives = {
  FilesDrives : [],
  UploadOneFile: function (FileName) {
    fileNameMain = FileName;
    console.log('File name is ', FileName, fileNameMain);
    for(let i in DrivesDetails){
      oAuthsforDrives.push(authorize(JSON.parse(JSON.stringify(DrivesDetails[i])),DrivesTokenDetails[i]));
    }
    for(let i in oAuthsforDrives){
      console.log(i)
      uploadFile(oAuthsforDrives[i],FileName);
    }
    // authorize(JSON.parse(JSON.stringify(DrivesDetails[1])), uploadFile,JSON.stringify(DrivesTokenDetails[1]));
    // 
  },
  UploadMultipleFile: function () {

  },
  ReadAllFiles: function () {
    for(let i in DrivesDetails){
      oAuthsforDrives.push(authorize(JSON.parse(JSON.stringify(DrivesDetails[i])),DrivesTokenDetails[i]));
    }
    for(let i in oAuthsforDrives){
      console.log(i)
      listFiles(oAuthsforDrives[i]);
    }
    // authorize(JSON.parse(JSON.stringify(DrivesDetails[2])), listFiles);
    // console.log('in read files',Files);
    // this.FilesDrives = Files;
    return Files;
  },
  DeleteOneFile: function (fn,fid) {
    console.log('in delete ',fn,fid);
    fname =fn;
    fileid = fid;
    authorize(JSON.parse(JSON.stringify(DrivesDetails[2])), DownloadFile);
  },
  DeleteAllFiles: function () {

  } 
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials,tokenAccess) {
  const GoogleAccountName = Object.keys(credentials)[0].toString();
  // console.log('cred.installed  ',Object.values(credentials))
  const { client_secret, client_id, redirect_uris } = Object.values(credentials)[0];
  // console.log(client_secret, client_id, redirect_uris);
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
    console.log('Token is ',tokenAccess);
    // oAuth2Client.setCredentials(JSON.parse(token));
    // uploadFile(oAuth2Client);
    // callback(oAuth2Client);
  // Check if we have previously stored a token.

  // fs.readFile(TOKEN_PATH, (err, token) => {
    fs.readFile(tokenAccess, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    // callback(oAuth2Client);
  });
  return oAuth2Client;
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    console.log(typeof res.data.files);
    Files = res.data.files;
    
    if (Files.length) {
      console.log('Files:');
      Files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });
}
function uploadFile(auth, Filename) {
  console.log('auth in upload',auth);
  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    'name': 'public/uploads/myImage-1575204233038.jpeg'
  }

  const MediaFile = 'public/uploads/' + fileNameMain + "";
  console.log('media file', fileNameMain);
  const media = {
    mimeType: 'image/jpg',
    body: fs.createReadStream(MediaFile)
  }
  drive.files.create({
    auth: auth,
    resource: fileMetadata,
    media: media
  }, err => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Uploaded!! Done.")
    }
  })
}
function UploadFileOfficial(auth) {
  const drive = google.drive('v3');
  var fileMetadata = {
    'name': 'j2.jpg'
  };
  var media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream('files/j1.jpg')
  };
  drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('File Id: ', file.id);
    }
  });
}
function DownloadFile(auth) {
  // const drive = google.drive('v3');
  // console.log('in delete main ');
  // var dest = fs.createWriteStream(fname);
  // drive.files.get({
  //   fileId: fileid,
  //   alt: 'media'
  // })
  //   .on('end', function () {
  //     console.log('Done');
  //   })
  //   .on('error', function (err) {
  //     console.log('Error during download', err);
  //   })
  //   .pipe(dest);
  const drive = google.drive({ version: 'v3', auth });
  var fileId = '0BwwA4oUTeiV1UVNwOHItT0xfa2M';
  var destpath = 'C:\\Users\\jatin.anand\\Documents\\NodeJobWork\\GASProject\\public\\downloads\\'+fname+"";
  console.log(destpath);
var dest = fs.createWriteStream(destpath);
// drive.files.get({
//   fileId: fileId,
//   alt: 'media'
// })
//     .on('end', function () {
//       console.log('Done');
//     })
//     .on('error', function (err) {
//       console.log('Error during download', err);
//     })
//     .pipe(dest);
    
    drive.files.get({fileId: fileid, alt: 'media'}, {responseType: 'stream'},
    function(err, res){
        res.data
        .on('end', () => {
            console.log('Done');
        })
        .on('error', err => {
            console.log('Error', err);
        })
        .pipe(dest);
    }
);
  // const returnData = [];
  // const drive = google.drive({ version: 'v3', auth });

  // const file = fs.createWriteStream(destination);

  // drive.files.get(
  // {fileId: fileId, alt: 'media',}, 
  // {responseType: 'stream'}, (err, { data }) => {
  //     if (err) {
  //         returnData.push(["ERR"]);
  //         returnData.push("" + err);
  //     } else {
  //         data.pipe(file);
  //         returnData.push("Downloaded");
  //     }
  //     callback(returnData);
  // });
}
function SearchFile(auth) {
  var pageToken = null;
  // Using the NPM module 'async'
  async.doWhilst(function (callback) {
    drive.files.list({
      q: "mimeType='image/jpeg'",
      fields: 'nextPageToken, files(id, name)',
      spaces: 'drive',
      pageToken: pageToken
    }, function (err, res) {
      if (err) {
        // Handle error
        console.error(err);
        callback(err)
      } else {
        res.files.forEach(function (file) {
          console.log('Found file: ', file.name, file.id);
        });
        pageToken = res.nextPageToken;
        callback();
      }
    });
  }, function () {
    return !!pageToken;
  }, function (err) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      // All pages fetched
    }
  })
}
module.exports = CRUDforGoogleDrives;