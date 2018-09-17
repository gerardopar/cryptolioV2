//modules
import React from 'react';
import uuidv4 from 'uuid/v4';

//components
import Market from './Market';
import SearchBar from '../components/SearchBar';
import Summary from '../components/Summary';
import CoinSearched from '../components/CoinSearched';
import Coin from '../components/Coin';
import Message from '../components/Message';

class Dashboard extends React.Component{
    constructor(props){
        super(props);

        //initial state
        this.state = {
            coins: [],
            coin: {
                name: '',
                symbol: '',
                price: '',
                priceChange: '',
                slug: ''
            },
            searchbar: false
        };
        //method bindings
        this.handleCoinSearch = this.handleCoinSearch.bind(this);
        this.handleCoinImage = this.handleCoinImage.bind(this);
        this.handleAddCoin = this.handleAddCoin.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
        this.handleDeleteCoin = this.handleDeleteCoin.bind(this);
        this.handleToggleSearchbar = this.handleToggleSearchbar.bind(this);
        this.handleCoinValues = this.handleCoinValues.bind(this);
        this.handleLiveUpdates = this.handleLiveUpdates.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCoinsToAdd = this.handleCoinsToAdd.bind(this);
        this.handleCoinsToRemove = this.handleCoinsToRemove.bind(this);
        this.handleCoinsToClear = this.handleCoinsToClear.bind(this);
        this.handleCoinsSummary = this.handleCoinsSummary.bind(this);
    }

    async componentDidMount(){
        if(localStorage.getItem('coins')) {
            this.handleLiveUpdates();
            this.handleCoinsSummary();
        } else {
            let coinsObj = [];
            localStorage.setItem('coins', JSON.stringify(coinsObj));
        }  
    };

    //method: handles live coin updates on mount
    async handleLiveUpdates(){
        let jsonParsed = localStorage.getItem('coins');
        let parsedData = JSON.parse(jsonParsed);

        parsedData.forEach((coin) => {
            this.handleCoinValues(coin.symbol).then((data) => {
                coin.price = Number(data.price_usd).toFixed(2);
                coin.priceChange = Number(data.percent_change_24h).toFixed(2);
                coin.value = Number(coin.available) * Number(data.price_usd);
                localStorage.setItem('coins', JSON.stringify(parsedData));
            });
            
        });
        console.log('mounted data', parsedData);
    };

