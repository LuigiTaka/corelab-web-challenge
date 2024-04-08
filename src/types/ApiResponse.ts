import { ITodo } from "../types/Todo"

export interface ITodoApiResponse {
    todo : ITodo

}


export interface ITodoSearchResponse {
    results: Array<ITodo>

}
