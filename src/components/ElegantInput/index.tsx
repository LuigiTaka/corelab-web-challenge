import style from "./ElegantInput.module.scss"
import {ChangeEvent} from 'react'

interface IElegantInput {

    type: string;
    value: string;
    label: string;
    placeholder: string;
    onChange: ( e : ChangeEvent<HTMLInputElement> ) => any;

}

const ElegantInput = ( props : IElegantInput  )   => {

    const labelClassName = props.value.length === 0 ? '' : style.label;

    return (

        <div className={style.ElegantInput}>
            <input
            aria-placeholder={ props.placeholder }
            onChange={ (e : ChangeEvent<HTMLInputElement>) => props.onChange(e) } type={props.type} 
            value={props.value}
            />

            <label className={labelClassName} >
                {props.label}
            </label>
        </div>
    )

}

export default ElegantInput;
