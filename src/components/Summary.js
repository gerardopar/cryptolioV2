import React from 'react';

const Summary = (props) => {
    return (
        <div>
            <section className="user">
                <p className="user__text--small">PORTFOLIO BALANCE</p>
                <h3 className="user__text--large">${Number(props.summary).toFixed(2)}</h3>
            </section>
        </div>
    )
};

export default Summary;