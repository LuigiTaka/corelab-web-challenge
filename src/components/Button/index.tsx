
interface IButton {
  onClick: ( e : React.MouseEvent ) => void;
  text: string;
  type:  "button" | "reset" | "submit";
  className? : string;
  icon ?: JSX.Element;
}

const Button = (props: IButton) => {
  return (
  <button title={ props.text } type={props.type} onClick={props.onClick} className={props.className}>
    {props.icon}
    { props.text}
</button>
);
};

export default Button;
