const date = new Date();

monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const month = date.getMonth();

document.querySelector('.date h1').innerText = monthNames[month];
document.querySelector('.date p').innerText = date.toDateString();

let day = "";
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const indexLastDay =  7 - new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
const monthDays = document.querySelector('.days');

for (let d = firstDay; d > 0; d--) {

    day += '<div class="prev-date">' + (prevMonthLastDay -d + 1) + '</div>'

}
for (let i = 1; i <= lastDay; i++) {
    day += '<div>' + i + '</div>';
    
}

for (let ld = 1; ld < indexLastDay; ld++) {
    day += '<div class="prev-date">' + (ld) + '</div>';
    monthDays.innerHTML = day;
}