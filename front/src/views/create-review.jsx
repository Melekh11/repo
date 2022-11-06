import React, {useState} from 'react';
import {Header} from "../components/UI/header/header";
import classes from "../components/UI/form/form.module.css";
import appClasses from "../styles/app.module.css"
import inputClasses from "../components/UI/input/input.module.css";
import {checkOrgDescription} from "../heplers/checkers/checkOrgDescription";
import {Textarea} from "../components/UI/input/textarea";
import {useDispatch, useSelector} from "react-redux";
import {RadioButton} from "../components/UI/radio-button/radio-button";
import {reviewActions} from "../redux/actions/review.action";
import {useNavigate} from "react-router-dom";

const CreateReview = () => {

    const windowLocationArray = window.location.href.split("/")
    const idPostReviewed = windowLocationArray[windowLocationArray.length-1];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        helpDescription: "",
        contacts: "",
        timeOption: "ok",
        makeBetterDesc: ""
    })

    const checkers = {
        helpDescription: checkOrgDescription,
        contacts: checkOrgDescription
    }

    const isError = useSelector(state => state.alert.isError);
    const error = useSelector(state => state.alert.message);

    const helpDescriptionError = useSelector(state => state.validator.helpDescription);
    const contactsError = useSelector(state => state.validator.contacts);

    // изменение значений
    function setValue(value, name) {
        setValues({...values, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(reviewActions.createReview({...values, idPost: idPostReviewed}, checkers, navigate));
    }

    return (
        <>
            <Header/>
            {/*{isLoading && <Loader/>}*/}
            <form
                className={"nice-background " + classes.bigSize + " " + classes.form}
                onSubmit={handleSubmit}
            >
                <h1 className={classes.titleForm}>Отзыв на заявку</h1>

                <div className={appClasses.flexRow}>
                    <div className={appClasses.flexColumn}>
                        <Textarea
                            title={"Опишите, как вы хотите помочь"}
                            fieldName={"helpDescription"}
                            handlerData={checkOrgDescription}
                            placeholder={"..."}
                            setValue={setValue}
                            errorText={helpDescriptionError}
                        />

                        <Textarea
                            title={"Укажите ваши контакты"}
                            fieldName={"contacts"}
                            handlerData={checkOrgDescription}
                            placeholder={"..."}
                            setValue={setValue}
                            errorText={contactsError}
                        />
                    </div>

                    <div className={appClasses.flexColumn}>
                        <label className={inputClasses.form__label}>
                            Устраиваем ли вас дата?
                            <RadioButton
                                title={"да"}
                                setValue={setValue}
                                value={"ok"}
                                fieldName={"timeOption"}
                                checked={
                                    values.timeOption === "ok"
                                }/>
                            <RadioButton
                                title={"нет"}
                                setValue={setValue}
                                value={"bad"}
                                fieldName={"timeOption"}
                                checked={
                                    values.timeOption === "bad"
                                }/>
                            <RadioButton
                                title={"под вопросом"}
                                setValue={setValue}
                                value={"trouble"}
                                fieldName={"timeOption"}
                                checked={
                                    values.timeOption === "trouble"
                                }/>
                        </label>

                        <Textarea
                            title={"есть ли у вас идеи для улучшения мероприятия?"}
                            fieldName={"makeBetterDesc"}
                            handlerData={() => {
                                return {isError: false, errorText: ""}
                            }}
                            placeholder={"..."}
                            setValue={setValue}
                        />

                    </div>
                </div>

                <button
                    type={"submit"}
                    className={classes.prime}
                >
                    Создать
                </button>

                {!!isError && <p className={inputClasses.form_error}>{error.toString()}</p>}

            </form>
        </>
    );
};

export default CreateReview;
