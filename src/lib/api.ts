import {ITodo} from "../types/Todo"
import {ITodoBase} from "../types/TodoBase"
import {IPostTodo} from "../types/PostTodo"
import { ITodoApiResponse, ITodoSearchResponse } from "../types/ApiResponse"

const API = "http://localhost:3333";
const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
  return fetch(endpoint(path)).then((res) => res.json());
};


const callApi = async (path: string, method: string, headers: Headers, body?: string) : Promise<any> =>  {
    headers.append("Content-Type",'application/json')
    const options = {  method: method, headers: headers, body : body  }
    if( method === "GET" ){
        delete options.body
    }

    const response = await fetch(endpoint(path),options)
    
    if( !response.ok ){
        return Promise.reject( response );
    }

    return await response.json();


}

export const getVehicles = async () => {
  return get("/vehicles");
};

export const getTodos = async () : Promise<ITodoSearchResponse> => {
        return callApi( '/todos',"GET",new Headers() );
}


export const createTodo = async(todo : ITodoBase) : Promise<ITodoApiResponse> => {
        let { title, body, color = 'ffffff', favorite } = todo
        const headers = new Headers();
        return callApi( "/todos",'POST',headers,JSON.stringify({ title,body,color,favorite }))
 
}

export const updateTodo = async (id : number, todo: IPostTodo) : Promise<ITodoApiResponse> => {    
        const headers = new Headers();
        return callApi('/todos/'+id,'PUT',headers,JSON.stringify( todo )  )
}

export const destroyTodo = async (id : number) => {
        const headers = new Headers();
        return callApi('/todos/'+id,'DELETE',new Headers());
}
