import './../styles/modal.less';
import TodoListItem from "./TodoListItem";
import {useEffect, useState} from "react";
import ModalWindow from "../modal/ModalWndow";
import {firestore} from "../config/firebase";
import {addDoc, getDocs, deleteDoc, collection, updateDoc} from "firebase/firestore";

const TodoList = () => {

    const [todoList, setTodoList] = useState([])
    const [modal, setModal] = useState(false)
    const [updateTodoItem, setUpdateTodoItem] = useState(null)


    const ref = collection(firestore, "todos");

    useEffect(() => {
        getDocs(ref).then(r => {
            let documentData = r.docs.map(r => r.data());
            setTodoList(documentData)
        })
    }, []);

    /**
     * удаление задачи
     * @param id задачи
     */
    const deleteTodo = (id) => {
        getDocs(ref).then(r => {
            let deleteDocElement = r.docs.find(element => element.data().id === id);
            deleteDoc(deleteDocElement.ref)
                .then(e => {
                    let newTodoArr = todoList.filter(item => item.id !== id)
                    setTodoList(newTodoArr)
                })
                .catch(err => {
                    alert("Не удалось удалить задачу")
                })
        })
    }
    /**
     * Изменение задачи
     * @param todo - измененная задача
     */
    const updateTodo = (todo) => {
        getDocs(ref).then(r => {
            let updateDocElement = r.docs.find(element => element.data().id === todo.id);
            updateDoc(updateDocElement.ref, todo)
                .then(() => {
                    closeModal()
                    let newTodo = todoList.map(savedTodo => {
                        if (savedTodo.id === todo.id) {
                            return todo

                        }
                        return savedTodo;
                    })
                    setTodoList(newTodo);
                })
                .catch(err => {
                    alert("Не удалось отредактировать задачу")
                })
        })
    }
    /**
     * открывание модального окна для редактирования задачи
     * @param id задачи
     */
    const openUpdateTodoModal = (id) => {
        let updateTodo = todoList.find(element => element.id === id)
        setUpdateTodoItem(updateTodo);
        showModal();
    }

    /**
     * изменение готовности задачи
     * @param id задачи
     */
    const changeStatus = (id) => {
        getDocs(ref).then(r => {
            let updatedDocElement = r.docs.find(element => element.data().id === id);
            let todo = updatedDocElement.data();
            todo.isDone = !todo.isDone
            updateDoc(updatedDocElement.ref, todo)
                .then(() => {
                    let newTodo = todoList.map(savedTodo => {
                        if (savedTodo.id === todo.id) {
                            return todo
                        }
                        return savedTodo;
                    })
                    setTodoList(newTodo);
                })
                .catch(err => {
                    alert("Не удалось отредактировать задачу")
                })
        })
    }


    const showModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    /**
     * Сохранение задачи в БД
     * @param obj объект задачи
     */
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
                         updateTodo={updateTodo}
                         updateTodoItem={updateTodoItem}

            />
            <button className='btn bthAddTask' onClick={showModal}>Добавить задачу</button>
            <div className='contentToDo'>

                <ul className='ulToDo'>
                    {todoList.map(todo => <TodoListItem
                        key={todo.id}
                        todoItem={todo}
                        deleteTodo={deleteTodo}
                        changeStatus={changeStatus}
                        updateTodo={openUpdateTodoModal}
                    />)}
                </ul>
            </div>
        </>
    )


}

export default TodoList;