function TodoController(containerId) {
	this.todoList = [];
	this.view = new TodoView(containerId);
}

TodoController.prototype.init = function () {
	this.view.init(this);
};

TodoController.prototype.addTodoHandler = function (value) {
	if (!value) return;
	this.todoList.push(new TodoModel(value));
	this.view.render();
};

TodoController.prototype.showDeletedCheckBoxHandler = function () {
	this.view.render();
};

TodoController.prototype.doHandler = function (todo) {
	todo.isDone = !todo.isDone;
	this.view.render();
};

TodoController.prototype.deleteHandler = function (todo) {
	todo.isDeleted = !todo.isDeleted;
	this.view.render();
}

TodoController.prototype.performSelectedItemsAction = function (prop, value) {
	var arr = this.todoList.filter(function (todo) { return todo.isSelected }).forEach(function (todo) { todo[prop] = value });
	this.view.render();
}

TodoController.prototype.performSelectAllAction = function () {
	var arr = this.todoList.forEach(function (todo) { todo.isSelected = true; });
	this.view.render();
}

TodoController.prototype.selectHandler = function (todo) {
	todo.isSelected = !todo.isSelected;

}
