let Todo = (function () {
    'use strict';

    let todoList;

    function initTodo(initialTodoList = []){
      todoList = initialTodoList;
    }

    function isInitialized() {
      if (todoList === undefined) {
        return false;
      } else {
        return true;
      }
    }

    function newTodo(task = undefined){
      if (!isInitialized()) {
        console.log('Initialize the Todo List');
        return;
      }

      if (!task || typeof task !== "string") {
        task = prompt("What do you want to do?");
      }

      todoList.push(task);
    }

    function listTodo(){
      if (!isInitialized()) {
        console.log('Initialize the Todo List');
        return;
      }

      for (let i = 0, iCnt = todoList.length; i < iCnt; i += 1) {
        console.log((i+1) + ". " + todoList[i]);
      }
    }

    function deleteTodo(num = null) {
      if (!isInitialized()) {
        console.log('Initialize the Todo List');
        return;
      }

      if (num === null) {
        num = prompt("Which todo item do you want to delete?");
      }

      if (num%1 === 0 && num > 0 && num < todoList.length) {
        let index = num - 1;
        todoList.splice(index, 1);
        console.log(`Todo item ${num} deleted.`);
      } else {
        console.log("Invalid item to delete.");
      }
    }

    return {
      init: initTodo,
      new:  newTodo,
      list: listTodo,
      delete: deleteTodo
    };
}());

Todo.init();
let input = "";

while (input.indexOf('quit') < 0) {
  input = prompt("What do you want to do? (New, List, Delete, Quit)");
  input = input.toLowerCase();

  if (input.indexOf("new") === 0) {
    Todo.new();
  } else if (input.indexOf("list") === 0) {
    Todo.list();
  } else if (input.indexOf("delete") === 0) {
    Todo.delete();
  }
}

console.log('Quitting.');
