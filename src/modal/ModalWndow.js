import './../styles/modal.less';
import CloseIcon from "../icons/CloseIcon";

const ModalWindow = (props) => {
    return (
        <div className={!props.visible ? 'myModal' : 'myModalActive'}>
            <div className='container'>
                <CloseIcon onClick={() => props.closeModal()}/>
                <div className='contentTodo'>
                    <input className='input inputTitle' placeholder='Заголовок'/>
                    <textarea className='input inputEnterTask' cols="20" rows="7" placeholder='Описание задачи'/>
                </div>
                <div className='dataAndFile'>
                    <label> Дата окончания:
                        <input className='input inputDataChange' type="date" />
                    </label>

                    <input className='input inputFile' type="file" multiple/>
                </div>
                <div className='buttonSave'>
                    <button className='btn saveTodo'>Сохранить</button>
                </div>
            </div>
        </div>

    )
}

export default ModalWindow;