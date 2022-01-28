// TASK MANAGEMENT SYSTEM
// Note:
// Task is updated when the text area loses focus,
// this means the save button doesn't *actually* do
// anything, but is still a guaranteed way for the user
// to click out of the text area and trigger the update.

// FUNCTIONS
// variables to use to set workday schedule.
var startingHour = 9;
var endingHour = 17;
var taskContainer = $(".list");
var selectedTask = $(".taskSlot");

// Generate each list item for the tasks based starting and ending hour
const generateListItems = function (startingHour, EndingHour) {
  // Set classes for main divs beforehand. Makes it easy to tweak later
  let liClasses =
    "row item align-items-center text-light border-bottom border-1 border-light";
  let timeSlotClasses =
    "fill timeSlot px-2 col-1 text-dark text-end rounded-start d-flex justify-content-end align-items-center";
  id = "time";
  let taskSlotClasses = "fill taskSlot px-2 col-10 d-flex align-items-center";
  let saveSlotClasses =
    "fill saveSlot px-2 col-1 fill rounded-end d-flex align-items-center justify-content-center";

  let numItems = endingHour - startingHour;

  // checks if hour is in the afternoon. If true, flags it as afternoon and
  // converts hour to the 12 hour clock
  for (i = 0; i <= numItems; i++) {
    let hour = i + startingHour;
    let afternoon = false;
    if (hour - 12 >= 0) {
      if (hour - 12 === 0) {
        afternoon = true;
      } else {
        afternoon = true;
        hour = hour - 12;
      }
    } else {
      afternoon = false;
    }

    // Create the needed elements for each list item
    let listItemEl = $("<li>").addClass(liClasses);
    let timeAreaEl = $("<div>").addClass(timeSlotClasses);
    let taskAreaEl = $("<div>").addClass(taskSlotClasses + hour);
    let taskTextEl = $("<p>").addClass(
      "task-text px-3 d-flex align-items-center justify-content-center"
    );
    let saveAreaEl = $("<div>").addClass(saveSlotClasses);
    // add ID of the task and save elements to match the time
    // slot for future tracking
    taskAreaEl.attr("id", "hour-" + hour);
    saveAreaEl.attr("id", "hour-" + hour);
    // Create text content for items
    // Set time element, checking for before or after 12pm.
    if (!afternoon) {
      timeAreaEl.html("<p>" + hour + "  AM </p>");
    } else {
      timeAreaEl.html("<p>" + hour + "  PM </p>");
    }

    // Load in task info if any exist
    let storedTaskInfo = loadTaskData("hour-" + hour);
    if (storedTaskInfo === "" || !storedTaskInfo) {
    } else {
      taskTextEl.text(storedTaskInfo);
    }
    // Set save icon on save button
    saveAreaEl.html("<img src='assets/images/floppy-disk-solid.png' />");

    listItemEl.append(timeAreaEl);
    taskAreaEl.append(taskTextEl);
    listItemEl.append(taskAreaEl);
    listItemEl.append(saveAreaEl);
    taskContainer.append(listItemEl);
  }
};

const saveTaskData = function (taskID, newTask) {
  // saves new task data to its taskID
  localStorage.setItem(taskID, newTask);
};

const loadTaskData = function (taskID) {
  // loads data of taskID from local storage
  return localStorage.getItem(taskID);
};

const updateText = function (target) {
  // get neccessary variables for modification and saving
  console.log("yes");
  let text = $(this).find("textarea").val();
  let taskID = $(this).attr("id");
  console.log(taskID);
  console.log(text);
  let newTask = $("<div>")
    .addClass("fill taskSlot px-2 col-10 d-flex align-items-center")
    .attr("id", taskID)
    .html(
      "<p class='task-text px-3 d-flex align-items-center justify-content-center'>" +
        text +
        "</p>"
    );
  $(this).replaceWith(newTask);
  auditTimeSlots();
  saveTaskData(taskID, text);
};

const editText = function (target) {
  // replaces the <p> element with a <textarea> for editing
  let text = $(this).find("p").html();
  let taskID = $(this).attr("id");
  console.log(taskID);
  let textInput = $("<textarea>")
    .addClass("text-input col-10 px-2 d-flex align-items-center")
    .attr("name", "task")
    .attr("id", taskID)
    .attr("rows", 2)
    .attr("maxlength", 100)
    .text(text);
  $(this).find("p").replaceWith(textInput);
  textInput.trigger("focus");
};

let listEl = $(".list");
console.log(listEl);
generateListItems(startingHour, endingHour);

// enable editing of task on click
taskContainer.on("click", ".taskSlot", editText);

// validate, update, and save task
taskContainer.on("focusout", ".taskSlot", updateText);
