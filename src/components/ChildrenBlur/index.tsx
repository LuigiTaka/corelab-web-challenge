import {FocusEvent, useCallback} from "react";

interface IChildrenBlur {
    children: JSX.Element;
    onBlur: (e : FocusEvent<HTMLDivElement>) => void;
    onFocus?: () => void;
    className?: string
    style?: React.CSSProperties;
}

const ChildrenBlur = ({children, onBlur, ...props}: IChildrenBlur) => {
    const handleBlur = useCallback(
        (e : React.FocusEvent<HTMLDivElement>) => {
            const currentTarget = e.currentTarget;
            // Give browser time to focus the next element
            requestAnimationFrame(() => {
                // Check if the new focused element is a child of the original container
                if (!currentTarget.contains(document.activeElement)) {
                    onBlur( e );
                }
            });
        },
        [onBlur]
    );

    return (
        <div {...props} onBlur={handleBlur} onFocus={props.onFocus} onClick={props.onFocus}>
            {children}
        </div>
    );
};

export default ChildrenBlur
