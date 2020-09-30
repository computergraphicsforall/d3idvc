const dt = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];
var htmlDays;
function renderCalendar(y) {

    htmlDays = document.querySelectorAll('.month .days');
    
    let cntWeeks = 1;
    for (let m = 0; m < htmlDays.length; m++) {

        // 1
        let firstDayIndex = new Date(y, m, 1).getDay();
        let lastDay = new Date(y, m + 1, 0).getDate();
        let days = '';
        let week = true;
        let cntPosition = 1;
        let emptyDays = 1;
        
        // 3
        if (firstDayIndex == 0) {
            firstDayIndex = 7;

            
        }
        // 1
        for (let d = 0; d < lastDay; d++) {
            // 1.2
            if (week)  {
                
                days += '<div class="week">' + cntWeeks + '</div>';
                week = false;
                cntWeeks++;

            }
            while (emptyDays < firstDayIndex) {

                days += '<div></div>';
                emptyDays++;
                cntPosition++;
                
            }
            // 1.1
            days += '<div>' + (d + 1) + '</div>';
            cntPosition++;
            // 1.3
            if (cntPosition == 8) {
                week = true;
                cntPosition = 1;
            }

  
        }
        //htmlDays[m].innerHTML = days;

        //2. 
        let lastDayIndex = new Date(y, m + 1, 0).getDay();
        if (lastDayIndex != 7) {
            cntWeeks--;
        }
        // 4
        emptyDays = 1;
        while (emptyDays < 7) {

            days += '<div></div>';
            emptyDays++;            
        }
        htmlDays[m].innerHTML = days;
    }
}

function setMonths() {
    var months = document.querySelectorAll('.month .date h1');

    for (let i = 0; i < months.length; i++) {
        months[i].innerText = monthNames[i];      
    }
}
setMonths();
renderCalendar(2020);