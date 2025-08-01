// Get references to DOM elements
const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const datetimeElement = document.getElementById("datetime")

// Real-time clock: updates the datetime display every second
function updateDateTime() {
    const now = new Date()
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    }
    datetimeElement.textContent = now.toLocaleString("en-US", options)
}

updateDateTime() // Initial clock update
setInterval(updateDateTime, 1000) // Update clock every second

// Adds a new task to the list
function addTask() {
    if (inputBox.value.trim() === "") {
        // Alert if input is empty
        alert("Please enter a task!")
    } else {
        // Create new list item with task text
        const li = document.createElement("li")
        li.innerHTML = inputBox.value
        listContainer.appendChild(li)
        // Add delete button (span with ×)
        const span = document.createElement("span")
        span.innerHTML = "\u00d7"
        li.appendChild(span)
        saveData() // Save updated list to localStorage
    }
    inputBox.value = "" // Clear input box
}

// Listen for Enter key to add task
inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask()
    }
})

// Handle clicks on tasks and delete buttons
listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        // Toggle checked status for completed tasks
        e.target.classList.toggle("checked")
        saveData()
    } else if (e.target.tagName === "SPAN") {
        // Remove task when delete button is clicked
        e.target.parentElement.remove()
        saveData()
    }
})

// Save current list to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

// Load tasks from localStorage on page load
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || ""
}

showTask() // Restore tasks when script runs


