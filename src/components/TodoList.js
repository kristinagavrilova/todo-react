import './../styles/modal.less';
import TodoListItem from "./TodoListItem";
import {useEffect, useState} from "react";
import ModalWindow from "../modal/ModalWndow";
import {firestore} from "../firebase";
import {doc, addDoc, getDocs, deleteDoc, collection} from "firebase/firestore/lite";

const TodoList = () => {

    const [todoList, setTodoList] = useState([])
    const [modal, setModal] = useState(false)

    const ref = collection(firestore, "todos");

    useEffect(() => {
        getDocs(ref).then(r => {
            let documentData = r.docs.map(r => r.data());
            setTodoList(documentData)
        })
    }, []);

    const deleteTodo = (id) => {
        let find = todoList.find(todo => todo.id === id);
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

    const addTodo = (obj) => {
        addDoc(ref, obj).then(() => {
            todoList.push(obj)
            setTodoList([...todoList])
        }).catch(() => {
            alert("Не удалось сохранить задачу")
        })
        closeModal();
    }


    return (
        <>
            <ModalWindow visible={modal}
                         closeModal={closeModal}
                         addTodo={addTodo}
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