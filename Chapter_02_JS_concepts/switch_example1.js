const month = parseInt(require('fs').readFileSync(0, 'utf8').trim());
switch (month) {
    case 1:
        console.log("JANUARY")
        break;
    case 2:
        console.log("Feburary")
        break;
    case 3:
        console.log("March")
        break;
    case 4:
        console.log("April")
        break;
    case 5:
        console.log("MAY")
        break;
    case 6:
        console.log("JUNE")
        break;
    case 7:
        console.log("JULY")
        break;
    case 8:
        console.log("AUGUST")
        break;
    case 9:
        console.log("SEPTEMBER")
        break;
    case 10:
        console.log("OCTOBER")
        break;
    case 11:
        console.log("NOvember")
        break;
    case 12:
        console.log("DEcember")
        break;
    default:
        console.log("Enter vaild year")

}
