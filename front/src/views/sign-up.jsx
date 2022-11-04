import React, {useEffect, useState} from 'react';
import {Input} from "../components/UI/input/input"
import classes from "../components/UI/form/form.module.css"
import inputClasses from "../components/UI/input/input.module.css"
import {checkLogin} from "../heplers/checkers/checkLogin";
import {checkName} from "../heplers/checkers/checkName";
import {checkEmail} from "../heplers/checkers/checkEmail";
import {checkPassword} from "../heplers/checkers/checkPassword";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../redux/actions/user.actions";
import {Loader} from "../components/UI/loader/loader";
import {Link, useNavigate} from "react-router-dom";
import {validatorActions} from "../redux/actions/validator.actions";
import {ROUTES} from "../components/router";
import {Header} from "../components/UI/header/header";


// вью регистрации
const SignUp = () => {

    const loginError = useSelector(state => state.validator.login);
    const nameError = useSelector(state => state.validator.name);
    const surnameError = useSelector(state => state.validator.surname);
    const emailError = useSelector(state => state.validator.email);
    const passwordError = useSelector(state => state.validator.password);
    const confirmPasswordError = useSelector(state => state.validator.confirmPassword);

    const isError = useSelector(state => state.alert.isError);
    const error = useSelector(state => state.alert.message);
    const isLoading = useSelector(state => state.registration.logging);

    const checkers = {
        login: checkLogin,
        name: checkName,
        surname: checkName,
        email: checkEmail,
        password: checkPassword,
        confirmPassword: checkPassword
    };

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [values, setValues] = useState({
        login: "",
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    // функция изменения значений state'а
    function setValue(value, name) {
        setValues({...values, [name]: value});
    }

    // логаутим пользователя и очищаем валидацию
    useEffect(() => {
        dispatch(userActions.logout());
        dispatch(validatorActions.cleanValidator());
        dispatch(validatorActions.applyPasswordValidation());
    }, [])

    // запускаем событие регистрации
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(userActions.register(values, checkers, navigate));
    }

    // возвращаем разметку
    return (
        <>
            <Header/>
            {isLoading && <Loader/>}
            <form
                className={"nice-background " + classes.form}
                onSubmit={handleSubmit}
            >
                <h1 className={classes.titleForm}>Регистрация</h1>

                <Input
                    title={"Логин"}
                    placeholder={"user_007"}
                    handlerData={checkLogin}
                    fieldName={"login"}
                    errorText={loginError}
                    setValue={setValue}
                />

                <Input
                    title={"Имя"}
                    placeholder={"Max"}
                    handlerData={checkName}
                    fieldName={"name"}
                    errorText={nameError}
                    setValue={setValue}
                />

                <Input
                    title={"Фамилия"}
                    placeholder={"Toshkin"}
                    handlerData={checkName}
                    fieldName={"surname"}
                    errorText={surnameError}
                    setValue={setValue}
                />

                <Input
                    title={"Почта"}
                    placeholder={"my_mail@yandex.ru"}
                    handlerData={checkEmail}
                    fieldName={"email"}
                    errorText={emailError}
                    type={"email"}
                    setValue={setValue}
                />

                <Input
                    title={"Пароль"}
                    placeholder={"****"}
                    handlerData={checkPassword}
                    type={"password"}
                    errorText={passwordError}
                    fieldName={"password"}
                    setValue={setValue}
                />

                <Input
                    title={"Повторите пароль"}
                    placeholder={"****"}
                    handlerData={checkPassword}
                    type={"password"}
                    errorText={confirmPasswordError}
                    fieldName={"confirmPassword"}
                    setValue={setValue}
                />

                <button
                    type={"submit"}
                    className={classes.prime}
                >
                    Sign Up!
                </button>

                <Link
                    to={ROUTES.login}
                    className={classes.secundus}
                    onClick={() => {
                    dispatch(validatorActions.cleanValidator());
                }}>
                    Sing in
                </Link>

                {!!isError && <p className={inputClasses.form_error}>{error.toString()}</p>}
            </form>
        </>
    );
};

export default SignUp;
