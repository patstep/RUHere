const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "RUHere"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('hi');
  // createMenteeData();
  createMentorData();
});

function createMentorData(){
	let mentorData = new Array;

	const query = "SELECT * FROM mentor";
	connection.query(query, function(err, res){

		for (let i = 0; i < res.length; i++){

			let mentorPush = new Array
			
		    for(let column in res[i]) {
    			if (column !== 'user_id') {
	    			mentorPush.push(res[i][column])
    			}
    		}

    		mentorData.push(mentorPush);
    	}

    console.log("Mentor Data")
	console.log(mentorData)
	})
}

function createMenteeData() {
  inquirer
    .prompt({
      name: "mentee_ID",
      type: "list",
      message: "Which mentee are you?",
      choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    })
    .then(function(inquirerResponse){
    	let choice = Number(inquirerResponse.mentee_ID);

    	let menteeData = new Array;

    	const query = "SELECT * FROM mentee WHERE user_id = ?";
    	connection.query(query, [choice], function(err, res){

    		for(let column in res[0]) {
    			if (column !== 'user_id') {
	    			menteeData.push(res[0][column])
    			}
    		}
    		handleMenteeData(menteeData);
    	})
    })
}


function handleMenteeData(data){
	console.log("Mentee Data");
	console.log(data)
}