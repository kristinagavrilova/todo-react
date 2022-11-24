import './../styles/modal.less';
import CloseIcon from "../icons/CloseIcon";
import {v4 as uuidv4} from 'uuid';
import {useRef, useState} from "react";

const ModalWindow = (props) => {

    const inputTitle = useRef()
    const inputDescription = useRef()
    const inputData = useRef()


    const saveTodo = () => {

        let objTodo = {
            id: uuidv4(),
            title: inputTitle.current.value,
            description: inputDescription.current.value,
            deadline: inputData.current.value,
            isDone: false
        }
        props.addTodo(objTodo);
    }

    return (
        <div className={!props.visible ? 'myModal' : 'myModalActive'}>
            <div className='container'>
                <CloseIcon onClick={() => props.closeModal()}/>
                <div className='contentTodo'>
                    <input ref={inputTitle} className='input inputTitle' placeholder='Заголовок'/>
                    <textarea ref={inputDescription} className='input inputEnterTask' cols="20" rows="7"
                              placeholder='Описание задачи'/>
                </div>
                <div className='dataAndFile'>
                    <label> Дата окончания:
                        <input ref={inputData} className='input inputDataChange' type="date"/>
                    </label>

                    <input className='input inputFile' type="file" multiple/>
                </div>
                <div className='buttonSave'>
                    <button className='btn saveTodo' onClick={() => saveTodo()}>Сохранить</button>
                </div>
            </div>
        </div>

    )


}

export default ModalWindow;