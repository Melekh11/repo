import React, {useEffect, useState} from 'react';
import classes from "../components/UI/form/form.module.css";
import {Input} from "../components/UI/input/input";
import {checkLogin} from "../heplers/checkers/checkLogin";
import {useDispatch, useSelector} from "react-redux";
import {checkPassword} from "../heplers/checkers/checkPassword";
import inputClasses from "../components/UI/input/input.module.css";
import {Loader} from "../components/UI/loader/loader";
import {userActions} from "../redux/actions/user.actions";
import {Link, useNavigate} from "react-router-dom";
import {validatorActions} from "../redux/actions/validator.actions";
import {ROUTES} from "../components/router";
import {Header} from "../components/UI/header/header";
import {postConstants} from "../redux/constants/post.constants";
import {reviewConstants} from "../redux/constants/review.constants";


// вью страницы регистрации
const SignIn = () => {
    const [values, setValues] = useState({
        login: "",
        password: ""
    });

    const loginError = useSelector(state => state.validator.login);
    const passwordError = useSelector(state => state.validator.password);

    const isError = useSelector(state => state.alert.isError);
    const error = useSelector(state => state.alert.message);
    const isLoading = useSelector(state => state.authentication.logging);

    const checkers = {
        login: checkLogin,
        password: checkPassword
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // функция изменения значений
    function setValue(value, name) {
        setValues({...values, [name]: value})
    }

    // при монтировании компонента чистим валидацию и отключаем проверку второго пароля
    useEffect(() => {
        dispatch({type: postConstants.CLEAR_POSTS});
        dispatch({type: reviewConstants.CLEAR_REVIEWS});
        dispatch(userActions.logout());
        dispatch(validatorActions.cleanValidator());
        dispatch(validatorActions.disablePasswordValidation());
    }, [])

    // запуск события логина
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userActions.login(values, checkers, navigate));
    }

    // возвращаем размету
    return (
        <>
            <Header/>
            {isLoading && <Loader/>}
            <form
                className={"nice-background " + classes.form}
                onSubmit={handleSubmit}
            >
                <h1 className={classes.titleForm}>Логин</h1>

                <Input
                    title={"Логин"}
                    placeholder={"user_1"}
                    handlerData={checkLogin}
                    fieldName={"login"}
                    errorText={loginError}
                    setValue={setValue}
                />

                <Input
                    title={"Пароль"}
                    placeholder={"****"}
                    handlerData={checkPassword}
                    fieldName={"password"}
                    errorText={passwordError}
                    setValue={setValue}
                    type={"password"}
                />

                <button
                    type={"submit"}
                    className={classes.prime}
                >
                    Sign In!
                </button>


                <Link
                    className={classes.secundus}
                    to={ROUTES.register}
                    onClick={() => {
                    dispatch(validatorActions.cleanValidator());
                }}>
                    Sign up
                </Link>

                {!!isError && <p className={inputClasses.form_error}>{error.toString()}</p>}

            </form>
        </>
    );
};

export default SignIn;
