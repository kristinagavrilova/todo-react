import './../styles/modal.less';
import TodoListItem from "./TodoListItem";
import {useEffect, useState} from "react";
import ModalWindow from "../modal/ModalWndow";

const TodoList = () => {

    const [todoList, setTodoList] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        fetch('./data.json')
            .then(response => response.json())
            .then(todo => setTodoList(todo));
    }, []);

    const deleteTodo = (id) => {
        let newTodo = todoList.filter(todo => todo.id !== id)
        setTodoList(newTodo);
    }

    const changeStatus = (id) => {
      let newTodo = todoList.map(todo => {
          if (todo.id === id) {
              return {
                  ...todo,
                  isDone: !todo.isDone
              }
          }
          return todo;
      })
        setTodoList(newTodo);
    }

    const showModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }





    return (
        <>
            <ModalWindow visible = {modal}
            closeModal={closeModal}
            />
            <button className='btn bthAddTask' onClick={showModal}>Добавить задачу</button>
            <div className='contentToDo'>

                <ul className='ulToDo'>
                    {todoList.map(todo => <TodoListItem
                        todoItem={todo}
                        deleteTodo={deleteTodo}
                        changeStatus={changeStatus}
                        showModal={showModal}
                    />)}
                </ul>
            </div>
        </>
    )


}

export default TodoList;