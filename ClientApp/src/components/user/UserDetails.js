import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import './../SearchBar.css';
import UserStats from './UserStats';

export class UserDetails extends Component {
  static displayName = UserDetails.name;

  constructor(props) {
    super(props);
    this.state = { events: [], loading: true, searchValue: "" };
  }

  componentDidMount() {
    this.fetchData('api/user/id?identifer=' + new URLSearchParams(this.props.location.search).get("identifer"));
  }

  getOverallMoney(users) {
    let money = 0;
    users.map((user) => (
      money += user.money
    ))
    return money;
  }

  getOverallBank(users) {
    let bank = 0;
    users.map((user) => (
      bank += user.bank
    ))
    return bank;
  }

  renderUser(users) {
    return (
      <div>
        <UserStats identifier={users[0].identifer} charcount={users.length} money={this.getOverallMoney(users)} bank={this.getOverallBank(users)}></UserStats>
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              {Object.keys(users[0]).map(key =>
                <td>{key}</td>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className={(user.charId + user.firstName + user.lastName).toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ? 'user' : 'user removed'}>
                {Object.keys(user).map(key =>
                  <td>
                    {user[key]}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  render() {

    let content = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderUser(this.state.events)

    return (
      <div>
        <h2>Search</h2>
        <SearchBar onSearch={(text) => this.setState({ searchValue: text })} value={this.state.searchValue} />
        {content}
      </div>
    );
  }

  async fetchData(fetchDomain) {
    this.setState({ loading: true })
    const response = await fetch(fetchDomain);
    const data = await response.json();
    this.setState({ events: data, loading: false });
  }
}



