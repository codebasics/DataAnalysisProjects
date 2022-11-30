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

/* ------------ STAGE 2 -------------- */

//------- 2.a Interaction Code ------ //
navigate(input.url);


let players_data = parse().players_data;
for(let obj of players_data) { 
  name = obj['name']
  team = obj['team']
  url = obj['link']
  next_stage({name: name, team: team, url: url}) 
}

//---------- 2.b Parser Code ---------//
//to store all the players in a list
var playersLinks = []

var match = $('div').filter(function(){
	return $(this)
      .find('span > span > span').text() === String("Match Details") 
}).siblings()
team1 = $(match.eq(0)).find('span > span > span').text().replace(" Innings", "")
team2 = $(match.eq(1)).find('span > span > span').text().replace(" Innings", "")


//for batting players
var tables = $('div > table.ci-scorecard-table');
var firstInningRows = $(tables.eq(0)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 8
})

var secondInningsRows = $(tables.eq(1)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 8
});

firstInningRows.each((index, element) => {
  var tds = $(element).find('td');
  playersLinks.push({
  		"name": $(tds.eq(0)).find('a > span > span').text().replace(' ', ''),
    	"team": team1,
    	"link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')  
  });
});

secondInningsRows.each((index, element) => {
  var tds = $(element).find('td');
   playersLinks.push({
  		"name": $(tds.eq(0)).find('a > span > span').text().replace(' ', ''),
     	"team": team2,
     	"link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')  
  });
});

//for bowling players 

var tables = $('div > table.ds-table');
var firstInningRows = $(tables.eq(1)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 11
})

var secondInningsRows = $(tables.eq(3)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 11
});


firstInningRows.each((index, element) => {
  var tds = $(element).find('td');
  playersLinks.push({
   		"name": $(tds.eq(0)).find('a > span').text().replace(' ', ''),
    	"team": team2.replace(" Innings", ""),
    	"link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')  
    	
  });
});

secondInningsRows.each((index, element) => {
  var tds = $(element).find('td');
   playersLinks.push({
  		"name": $(tds.eq(0)).find('a > span').text().replace(' ', ''),
    	"team": team1.replace(" Innings", ""),
    	"link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')
  });
});
  
return {"players_data": playersLinks}
 
 
/* ------------- STAGE 3 ------------ */

//------- 3.a Interaction Code ------ //

navigate(input.url);
final_data = parse()
collect(
{
  "name": input.name,
  "team": input.team,
  "batting_style": final_data.bating_style,
  "bowling_style": final_data.bowling_style,
  "playing_role":  final_data.playing_role,
  "description": final_data.content,
});
 
//---------- 3.b Parser Code ---------//
const batting_style = $('div.ds-grid > div').filter(function(index){
    return $(this).find('p').first().text() === String('batting_style')
  })

const bowling_style = $('div.ds-grid > div').filter(function(index){
    return $(this).find('p').first().text() === String('bowling_style')
  })

const playing_role = $('div.ds-grid > div').filter(function(index){
    return $(this).find('p').first().text() === String('playing_role')
  })


 return {
   "bating_style": batting_style.find('span').text(),
   "bowling_style": bowling_style.find('span').text(),
   "playing_role": playing_role.find('span').text(),
   "content": $('div.ci-player-bio-content').find('p').first().text()
}