const addBtn = document.querySelector(".addBtn");
const inputs = document.querySelector("#inputs");
const addTaskBtn = document.querySelector(".addTaskBtn");
const textInput = document.querySelector("#textInput");
const dateInput = document.querySelector("#date");
const checkbox = document.querySelector("#checkbox");
const list = document.querySelector("UL");
const saveButton = document.querySelector("#save");
const clearTasks = document.querySelector("#clear");

//! EVENT LISTENERS

// what happens when +new button press

addBtn.addEventListener("click", () => {
  inputs.toggleAttribute("hidden");
  addBtn.classList.toggle("closeBtn");
  addBtn.classList.toggle("addBtn");
  inputs.classList.toggle("animate__animated");
  inputs.classList.toggle("animate__flipInX");
  saveButton.toggleAttribute("hidden");
  clearTasks.toggleAttribute("hidden");
  if (addBtn.innerHTML === "+ New") {
    addBtn.innerHTML = "Close";
  } else {
    addBtn.innerHTML = "+ New";
  }
});

// what happens when Add button press

addTaskBtn.addEventListener("click", () => {
  // textInput is required

  if (!textInput.value == "") {
    let newTask = document.createElement("li");

    //list item contains
    newTask.innerHTML =
      "<p class='taskText'>" +
      textInput.value +
      "</p><br><p class='taskDate'>" +
      dateInput.value +
      "</p><br><i class='deleteLine fa fa-trash'></i>"; //  add a delete button on the list item
    list.append(newTask);
    //check if checkbock is checked
    if (checkbox.checked === true) {
      newTask.style.border = "5px solid green";
    }

    //  delete button deletes list item
    document.querySelectorAll(".deleteLine").forEach((e) => {
      e.addEventListener("click", () => {
        e.parentElement.classList.add("animate__animated");
        e.parentElement.classList.add("animate__backOutDown");
        setTimeout(() => {
          e.parentElement.remove();
        }, 1000);
      });
    });

    // Add strikethrough on list item click
    document.querySelectorAll("li").forEach((e) => {
      if (!e.classList.contains("strikethrough")) {
        e.addEventListener("click", () => {
          newTask.classList.toggle("strikethrough");
        });
      } else {
        e.classList.remove("strikethrough");
      }
    });
    textInput.value = "";
    dateInput.value = "";
  } else alert("Please type a Task");
});

// click button to clear current list and local storage --- first needs confirmation!
clearTasks.addEventListener("click", () => {
  if (confirm("Delete list. Are you sure?")) {
    list.innerHTML = "";
    localStorage.clear();
  } else {
  }
});

// click button to save current list to local storage
saveButton.addEventListener("click", () => {
  window.localStorage.setItem("list", list.innerHTML);
  saveButton.innerHTML = "Saved!";
});

// populate list on pageload
window.onload = () => {
  list.innerHTML = window.localStorage.getItem("list");
  //  delete button deletes list item ON RELOAD
  document.querySelectorAll(".deleteLine").forEach((e) => {
    e.addEventListener("click", () => {
      e.parentElement.classList.toggle("animate__animated");
      e.parentElement.classList.toggle("animate__backOutDown");
      setTimeout(() => {
        e.parentElement.remove();
      }, 1000);
    });
  });

  // Add strikethrough on list item click on RELOAD
  document.querySelectorAll("li").forEach((e) => {
    if (!e.classList.contains("strikethrough")) {
      e.addEventListener("click", () => {
        e.classList.toggle("strikethrough");
      });
    } else {
      e.classList.remove("strikethrough");
    }
  });
};
