var addbutton=document.getElementById("addToDo");
var ToDoContainer=document.getElementById("todocontainer");
var inputfield=document.getElementById("inputfield");
var ClearCompleted=document.getElementById("clearCompletedToDoItems");
var EmptyList=document.getElementById("emptyList");
var SaveButton=document.getElementById("SaveList");

addbutton.addEventListener("click",function(){
var paragraph=document.createElement('li');
paragraph.classList.add('paragraph-styling');
paragraph.innerText=inputfield.value;
ToDoContainer.appendChild(paragraph);
inputfield.value="";
paragraph.addEventListener("click",function(){
  if(paragraph.classList.contains("completed"))
  {
    paragraph.style.textDecoration="none";
    paragraph.classList.remove('completed');

  }
  else
  {
    paragraph.style.textDecoration="line-through";
    paragraph.classList.add('completed');

  }
})

paragraph.addEventListener("dblclick",function(){
  ToDoContainer.removeChild(paragraph);
  
})

});

function newToDo(itemtext, completed)
{
var paragraph=document.createElement('li');
paragraph.classList.add('paragraph-styling');
paragraph.innerText=itemtext;
ToDoContainer.appendChild(paragraph);

if(completed)
{
  paragraph.style.textDecoration="line-through";
  paragraph.classList.add('completed');
}

}

  


ClearCompleted.addEventListener("click",function(){
  var completedItems=ToDoContainer.getElementsByClassName('completed');
  while(completedItems.length>0)
  {
    completedItems.item(0).remove();
  }
})

EmptyList.addEventListener("click",function(){
  var ToDoList=ToDoContainer.children;
  while(ToDoList.length>0)
  {
    ToDoList.item(0).remove();
  }
})

SaveButton.addEventListener("click",function(){
  var ToDos=[];
  for(var i=0;i<ToDoContainer.children.length;i++)
  {
    var todoitem=ToDoContainer.children.item(i);
    var todoinfo={
      "task":todoitem.innerText,
      "completed":todoitem.classList.contains("completed")
    };

    ToDos.push(todoinfo);
  }
  localStorage.setItem("ToDos",JSON.stringify(ToDos));
  loadList();

})

if (sessionStorage.getItem("is_reloaded"))
{
  loadList();
}

function loadList()
{
  if (localStorage.getItem("ToDos") != null)
  {
    var toDos = JSON.parse(localStorage.getItem("ToDos"));
    for(var i=0;i<toDos.lenght;i++)
    {
      var todo=toDos[i];
      newToDo(todo.task,todo.completed);
      
    }

  }
}





