const ModalWindow = () => {
    return (
        <div className='container'>
            <div className='contentTodo'>
                <input className='inputTitle' placeholder='Заголовок'/>
                <textarea className='inputEnterTask' cols="20" rows="7" placeholder='Описание задачи'/>
            </div>
            <div className='dataAndFile'>
                <label> Дата окончания:
                    <input className='inputDataChange' type="date" value="2022-11-21"/>
                </label>

                <input className='inputFile' type="file" multiple/>
            </div>
            <div className='buttonSave'>
                <button className='saveTodo'>Сохранить</button>
            </div>
        </div>
    )
}

export default ModalWindow;