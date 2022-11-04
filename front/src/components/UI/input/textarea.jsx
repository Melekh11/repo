import React from 'react';
import classes from "./input.module.css";
import {validatorActions} from "../../../redux/actions/validator.actions";
import {useDispatch} from "react-redux";

/**
 * controlled text area
 * @param title
 * @param placeholder
 * @param errorText
 * @param handlerData
 * @param setValue
 * @param fieldName
 * @returns {JSX.Element}
 * @constructor
 */
const Textarea = ({title, placeholder, errorText, handlerData, setValue, fieldName}) => {

    const dispatch = useDispatch();

    return (

        <label className={classes.form__label}>
            {title}
            <textarea
                className={classes.textarea}
                placeholder={placeholder}
                onBlur={e => {
                    setValue(e.target.value, fieldName);
                    dispatch(validatorActions.checkField(e.target.value, handlerData, fieldName));
                }}
                onFocus={() => dispatch(validatorActions.disableValidation(fieldName))
                }>
            </textarea>

            {errorText !== "" ? <p className={classes.form_error}>{errorText}</p> : ""}
        </label>

    );
};

export {Textarea};
