let thisDay = new Date();
document.getElementById("calendar").innerHTML=createCalendar(thisDay);

//function to generate the calendar table
function createCalendar(calDate) {
    let calendarHTML = `<table id="calendar_table">`;
    calendarHTML += calCaption(calDate);
    calendarHTML += calWeekdayRow();
    calendarHTML += calDays(calDate);
    calendarHTML += `</table>`;
    return calendarHTML;
}

//fuction to write the calendar caption
function calCaption(calDate){
    let monthName = ["January","February","March","April","May","June","July",
                    "August","September","October","November","December"];
    let thisMonth = calDate.getMonth();
    // console.log(`this month is ${thisMonth}`)
    let thisYear = calDate.getFullYear();
    //console.log(`this year is ${thisYear}`);

    return `<caption> ${monthName[thisMonth]} ${thisYear} </caption>`
}
//function to write calendar days of the week
function calWeekdayRow(){
    let dayName = ["SUN","MON","TUE","WED","THUR","FRI","SAT"];
    let rowHTML = "<tr>";
    for (let i=0; i <dayName.length; i++){
        rowHTML += `<th class="calendar_weekdays"> ${dayName[i]} </th>`;
    }
    rowHTML+= "</tr>";

    return rowHTML
}

//function to determine days in a month
function daysInMonth(calDate){
    let dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];
    let thisYear = calDate.getFullYear();
    let thisMonth = calDate.getMonth();

    //check if it is a leap year
    if (thisYear%4 === 0){ 
        if ((thisYear % 100 != 0) || (thisYear%400===0)){
            dayCount[1] = 29;
        }
    }
    return dayCount[thisMonth];
}

//funtion to place the days
function calDays(calDate){
    //determine starting day of month
    let day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
    /*get the day of the week the week starts - 0(sun) to 6 (sat)
    this will be used to also set blank spaces before*/
    let weekDay = day.getDay();

    //blank cells preceding starting day
    let htmlCode = `<tr>`;
    for(let i=0; i<weekDay; i++){
        htmlCode+= `<td class="blank_cells"></td>`;
    }

    //each day of the month
    let totalDays = daysInMonth(calDate);
    let highlightDay = calDate.getDate();

    for(let i=1; i<=totalDays; i++){
        day.setDate(i);
        weekDay = day.getDay();

        if (weekDay===0) htmlCode += `<tr>`;
        if (i===highlightDay){
            htmlCode += `<td class="calendar_dates" id="calendar_today"> ${i} </td>`;
        } else{
            htmlCode += `<td class="calendar_dates"> ${i} </td>`;
        }
        if (weekDay===6) htmlCode += `</tr>`;
    }
    return htmlCode;
}