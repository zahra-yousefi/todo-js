// id
// title
// isDone
// isDeleted
// order

function TodoModel(title) {
	this.id = 1;
	this.title = title;
	this.isDone = false;
	this.isDeleted = false;
	this.isSelected= false;
}