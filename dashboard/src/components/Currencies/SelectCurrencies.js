import React from 'react';
import PropTypes from 'prop-types';

const SelectCurrency = (props) => {

    const {currencies, onSelectCurrency} = props;
    const filteredCurrencies = currencies.filter(currency => currency.code !== 'AUD');

    return <select onChange={(e) => onSelectCurrency(e.target.value)} >
        {
            filteredCurrencies.map(currency => {
                const {code, name} = currency; 
                return <option key={code} value={code}>{name}</option>
            })
        }
    </select>
}

SelectCurrency.prototype = {
    currencies: PropTypes.array.isRequired,
    onSelectCurrency: PropTypes.func.isRequired
};

export default SelectCurrency;