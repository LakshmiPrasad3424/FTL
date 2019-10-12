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
        emi:0,
        history:[]
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

    fetchDetails = () => {
        axios
            .get(
                `https://ftl-frontend-test.herokuapp.com/interest?amount=${
                    this.state.amount
                }&numMonths=${this.state.months}`
            )
            .then(res => {
                if (res.data.status && res.data.status === "error") {
                    console.log("Error occurred");
                } else {
                    let history = this.state.history;
    
                    this.setState({
                        roi:res.data.interestRate,
                        emi:res.data.monthlyPayment.amount,
                        history:[...this.state.history,{amount:this.state.amount,months:this.state.months}]
                    });

                    localStorage.setItem('list',JSON.stringify(history));
                
                }
            })
            .catch(e => console.log(e));
	}

    formatAmountLabel = val => {
		return `$${val}`;
    };
    sidebarClick = (index)=>{
        axios
        .get(
            `https://ftl-frontend-test.herokuapp.com/interest?amount=${
                this.state.history[index].amount
            }&numMonths=${this.state.history[index].months}`
        )
        .then(res => {
            if (res.data.status && res.data.status === "error") {
                console.log("Error occurred");
            } else {
                let history = this.state.history;

                this.setState({
                    amount:res.data.principal.amount,
                    months:res.data.numPayments,
                    roi:res.data.interestRate,
                    emi:res.data.monthlyPayment.amount,
                });
            
            }
        })
        .catch(e => console.log(e));
       
    }
    
    render() {
        return (<div className="Main">
            <Sidebar prevData={this.state.history} sidebarClick={(index)=>this.sidebarClick(index)}/>
            <div className="Content">
                <ul>
                    <li>
                        <div className="Innercontent">
                            <div className="inner">
                                <label>Total Amount (In USD) :</label>
                                <InputRange
                                    maxValue={5000}
                                    minValue={500} 
                                    step={500}
                                    value={this.state.amount}
                                    onChange={value => this.setState({ amount:value })}
                                    onChangeComplete={value => this.fetchDetails()}
                                    formatLabel={this.formatAmountLabel} />
                            </div>
                           <div className="inner">
                                <label>Duration (In Months) :</label>
                                <InputRange
                                        maxValue={24}
                                        minValue={6}
                                        step={1}
                                        value={this.state.months}
                                        onChange={value => this.setState({ months:value })}
                                        onChangeComplete={value => this.fetchDetails()} />
                           </div>

                        </div>
                        
                    </li>
                    <li>
                        <div className="Innercontent Innerconnect1">
                            <div className="inner">
                                <label>Rate of Interest :</label>
                                <span>${this.state.roi} USD</span>
                            </div>
                            <div className="inner">
                                <label>EMI :</label>
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