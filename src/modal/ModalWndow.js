import './../styles/modal.less';
import CloseIcon from "../icons/CloseIcon";
import {v4 as uuidv4} from 'uuid';
import {useEffect, useRef, useState} from "react";
import {storage} from "../firebase";
import {uploadBytesResumable, ref, getDownloadURL} from "firebase/storage";

const ModalWindow = (props) => {

    const [fileUrl, setFileUrl] = useState(null)
    const [saveEnable, setSaveEnable] = useState(true)


    const inputTitle = useRef()
    const inputDescription = useRef()
    const inputData = useRef()
    const inputFile = useRef()

    const addFile = () => {
       setSaveEnable(true)
        let fileName = inputFile.current.files[0].name;
        const fileRef = ref(storage, `files/${fileName}`);
        uploadBytesResumable(fileRef, inputFile.current.files[0]).then(r => {
            getDownloadURL(r.ref).then(url => {
                setFileUrl(url)
                setSaveEnable(false)
            })
        }).catch(e => {
            alert('Не удалось загрузить файл')
        }).finally(()=>{
            setSaveEnable(false)
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
                fileUrl: fileUrl
            }
            clearData()
            props.updateTodo(objTodo);
        } else {
            let objTodo = {
                id: uuidv4(),
                title: inputTitle.current.value,
                description: inputDescription.current.value,
                deadline: inputData.current.value,
                isDone: false,
                fileUrl: fileUrl
            }
            clearData()
            props.addTodo(objTodo);
        }
    }

    const titleOnChange = (e) => {
      if (e.target.value.length > 0) {
          setSaveEnable(false)
      } else {
          setSaveEnable(true)
      }
    }

    const clearData = () => {
        inputTitle.current.value = '';
        inputDescription.current.value ='';
        inputData.current.value = '';
    }

    return (
        <div className={!props.visible ? 'myModal' : 'myModalActive'}>
            <div className='container'>
                <CloseIcon onClick={() => props.closeModal()}/>
                <div className='contentTodo'>
                    <input ref={inputTitle} className='input inputTitle' placeholder='Заголовок'
                    onChange={titleOnChange}
                    />
                    <textarea ref={inputDescription} className='input inputEnterTask' cols="20" rows="7"
                              placeholder='Описание задачи'/>
                </div>
                <div className='dataAndFile'>
                    <label> Дата окончания:
                        <input ref={inputData} className='input inputDataChange' type="date"/>
                    </label>
                    <input ref={inputFile} className='input inputFile' type="file" onChange={() => addFile()}/>
                </div>
                <div className='buttonSave'>
                    <button disabled={saveEnable} className={saveEnable ? 'btn saveTodo btnDisable':'btn saveTodo'}
                            onClick={() => saveTodo()}>Сохранить</button>
                </div>
            </div>
        </div>

    )

}

export default ModalWindow;