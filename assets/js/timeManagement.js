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
    let auditItem = "";
    // Find correct taskInfo element
    if (i > 12) {
      auditItem = $("#hour-" + (i - 12));
    } else {
      auditItem = $("#hour-" + i);
    }

    let auditTime = moment(i, "HH:mm");
    let h = i + 1;
    let nextTimeSlot = moment(h, "HH:mm");

    let currentTime = moment().format("HH:mm");
    // Check if current time is after time of task
    if (moment(currentTime, "HH:mm").isAfter(auditTime, "HH:mm")) {
      auditItem.removeClass("isBefore");
      auditItem.removeClass("isNow");
      auditItem.addClass("isAfter");
      console.log("after");
    }
    // check if current time is within the same hour of task time (aka happening currently)
    if (
      moment(currentTime, "HH:mm").isBetween(
        moment(auditTime, "HH:mm"),
        moment(nextTimeSlot, "HH:mm")
      )
    ) {
      // console log true for now
      console.log("HAPPENING!");
      auditItem.removeClass("isAfter");
      auditItem.removeClass("isBefore");
      auditItem.addClass("isNow");
    }
    // Else time hasn't happened yet
    else if (moment(currentTime, "HH:mm").isBefore(auditTime, "HH:mm")) {
      console.log("before");
      //add class for event that hasn't happened yet
      auditItem.removeClass("isNow");
      auditItem.removeClass("isAfter");
      auditItem.addClass("isBefore");
    }
  }
};

const initializeTimeSlotAuditInterval = function () {
  var auditUpdate = setInterval(auditTimeSlots, 60 * 1000);
};

// On script load, update time and start interval
updateTime();
initializeTimeUpdateInterval();
auditTimeSlots();
initializeTimeSlotAuditInterval();
