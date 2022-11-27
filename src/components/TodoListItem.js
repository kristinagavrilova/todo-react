import './../styles/modal.less';
import FilesIcon from "../icons/FilesIcon";
import dayjs from "dayjs";

const TodoListItem = (props) => {

    const {id, title, description, deadline,isDone,fileUrl} = props.todoItem


    const downlandFile = () => {
        window.open(fileUrl)
    }

    /**
     * получение стилей для разного статуса задачи
     * @returns {string} - className
     */
    const getLiClass = () => {
        let classArr = ['liToDo']
        if (isDone) {
            classArr.push('liOpacity')
        } else if (dayjs(deadline).diff(dayjs()) <= 0) {
            classArr.push('red')
        }
      return classArr.join(' ')
    }

    return (
                <li className={getLiClass()}>
                    <input type="checkbox" className='inputCheck' checked={isDone}
                           onChange={()=> props.changeStatus(id)}/>
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