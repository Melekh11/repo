import React, {useEffect, useState} from 'react';
import {Header} from "../components/UI/header/header";
import appClasses from "../styles/app.module.css";
import inputClasses from "../components/UI/input/input.module.css"
import classes from "../components/UI/form/form.module.css";
import {Input} from "../components/UI/input/input";
import {checkTitle} from "../heplers/checkers/checkTitle";
import {Textarea} from "../components/UI/input/textarea";
import {checkOrgDescription} from "../heplers/checkers/checkOrgDescription";
import {useDispatch, useSelector} from "react-redux";
import {checkAudienceNum} from "../heplers/checkers/checkAudienceNum";
import {checkDate} from "../heplers/checkers/checkDate";
import {RadioButton} from "../components/UI/radio-button/radio-button";
import {useNavigate} from "react-router-dom";
import {orgActions} from "../redux/actions/org.actions";
import {store} from "../redux/store";
import {validatorActions} from "../redux/actions/validator.actions";
import {ROUTES} from "../components/router";
import {checkDeltaTime} from "../heplers/checkers/checkDeltaTime";

// вью создания поста
const CreatePost = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const titleError = useSelector(state => state.validator.title);
    const eventDescriptionError = useSelector(state => state.validator.eventDescription);
    const audienceNumError = useSelector(state => state.validator.audienceNum);
    const eventDateError = useSelector(state => state.validator.eventDate);
    const deltaTimeError = useSelector(state => state.validator.deltaTime);
    const errorEventHelpDescription = useSelector(state => state.validator.eventHelpDescription);
    const errorPrivateOrgName = useSelector(state => state.validator.privateOrgName);

    const orgReviewed = useSelector(state => state.orgs.currentReviewedOrg);

    const isError = useSelector(state => state.alert.isError);
    const error = useSelector(state => state.alert.message);

    const [positions, setPositions] = useState([]);


    let defaultPrivateOrgName;
    if (orgReviewed) {
        defaultPrivateOrgName = orgReviewed.name;
    }

    const [values, setValues] = useState({
        title: "",
        eventDescription: "",
        audienceNum: 0,
        eventDate: undefined,
        deltaTime: 0,
        eventHelpDescription: "",
        isPrivate: false,
        privateOrgName: "",
        orgName: ""
    })

    console.log(values);

    const checkers = {
        title: checkTitle,
        eventDescription: checkOrgDescription,
        audienceNum: checkAudienceNum,
        eventDate: checkDate,
        deltaTime: checkDeltaTime,
        eventHelpDescription: checkOrgDescription,
        privateOrgName: values.isPrivate ? checkTitle : () => {
            return {isError: false, errorText: ""}
        }
    }

    // при монтировании в DOM чистим валидацию, проверяем наличие ролей
    useEffect(() => {
        const positions = store.getState().authentication.user.positions.filter(position => position.status === "moder");
        if (positions.length === 0) {
            navigate(ROUTES.home);
        }
        setPositions(positions);
        setValues({...values, orgName: positions[0].org});
        dispatch(validatorActions.cleanValidator());
    }, [])

    // изменение значений
    function setValue(value, name) {
        setValues({...values, [name]: value});
    }

    // обработка отправки формы
    function handleSubmit(e) {
        e.preventDefault();
        if (defaultPrivateOrgName) {
            console.log("vlz");
            dispatch(orgActions.createPost({
                    ...values,
                    isPrivate: true,
                    privateOrgName: defaultPrivateOrgName,
                },
                checkers, navigate));
        } else {
            console.log("ура");
            dispatch(orgActions.createPost(values, checkers, navigate));
        }
    }

    // возвращаем разметку
    return (
        <>
            <Header/>
            <div className={appClasses.flexRow}>
                <form
                    className={"nice-background " + classes.bigSize + " " + classes.form}
                    onSubmit={handleSubmit}
                >
                    <div className={appClasses.flexRow}>
                        <div className={appClasses.flexColumn}>
                            <Input
                                title={"Название мероприятия"}
                                placeholder={"cool name"}
                                handlerData={checkTitle}
                                fieldName={"title"}
                                errorText={titleError}
                                setValue={setValue}
                            />

                            <Input
                                title={"Предположительная аудитория"}
                                placeholder={20}
                                handlerData={checkAudienceNum}
                                fieldName={"audienceNum"}
                                errorText={audienceNumError}
                                setValue={setValue}
                                type={"number"}
                            />

                            <Textarea
                                title={"Описание мероприятия"}
                                fieldName={"eventDescription"}
                                handlerData={checkOrgDescription}
                                placeholder={"это описание увидят другие пользователи," +
                                    " по желанию оставьте свои контакты"}
                                setValue={setValue}
                                errorText={eventDescriptionError}
                            />
                        </div>

                        <div className={appClasses.flexColumn}>

                            <Input
                                title={"Максимальный срок хранения заявки"} placeholder={5}
                                handlerData={checkDeltaTime}
                                fieldName={"deltaTime"} errorText={deltaTimeError} setValue={setValue}
                                type={"number"}
                            />

                            <Textarea
                                title={"Описание нужной помощи"}
                                fieldName={"eventHelpDescription"}
                                handlerData={checkOrgDescription}
                                placeholder={"это описание увидят другие пользователи," +
                                    " по желанию оставьте свои контакты"}
                                errorText={errorEventHelpDescription}
                                setValue={setValue}
                            />


                        </div>

                        <div className={appClasses.flexColumn}>

                            <Input
                                title={"Предположительное время проведения"}
                                handlerData={checkDate}
                                fieldName={"eventDate"}
                                errorText={eventDateError}
                                setValue={setValue}
                                type={"date"}
                            />

                            <label className={inputClasses.form__label}>
                                Приватный ли пост?
                                <RadioButton
                                    title={"да"}
                                    setValue={setValue}
                                    value={true}
                                    fieldName={"isPrivate"}
                                    checked={
                                        values.isPrivate || !!defaultPrivateOrgName
                                    }/>
                                <RadioButton
                                    title={"нет"}
                                    setValue={setValue}
                                    value={false}
                                    fieldName={"isPrivate"}
                                    checked={
                                        !values.isPrivate && !defaultPrivateOrgName
                                    }/>
                            </label>


                            <Input
                                title={"Имя приватной организации"} placeholder={
                                values.isPrivate
                                    ? "cool prog!"
                                    : ""}
                                handlerData={checkTitle} fieldName={"privateOrgName"}
                                errorText={values.isPrivate
                                    ? errorPrivateOrgName
                                    : ""}
                                setValue={setValue}
                                disable={!values.isPrivate}
                                defaultValue={defaultPrivateOrgName}
                            />

                            <label className={inputClasses.form__label}>
                                От какой организации будет пост?
                                {positions.map((position, i) =>
                                    <RadioButton title={position.org}
                                                 setValue={setValue}
                                                 value={position.org}
                                                 fieldName={"orgName"}
                                                 checked={values.orgName === position.org}
                                                 key={i}
                                    />)}
                            </label>
                        </div>
                    </div>

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

export default CreatePost;
