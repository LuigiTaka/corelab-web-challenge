import {ChangeEvent} from 'react'



export default interface ISearch {
    placeholder: string;
    value: string;
    onChange: (e : ChangeEvent<HTMLInputElement>) => void;
}
