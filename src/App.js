import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import { Tab, TabList } from './Tabs.jsx';
import { CheckOut } from './CheckOut.jsx';
import { Charge} from './Charge.jsx';
import { withStripe } from './StripeApi';

class App extends Component {

  render() {
    const key = "";
    const secretKey = "";

    const WrappedCheckOut = withStripe(
      CheckOut,
      "",
      ""
    )

    const WrappedCharge = withStripe(
      Charge,
      "",
      ""
    )

    return (
      <TabList>
        <Tab name="CheckOut" default>
          <WrappedCheckOut />
        </Tab>
        <Tab name="Charge">
          <WrappedCharge />
        </Tab>
      </TabList>
    );
  }
}

export default App;
