import React from 'react';

const CoinSearched = (props) => {
    return (
        <div>
            <div className="coinSearched">
                <div className="coinSearched__wrap z-depth-5">
                    <div className="coinSearched__row--1">

                        <div className="coinSearched__img--wrap">
                            <img className="coinSearched__img" src={props.coin.slug} />
                            <p className="coinSearched__img--text">{props.coin.symbol} | {props.coin.name}</p>
                        </div>
                        <div className="coinSearched__text--wrap">
                            <p>${props.coin.price}</p>
                            <p className="coinSearched__text">PRICE</p>
                        </div>

                    </div>
                    <div className="coinSearched__row--2">

                        <div className="coinSearched__text--wrap">
                            {props.handleChange(props.coin.priceChange)}
                            <p className="coinSearched__text">24hr per.</p>
                        </div>
                        <div className="coinSearched__btn--wrap">
                            <button onClick={props.addCoin} className="btn-small btn__add--coinSearched cointItem__btn--addSearch waves-effect waves-light z-depth-5">add coin</button>
                            <button onClick={props.clearSearch} className="btn-small btn__clear--coinSearched grey cointItem__btn--clearSearch waves-effect waves-light z-depth-5">clear search</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoinSearched;