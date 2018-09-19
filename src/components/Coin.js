//importing react
import React from 'react';

//components s
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CoinItem from './CoinItem';
import Message from './Message';

const Coin = (props) => {
    let jsonParsed = localStorage.getItem('coins');
    let parsedData = JSON.parse(jsonParsed);
    return (
        <div>
        

        <ReactCSSTransitionGroup
            transitionName="trans"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1100}>
        {
            parsedData.length > 0 ? parsedData.map((coin) => {
                return(<CoinItem
                    key={coin.id} 
                    {...coin}
                    handleChange={props.handleChange}
                    handleDeleteCoin={props.handleDeleteCoin}
                    handleCoinsToAdd={props.handleCoinsToAdd}
                    handleCoinsToRemove={props.handleCoinsToRemove}
                    handleCoinsToClear={props.handleCoinsToClear}
                    />);
            }) : <Message 
            span="Add coins to get started"
            text="NO COINS CURRENTLY TRACKED"/>
        }

        </ReactCSSTransitionGroup>

        </div>
    );
};

export default Coin;

// {props.coins.map((coin) => {
//     return(<CoinItem
//         key={coin.id} 
//         {...coin}
//         handleDeleteCoin={props.handleDeleteCoin}
//         />);
// })}