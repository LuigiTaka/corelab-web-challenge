import React, {ReactNode} from "react";
import styles from "./Card.module.scss";

interface ICard {
    title: string;
    children: ReactNode;
    className?: string;
}

const Card = (props: ICard) => {
    const childrenClassname = props.className ? props.className.concat(styles.content) : styles.content;
    return (
        <div className={styles.Card}>
            <h2>{props.title}</h2>

            <div className={childrenClassname}>{props.children}</div>
        </div>
    );
};

export default Card;
