import React from 'react';
import cl from "./loader.module.css";

/**
 * крутилка
 * @returns {JSX.Element}
 * @constructor
 */
const Loader = () => {
    return (
        <div className={cl.dots}/>
    );
};

export {Loader};
