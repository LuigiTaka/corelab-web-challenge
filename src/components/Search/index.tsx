import ISearch from '../../types/ISearch';
import style from './Search.module.scss';
const Search = (props: ISearch) => {

    return (
    <input className={style.Search} type="text" onChange={ (e) => props.onChange(e) } placeholder={props.placeholder} value={props.value} />
  );
};

export default Search;
