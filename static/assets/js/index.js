console.log("index.js");

let d = null;

function init() {
    const json = localStorage.getItem("todolist");
    let arr_elements = JSON.parse(json);
    document.getElementById("filter").classList.add("hide");
    if (arr_elements.length === 0) {
        document.getElementById("empty").classList.remove("hide");
        return;
    }
    document.getElementById("empty").classList.add("hide");
    document.getElementById("list").innerHTML = null;
    document.getElementById("input-add").value = null;
    for (let element of arr_elements) {
        add_element(element.title, element.valid);
    }
}

function add_element(title, valid) {
    const check = valid ? "check" : "";
    document.getElementById("list").innerHTML += `
<div class="element border ${check}" draggable="true" ondrag="d=this"  ondragend="d=null" onclick="check_element(this)">
    <div class="libeled">
        <span class="element-title span-text">${title}</span>
    </div>
    <div class="action-button">
        <button class="edit">
            <img src="static/images/pencil-square.svg" alt="edit" class="svg">
        </button>
        <button class="trash">
            <img src="static/images/trash-fill.svg" alt="trash" class="svg">
        </button>
    </div>
</div>
    `.trim();
}

function check_element(element) {
    if (element.classList.contains("check")){
        element.classList.remove("check");
    } else {
        element.classList.add("check");
    }
    save_todolist();
}

function add_element_input() {
    const input = document.getElementById("input-add");
    let text = input.value.trim();
    // input.value = null
    if (text.length === 0) {
        return;
    }
    text = firstToUpperCase(text);
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
        const text = div.querySelector("span").innerText.trim();
        if (window.confirm(`Are you sure you want to delete "${text}" ?`)) {
            div.style.animation = "1s delete";
            setTimeout(function () {
                div.remove();
                save_todolist();
            }, 1000);
        }
    }
}

function remove_element(btn) {
    const text = btn.parentNode.parentNode.querySelector(".span-text").innerText.trim();
    if(window.confirm(`Are you sure you want to delete "${text}" ?`)){
        let parent = btn.parentNode.parentNode;
        parent.style.animation = "1s delete";
        setTimeout(function () {
            parent.remove();
            save_todolist();
        }, 1000);
    }
}

function edit_element(btn) {
    let span = btn.parentNode.parentNode.querySelector(".span-text");
    const title = span.innerText.trim();
    let text = prompt("Edit : "+title, title);
    if (text === null) {
        return;
    }
    text = text.trim();
    if (text.length === 0) {
        return;
    }
    span.innerText = text;
    save_todolist();
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
    init();
}

function remove_all() {
    const input = document.getElementById("input-add");
    if (input.value.length !== 0) {
        input.value = null;
        filter("")
        return;
    }
    const elements = document.getElementById("list").getElementsByClassName("element");
    if (elements.length === 0) {
        return;
    }
    if (window.confirm(`Are you sure you want to delete all tasks ?`)) {
        document.getElementById("list").innerHTML = "";
        save_todolist();
    }
}

function filter(name) {
    const elements = document.getElementById("list").getElementsByClassName("element");
    let nb_find = 0;
    if (elements.length === 0) {
        document.getElementById("empty").classList.remove("hide");
        return;
    } else {
        document.getElementById("empty").classList.add("hide");
    }
    for (let element of elements) {
        const title = element.querySelector("span").innerText.trim().toUpperCase();
        element.classList.remove("hide-element");
        if (!title.includes(name.toUpperCase())) {
            element.classList.add("hide-element");
        } else {
            nb_find++;
        }
    }
    let filter = document.getElementById("filter");
    filter.classList.add("hide");
    if (nb_find === 0) {
        filter.classList.remove("hide");
    }
}


document.onkeydown=function (e){
    if(e.key === 'Enter') {
        add_element_input();
    }
}

function test() {
    let list = document.getElementById("list");
    list.addEventListener("click", (e) => {
        if (e.target.matches(".trash>img")) {
            remove_element(e.target.parentNode);
        }
        if (e.target.matches(".trash")) {
            remove_element(e.target);
        }
        if (e.target.matches(".edit>img")) {
            edit_element(e.target.parentNode);
        }
        if (e.target.matches(".edit")) {
            edit_element(e.target);
        }
        if (e.target.matches(".trash>img") || e.target.matches(".trash") || e.target.matches(".edit>img") || e.target.matches(".edit")) {
            e.stopPropagation();
        }
    }, {
        capture: true
    });
}

function firstToUpperCase(text) {
    return text.replace(text[0], text[0].toUpperCase());
}