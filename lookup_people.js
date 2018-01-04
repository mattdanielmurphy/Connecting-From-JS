const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const input = process.argv[2];

let foundPersons = [];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people", (err, result) => {
    if (err) {
      return console.error("error running query", err);
		}
		console.log('Searching ...');
		for (let i in result.rows) {
			const res = result.rows[i];
			const firstName = res.first_name;
			const lastName = res.last_name;
			const position = parseInt(i) + 1;
			let birthDate = new Date(res.birthdate);
			birthDate = `${birthDate.getFullYear()}-${birthDate.getMonth()}-${birthDate.getDate()}`;

			if (input === firstName || input === lastName) {
				foundPersons.push(
					`${position} - ${firstName} ${lastName}, born '${birthDate}'`
				);
			}
		}
		console.log(`Found ${foundPersons.length} person(s) by the name '${input}':`);
		for (const n in foundPersons) {
			console.log(foundPersons[n]);
		}
    client.end();
  });
});