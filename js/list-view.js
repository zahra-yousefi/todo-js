function TodoListView() {

}

TodoListView.prototype.render = function (container) {
    var listDiv = document.createElement('div'),
        ul = document.createElement('ul'),
        deletedUl = document.createElement('ul'),
        span = document.createElement('span'),
        selectBox = document.createElement('input');

    selectBox.type = 'checkBox';

    listDiv.appendChild(ul);
    listDiv.appendChild(deletedUl);
    listDiv.appendChild(span);
    listDiv.appendChild(selectBox);
    container.appendChild(listDiv);


}

