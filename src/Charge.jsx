import React, { Component } from 'react'
import { TableContainer, Table, Paginator } from 'react-custom-table';
import './Charge.css'

export class Charge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'None',
            data: [],
            loading: true,
        }
    }

    componentDidMount() {
        this.getCharges();
    }


    getCharges() {
        this.setState({
            status: "getting all charges ..."
        }, () => {

            this.props.getSecret('charges')
                .then(json => {
                    this.setState({
                        status: "done ...",
                        data: json.data,
                        loading: false
                    })
                })
        })
    }

    render() {
        const table = this.state.loading ? null : <TableContainer
            columns={[
                { id: "id", title: "id" },
                { id: "amount", title: "amount" },
                { id: "refunded", title: "refunded" },
                { id: "disputed", title: "disputed" },
                { id: "reason", title: "reason" },
                { id: "refund", title: "refund" }
            ]}
            rows={this.state.data}>

            <Table />
        </TableContainer>

        return (
            <div className = "holder">
                <label>
                    Payments
                </label>
                <label>
                    Status: {this.state.status}
                </label>
                {table}
            </div>
        )
    }
}
