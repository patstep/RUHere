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
  createData();
});

function createData(){

//create mentor data

  let mentorData = new Array;

	const query = "SELECT * FROM mentor";
	connection.query(query, function(err, res){

		for (let i = 0; i < res.length; i++){

			let mentorPush = new Array
			
		    for(let column in res[i]) {
	    			mentorPush.push(res[i][column])
    		}

    		mentorData.push(mentorPush);
    	}

	})

// create mentee data

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
            menteeData.push(res[0][column])
        }

        handleData(menteeData, mentorData);
      })
    })
}

function handleData(data, data2){
	// console.log("Mentee Data");
	// console.log(data)

 //  console.log("Mentor Data");
 //  console.log(data2)

  // // calculate mentee totals

    let q1Ts = data[1]*data[2]
    let q2Ts = data[3]*data[4]
    let q3Ts = data[5]*data[6]
    let q4Ts = data[7]*data[8]
    let q5Ts = data[9]*data[10]

    let menteeTotal = new Array

    menteeTotal.push(data[0], q1Ts, q2Ts, q3Ts, q4Ts, q5Ts)

  // // calculate mentor totals

  let mentorTotal = new Array

  for (i = 0; i < data2.length; i ++){

    let q1Tg = data2[i][1]*data2[i][2]
    let q2Tg = data2[i][3]*data2[i][4]
    let q3Tg = data2[i][5]*data2[i][6]
    let q4Tg = data2[i][7]*data2[i][8]
    let q5Tg = data2[i][9]*data2[i][10]

    let temp = new Array

    temp.push(data2[i][0], q1Tg, q2Tg, q3Tg, q4Tg, q5Tg)

    mentorTotal.push(temp)
  }

  // check data

      // console.log("Mentor totals")
      // console.log(mentorTotal)

      // console.log("Mentee totals")
      // console.log(menteeTotal)

  // calculate differences and clears mysql diff table

    // connection.query("DELETE FROM diff";)

    let diffIDs = new Array
    let diffNums = new Array

    for (i = 0; i < mentorTotal.length; i ++){

      let difference = 0

      difference = mentorTotal[i][1] - menteeTotal[1]
                   + mentorTotal[i][2] - menteeTotal[2]
                   + mentorTotal[i][3] - menteeTotal[3]
                   + mentorTotal[i][4] - menteeTotal[4]
                   + mentorTotal[i][5] - menteeTotal[5]

      var sql = "INSERT INTO diff (user_id, diff) VALUE ?"

      connection.query(sql, [mentorTotal[i][0], difference], function(err, result){
        
        if (err) throw err;

        console.log("Number of records inserted: " + result.affectedRows)

      })

    }
}