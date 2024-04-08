import styles from "./Todo.module.scss"
import Button from "../Button"
import {ITodoComponent} from '../../types/TodoComponent'
import React, {useReducer, useState, FormEvent, } from 'react'
import ChildrenBlur from "../ChildrenBlur";
import {TodoForm, ColorPicker} from "../index";
import TodoView from "../TodoView";
import {ITodoBase} from "../../types/TodoBase";
import {LuPencil, LuPaintBucket, LuTrash } from "react-icons/lu";

interface TodoState {
    editing: boolean;
    color: boolean;
    destroy: boolean;
}

interface TodoAction {
    type: string,
    payload: boolean,
}


const Todo = (props: ITodoComponent) => {

    function reducer(state: TodoState, action: TodoAction) {
        if (action.type === 'edit') {
            return {...state, editing: action.payload}
        }else if( action.type === 'color' ) {
            return {...state, color: action.payload};
        }else if( action.type === 'destroy' ){
            return {...state, destroy: action.payload};
        }
        return {...state, editing: false,color:false}
    }

    const [isConfirmed,setIsConfirmed] = useState(false);
    const [state, dispatch] = useReducer(reducer, {editing: false,color: false,destroy:false});
    const [todoState, setTodoState] = useState({
        title: props.title,
        body: props.body,
        color: props.color,
        favorite: props.favorite
    })
    const handleFocus = () => {
        dispatch({type: 'edit', payload: true})
    }

    const handleBlur = (e : React.FocusEvent<HTMLDivElement>) => {
        dispatch({type: 'edit', payload: false})
        dispatch({type: 'color', payload: false});
        callPropFunction(todoState)
    }

    const handleChangeState = (state : ITodoBase) => {
        setTodoState({...state})
    }

    const callPropFunction = (submitedTodo : ITodoBase) => {
        const newTodo = {...submitedTodo, id: props.id, idUser: props.idUser}
        setTodoState({...submitedTodo})
        dispatch({type: 'edit', payload: false});
        props.save(props.id, newTodo)
        dispatch({type: 'color', payload: false});
    
    }

    const handleSubmit = (e: FormEvent, submitedTodo: ITodoBase) => {
        e.preventDefault();
        handleChangeState( submitedTodo)
   }



    const actions =[ 
        {
            key: 1,
            icon: (<LuPencil/>),
            action: (e : React.MouseEvent) => { 
                const payload = !state.editing;
                if(!payload){
                    e.stopPropagation();
                }
                dispatch({type:'edit',payload: payload}) }
        },
        {
            key: 2,
           icon: (<LuPaintBucket/>),
            action: (e: React.MouseEvent) => {
                dispatch({type:'color',payload: !state.color}) 

            }
        },

        {
            key: 3,
            icon: (<LuTrash/>),
            action: (e: React.MouseEvent) => { 
                const shouldConfirm = !state.destroy
                
                dispatch( {type:'destroy',payload: shouldConfirm} )

            }
        }   
    ].map( (actionObject) =>  {
        return (<Button
                    key={actionObject.key}
                    className={styles.Button}
                    type={'button'}
                    icon={ actionObject.icon }
                    text={''}
                    onClick={ (e) => actionObject.action(e) }
                    />) 
        });

    return (
        <ChildrenBlur
            className={styles.Todo}
            onBlur={(e) => handleBlur(e)}
            onFocus={() => handleFocus()}
            style={{backgroundColor: "#" +todoState.color, position: 'relative'}}
        >
            <>
            {state.editing ?
                <TodoForm 

                id={props.id}
                submitCallback={(e, nextTodo) => {
                    handleSubmit(e, nextTodo)
                }}

                          onChange={ (key: string, value : string) => {
                              handleChangeState( {...todoState, [key]: value } );
                              }}
                              onFav={ (value: boolean) => {
                                    handleChangeState({...todoState,favorite: value })
                                }}
                          title={todoState.title}
                          body={todoState.body}
                          color={todoState.color}
                          favorite={todoState.favorite}
                />

                : <TodoView title={todoState.title}
                            body={todoState.body}
                            color={todoState.color}
                            favorite={todoState.favorite}/> }              
              
                <div style={{position: 'relative'}} >
                    <div className={styles.BtnGroup}>
                    {actions}           
                    </div>
                    { state.color ? 
                    (<ColorPicker currentColor={ todoState.color } onChange={ (color: string) : any => {
                            handleChangeState({...todoState, color: color})
                        }}/>) : ''}
                </div>
                { state.destroy ? 
                (      
                    <div className={styles.TodoConfirm}> 
                        <Button className={styles.Confirm} type={'button'} text={'Sim'} onClick={ () => {  
                             setIsConfirmed(true);
                             props.destroy( props.id )       
                        } } />
                        <Button className={styles.Refuse} type={'button'} text={'Não'}  onClick={() => {  
                            dispatch({type:'destroy',payload:false})
                            setIsConfirmed(false);
                        } }/>
                    </div>) : 
                "" }
            </>
        </ChildrenBlur>)
    
};
export default Todo
