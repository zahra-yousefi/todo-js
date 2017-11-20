// TodoFormView
function TodoFormView() {
}

TodoFormView.prototype.render = function (container) {
    var form = document.createElement('form');
    var input = document.createElement('input');
    var button = document.createElement('input');

    form.onsubmit = add.bind(this);
    form.action = 'javascript:';

    button.value = 'add';
    button.type = 'submit';

    form.appendChild(input);
    form.appendChild(button);

    container.appendChild(form);

    window.onload = function () { input.focus(); };

    function add(e) {
        this.onAddTodo && this.onAddTodo(input.value);
        input.value = '';
        input.focus();
    };
}