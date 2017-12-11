import React, { Component } from 'react'
import _ from 'lodash';
import { CardElement, Elements } from 'react-stripe-elements';
import './CheckOut.css'


export class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastestCharge: 'None',
            cardNumber: 'None',
            dateTime: 'None',
            amount: 'None',
        }
        this.createCharge = this.createCharge.bind(this);
    }

    createCharge() {

        const cardNumber = this.state.cardNumber;
        const amount = this.state.amount;
        const dateTime = this.state.dateTime;

        console.log("on create charge " + cardNumber + " " + amount + " " + dateTime);
        this.setState({
            lastestCharge: "Creating token ..."
        }, () => {
            this.props.postPublic('tokens', {
                'card[number]': cardNumber,
                'card[exp_month]': dateTime.split("/")[0],
                'card[exp_year]': dateTime.split("/")[1],
            })
                .then(token => {
                    this.setState({
                        lastestCharge: "Creating charge ..."
                    })
                    return this.props.postSecret('charges', {
                        'amount': amount,
                        'currency': 'usd',
                        'description': 'test',
                        'source': token.id
                    })
                        .then(charge => {
                            this.setState({
                                lastestCharge: charge.id
                            })
                        })
                });
        })
    }

    onSubmit() {

    }

    onChangeCardNumber(e) {
        console.log("one change card number ", e);
        this.setState({
            cardNumber: e.target.value
        })
    }

    onChangeTime(e) {
        this.setState({
            dateTime: e.target.value
        })
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        })
    }

    render() {
        return (
            <div className="holder">
                <label>
                    Make a change
                </label>
                <label>
                    Card details
                </label>

                <input name="card_number" placeholder="Card Number" onChange={(e) => this.onChangeCardNumber(e)}></input>
                <input name="time" placeholder="DD/MM/YYYY" onChange={(e) => this.onChangeTime(e)}></input>
                <input name="amount" placeholder="amount" onChange={(e) => this.onChangeAmount(e)}></input>

                <button onClick={(e) => this.createCharge()}>
                    pay
                </button>
                <label>
                    Satus : {this.state.lastestCharge}
                </label>
            </div>

        )
    }
}

