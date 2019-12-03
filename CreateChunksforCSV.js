// #!/usr/bin/env node
 
var csv = require('csv-parser');
var fs  = require('fs');
// var data = []

// fs.createReadStream('contextbi_cgp_v947.csv.tar')
//   .pipe(csv())
//   .on('data', function (row) {
//     data.push(row)
//   })
//   .on('end', function () {
//     console.log('Data loaded')
//   })

  var fs = require('fs')
  , es = require('event-stream');

var lineNr = 0;
// 'contextbi_cgp_v947.csv.tar' size is 17GB
var s = fs.createReadStream('contextbi_cgp_v947.csv.tar')
  .pipe(es.split())
  .pipe(es.mapSync(function(line){

	  // pause the readstream
	  s.pause();

	  lineNr += 1;

	  // process line here and call s.resume() when rdy
	  // function below was for logging memory usage
	//   logMemoryUsage(lineNr);
       if(lineNr==5){
		   console.log(line);
		//    break;
		   return;
	   }
	  // resume the readstream, possibly from a callback
	  s.resume();
  })
  .on('error', function(err){
	  console.log('Error while reading file.', err);
  })
  .on('end', function(){
	  console.log('Read entire file.')
  })
);
