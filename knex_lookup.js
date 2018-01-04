const settings = require('./settings');
const pg = require('pg');
const knex = require('knex')({
  client: 'pg',
  connection: {
		user     : settings.user,
		password : settings.password,
		database : settings.database,
		host     : settings.hostname,
		port     : settings.port,
		ssl      : settings.ssl
  }
});

const input1 = process.argv[2];
const input2 = process.argv[3];
const input3 = process.argv[4];

knex.select('*').from('famous_people')
	.insert({
		first_name: input1,
		last_name: input2,
		birthdate: input3
	}).returning('*')
	.asCallback((err, rows) => {
		if (err) return console.error(err);
		console.log(rows);
	})