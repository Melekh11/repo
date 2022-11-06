import React, {useEffect, useState} from 'react';
import {Header} from "../components/UI/header/header";
import classes from "../components/UI/form/form.module.css";
import {Input} from "../components/UI/input/input";
import {validatorActions} from "../redux/actions/validator.actions";
import inputClasses from "../components/UI/input/input.module.css";
import {useDispatch, useSelector} from "react-redux";
import {checkTitle} from "../heplers/checkers/checkTitle";
import {orgActions} from "../redux/actions/org.actions";
import {useNavigate} from "react-router-dom";

const FindOrg = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [orgName, setOrgName] = useState( "");

    const orgNameError = useSelector(state => state.validator.orgName);

    const isError = useSelector(state => state.alert.isError);
    const error = useSelector(state => state.alert.message);

    const checkers = {
        orgName: checkTitle
    }

    // при монтировании компонента чистим валидацию и отключаем проверку второго пароля
    useEffect(() => {
        dispatch(validatorActions.cleanValidator());
    }, [])

    function setValue(value, name) {
        setOrgName(value);
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(e);
        dispatch(orgActions.getOrgByName({orgName}, checkers, navigate))
    }

    return (
        <>
            <Header/>
            <form
                className={"nice-background " + classes.form}
                onSubmit={handleSubmit}
            >
                <h1 className={classes.titleForm}>Найти организацию по имени</h1>

                <Input
                    title={"название организации"}
                    placeholder={"cool_name"}
                    handlerData={checkTitle}
                    fieldName={"orgName"}
                    errorText={orgNameError}
                    setValue={setValue}
                />

                <button
                    type={"submit"}
                    className={classes.prime}
                >
                    найти
                </button>

                {!!isError && <p className={inputClasses.form_error}>{error.toString()}</p>}

            </form>
        </>

    );
};

export default FindOrg;
