import Button from '../Button'
import HeaderProps from '../../types/HeaderProps'
import styleHeader from './index.module.scss'
const Header = ({children} : HeaderProps) => {

    return ( 

        <header className={styleHeader.Header}>
             <span> 
                <a href='/'> <img src={"/public/logo192.png"} /> </a>
             </span>
             <div>
                {children}
            </div>

                <Button className={ styleHeader.HeaderEnd } type={'button'} onClick={ () => {} } text={'x'} />
        </header>
    )

}


export default Header;
