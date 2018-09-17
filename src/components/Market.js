import React from 'react';

class Market extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            marketCap: 0,
            twenty4hrVol: 0,
            btcDom: 0
        }
    }

    async componentDidMount(){
        const response = await fetch(`https://api.coinmarketcap.com/v1/global/`);

        if(response.status === 200){
            let data = await response.json();
        
            this.setState(() => {
                return({
                    marketCap: data.total_market_cap_usd,
                    twenty4hrVol: data.total_24h_volume_usd,
                    btcDom: data.bitcoin_percentage_of_market_cap.toFixed(2)
            });
            });

        } else {
            throw new Error('unable to fetch currency info');
        }

    }

    render(){
        return(
            <div>
            <div className="market">
                <ul className="market__list">
                    <li className="market__item z-depth-5">Market Cap: {currencyFormat(this.state.marketCap)}</li>
                    <li className="market__item z-depth-5">24hr Vol: {currencyFormat(this.state.twenty4hrVol)}</li>
                    <li className="market__item z-depth-5">Btc Dominance: {this.state.btcDom}%</li>
                </ul>
            </div>
            </div>
        )
    }
}

export default Market;

//function to format numbers
const currencyFormat = (num) => {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}