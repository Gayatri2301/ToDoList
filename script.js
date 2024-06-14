let todocontainerElement = document.getElementById("todocontainer");
let saveButton = document.getElementById("savebtn");


function statuschange(checkboxid,labelid){
    let checkboxElement = document.getElementById(checkboxid);
    let labelelement = document.getElementById(labelid);
    labelelement.classList.toggle("checked");
}

let todoList = gettodolistFromLocalStorage();
let count;
if(todoList.length == 0){
    count = 0;
}else{
let count_item = todoList.length-1;
count = count_item.uniqueno+1;
}

document.addEventListener("DOMContentLoaded",()=>{
    for (const items of todoList) {
        console.log(items);
        createandappend(items);
    }
});
saveButton.onclick = function(){
    localStorage.setItem("todolist",JSON.stringify(todoList));
}

function gettodolistFromLocalStorage(){
    let parsedlist = localStorage.getItem("todolist");
    var list = JSON.parse(parsedlist);
    if(list === null){
        return [];
    }else{
        return list;
    }
}


let inputelement = document.getElementById("inputid");
function clicked(){
    let inputvalue = inputelement.value;
    console.log(inputvalue);
    if(inputvalue === ""){
        alert("Enter valid input!!");
        return;
    }
    let item = {
        text : inputvalue,
        uniqueno : count
    }
    todoList.push(item);
    count = count+1;
    createandappend(item);
}

function removelabel(todoElementid){
    let delindex = todoList.findIndex(function(eachtodo){
        let todoid = "todo"+eachtodo.uniqueno;
        console.log(todoid," and "+todoElementid);
        if(todoid == todoElementid){
            return true;
        }
        else{
            return false;
        }
    })
    console.log(delindex);
    todoList.splice(delindex,1);
    console.log(todoList);
    let todoElement = document.getElementById(todoElementid);
    todocontainerElement.removeChild(todoElement);
}


function createandappend(item){
    let todoElement = document.createElement("li");
    todoElement.classList.add("list");
    todoElement.id = "todo"+item.uniqueno;
    todocontainerElement.appendChild(todoElement);

    let checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    let checkboxid = "checkboxid"+item.uniqueno;
    checkboxElement.id = checkboxid;
    todoElement.appendChild(checkboxElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("labelcontainer")
    todoElement.appendChild(labelContainer);

    let labelelement = document.createElement("label");
    labelelement.classList.add("labels");
    labelelement.id = "label"+item.uniqueno;
    labelelement.textContent = item.text;
    labelelement.setAttribute("for",checkboxid);
    labelContainer.appendChild(labelelement);
    
    let delbuuton = document.createElement("button");
    delbuuton.textContent = "del";
    delbuuton.classList.add("delbutton");
    labelContainer.appendChild(delbuuton);
    
    checkboxElement.onclick = function(){
       item.check = !item.check;
        statuschange(checkboxid,labelelement.id);
    }
    if(item.check==true){
        statuschange(checkboxid,labelelement.id);
    }

    delbuuton.onclick  = function(){
        removelabel(todoElement.id);
    }
}