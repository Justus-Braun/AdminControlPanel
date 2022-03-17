import React, { Component } from 'react';
import SearchBar from './utils/SearchBar';
import './utils/SearchBar.css'

export class User extends Component {
  static displayName = User.name;

  constructor(props) {
    super(props);
    this.state = { events: [], loading: true, searchValue: "" };
  }

  componentDidMount() {
    this.fetchData('api/user/all');
  }

  renderUser(users) {
    return (
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
            <tr className={user.identifer.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ? 'user' : 'user removed'}>
              {Object.keys(user).map(key => 
                <td>
                  {user[key]}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
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



