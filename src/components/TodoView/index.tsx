import {ITodoBase} from "../../types/TodoBase";
import React from "react";
import styles from "./TodoView.module.scss";

import { TiStarFullOutline,TiStarOutline } from "react-icons/ti";


const TodoView = (props: ITodoBase) => {


    return (<div className={styles.TodoView}>
        <div className={styles.TodoHeader}>
            <h2>{props.title}</h2>
            { props.favorite ?  (<TiStarFullOutline/>) : (<TiStarOutline/>) }
        </div>
        <div className={styles.Body}>
            <p className={styles.Body}>{props.body}</p>
        </div>
      </div>)
}

export default TodoView;
