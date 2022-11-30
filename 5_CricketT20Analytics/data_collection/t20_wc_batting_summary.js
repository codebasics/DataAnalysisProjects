/* -------------- STAGE 1 ------------ */

//------- 1.a Interaction Code ------ //
navigate('https://stats.espncricinfo.com/ci/engine/records/team/match_results.html?id=14450;type=tournament');


let links = parse().match_summary_links;
for(let i of links) { 
  next_stage({url: i}) 
}

//------- 1.b Parser Code ------------//
let links = []
const allRows = $('table.engineTable > tbody > tr.data1');
 allRows.each((index, element) => {
  const tds = $(element).find('td');
  const rowURL = "https://www.espncricinfo.com" +$(tds[6]).find('a').attr('href');
  links.push(rowURL);
 })
return {
  'match_summary_links': links
};

/* -------------- STAGE 2 ------------ */

//------- 2.a Interaction Code ------ //
navigate(input.url);
collect(parse());

//------- 2.b Parser Code ------------//
var match = $('div').filter(function(){
	return $(this)
      .find('span > span > span').text() === String("Match Details") 
}).siblings()
team1 = $(match.eq(0)).find('span > span > span').text()
team2 = $(match.eq(1)).find('span > span > span').text()
matchInfo = team1.replace(" Innings", "") +  ' Vs ' + team2.replace(" Innings", "")

var tables = $('div > table.ci-scorecard-table');
var firstInningRows = $(tables.eq(0)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 8
})

var secondInningsRows = $(tables.eq(1)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 8
});


var battingSummary = []
firstInningRows.each((index, element) => {
  var tds = $(element).find('td');
  battingSummary.push({
  		"match": matchInfo,
  		"team_innings": team1,
   		"batting_pos": index+1,
  		"batsman_name": $(tds.eq(0)).find('a > span > span').text().replace(' ', ''),
    	"dismissal": $(tds.eq(1)).find('span > span').text(),
  		"run": $(tds.eq(2)).find('strong').text(), 
  		"ball": $(tds.eq(3)).text(),
  		"4s": $(tds.eq(5)).text(),
  		"6s": $(tds.eq(6)).text(),
 		"SR": $(tds.eq(7)).text()
  });
});

secondInningsRows.each((index, element) => {
  var tds = $(element).find('td');
   battingSummary.push({
  		"match": matchInfo,
  		"team_innings": team2,
   		"batting_pos": index+1,
  		"batsman_name": $(tds.eq(0)).find('a > span > span').text().replace(' ', ''),
     	"dismissal": $(tds.eq(1)).find('span > span').text(),
  		"run": $(tds.eq(2)).find('strong').text(), 
  		"ball": $(tds.eq(3)).text(),
  		"4s": $(tds.eq(5)).text(),
  		"6s": $(tds.eq(6)).text(),
 		"SR": $(tds.eq(7)).text()
  });
});

return {"batting_summary": battingSummary}