import { useRef, useEffect } from "react";

import classes from './InputWithLabel.module.css'

const InputWithLabel = ({ id, value, type, onInputChange, isFocused, children }) => {
    const inputRef = useRef();

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);
    return (
        <div className={classes.InputWithLabel}>
            <label htmlFor={id}>{children}</label>
            &nbsp;
            <input
                id={id}
                ref={inputRef}
                type={type}
                value={value}
                onChange={onInputChange}
                
            />

        </div>
    );
};

export default InputWithLabel;