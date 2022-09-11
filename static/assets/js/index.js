console.log("index.js");

let d = null;

function init() {
    const json = localStorage.getItem("todolist");
    let arr_elements = JSON.parse(json);
    if (arr_elements.length === 0) {
        document.getElementById("empty").classList.remove("hide");
    }
    for (let element of arr_elements) {
        add_element(element.title, element.valid);
    }
    if (arr_elements.length === 0) {
        document.getElementById("list").innerHTML += `
            <div class="text-center border hide">
                <h1>You have not defined any task</h1>
            </div>
        `;
    }
}

function add_element(title, valid) {
    const check = valid ? "check" : "";
    document.getElementById("list").innerHTML += `
<div class="element border ${check}" draggable="true" ondrag="d=this"  ondragend="d=null" onclick="check_element(this)">
    <div class="text-left">
        <span name="text" class="element-title span-text">${title}</span>
    </div>
    <div class="text-right">
        <button onclick="edit_element(this)" class="edit">
            <img src="static/images/pencil-square.svg" alt="edit" class="svg">
        </button>
        <button onclick="remove_element(this)" class="trash">
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

function remove_element(btn) {
    if(window.confirm('Are you sure you want to delete this item ?')){
        let parent = btn.parentNode.parentNode;
        parent.style.animation = "1s delete";
        setTimeout(function () {
            parent.remove();
            save_todolist();
        }, 1000);
    }
}

function edit_element(btn) {
    let text = prompt(btn.parentNode.parentNode.querySelector(".span-text").innerText.trim()).trim();
    if (text.length === 0) {
        return;
    }
    btn.parentNode.parentNode.querySelector("span").innerText = text;
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
    window.location = window.location.href;
}

function remove_all() {
    document.getElementById("list").innerHTML = "";
    save_todolist();
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
        const title = element.querySelector("span").innerText.trim();
        element.classList.remove("hide-element");
        if (!title.includes(name)) {
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
        if (e.target.matches(".trash>img") || e.target.matches(".trash")) {
            e.stopPropagation();
            remove_element(list.querySelector(".trash"));
        }
        if (e.target.matches(".edit>img") || e.target.matches(".edit")) {
            e.stopPropagation();
            edit_element(list.querySelector(".edit"));
        }
    }, {
        capture: true
    });

}