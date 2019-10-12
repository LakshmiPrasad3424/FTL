import React, { Component } from 'react';
import './Sidebar.css';
import Flatted from 'flatted';

class Sidebar extends Component {

    btnClick = (e) => {
      e.target.parentNode.firstChild.style.display = "block";
      e.target.parentNode.lastChild.style.display = "block";
      e.target.style.display = "none";
    }
    
    clsClick = (e) => {
        e.target.parentNode.parentNode.firstChild.style.display = "none";
        e.target.parentNode.previousSibling.style.display = "block";
        e.target.parentNode.style.display = "none";
    }

    render() { 

        this.items = this.props.prevData.map((item, i) =>
            <li key={i} onClick={()=>{this.props.sidebarClick(i)}}>
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
            <button onClick={((e) => this.btnClick(e))}>Previous Records</button>

            <div className="mobileClose">
                 <span onClick={((e) => this.clsClick(e))}>&times;</span>
            </div>
            
        </div>);
    }
}
 
export default Sidebar;