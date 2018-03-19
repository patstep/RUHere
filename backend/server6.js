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

  // calculate differences

    connection.query('DELETE FROM diff')

    let diffIDs = new Array
    let diffNums = new Array

    for (i = 0; i < mentorTotal.length; i ++){

      let diffq1, diffq2, diffq3, diffq4, diffq5

      diffq1 = (mentorTotal[i][1] - menteeTotal[1])
      diffq2 = (mentorTotal[i][2] - menteeTotal[2])
      diffq3 = (mentorTotal[i][3] - menteeTotal[3])
      diffq4 = (mentorTotal[i][4] - menteeTotal[4])
      diffq5 = (mentorTotal[i][5] - menteeTotal[5])

        const query = connection.query("INSERT INTO diff SET ?",
            {
              user_id: mentorTotal[i][0],
              diff1: diffq1,
              diff2: diffq2,
              diff3: diffq3,
              diff4: diffq4,
              diff5: diffq5
            }
        );
    }

    // find matches

      // calculate ranking scores

      const query2 = connection.query("SELECT user_id FROM diff ORDER BY diff1 DESC", function(err, res){

            // console.log(res)

            for (i = 0; i < res.length; i++){

                  let add = 15 - i
                  let user_id = res[i].user_id

                  const query = connection.query("INSERT INTO rank_count1 SET ?",
                      {
                        user_id: user_id,
                        q1: add
                      }
                  );
            }
      })

      const query3 = connection.query("SELECT user_id FROM diff ORDER BY diff2 DESC", function(err, res){

            // console.log(res)

            for (i = 0; i < res.length; i++){

                  let add = 15 - i
                  let user_id = res[i].user_id

                  const query = connection.query("INSERT INTO rank_count2 SET ?",
                      {
                        user_id: user_id,
                        q2: add
                      }
                  );
            }
      })


      const query4 = connection.query("SELECT user_id FROM diff ORDER BY diff3 DESC", function(err, res){

            // console.log(res)

            for (i = 0; i < res.length; i++){

                  let add = 15 - i
                  let user_id = res[i].user_id

                  const query = connection.query("INSERT INTO rank_count3 SET ?",
                      {
                        user_id: user_id,
                        q3: add
                      }
                  );
            }
      })

      const query5 = connection.query("SELECT user_id FROM diff ORDER BY diff4 DESC", function(err, res){

            // console.log(res)

            for (i = 0; i < res.length; i++){

                  let add = 15 - i
                  let user_id = res[i].user_id

                  const query = connection.query("INSERT INTO rank_count4 SET ?",
                      {
                        user_id: user_id,
                        q4: add
                      }
                  );
            }
      })


      const query6 = connection.query("SELECT user_id FROM diff ORDER BY diff5 DESC", function(err, res){

            // console.log(res)

            for (i = 0; i < res.length; i++){

                  let add = 15 - i
                  let user_id = res[i].user_id

                  const query = connection.query("INSERT INTO rank_count5 SET ?",
                      {
                        user_id: user_id,
                        q5: add
                      }
                  );
            }
      })

      // join tables
      
      let query7 = "SELECT rank_count1.user_id, rank_count1.q1, rank_count2.q2 FROM rank_count1 LEFT JOIN rank_count2 ON rank_count1.user_id = rank_count2.user_id"
      connection.query(query7, function(err, res){

        console.log(res)

      })




}




