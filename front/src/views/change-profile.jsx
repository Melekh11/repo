import React, {useEffect, useState} from 'react';
import appClasses from "../styles/app.module.css"
import {useNavigate} from "react-router-dom";
import {Input} from "../components/UI/input/input";
import {checkLogin} from "../heplers/checkers/checkLogin";
import {useDispatch, useSelector} from "react-redux";
import {checkName} from "../heplers/checkers/checkName";
import {store} from "../redux/store";
import {ROUTES} from "../components/router";
import {Header} from "../components/UI/header/header";
import {checkPassword} from "../heplers/checkers/checkPassword";
import classes from "../components/UI/form/form.module.css";
import formClasses from "../components/UI/form/form.module.css"
import {userActions} from "../redux/actions/user.actions";
import inputClasses from "../components/UI/input/input.module.css";
import {validatorActions} from "../redux/actions/validator.actions";


// вью смены профиля
const ChangeProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = store.getState().authentication.user;
    // временная замена приватного роута
    if (!user) {
        navigate(ROUTES.login);
    }

    const isError = useSelector(state => state.alert.isError);
    const isPasswordValidationType = useSelector(state => state.validator.isPasswordValidationType);
    const error = useSelector(state => state.alert.message);

    const loginError = useSelector(state => state.validator.login);
    const nameError = useSelector(state => state.validator.name);
    const surnameError = useSelector(state => state.validator.surname);

    const userDataCheckers = {
        login: checkLogin,
        name: checkName,
        surname: checkName
    };

    const [valuesUserData, setValuesUserData] = useState({
        login: "",
        name: "",
        surname: ""
    });

    // обновление значений данных пользователя
    function setUserDataValue(value, name) {
        setValuesUserData({...valuesUserData, [name]: value})
    }

    // подключение валидации смены данных пользователя + запуск события изменения профиля
    function handleUserData(e) {
        e.preventDefault();
        dispatch(validatorActions.cleanValidator());
        dispatch(validatorActions.disablePasswordValidation());
        dispatch(userActions.changeProfile(
            {
                email: user.email,
                login: valuesUserData.login,
                name: valuesUserData.name,
                surname: valuesUserData.surname
            }, userDataCheckers, navigate
        ));
    }

    const [valuesPassword, setValuesPassword] = useState({
        password: "",
        confirmPassword: ""
    })

    const passwordError = useSelector(state => state.validator.password);
    const confirmPasswordError = useSelector(state => state.validator.confirmPassword);

    const passwordCheckers = {
        password: checkPassword,
        confirmPassword: checkPassword
    }

    // обновление значений данных паролей
    function setPasswordValue(value, name) {
        setValuesPassword({...valuesPassword, [name]: value})
    }

    // подключение валидации смены пароля + запуск события изменения пароля
    function handleChangePassword(e){
        e.preventDefault();
        dispatch(validatorActions.cleanValidator());
        dispatch(validatorActions.applyPasswordValidation());
        dispatch(userActions.changePassword({...user,  ...valuesPassword}, passwordCheckers, navigate))
    }

    // при монтировании страницы в DOM обнуляем валидатор
    useEffect(() => {
        dispatch(validatorActions.cleanValidator());
    }, []);

    // возвращаем компонент
    return (
        <>
            <Header/>
            <div className={appClasses.flexRow}>
                <form className={formClasses.form} onSubmit={handleUserData}>
                    <Input
                        title={"Логин"}
                        placeholder={user.login}
                        handlerData={checkLogin}
                        fieldName={"login"}
                        errorText={loginError}
                        setValue={setUserDataValue}
                    />

                    <Input
                        title={"Имя"}
                        placeholder={user.name}
                        handlerData={checkName}
                        fieldName={"name"}
                        errorText={nameError}
                        setValue={setUserDataValue}
                    />

                    <Input
                        title={"Фамилия"}
                        placeholder={user.surname}
                        handlerData={checkName}
                        fieldName={"surname"}
                        errorText={surnameError}
                        setValue={setUserDataValue}
                    />

                    <button
                        type={"submit"}
                        className={classes.prime}
                    >
                        Изменить данные
                    </button>

                    {isError && !isPasswordValidationType &&
                        <p className={inputClasses.form_error}>{error.toString()}</p>}

                </form>

                <form className={formClasses.form} onSubmit={handleChangePassword}>
                    <Input
                        title={"Пароль"}
                        placeholder={"***"}
                        handlerData={checkPassword}
                        fieldName={"password"}
                        errorText={passwordError}
                        setValue={setPasswordValue}
                        type={"password"}
                    />

                    <Input
                        title={"Повторение пароля"}
                        placeholder={"***"}
                        handlerData={checkPassword}
                        fieldName={"confirmPassword"}
                        errorText={confirmPasswordError}
                        setValue={setPasswordValue}
                        type={"password"}
                    />

                    <button
                        type={"submit"}
                        className={classes.prime}
                    >
                        Изменить пароль
                    </button>

                    {isError && isPasswordValidationType &&
                        <p className={inputClasses.form_error}>{error.toString()}</p>}
                </form>
            </div>
        </>
    );
};

export default ChangeProfile;
