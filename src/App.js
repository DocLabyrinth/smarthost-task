import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

import AssignedList from './components/AssignedList';
import { assignRooms } from './utils';
import { setAvailableRooms } from './actions/rooms';
import './App.css';

const mapStateToProps = ({ rooms: { available }, customers }) => ({
  available,
  customers,
});
const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setAvailableRooms: ({ premium, economy }) => {
      dispatch(setAvailableRooms({ premium, economy }));
    },
  };
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      premiumCount: 0,
      premiumCountHasError: false,
      economyCount: 0,
      economyCountHasError: false,
    };
  }

  onInputChange(field) {
    return event => {
      const newValue = parseInt(event.target.value, 10);

      if (isNaN(newValue)) {
        this.setState({ [`${field}HasError`]: true });
        return;
      } else if (newValue === '') {
        this.setState({ [`${field}HasError`]: false });
        return;
      }

      this.setState({ [`${field}HasError`]: false });
      this.setState({ [field]: newValue });
    };
  }

  onButtonClick = () => {
    if (this.state.premiumCountHasError || this.state.economyCountHasError)
      return;

    const newRoomCounts = {
      premium: this.state.premiumCount,
      economy: this.state.economyCount,
    };

    this.props.setAvailableRooms(newRoomCounts);

    const assignedRoomInfo = assignRooms({
      customers: this.props.customers,
      available: newRoomCounts,
    });

    this.setState({
      assignedRoomInfo: assignedRoomInfo,
    });
  };

  // adapted from: https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/LoginLayout.js
  render() {
    return (
      <div className="login-form">
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" color="teal" textAlign="center" />
            <Form size="large">
              <Segment stacked>
                <Header>Available rooms</Header>
                <Form.Input
                  label="Premium"
                  labelPosition="left"
                  fluid
                  error={this.state.premiumCountHasError}
                  onChange={this.onInputChange('premiumCount')}
                />
                <Form.Input
                  label="Economy"
                  labelPosition="left"
                  fluid
                  error={this.state.economyCountHasError}
                  onChange={this.onInputChange('economyCount')}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={this.onButtonClick}
                >
                  Assign Customers
                </Button>
              </Segment>
            </Form>
            {this.state.assignedRoomInfo ? (
              <AssignedList assignedRoomInfo={this.state.assignedRoomInfo} />
            ) : null}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
