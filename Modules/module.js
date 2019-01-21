var exports = module.exports = {};

// function loadModuleDetail returns essential module information
exports.loadModuleDetail = function(html) {
  var cheerio = require('cheerio');
  var $ = cheerio.load(html);

  // scrape title
  var answer;
  var header = $('h2').text();
  var parts = header.split("(");
  var title = parts[0];
  answer = '**' + title + '**' + "\n\n";

  // scrape credit
  var credit = $('p').first().text();
  answer += credit + "\n\n";
     
  // scrape semester           
  var semester = "Semester: " + $('td').first().text();
  answer += semester + "\n\n";
             
  // scrape assessment   
  $('table').last().children().each(function(i, element){
    if (i > 0)
    {
      var assessment = "";
      assessment += $(this).children().first().text().replace(/\s/g, '') + ": "; // assessment type
      assessment += $(this).children().first().next().text().replace(/\s/g, '') + "%"; // assessment weight
      answer += assessment + "\n\n";
    }
  });

  // scrape convenor
  $('p').each(function(i, element){
    var convenor = $(this).text();
    if (convenor.includes("Convenor"))
    {
      answer += convenor.replace(/(\r\n|\n|\r)/gm,"") + "\n\n";
    }
  });

  return answer;
};

// function compareInput 
exports.compareInput = function(inputCode) {
  // load info from files
  var fs = require('fs');
  var codes = fs.readFileSync('Modules/moduleCode.txt').toString().split("\n");
  var webs = fs.readFileSync('Modules/moduleWeb.txt').toString().split("\n");

  // search module code array for input code
  var find = 2; // find = 0: find G52GRP; find = 1: find GRP; find = 2: not find
  for(var i in codes) {
    var simple = codes[i].substr(3,5);
    simple = simple.substr(0,3);
    codes[i] = codes[i].substr(0,6);
    //console.log("simple is " + simple);
    //console.log("inputCode is " + inputCode);
    //console.log("codes[i] is " + codes[i]);
    if (codes[i] === inputCode) 
    {
      console.log("enter 0");
      find = 0;
      break;
    }
    else if (simple === inputCode) 
    {
      console.log("enter 1");
      find = 1;
      break;
    }
  }
  return [find, webs[i], codes[i]];
}