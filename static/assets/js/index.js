console.log("index.js");

let d = null;

function init() {
    const json = localStorage.getItem("todolist");
    let arr_elements = JSON.parse(json);
    for (let element of arr_elements) {
        add_element(element.title, element.valid);
    }
}

function add_element(title, valid) {
    const check = valid ? "check" : "";
    document.getElementById("list").innerHTML += `
<div class="element border ${check}" draggable="true" ondrag="d=this"  ondragend="d=null" onclick="check(this)">
    <div class="text-left">
        <span name="text" class="element-title span-text">${title}</span>
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
}

function check(element) {
    if (element.classList.contains("check")){
        element.classList.remove("check");
    } else {
        element.classList.add("check");
    }
    save_todolist();
}

function add() {
    const input = document.getElementById("input-add");
    let text = input.value.trim();
    // input.value = null
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
    add_element(text, false);
    save_todolist();
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
    const elements = document.getElementById("list").getElementsByClassName("element");
    let arr_elements = [];
    for (let element of elements) {
        const title = element.querySelector("span").innerText.trim();
        const check = element.classList.contains("check");
        arr_elements.push({
            title: title,
            valid: check
        });
    }
    arr_elements.sort(function  compare(a, b) {
        if (a.title < b.title)
            return -1;
        if (a.title > b.title)
            return 1;
        return 0;
    });
    arr_elements.sort(function compare(a) {
        if (a.valid)
            return 1;
        return -1;
    });
    const json = JSON.stringify(arr_elements)
    localStorage.setItem("todolist", json);
    window.location = window.location.href;
}

function remove_all() {
    document.getElementById("list").innerHTML = "";
    save_todolist();
}