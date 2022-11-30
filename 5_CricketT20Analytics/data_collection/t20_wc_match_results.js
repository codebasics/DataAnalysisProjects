/* -------------- STAGE 1 ------------ */

//------- 1.a Interaction Code ------ //

navigate('https://stats.espncricinfo.com/ci/engine/records/team/match_results.html?id=14450;type=tournament');

let data = parse();
collect({
  'team_1': data.team1_data,
  'team_2':  data.team2_data,
  'winner': data.winner_data,
  'margin': data.margin_data,
  'ground': data.ground_data,
  'match_date': data.match_date_data,
  'score_card': data.scorecard_data
}    
);


//------- 1.b Parser Code ------------//
//Step1: defining all the json variable names (one json variable for one column)
var team1Json = {};
var team2Json = {};
var winnerJson = {};
var marginJson = {};
var groundJson = {};
var matchDateJson = {};
var scorecardJson = {};


//Step2: Selecting all rows we need from target table
const allRows = $('table.engineTable > tbody > tr.data1');


//Step3: Looping through each rows and get the data from the cells(td)
 allRows.each((index, element) => {
	 const tds = $(element).find('td');   //find the td

	//Pushing scraped data to respective json 
	 team1Json[index] = $(tds[0]).text();  
	 team2Json[index] = $(tds[1]).text(); 
	 winnerJson[index] =  $(tds[2]).text();  
	 marginJson[index] = $(tds[3]).text();  
	 groundJson[index] =  $(tds[4]).text();
	 matchDateJson[index] = $(tds[5]).text();
	 scorecardJson[index] = $(tds[6]).text(); 
 })

// step4: Finally returning the data
return {
  'team1_data': team1Json,
  'team2_data':  team2Json,
  'winner_data':  winnerJson,
  'margin_data':  marginJson,
  'ground_data': groundJson,
  'match_date_data':  matchDateJson,
  'scorecard_data':  scorecardJson 
};