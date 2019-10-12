import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {

    state = {
        btnshow :false,
        ulshow:true,
        clsshow:false
    }

    updateDimensions() {
        if(window.innerWidth < 970) {
           this.setState({  btnshow :true,
                ulshow:false,
            });
        }
    }

  /**
   * Add event listener
   */
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    btnClick = () => {
        this.setState({
            btnshow :false,
            ulshow:true,
            clsshow:true
        })
    }

    render() { 

        this.items = this.props.prevData.map((item, i) =>
            <li key={i} onClick={()=>{this.setState({btnshow:true, ulshow:false, clsshow:false});this.props.sidebarClick(i)}}>
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
            <ul style={{display: this.state.ulshow ? '': 'none'}}>
               {this.items}
            </ul>
            <button onClick={this.btnClick} style={{display: this.state.btnshow ? '': 'none'}}>Previous Records</button>

            <div className="mobileClose" style={{display: this.state.clsshow ? '': 'none'}}>
                 <span onClick={()=>{this.setState({btnshow:true, ulshow:false, clsshow:false})}}>&times;</span>
            </div>
            
        </div>);
    }
}
 
export default Sidebar;