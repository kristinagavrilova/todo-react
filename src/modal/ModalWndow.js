import './../styles/modal.less';
import CloseIcon from "../icons/CloseIcon";
import {v4 as uuidv4} from 'uuid';
import {useEffect, useRef, useState} from "react";
import {collection} from "firebase/firestore";
import {storage} from "../firebase";
import {uploadBytesResumable, ref} from "firebase/storage";

const ModalWindow = (props) => {

    const [files, setFiles] = useState([])

    const fileRef = ref(storage, `files/todos`);

    const inputTitle = useRef()
    const inputDescription = useRef()
    const inputData = useRef()
    const inputFile = useRef()

    const addFile = () => {
        console.log(inputFile.current.files[0])
        uploadBytesResumable(fileRef, inputFile.current.files[0]).then(r =>{
            console.log(r)
        }).catch(e => {
            console.log(e)
        })
    }


    useEffect(() => {
        if (props.updateTodoItem) {
            inputTitle.current.value = props.updateTodoItem.title;
            inputDescription.current.value = props.updateTodoItem.description;
            inputData.current.value = props.updateTodoItem.deadline;
        }
    }, [props.updateTodoItem]);


    const saveTodo = () => {
        if (props.updateTodoItem?.id) {
            let objTodo = {
                id: props.updateTodoItem.id,
                title: inputTitle.current.value,
                description: inputDescription.current.value,
                deadline: inputData.current.value,
                isDone: false,
            }
            props.updateTodo(objTodo);
        } else {
            let objTodo = {
                id: uuidv4(),
                title: inputTitle.current.value,
                description: inputDescription.current.value,
                deadline: inputData.current.value,
                docRef: null,
                isDone: false
            }
            props.addTodo(objTodo);
        }

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

                    <input ref={inputFile} className='input inputFile' type="file" multiple
                           onChange={() => addFile()}/>
                </div>
                <div className='buttonSave'>
                    <button className='btn saveTodo' onClick={() => saveTodo()}>Сохранить</button>
                </div>
            </div>
        </div>

    )


}

export default ModalWindow;