// DOM Exercise: To-Do List
// Work through the TODOs in order. Open index.html in a browser to test.

// TODO 1: Select the elements you'll need:
//   - the form (#todo-form)
//   - the input (#todo-input)
//   - the list (#todo-list)

const form = document.getElementById("todo-form")
const input = document.getElementById("todo-input")
const list = document.getElementById("todo-list")


// TODO 2: Listen for the form's "submit" event. Inside the handler:
//   - call event.preventDefault() so the page doesn't reload
//   - read and trim the input's value
//   - if it's empty, do nothing (return)
//   - otherwise, create a new to-do item (see TODO 3) and clear the input


form.addEventListener("submit", (event)=> {
    event.preventDefault()
    const value = input.value.trim()
    if (value === "") return;
     else { 
    
    addTodo(value);
     input.value = "" }
})


// TODO 3: Write a function addTodo(text) that:
//   - creates an <li>
//   - creates a <span class="todo-text"> inside it containing the text
//   - creates a <button class="delete-btn"> inside it with text "x"
//   - appends the <li> to the list
//
// Hint: use document.createElement, textContent, and append/appendChild.
function addTodo(text) {
    const newLi = document.createElement("li")
    const newSpan = document.createElement("span")
    newSpan.className = ("todo-text")
    newSpan.textContent = text

    const newBtn = document.createElement("button")
    newBtn.className = ("delete-btn")
    newBtn.textContent = "x"
    
    newLi.append(newSpan, newBtn)
    list.append(newLi);

    newBtn.addEventListener("click", () => {
    newLi.remove()

})

}



// TODO 4: When the delete button inside an <li> is clicked, remove that <li>
// from the list. (Attach this listener when you create the button in TODO 3.)

newBtn.addEventListener("click", () => {
    newLi.remove()

})




// TODO 5: When the todo-text span inside an <li> is clicked, toggle the
// "completed" class on the <li>. (Attach this listener when you create the
// span in TODO 3.)
