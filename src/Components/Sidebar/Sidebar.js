import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {

    handleClick = () =>{
    }
   
    render() { 

        this.items = this.props.prevData.map((item, i) =>
            <li key={i} onClick={()=>this.props.sidebarClick(i)}>
                <div>
                    <label>Amount</label>
                    <span> ${item.amount} USD</span>
                </div>
                <div>
                    <label>Duration</label>
                    <span>{item.months} Months</span>
                </div>
            </li>
        );
        return (<div className="Sidebar">
            <ul>
               {this.items}
            </ul>
            <button onClick={this.handleClick()}>Previous Records</button>
            <span>&times;</span>
        </div>);
    }
}
 
export default Sidebar;