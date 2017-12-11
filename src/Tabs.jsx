import React, { Component } from 'react'
import './App.css'

export class TabList extends Component {

    constructor(props) {
        super(props)

        let defaultTab = React.Children.toArray(props.children).map((ele) => ele.props.name)[0]
        React.Children.toArray(props.children).forEach((ele) => {
            if(ele.props.default) {
                defaultTab = ele.props.name
            }
        })

        
        this.state = {
            selected : defaultTab
        }   
    }

    select(item) {
        this.setState({
            selected : item
        })
    }

    render () {
        const currentlySelected = this.state.selected;
        const tabs = React.Children.map(this.props.children, (child) => {
        const className = currentlySelected == child.props.name ? "selected" : "unSelected" 
        const tabName = child.props.name;

        return (
            <h1 className = {className}
                onClick = {(e) => {
                    this.select(tabName)
                }}> 
                {tabName} 
            </h1>
        )
           
        })

        let body = null;
        React.Children.forEach(this.props.children, (child) => {
            if(child.props.name == this.state.selected) {
                body = child;
            }
        });
        return (
            <div className ="holder">
                <div className = "tabs">
                    {tabs} 
                </div>
                <div className = "body">
                    {body}
                </div>
            </div>
        )
    }
}


export class Tab extends Component {
    render () {
        return this.props.children;
    }
}
