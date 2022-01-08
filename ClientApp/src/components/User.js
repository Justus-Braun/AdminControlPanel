import React, { Component } from 'react';
import SearchBar from './SearchBar';
import './SearchBar.css'

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
    console.log(users);
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
    
    // let contents = this.state.loading
    //   ? <p><em>Loading...</em></p>
    //   : this.renderEventsTable(this.state.events);

    let users = [
      { name: "Jack", id: "1" },
      { name: "Lisa", id: "2" },
      { name: "Peter", id: "3" },
      { name: "Roman", id: "4" },
      { name: "Sarah", id: "5" },
      { name: "Eric", id: "6" },
      { name: "Fiora", id: "7" },
    ];

  //   let foundUsers = this.saearchValue == undefined ? <ul></ul> : <ul>
  //   {users.map((user) => {
  //     // we can use it as like
  //     let classname = user.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1 ? 'user' : 'user removed';
  //     return <li className={classname} key={user.id}>
  //       {user.name}
  //     </li>
  //   })}
  // </ul>

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
    console.log(fetchDomain)
    this.setState({ loading: true })
    const response = await fetch(fetchDomain);
    console.log(response);
    const data = await response.json();
    console.log(data);
    this.setState({ events: data, loading: false });
  }
}



