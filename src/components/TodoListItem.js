import './../styles/modal.less';
import FilesIcon from "../icons/FilesIcon";
import dayjs from "dayjs";

const TodoListItem = (props) => {

    const {id, title, description, deadline,isDone,fileUrl} = props.todoItem
    
    const downlandFile = () => {
        window.open(fileUrl)
    }

    return (
                <li className={dayjs(deadline).diff(dayjs()) >= 0 ? 'liToDo' : 'liToDo red'}>
                    <input type="checkbox" className='inputCheck' checked={isDone}
                           onClick={() => props.changeStatus(id)}/>
                    <h2 className='titleTaskLi'>{title}</h2>
                    <div className='text'>{description}</div>
                    <div className='textData'>Выполнить до: {dayjs(deadline).format('DD/MM/YYYY') }</div>
                    {fileUrl && <FilesIcon onClick={downlandFile}/>}
                    <div className='btnArea'>
                        <button className='btn' onClick={() => props.updateTodo(id)}>Редактировать</button>
                        <button className='btn' onClick={() => props.deleteTodo(id)}>Удалить</button>
                    </div>
                </li>
    )
}

export default TodoListItem;