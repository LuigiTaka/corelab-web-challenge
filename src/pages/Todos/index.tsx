import {useEffect, useState, FormEvent, ChangeEvent} from "react";
import {getTodos, createTodo, destroyTodo, updateTodo} from "../../lib/api";
import {Button, Search, Todo, Header, ColorPicker, TodoForm} from "../../components";
import {ITodo} from "../../types/Todo";
import {ITodoBase} from "../../types/TodoBase"
import {ITodoApiResponse} from "../../types/ApiResponse"
import todoStyle from "../../components/Todo/Todo.module.scss"
import baseStyle from '../../index.module.scss'

const TodoPage = () => {

    const [todos, setTodos] = useState<ITodo[]>([]);
    const [ newTodo, setNewTodo ] = useState<ITodoBase>({ title: '',body: '', color: 'ffffff',favorite:false }) 
    const [search, setSearch] = useState("")

    const destroy = (id: number) => {
        destroyTodo(id).then((r: ITodoApiResponse) => {
            setTodos(todos.filter((t) => {
                return t.id !== id;
            }))

        }).catch((e: Error) => {
            alert(e.message);
        }).finally(() => {

        })

    }

    const save = (id: number, todo: ITodo) => {
        updateTodo(id, {title: todo.title, body: todo.body, color: todo.color, favorite:todo.favorite}).then((r: ITodoApiResponse) => {

            setTodos(todos.map((t) => {
                if (t.id === r.todo.id) {
                    return r.todo
                }
                return t
            }))
        }).catch((e: Error) => {
            alert(e.message)
        })

    }

    const createTodoRequest = (e: FormEvent, todo :ITodoBase) => {

        setNewTodo({ title:"",body:"",color:"ffffff",favorite:false })
        createTodo({...todo})
            .then((response: ITodoApiResponse) => {
                setTodos([response.todo, ...todos])
            }).catch((e: Error) => {
            alert(e.message)
        })

        e.preventDefault();
    }


    useEffect(() => {
        const fetchTodos = async () => {



            const payload = await getTodos()
            const todosList = payload.results.map(r => r as ITodo)
            setTodos(todosList)
        }

        fetchTodos()

    }, [])


    return (

        <div>

            <Header>
                    <Search onChange={(e : ChangeEvent<HTMLInputElement>) => {
                        setSearch( e.target.value )
                    }} value={search} placeholder={'Buque suas notas'}/>

            </Header>

            <main>
                <div className={baseStyle.TodoWrapper}>
                    <TodoForm
                        id={'novo'}
                        className={baseStyle.Form}
                        submitCallback={(e : FormEvent, todo : ITodoBase) => {
                            createTodoRequest( e, todo )
                        }}
                        onFav={(favorited : boolean)=>{ setNewTodo({...newTodo,favorite : favorited}) }}
                        onChange={ (key : string, value: string ) => setNewTodo( {...newTodo, [key] : value} )}
                        favorite={newTodo.favorite}
                        title={newTodo.title}
                        body={newTodo.body}
                        color={newTodo.color} >

                            <Button type={'submit'} onClick={()=>{}} text={'Criar'} />

                        </TodoForm>
                </div>

                <h3> Favoritos </h3>
                <div className={baseStyle.TodoWrapper} >
                     {todos.filter( (todo) => todo.favorite ).map((todo) => <Todo favorite={todo.favorite} id={todo.id} idUser={todo.idUser} title={todo.title} body={todo.body}
                                               color={todo.color} key={todo.id}
                                               save={save}
                                               destroy={destroy}/>
                    )} 

                </div>
    

                <h3> Outros </h3>
                <div className={baseStyle.TodoWrapper}>
                    {todos.filter( x => !x.favorite ).map((todo) => <Todo favorite={todo.favorite} id={todo.id} idUser={todo.idUser} title={todo.title} body={todo.body}
                                               color={todo.color} key={todo.id}
                                               save={save}
                                               destroy={destroy}/>
                    )}
                </div>


            </main>

        </div>

    )

}

export default TodoPage;
