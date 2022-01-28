// GLOBALS
var selectedTask = $(".taskSlot");
var currentTime = "";
// FUNCTIONS

const updateTime = function () {
  let dateTime = $(".time");
  // Use momentJS to update current time
  currentTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  // set time display to current time
  dateTime.text(currentTime);
};

const initializeTimeUpdateInterval = function () {
  var timeUpdate = setInterval(updateTime, 1000);
};

const auditTimeSlots = function () {
  // Loop through all elements
  // Compare time with current
  // Update background color
  // based on time compare
  for (i = 9; i <= 17; i++) {
    let hour = i;
    let auditTime = "";
    if (hour >= 10) {
      auditTime = hour + ":00";
    } else {
      auditTime = "0" + hour + ":00";
    }
    // Find correct taskInfo element
    let auditItem = $("#hour-" + hour);

    let currentTime = moment(["HH mm"]).toISOString();
    auditTime = moment(auditTime, "hh mm").toISOString();
    console.log(auditTime);
    console.log(moment(currentTime, "HH mm").isBefore(auditTime, "HH mm"));
  }
};

const initializeTimeSlotAuditInterval = function () {
  var auditUpdate = setInterval(auditTimeSlots, 60 * 1000);
};

// On script load, update time and start interval
updateTime();
initializeTimeUpdateInterval();
// auditTimeSlots();
// initializeTimeSlotAuditInterval();
