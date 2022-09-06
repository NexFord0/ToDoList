console.log("index.js");

let d = null;

function init() {
    document.getElementById("list").innerHTML = localStorage.getItem("todolist");
}

function add() {
    let text = document.getElementById("input-add").value.trim();
    if (text.length === 0) {
        return;
    }
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


<div class="element border" draggable="true" ondrag="d=this"  ondragend="d=null">
    <div class="text-left">
        <input type="checkbox" class="">
        <span name="text" class="element-title span-text">${text}</span>
    </div>
    <div class="text-right">
        <button onclick="edit(this)" class="edit">
            <img src="static/images/pencil-square.svg" alt="edit" class="svg">
        </button>
        <button onclick="remove(this)" class="trash">
            <img src="static/images/trash-fill.svg" alt="trash" class="svg">
        </button>
    </div>
</div>


    `.trim();
    save_todolist()
}

function remove_drag() {
    if (d !== null) {
        let div = d;
        div.style.animation = "1s delete";
        setTimeout(function () {
            div.remove();
            save_todolist();
        }, 1000);
    }
}

function remove(btn) {
    if(window.confirm('Are you sure you want to delete this item ?')){
        let parent = btn.parentNode.parentNode;
        parent.style.animation = "1s delete";
        setTimeout(function () {
            parent.remove();
            save_todolist();
        }, 1000);
    }
}

function edit(btn) {
    let text = prompt(btn.parentNode.parentNode.querySelector(".span-text").innerText.trim()).trim();
    btn.parentNode.parentNode.querySelector("span").innerText = text.length > 0 ? text : btn.parentNode.parentNode.querySelector("span").innerText;
    save_todolist()
}

function save_todolist() {
    localStorage.setItem("todolist", document.getElementById("list").innerHTML);
}

function remove_all() {
    document.getElementById("list").innerHTML = "";
    save_todolist();
}

function test() {
    document.body.innerHTML += ``;
}