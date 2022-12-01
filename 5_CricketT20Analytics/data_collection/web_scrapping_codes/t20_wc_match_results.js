/* -------------- STAGE 1 ------------ */

//------- 1.a Interaction Code ------ //

navigate('https://stats.espncricinfo.com/ci/engine/records/team/match_results.html?id=14450;type=tournament');
collect(parse());




//------- 1.b Parser Code ------------//
//Step1: create an array to store all the records
let matchSummary = []


//Step2: Selecting all rows we need from target table
const allRows = $('table.engineTable > tbody > tr.data1');


//Step3: Looping through each rows and get the data from the cells(td)
 allRows.each((index, element) => {
 		const tds = $(element).find('td');   //find the td
		matchSummary.push({
              'Team_1':  $(tds[0]).text(),
              'Team_2':  $(tds[1]).text(),
              'Winner':  $(tds[2]).text(),
              'Margin':  $(tds[3]).text(),
              'Ground': $(tds[4]).text(),
              'Match_Date': $(tds[5]).text(),
              'Scorecard_data':   $(tds[6]).text() 
		})   
 })


// step4: Finally return the data
return {
  "matchSummary": matchSummary
};
