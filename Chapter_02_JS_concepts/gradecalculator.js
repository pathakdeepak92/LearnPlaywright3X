//console.log("Enter a Number");
const grade = require('fs').readFileSync(0, 'utf8');
if (grade >= 90 && grade <= 100) {
    console.log("You are Excelent got A grade")
}
else if (grade >= 80 && grade < 90) { console.log("You are great got B grade") }
else if (grade >= 70 && grade < 80) { console.log("You are good got C grade ") }
else if (grade >= 60 && grade < 70) { console.log("you are average got D grade") }
else {
    console.log("Fail ")

}