    //method: handle the return of the coin searched
    async handleCoinValues(coinSearched){
        const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/`); //crypto.compare api 
        if(response.status === 200){
            let data = await response.json();
            //find the currency we searched for
            const currency = data.find((coin) => coin.symbol === coinSearched.toUpperCase() || coin.id === coinSearched.toLowerCase());
            return currency;
        } else {
            throw new Error('unable to fetch coin info');
        }
    };
    
    //method: handles the users coin search and currency slug
    async handleCoinSearch(e){
        e.preventDefault(); //prevent browser from refreshing

        let coinSearched = e.target.elements.coin.value //user input
        
        const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/`); //coin marketcap api
        if(response.status === 200){
            let data = await response.json();
            let coinSlug = 'https://www.cryptocompare.com'; //base image url

            //find the currency we searched for
            const currency = data.find((coin) => coin.symbol === coinSearched.toUpperCase() || coin.id === coinSearched.toLowerCase());

            //getting the image slug
            await this.handleCoinImage(currency.symbol).then((data) => {
                coinSlug+=data.ImageUrl;
            }); 
            
            //updating the coin state
            this.setState(() => ({
                coin: {
                    name: currency.id,
                    symbol: currency.symbol,
                    price: currency.price_usd,
                    priceChange: currency.percent_change_24h,
                    slug: coinSlug
                }
            }));

            console.log('coin state', this.state);
        } else {
            throw new Error('unable to fetch coin info');
        }
    };

    //method: handles the users addition to the coins list
    handleAddCoin(e){
        e.preventDefault(); //prevent browser from refreshing

        let coin = {
            id: uuidv4(),
            name: this.state.coin.name,
            symbol: this.state.coin.symbol,
            price: this.state.coin.price,
            priceChange: this.state.coin.priceChange,
            slug: this.state.coin.slug,
            available: 0,
            value: 0
        };

        if(localStorage.getItem('coins')) {
            let jsonParsed = localStorage.getItem('coins');
            let parsedData = JSON.parse(jsonParsed);
            parsedData.push(coin);
            localStorage.setItem('coins', JSON.stringify(parsedData));
        } else {
            let objArr = [];
            localStorage.setItem('coins', JSON.stringify(objArr));
            let jsonParsed = localStorage.getItem('coins');
            let parsedData = JSON.parse(jsonParsed);
            parsedData.push(coin);
            localStorage.setItem('coins', JSON.stringify(parsedData));
        }

        this.setState((prevState) => ({coins: prevState.coins.concat(coin)}));
        
        this.setState(() => ({
            coin: {
                name: '',
                symbol: '',
                price: '',
                priceChange: '',
                slug: ''
            }
        }));
    };

    //method: handles clearing the search
    handleClearSearch(e){
        e.preventDefault();
        this.setState(() => ({
            coin: {
                name: '',
                symbol: '',
                price: '',
                priceChange: '',
                slug: ''
            }
        }));
    }

    //method: handles the removal of a coin from the coins list
    handleDeleteCoin(optionToRemove){

        let jsonParsed = localStorage.getItem('coins');
        let parsedData = JSON.parse(jsonParsed);
        parsedData = parsedData.filter((coin) => {
            return (optionToRemove !== coin.id);
        });
        localStorage.setItem('coins', JSON.stringify(parsedData));

        this.setState((prevState) => ({
            coins: prevState.coins.filter((coin) => {
                return (optionToRemove !== coin.id);
            })
        }));

    };
    
    //method: handles the coins image/slug
    async handleCoinImage(symbol){
        const response = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist`); //crypto.compare api 
        if(response.status === 200){
            let data = await response.json();
            
            return data.Data[symbol];
            
        } else {
            throw new Error('unable to fetch coin info');
        }
    };

    //method: handles the searchbar
    handleToggleSearchbar(){
        this.setState((prevState) => ({searchbar: !prevState.searchbar}));
    };

    //method: handles positive/negative percentages
    handleChange(currency){
        if(currency > 0 ){
            return(<p className="teal-text text-lighten-2">+{currency}%&#8593;</p>);
        }
        else if(currency < 0){
            return(<p className="red-text text-lighten-1">{currency}%&#8595;</p>);
        }
        else if(currency === 0){
            return(<p className="grey-text">{currency}%</p>);
        }
    };

    //method: handle Adding coins
    handleCoinsToAdd(coin, e){
        e.preventDefault();

        let coinsToAdd = e.target.elements.coinToAdd.value //user input
        let jsonParsed = localStorage.getItem('coins');
        let parsedData = JSON.parse(jsonParsed);

        let coinFound = parsedData.find(x => x.id === coin);
        coinFound.available = Number(coinFound.available) + Number(coinsToAdd);
        localStorage.setItem('coins', JSON.stringify(parsedData));
        
        let jParsed = localStorage.getItem('coins');
        let data = JSON.parse(jParsed);
        this.setState(() => ({
            coins: data
        }));
    };

    //method: handle removing coins
    handleCoinsToRemove(coin, e){
        e.preventDefault();

        let coinsToRemove = e.target.elements.coinToRemove.value //user input
        let jsonParsed = localStorage.getItem('coins');
        let parsedData = JSON.parse(jsonParsed);

        let coinFound = parsedData.find(x => x.id === coin);
        coinFound.available = Number(coinFound.available) - Number(coinsToRemove);
        localStorage.setItem('coins', JSON.stringify(parsedData));

        let jParsed = localStorage.getItem('coins');
        let data = JSON.parse(jParsed);
        this.setState(() => ({
            coins: data
        }));
    };

    //method: handle removing coins
    handleCoinsToClear(coin){
        let jsonParsed = localStorage.getItem('coins');
        let parsedData = JSON.parse(jsonParsed);
        let coinFound = parsedData.find(x => x.id === coin);

        coinFound.available = 0;
        localStorage.setItem('coins', JSON.stringify(parsedData));

        let jParsed = localStorage.getItem('coins');
        let data = JSON.parse(jParsed);
        this.setState(() => ({
            coins: data
        }));
    };

    handleCoinsSummary(){
        let summary = 0;
        let jsonParsed = localStorage.getItem('coins');
        let parsedData = JSON.parse(jsonParsed);

        parsedData.forEach((coin) => {
            console.log(coin);
            console.log('coin value', coin.value);
            summary = summary + coin.value;
            localStorage.setItem('portfolioSummary', JSON.stringify(summary));
        });
    };

    render(){

        let parsedData = localStorage.getItem('coins');

        return(
            <div>
                <SearchBar searchbarVal={this.state.searchbar} toggleSearchBar={this.handleToggleSearchbar}/>
                {this.state.searchbar ? 
                    <form className="searchbar__form" onSubmit={this.handleCoinSearch}>
                        <div className="searchbar__input--wrap z-depth-5">
                            <input className="searchbar__input" type="text" name="coin" placeholder="example: Bitcoin | BTC" autoComplete='off'/>
                            <button className="material-icons btn-small searchbar__btn waves-effect waves-light indigo lighten-1 z-depth-5">
                                search
                            </button>
                        </div>
                    </form> : ''}
                
                <Market />
                <Summary />


                {
                    this.state.coin.name.length > 0 ? 
                    <CoinSearched
                    handleChange={this.handleChange}
                    addCoin={this.handleAddCoin} 
                    clearSearch={this.handleClearSearch}
                    coin={this.state.coin}/>
                    : ''
                }
                
                {
                    parsedData ? <Coin 
                    coins={this.state.coins}
                    handleChange={this.handleChange}
                    handleDeleteCoin={this.handleDeleteCoin}
                    handleCoinsToAdd={this.handleCoinsToAdd}
                    handleCoinsToRemove={this.handleCoinsToRemove}
                    handleCoinsToClear={this.handleCoinsToClear}
                    /> : <Message 
                    span="Search coins to get Started"
                    text="NO COINS CURRENTLY TRACKED"/>
                }
                
            </div>
        );
    };
};

export default Dashboard;
