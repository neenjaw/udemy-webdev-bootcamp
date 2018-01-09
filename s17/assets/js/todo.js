let TodoList = (function(){

  let settings;
  let todos;

  function makeTodoItem(id, item) {
    return {id: id, task: item};
  }

  function makeTodoItemElement(todoItem) {
    let $element = $(`<li data-task-id="${todoItem.id}"><span>X</span> ${todoItem.task}</li>`);

    return $element;
  }

  function loadTodos() {
    let $todoList = $(`#${settings.ids.todoList}`);

    //remove any exisiting node children
    $todoList.empty();

    for (var i = 0; i < todos.length; i++) {
      let $newTodoItemElement = makeTodoItemElement(todos[i]);

      $todoList.append($newTodoItemElement);
    }
  }

  function addTodo(todoTask){
    let newId = todos[todos.length - 1].id + 1; //find the id of the last do created, increment by 1

    let newTodo = makeTodoItem(newId, todoTask);

    //add it to the datastructure
    todos.push(newTodo);

    //add it to the DOM
    $(`#${settings.ids.todoList}`).append(makeTodoItemElement(newTodo));
  }

  function removeTodo(id) {
    if (settings.debug) console.log(`Removing todo item: ${id}`);

    //remove todo from the data structure
    todos.filter(todo => todo.id !== id);

    //remove the todo item from the DOM
    $(`li[data-task-id="${id}"]`).fadeOut(500, function(){
      $(this).remove();
    });
  }

  function addListeners() {
    $(`#${settings.ids.inputNewTodo}`).keypress(function(e){
      //if enter pressed and non-blank
      if (e.which === 13 && $(this).val().trim() !== "") {
        addTodo($(this).val());
        $(this).val("");
      //if blank, then clear
      } else if ($(this).val().trim() === "") {
        $(this).val("");
        //IDEA: show invalid input feedback.
      }
    });

    $(`#${settings.ids.todoList}`).on("click", "li", function(){
      $(this).toggleClass(settings.classes.taskComplete);
    });

    $(`#${settings.ids.todoList}`).on("click", "span", function(e){
      removeTodo($(this).closest("li").data("taskId"));
      
      //stop the event from bubbling up
      e.stopPropagation();
    });
  }

  function init(initialSettings) {
    //catching bad input data
    initialSettings = initialSettings || {};
    settings = initialSettings;

    //setting the initial settings, if not defined in object in arguments
    settings.ids = settings.ids || {};
    settings.ids.todoList = settings.ids.todoList || 'todo-list';
    settings.ids.inputNewTodo = settings.ids.inputNewTodo || 'input-new-todo';

    settings.classes = settings.classes || {};
    settings.classes.taskComplete = settings.classes.taskComplete || "task-complete";

    settings.debug = settings.debug  || true;

    //debug console messaging
    if (settings.debug) console.log("Todo List Initializing");
    if (settings.debug) console.log("> Settings...");
    if (settings.debug) console.log(settings);

    todos = [];

    if (settings.debug) {
      todos.push(makeTodoItem(todos.length, "Walk dog."));
      todos.push(makeTodoItem(todos.length, "Go to work."));
      todos.push(makeTodoItem(todos.length, "Eat a sandwich."));
      todos.push(makeTodoItem(todos.length, "Shower before bed."));
      todos.push(makeTodoItem(todos.length, "Change oil."));
      todos.push(makeTodoItem(todos.length, "Code in Javascript."));
      todos.push(makeTodoItem(todos.length, "Read."));
    }

    if (settings.debug) console.log("> Todos...");
    if (settings.debug) console.log(todos);

    loadTodos();
    addListeners();
  }

  return {
    init
  };

}());
