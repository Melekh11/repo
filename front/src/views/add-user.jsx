import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {checkLogin} from "../heplers/checkers/checkLogin";
import {useNavigate} from "react-router-dom";
import {validatorActions} from "../redux/actions/validator.actions";
import {Header} from "../components/UI/header/header";
import classes from "../components/UI/form/form.module.css";
import {Input} from "../components/UI/input/input";
import inputClasses from "../components/UI/input/input.module.css";
import {RadioButton} from "../components/UI/radio-button/radio-button";
import {store} from "../redux/store";
import {ROUTES} from "../components/router";
import {userActions} from "../redux/actions/user.actions";

const AddUser = () => {
    const [values, setValues] = useState({
        login: "",
        positionName: "user",
        orgName: ""
    });

    const loginError = useSelector(state => state.validator.login);

    const isError = useSelector(state => state.alert.isError);
    const error = useSelector(state => state.alert.message);

    const [positions, setPositions] = useState([]);

    const checkers = {
        login: checkLogin
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // функция изменения значений
    function setValue(value, name) {
        setValues({...values, [name]: value});
    }

    // при монтировании компонента чистим валидацию
    useEffect(() => {
        const positions = store.getState().authentication.user.positions.filter(position => position.status === "moder");
        if (positions.length === 0){
            navigate(ROUTES.home);
        }
        setPositions(positions);
        setValues({...values, orgName: positions[0].org});
        dispatch(validatorActions.cleanValidator());
    }, [])

    // запуск события логина
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userActions.addUser(values, checkers, navigate));
    }

    // возвращаем размету
    return (
        <>
            <Header/>
            <form
                className={"nice-background " + classes.form}
                onSubmit={handleSubmit}
            >
                <h1 className={classes.titleForm}>Добавить участника</h1>

                <Input
                    title={"Логин приглашённого"}
                    placeholder={"user_1"}
                    handlerData={checkLogin}
                    fieldName={"login"}
                    errorText={loginError}
                    setValue={setValue}
                />

                <label className={inputClasses.form__label}>
                    пост участника
                    <RadioButton
                        title={"обычный"}
                        setValue={setValue}
                        value={"user"}
                        fieldName={"positionName"}
                        checked={
                            values.positionName === "user"
                        }/>
                    <RadioButton
                        title={"модератор"}
                        setValue={setValue}
                        value={"moder"}
                        fieldName={"positionName"}
                        checked={
                            values.positionName === "moder"
                        }/>
                </label>

                <label className={inputClasses.form__label}>
                    В какую организацию приглашаем?
                    {positions.map((position, i) =>
                        <RadioButton title={position.org}
                                     setValue={setValue}
                                     value={position.org}
                                     fieldName={"orgName"}
                                     checked={values.orgName === position.org}
                                     key={i}
                        />)}
                </label>

                <button
                    type={"submit"}
                    className={classes.prime}
                >
                    добавить
                </button>

                {!!isError && <p className={inputClasses.form_error}>{error.toString()}</p>}

            </form>
        </>
    );
};

export default AddUser;
