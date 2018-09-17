import React from 'react';

const Message = (props) => {
    return (
        <div className="message">
            <div className="message__wrap">
                <p>{props.span}</p>
                <h1 className="message__text">{props.text}</h1>
            </div>
        </div>
    );
};

export default Message;