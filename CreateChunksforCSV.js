// #!/usr/bin/env node

// var argv = require('yargs')
// 	.usage('Usage: $0 <file.csv> <outputFolder/> --n <100> [--delimiter=,] [--quote="]')
// 	.demand(2)
// 	.demand('n')
// 	.describe('n', 'size of chunks')
// 	.default('delimiter', ',')
//     .default('quote', '"')
//     .default('headers', true)
//     .argv;

// var csv = require('fast-csv');
// var hl = require('highland');

// var fs = require('fs');
// var path = require('path');
// var hl = require('highland');

// var input = path.resolve(argv._[0]),
// 	output = path.resolve(argv._[1]);

// require('mkdirp').sync(output);

// var options = require('lodash.pick')(argv, 'delimiter', 'quote', 'headers');
// var stream = csv.fromStream(fs.createReadStream(input), options);

// // Batch em to go
// var count = 0;
// hl(stream).batch(argv.n).each(function(data) {
// 	var outstream = fs.createWriteStream(path.join(output, ++count + '.csv'));
// 	csv.writeToStream(outstream, data, options);
// });


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
let csvContent;
var s = fs.createReadStream('contextbi_cgp_v947.csv.tar')
  .pipe(es.split())
  .pipe(es.mapSync(function(line){

	  // pause the readstream
	  s.pause();

	  lineNr += 1;

	  // process line here and call s.resume() when rdy
	  // function below was for logging memory usage
	//   logMemoryUsage(lineNr);
	 csvContent = "data:text/csv;charset=utf-8," 
    + line;
	var encodedUri = encodeURI(csvContent);
	console.log(lineNr);
	console.log(line,typeof line);   
	if(lineNr==10){
		  
		console.log(encodedUri);
		console.log(csvContent);
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