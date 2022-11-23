import './../styles/modal.less';
import FilesIcon from "../icons/FilesIcon";

const TodoListItem = (props) => {

    const {id, title, description, deadline,isDone} = props.todoItem


    return (
                <li className='liToDo'>
                    <input type="checkbox" className='inputCheck' checked={isDone}
                           onClick={() => props.changeStatus(id)}/>
                    <h2 className='titleTaskLi'>{title}</h2>
                    <div className='text'>{description}</div>
                    <div className='textData'>Выполнить до: {deadline}</div>
                    <FilesIcon/>
                    <div className='btnArea'>

                        <button className='btn' onClick={() => props.showModal()}>Редактировать</button>
                        <button className='btn' onClick={() => props.deleteTodo(id)}>Удалить</button>
                    </div>
                </li>
    )
}

export default TodoListItem;