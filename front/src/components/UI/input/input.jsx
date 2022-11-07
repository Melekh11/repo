import React from 'react';
import {v4 as makeUUID} from "uuid";
import classes from "./input.module.css"
import appClasses from "../../../styles/app.module.css"
import {validatorActions} from "../../../redux/actions/validator.actions";
import {useDispatch} from "react-redux";

/**
 * controlled input
 * @param title
 * @param placeholder
 * @param errorText
 * @param handlerData
 * @param setValue
 * @param fieldName
 * @param dimensionStr
 * @param type
 * @param disable
 * @returns {JSX.Element}
 */
const Input = ({
                   title, placeholder, errorText, handlerData, setValue, fieldName, dimensionStr = "",
                   type = "text", disable = false, defaultValue = ""
               }) => {
    const id = makeUUID();
    const dispatch = useDispatch();

    return (
        <label className={classes.form__label}>
            {title}
            <div className={appClasses.flexRow}>
                {defaultValue === "" && <input
                    type={type}
                    className={classes.form__input}
                    placeholder={placeholder}
                    disabled={disable}
                    onBlur={e => {
                        console.log("input value:", e.target.value);
                        setValue(e.target.value, fieldName);
                        dispatch(validatorActions.checkField(e.target.value, handlerData, fieldName));
                    }}
                    onFocus={() => {
                        dispatch(validatorActions.disableValidation(fieldName));
                    }}
                />}

                {defaultValue !== "" &&
                    <input
                        type={type}
                        className={classes.form__input}
                        value={defaultValue}
                        disabled={true}
                    />
                }
                {!!dimensionStr && <p>{dimensionStr}</p>}
            </div>
            {errorText !== "" ? <p className={classes.form_error} data-id={id}>{errorText}</p> : ""}
        </label>

    );
};

export {Input};
