import React from 'react';
import classes from "./radio-button.module.css";
import {v4 as makeUUID} from "uuid";


/**
 * controlled radio button
 * @param title
 * @param setValue
 * @param fieldName
 * @param value
 * @param checked
 * @returns {JSX.Element}
 * @constructor
 */
const RadioButton = ({title, setValue, fieldName, value, checked=false}) => {

    const id = makeUUID();

    return (
        <div className={classes.form__input}>
            <input name={fieldName} id={id} checked={checked} type="radio" onChange={(e) => {
                if (e.target.id === id) {
                    setValue(value, fieldName)
                }
            }}/>
            <label htmlFor={id}>{title}</label>
        </div>)

};

export {RadioButton};
