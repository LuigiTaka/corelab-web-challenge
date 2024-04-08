import style from "./TodoForm.module.scss";
import {ChangeEvent, FormEvent, useState} from "react";
import {ITodoBase} from "../../types/TodoBase";
import { ElegantInput } from "../"
import { TiStarFullOutline,TiStarOutline } from "react-icons/ti";

interface ITodoForm extends ITodoBase {
    id: string | number;
    submitCallback: (e: FormEvent, todo: ITodoBase) => any;
    onChange: (key : string, value : string) => any;
    onFav: (value: boolean) => any;
    className?: string;
    children? : JSX.Element;
}

const TodoForm = (props: ITodoForm) => {


    const [todoData, setTodoData] = useState({
        title: props.title,
        body: props.body,
        color: props.color,
        favorite: props.favorite
    })

    const [isChecked, setIsChecked] = useState( props.favorite )

    const changeHandler = (fieldName: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = e.target.value; 
        props.onChange( fieldName, value );
    }

    const submitHandler = (e: FormEvent) => {
        const nextTodoData = {...props}
        props.submitCallback(e, nextTodoData);
    }

    const favHandler = (e : React.MouseEvent<HTMLInputElement>) => {
       const newIsChecked = !isChecked;
       setIsChecked(!isChecked)
       props.onFav( newIsChecked ); 
        
    }

    const className = style.TodoForm.concat( " " ,props?.className || '' );
    return (
        <form style={ { background: props.color } } onSubmit={(e) => submitHandler(e)} className={className}>
            <div>
            <ElegantInput  type={'text'} placeholder={'Título'} 
                    onChange={ changeHandler('title')} 
                    value={props.title}
                    label={'Título'}
                />
                <label htmlFor={'fav-'+props.id} style={{ alignContent:'space-evenly' }}>
                { isChecked ? <TiStarFullOutline/> : <TiStarOutline/> }
                    <input name={'fav-'+props.id} onChange={()=>{}} hidden={true} id={'fav-'+props.id} type={'checkbox'} checked={isChecked} onClick={(e) =>favHandler(e)}/>
                </label>
            </div>
                <textarea name={'body'} onChange={changeHandler('body')} value={props.body}/>
    
            { props.children }
        </form>

    )
}


export default TodoForm;
