var csv = require('csv-parser');
var fs = require('fs');
const express = require('express');
var fs = require('fs'), es = require('event-stream');
const createCSVWriter = require('csv-writer').createObjectCsvWriter;
class CSVHeaderClass {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}
}
class CSVDataClass {
	constructor(start_ip_in,
		end_ip_in,
		continen,
		countr,
		country_cod,
		country_c,
		regio,
		stat,
		state_cod,
		state_c,
		cit,
		city_c,
		postal_cod,
		area_cod,
		time_zon,
		latitud,
		longitud,
		dm,
		ms,
		connection_typ,
		line_spee,
		ip_routing_typ,
		as,
		sl,
		tl,
		organizatio,
		carrie,
		anonymizer_statu,
		proxy_typ,
		proxy_leve,
		proxy_last_detecte,
		hosting_facilit) {
		this.start_ip_in = start_ip_in,
			this.end_ip_in = end_ip_in,
			this.continen = continen,
			this.countr = countr,
			this.country_cod = country_cod,
			this.country_c = country_c,
			this.regio = regio,
			this.stat = stat,
			this.state_cod = state_cod,
			this.state_c = state_c,
			this.cit = cit,
			this.city_c = city_c,
			this.postal_cod = postal_cod,
			this.area_cod = area_cod,
			this.time_zon = time_zon,
			this.latitud = latitud,
			this.longitud = longitud,
			this.dm = dm,
			this.ms = ms,
			this.connection_typ = connection_typ,
			this.line_spee = line_spee,
			this.ip_routing_typ = ip_routing_typ,
			this.as = as,
			this.sl = sl,
			this.tl = tl,
			this.organizatio = organizatio,
			this.carrie = carrie,
			this.anonymizer_statu = anonymizer_statu,
			this.proxy_typ = proxy_typ,
			this.proxy_leve = proxy_leve,
			this.proxy_last_detecte = proxy_last_detecte,
			this.hosting_facilit = hosting_facilit
	}
}
var lineNr = 0;
var csvContent = "data:text/csv;charset=utf-8,";
var csvFile = '';
const CSVWriter = createCSVWriter({
	path: 'chunk5.csv',
	header: ['start_ip_in',
		'end_ip_in',
		'continen',
		'countr',
		'country_cod',
		'country_c',
		'regio',
		'stat',
		'state_cod',
		'state_c',
		'cit',
		'city_c',
		'postal_cod',
		'area_cod',
		'time_zon',
		'latitud',
		'longitud',
		'dm',
		'ms',
		'connection_typ',
		'line_spee',
		'ip_routing_typ',
		'as',
		'sl',
		'tl', 
		'organizatio',
		'carrie',
		'anonymizer_statu',
		'proxy_typ',
		'proxy_leve',
		'proxy_last_detecte',
		'hosting_facilit'
	]
});


var dataArrayofRowforCSV = [];
var key = [];
var HeaderObjArray = [];
var s = fs.createReadStream('big.csv.tar')
	.pipe(es.split())
	.pipe(es.mapSync(function (line) {

		// pause the readstream
		s.pause();

		lineNr += 1;

		if (lineNr == 1) {

			for (let i in line.split(',')) { key.push(line.split(',')[i].substring(1, line.split(',')[i].length - 2)); }
		}
		var cureentDataObj = {};
		//         if (lineNr>1 && lineNr<11) {
		for (let i in line.split(',')) {
			var key2 = key[i];
			cureentDataObj[key2] = line.split(',')[i].substring(1, line.split(',')[i].length - 2);
		}
		dataArrayofRowforCSV.push(cureentDataObj);
		//         }


		if (lineNr %= 256000==0) {
			console.log('in for loop');

			// console.log('Array of row is ', dataArrayofRowforCSV);
			CSVWriter
				.writeRecords(dataArrayofRowforCSV)
				.then(() => console.log('The CSV file was written successfully'));
			// var encodedUri = encodeURI(csvContent);
			// console.log(csvContent);
			// console.log(encodedUri);
			return;
		}


		// resume the readstream, possibly from a callback
		s.resume();
	})
		.on('error', function (err) {
			console.log('Error while reading file.', err);
		})
		.on('end', function () {
			console.log('Read entire file.', lineNr)
		})
	);
// console.log('Header obj : ',HeaderObj);
// var link = document.createElement("a");
// link.setAttribute("href", encodedUri);
// link.setAttribute("download", "C:\VSJune\D3App\FinalAppofBarToPie\my_data.csv");
// document.body.appendChild(link); // Required for FF
// link.click();