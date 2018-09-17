import React from 'react';
import CoinItem from './CoinItem';
import Message from './Message';

const Coin = (props) => {
    let jsonParsed = localStorage.getItem('coins');
    let parsedData = JSON.parse(jsonParsed);
    return (
        <div>

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

        {/*{parsedData.map((coin) => {
            return(<CoinItem
                key={coin.id} 
                {...coin}
                handleChange={props.handleChange}
                handleDeleteCoin={props.handleDeleteCoin}
                handleCoinsToAdd={props.handleCoinsToAdd}
                handleCoinsToRemove={props.handleCoinsToRemove}
                handleCoinsToClear={props.handleCoinsToClear}
                />);
        })}*/}
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