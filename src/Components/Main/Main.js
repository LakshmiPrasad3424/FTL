import React, { Component } from 'react';
import './Main.css';
import Sidebar from '../Sidebar/Sidebar';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import axios from 'axios';

class Main extends Component {

    state = {
        amount: 500,
        months: 6,
        roi:0,
        emi:0
    }

   
    componentDidMount() {
        axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.amount}&numMonths=${this.state.months}
        `).then(res => {
                this.setState({ 
                    roi:res.data.interestRate,
                    emi:res.data.monthlyPayment.amount
                });
            })
    }

    componentDidUpdate(prevProps, prevState) {
		if (
			this.state.amount !== prevState.amount ||
			this.state.months !== prevState.months
		) {
			axios
				.get(
					`https://ftl-frontend-test.herokuapp.com/interest?amount=${
						this.state.amount
					}&numMonths=${this.state.months}`
				)
				.then(res => {
					console.log(res.data);
					if (res.data.status && res.data.status === "error") {
						console.log("Error occurred");
					} else {
						this.setState({
                            roi:res.data.interestRate,
                            emi:res.data.monthlyPayment.amount
						});
                    }
                    localStorage.setItem('prasad','qwqwqwq');
                    localStorage.getItem('prasad');
				})
				.catch(e => console.log(e));
		}
    }
    
    formatAmountLabel = val => {
		return `$${val}`;
	};

    render() { 
        return (<div className="Main">
            <Sidebar/>
            <div className="Content">
                <ul>
                    <li>
                        <div className="Innercontent">
                            <div className="inner">
                                <label>Total Amount (In USD) :</label>
                                <InputRange
                                    maxValue={5000} USD
                                    minValue={500} USD
                                    step={500}
                                    value={this.state.amount}
                                    onChange={value => this.setState({ amount:value })}
                                    formatLabel={this.formatAmountLabel} />
                            </div>
                           <div className="inner">
                                <label>Duration (In Months) :</label>
                                <InputRange
                                        maxValue={24}
                                        minValue={6}
                                        step={1}
                                        value={this.state.months}
                                        onChange={value => this.setState({ months:value })} />
                           </div>
                        </div>
                        
                    </li>
                    <li>
                        <div className="Innercontent">
                            <div className="inner">
                                <label>Rate of Interest :</label>
                                <span>${this.state.roi} USD</span>
                            </div>
                            <div className="inner">
                                <label>Amount to be Paid :</label>
                                <span>${this.state.emi} USD</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>);
    }
}
 
export default Main;