function checkForm(checkers, setters, values) {
    checkers.forEach((checker, i) => {
            const resp = checker(values[i]);
            if (resp.isError) {
                setters[i](resp.errorText);
            }
        })
}

export {checkForm}
