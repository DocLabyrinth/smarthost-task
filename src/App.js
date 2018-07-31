import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';

import { setRoomCounts } from './actions/rooms';
import logo from './logo.svg';
import './App.css';
import { setAvailableRooms } from './actions/rooms';

const mapStateToProps = ({ rooms: { available } }) => ({ available });
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
    this.props.setAvailableRooms({
      premium: this.state.premiumCount,
      economy: this.state.economyCount,
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
            <Header as="h2" color="teal" textAlign="center" />
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
            <Message>
              New to us? <a href="#">Sign Up</a>
            </Message>
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
