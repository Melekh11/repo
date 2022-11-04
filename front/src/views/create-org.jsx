import React, {useEffect, useState} from 'react';
import {Header} from "../components/UI/header/header";
import appClasses from "../styles/app.module.css";
import {Input} from "../components/UI/input/input";
import classes from "../components/UI/form/form.module.css";
import inputClasses from "../components/UI/input/input.module.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {validatorActions} from "../redux/actions/validator.actions";
import {Textarea} from "../components/UI/input/textarea";
import {checkTitle} from "../heplers/checkers/checkTitle";
import {orgActions} from "../redux/actions/org.actions";
import {checkOrgDescription} from "../heplers/checkers/checkOrgDescription";

// вью создания организации
const CreateOrg = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isError = useSelector(state => state.alert.isError);
    const error = useSelector(state => state.alert.message);
    const titleError = useSelector(state => state.validator.title);
    const descriptionError = useSelector(state => state.validator.description);

    const [values, setValues] = useState({
        title: "",
        description: ""
    })

    const checkers = {
        title: checkTitle,
        description: checkOrgDescription
    }

    // запись новых значений
    function setValue(value, name) {
        setValues({...values, [name]: value});
    }

    // запуск события
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(orgActions.createOrg(values, checkers, navigate));
    }

    // при монтировании страницы чистим валидацию
    useEffect(() => {
        dispatch(validatorActions.cleanValidator());
        dispatch(validatorActions.disablePasswordValidation());
    }, [])

    // возвращаем компонент
    return (
        <>
            <Header/>
            <div className={appClasses.flexRow}>
                <form
                    className={"nice-background " + classes.form}
                    onSubmit={handleSubmit}
                >
                    <Input
                        title={"Название проекта"}
                        placeholder={"Лягушки лицея ВШЭ"}
                        handlerData={checkTitle}
                        fieldName={"title"}
                        errorText={titleError}
                        setValue={setValue}
                    />

                    <Textarea
                        title={"Описание проекта"}
                        fieldName={"description"}
                        handlerData={checkOrgDescription}
                        placeholder={"это описание увидят другие пользователи, по желанию оставьте свои контакты"}
                        errorText={descriptionError}
                        setValue={setValue}
                    />

                    <button
                        type={"submit"}
                        className={classes.prime}
                    >
                        Создать проект
                    </button>

                    {isError &&
                        <p className={inputClasses.form_error}>{error.toString()}</p>
                    }
                </form>
            </div>
        </>
    );
};

export default CreateOrg;
