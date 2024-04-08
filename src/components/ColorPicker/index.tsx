import style from './index.module.scss'
import {ChangeEvent,useState} from "react";

const colorsArray = ['FFFFFF', 'A99A7C', '9DD6FF', 'FFA285', 'FFE8AC', '979797', 'F99494', 'DAFF8B', 'B9FFDD', 'FFCAB9', 'ECA1FF', 'BAE2FF'];


interface IColorPicker {
    currentColor: string;
    onChange: (color: string) => ( e:ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLabelElement>  ) => any;
}

const ColorPicker = (props: IColorPicker) => {

    const [currentColor, setCurrentColor] = useState( props.currentColor ); 


    let colorsObject = colorsArray.map( (c) => {
            return {color: c, checked: c.toLowerCase() === currentColor.toLowerCase()}
        } );


    
           const handleChange = ( e : ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLabelElement> , color : string ) => {
            setCurrentColor(color);
            props.onChange(color);
            

       }
        

        return (
                <div className={style.ColorPicker} >
                {colorsObject.map(c =>{
                    return (<label
                        onClick={(e) => handleChange(e,c.color)}
                        key={c.color} 
                        aria-label={c.color} 
                        htmlFor={c.color}
                        className={ c.checked ? style.Checked : '' }
                        style={{backgroundColor: "#".concat(c.color)}} >
                
                            <input type={'radio'}
                                   value={c.color}
                                  name={'color'}
                                  defaultChecked={c.checked}
                                  id={c.color}/>
                        </label>)
                        })
                    }
                </div>)
    }
        
        


export default ColorPicker
