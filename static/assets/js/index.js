console.log("index.js");

function add() {
    let text = document.getElementById("input-add").value.trim();
    for (let e of document.getElementsByClassName("element-title")) {
        if (e.innerText.trim() === text) {
            if (window.confirm(`This task is already exist ! Click on "OK" to add.`)) {
                break;
            } else {
                return;
            }
        }
    }
    document.getElementById("list").innerHTML += `


<div class="element border">
    <div class="text-left">
        <input type="checkbox" class="" onclick="">
        <span name="text" class="element-title span-text">${text}</span>
    </div>
    <div class="text-right">
        <button onclick="edit(this)" class="edit">
            <img src="static/images/pencil-square.svg" alt="edit" class="svg">
        </button>
        <button onclick="if(window.confirm('Are you sure you want to delete this item ?')){this.parentNode.parentNode.remove()}" class="trash">
            <img src="static/images/trash-fill.svg" alt="trash" class="svg">
        </button>
    </div>
</div>


    `.trim();
}

function edit(btn) {
    let text = prompt(btn.parentNode.parentNode.querySelector(".span-text").innerText.trim()).trim();
    btn.parentNode.parentNode.querySelector("span").innerText = text.length > 0 ? text : btn.parentNode.parentNode.querySelector("span").innerText;
}


function test() {
    document.body.innerHTML += ``;
}
