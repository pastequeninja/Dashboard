import React from 'react';
import data from './CurrenciesData';
import SelectCurrency from './SelectCurrencies';

class Currencies extends React.Component {

  state = {
    refreshRate: 60,
    authorizeRefreshRate: false
  }

  constructor(props){
    super(props);
    this.state = {
        currencies: data.currencies,
        currencyA: data.currencies[0],
        currencyB: data.currencies[1],
        currencyAval: data.currencies[0].sellRate,
        currencyBval: data.currencies[1].sellRate
    }

    this.onSelectCurrency = this.onSelectCurrency.bind(this);
    this.handleRateRefresh = this.handleRateRefresh.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onSelectCurrency(code) {
      //console.log('Selecting currency: ' + code);
      const{currencies, currencyAval} = this.state;
      const currency = currencies.filter(currency => currency.code === code);
      this.setState({
          currencyB: currency[0],
          currencyBval: currencyAval * currency[0].sellRate
      })
  }

  handleRateRefresh() {
    this.setState({
    refreshRate: this.props.refreshRate,
    authorizeRefreshRate: true
    })
}

componentDidMount() {
  setInterval(this.onChangeHandler, this.state.refreshRate * 1000); // runs every 60 seconds.
  this.onChangeHandler();
}

componentDidUpdate() {
  console.log("props : " + this.props.refreshRate + "state : " + this.state.refreshRate)
  if (this.state.authorizeRefreshRate) {
      console.log("Updated")/* 
      this.setState({refreshRate: this.props.refreshRate}) */
      setInterval(this.onRefresh, this.state.refreshRate * 1000); // runs every 60 seconds.
      this.setState({
      authorizeRefreshRate: false
      })
  }
}
componentWillUnmount() {
  clearTimeout(this.intervalID);
}

onRefresh() {
  this.setState({currencyAval: 1})
  this.onChangeHandler({target:{value:1}}, 'A');
}

  onChangeHandler(e, currency) {
    if (currency === 'A') {
      const newValueA = e.target.value;
      this.setState({
        currencyAval: newValueA,
        currencyBval: newValueA * this.state.currencyB.sellRate
      })
    }
    else if (currency === 'B') {
      const newValueB = e.target.value;
      this.setState({
        currencyBval: newValueB,
        currencyAval: newValueB * this.state.currencyA.sellRate
      })
    }
  }

  render(){
    const {currencies, currencyA, currencyB, currencyAval, currencyBval} = this.state;
    return (
      <div>
        <button type="button" onClick={this.handleRateRefresh}>Save refresh rate</button> 
        <header>
          <h1>Currency Converter</h1>
        </header>
        <div>
          <div>
            <div>
              <h2>Select Currency</h2>
              <p>
                {
                  //Select currency
                }
                <SelectCurrency currencies={currencies} onSelectCurrency={this.onSelectCurrency}/>
              </p>
            </div>
          </div>
          
          <div>
            <div>
              <h3>{currencyA.name}</h3>
              <div>
                <span>{currencyA.sign}</span>
                <input type="number" value={currencyAval} aria-describedby="basic-addon2" step="1" pattern="\d\.\d{2}"  onChange={(e) => { this.onChangeHandler(e, 'A'); }}/>
                <span>{currencyA.code}</span>
              </div>

            </div>
            <div>
              <h3>{currencyB.name}</h3>
              <div>
            <span>{currencyB.sign}</span>
                <input type="number" value={currencyBval} aria-describedby="basic-addon3" step="1" pattern="\d\.\d{2}"  onChange={(e) => {this.onChangeHandler(e, 'B');}}/>
            <span id="basic-addon3">{currencyB.code}</span>
              </div>

            </div>
          </div>
          <div>
            <div>
              <p>
                Exchange Rate {`${currencyA.sign} ${currencyA.sellRate} ${currencyA.code}`} = {`${currencyB.sign} ${currencyB.sellRate} ${currencyB.code}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Currencies;