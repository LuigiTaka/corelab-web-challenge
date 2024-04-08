import { ITodo } from "./Todo"
import { ITodoApiResponse } from "./ApiResponse"

export interface  ITodoComponent extends ITodo {
    save(id : number,todo : ITodo) : any;
    destroy(id : number) : any;
}
