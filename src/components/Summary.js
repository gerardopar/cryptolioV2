import React from 'react';

const Summary = () => {
    let jsonParsed = localStorage.getItem('portfolioSummary');
    let parsedData = JSON.parse(jsonParsed);

    return (
        <div>
            <section className="user">
                <p className="user__text--small">PORTFOLIO BALANCE</p>
                <h3 className="user__text--large">${Number(parsedData).toFixed(2)}</h3>
            </section>
        </div>
    )
};

export default Summary;