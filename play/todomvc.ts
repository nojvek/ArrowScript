class TodoApp
  public render()
    const todos = @.props.model.todos;

    const shownTodos = todos.filter(> todo ->
      switch @.state.nowShowing
        case ACTIVE_TODOS:
            -< !todo.completed;
        case COMPLETED_TODOS:
            -< todo.completed;
        default:
            -< true;

    // Note: It's usually better to use immutable data structures since they're
    // easier to reason about and React works very well with them. That's why
    // we use map(), filter() and reduce() everywhere instead of mutating the
    // array or todo items themselves.
    let activeTodoCount = todos.reduce(>
        (accum, todo) -> todo.completed ? accum : accum + 1
        0

    let completedCount = todos.length - activeTodoCount

    -< <div>
        <header.header>
            <h1>todos
            <input.new-todo
                ref="newField"
                placeholder="What needs to be done?"
                onKeyDown={e -> @.handleNewTodoKeyDown(e)}
                autoFocus={true}
            >
        {> nif todos.length
            <section.main>
                <input.toggle-all
                    type="checkbox"
                    onChange={e -> @.toggleAll(e)}
                    checked={activeTodoCount is 0}
                >
                <ul.todo-list>
                    {> shownTodos.map(> todo -> (>
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={@.toggle.bind(@, todo)}
                            onDestroy={@.destroy.bind(@, todo)}
                            onEdit={@.edit.bind(@, todo)}
                            editing={@.state.editing is todo.id}
                            onSave={@.save.bind(@, todo)}
                            onCancel={ e -> @.cancel() }
                        >
        {> nif activeTodoCount or completedCount
            <TodoFooter
                count={activeTodoCount}
                completedCount={completedCount}
                nowShowing={@.state.nowShowing}
                onClearCompleted={ e -> @.clearCompleted() }
            >
