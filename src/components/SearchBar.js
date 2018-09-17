import React from 'react';

const SearchBar = (props) => {
    return (
        <div>
            <header className="searchbar z-depth-5">
                <h4 className="searchbar__title">CRYPTO WALLET</h4>
                {props.searchbarVal ? 
                    <button onClick={props.toggleSearchBar}className="material-icons btn-small searchbar__btn waves-effect waves-light indigo lighten-1 z-depth-5">
                        expand_less
                    </button> : 
                    <button onClick={props.toggleSearchBar}className="material-icons btn-small searchbar__btn waves-effect waves-light indigo lighten-1 z-depth-5">
                        expand_more
                    </button>
                }
            </header>
        </div>
    );
};

export default SearchBar;