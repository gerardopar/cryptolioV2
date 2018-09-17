import React from 'react';

const CoinItem = (props) => {
    return (
        <div>
            <div className="coinItem">
                <div className="coinItem__wrap z-depth-5">
                    <div className="coinItem__row--1">

                        <div className="coinItem__img--wrap">
                            <img className="coinItem__img" src={props.slug} />
                            <p className="coinItem__img--text">{props.symbol} | {props.name}</p>
                        </div>
                        <div className="coinItem__text--wrap">
                            <p>{props.available} {props.symbol}</p>
                            <p className="coinItem__text">available</p>
                        </div>

                    </div>
                    <div className="coinItem__row--2">

                        <div className="coinItem__text--wrap">
                            ${(props.available * props.price).toFixed(2)}
                            <p className="coinItem__text">value</p>
                        </div>

                        <div className="coinItem__text--wrap">
                            <p>${props.price}</p>
                            <p className="coinItem__text">price</p>
                        </div>

                        <div className="coinItem__text--wrap">
                            {props.handleChange(props.priceChange)}
                            <p className="coinItem__text">24hr change</p>
                        </div>
                        
                    </div>
                    <div className="coinItem__row--3">
                        <form onSubmit={(e) => props.handleCoinsToAdd(props.id, e)} className="coinItem__form">
                            <div className="coinItem__input--wrap">
                                <input className="coinItem__input" type="number" name="coinToAdd" placeholder={`add ${props.symbol}`} autoComplete='off'/>
                                <button className="btn-small waves-effect waves-light indigo lighten-1 z-depth-5">
                                +
                                </button>
                            </div>
                        </form>

                        <form onSubmit={(e) => props.handleCoinsToRemove(props.id, e)} className="coinItem__form">
                            <div className="coinItem__input--wrap">
                                <input className="coinItem__input" type="number" name="coinToRemove" placeholder={`remove ${props.symbol}`} autoComplete='off'/>
                                <button className="btn-small waves-effect waves-light indigo lighten-1 z-depth-5">
                                -
                                </button>
                            </div>
                        </form>

                        <button className="btn-small cointItem__btn--clear red waves-effect waves-light z-depth-5" onClick={((e) => {
                            props.handleCoinsToClear(props.id);
                        })}>clear {props.symbol}</button>

                        <button className="btn-small cointItem__btn--remove red waves-effect waves-light z-depth-5" onClick={((e) => {
                            props.handleDeleteCoin(props.id);
                        })}>remove coin</button>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default CoinItem;

