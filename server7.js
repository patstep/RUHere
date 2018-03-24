const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "RUHere"
});

// const q = connection.query;
// connection.query = function() {
//   console.log(arguments[0]);
//   return q.call(this, ...arguments);
// };

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

    let diffIDs = new Array
    let diffNums = new Array

    for (i = 0; i < mentorTotal.length; i ++){

      let diffq1, diffq2, diffq3, diffq4, diffq5

      diffq1 = (mentorTotal[i][1] - menteeTotal[1])*(5/7)
      diffq2 = (mentorTotal[i][2] - menteeTotal[2])*(2/7)
      diffq3 = (mentorTotal[i][3] - menteeTotal[3])*(5/7)
      diffq4 = (mentorTotal[i][4] - menteeTotal[4])*(2/7)
      diffq5 = (mentorTotal[i][5] - menteeTotal[5])*(5/7)

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

    //   calculate ranking scores

      const query2 = connection.query("SELECT user_id FROM diff ORDER BY diff1 DESC", function(err, res){
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
      query3();
      })
}

      function query3(){  
              const query3 = connection.query("SELECT user_id FROM diff ORDER BY diff2 DESC", function(err, res){
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
                query4(); 
              })
      }


     function query4(){ 
      const query4 = connection.query("SELECT user_id FROM diff ORDER BY diff3 DESC", function(err, res){
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
        query5();
      })
    }

    function query5(){
      const query5 = connection.query("SELECT user_id FROM diff ORDER BY diff4 DESC", function(err, res){
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
        query6();
      })
     }


    function query6(){
      const query6 = connection.query("SELECT user_id FROM diff ORDER BY diff5 DESC", function(err, res){
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
        join();
      })
    }

   function join(){
        connection.query("SELECT * FROM rank_count1 LEFT JOIN rank_count2 on rank_count1.user_id = rank_count2.user_id LEFT JOIN rank_count3 on rank_count1.user_id = rank_count3.user_id LEFT JOIN rank_count4 on rank_count1.user_id = rank_count4.user_id LEFT JOIN rank_count5 on rank_count1.user_id = rank_count5.user_id", function(err, res){
              
      for (i = 0; i < res.length; i ++){
          
          let total_data = new Array
          let final_data = new Array

          let user = res[i].q1 + res[i].q2 + res[i].q3 + res[i].q4 + res[i].q5

          total_data.push(res[i].user_id, user)

          final_data.push(total_data)

          console.log(total_data)

          const query = connection.query("INSERT INTO final_table SET ?",
                      {
                        user_id: total_data[0],
                        total: user
                      }
          )

      }

      report();

      })
    }

function report(){

    connection.query("SELECT * FROM final_table ORDER BY total DESC", function(err, res){

        // console.log(res)

          console.log("You've matched with " + res[0].user_id)
          console.log("You've matched with " + res[1].user_id)
          console.log("You've matched with " + res[2].user_id)
          console.log("You've matched with " + res[3].user_id)
          console.log("You've matched with " + res[4].user_id)
    })

    connection.query("DELETE FROM diff")
    connection.query("DELETE FROM rank_count1")
    connection.query("DELETE FROM rank_count2")
    connection.query("DELETE FROM rank_count3")
    connection.query("DELETE FROM rank_count4")
    connection.query("DELETE FROM rank_count5")
    connection.query("DELETE FROM final_table")

  }



