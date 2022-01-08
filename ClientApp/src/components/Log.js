import React, { Component } from 'react';
import SearchBar from './SearchBar';
import './SearchBar.css'

export class Log extends Component {
  static displayName = Log.name;

  constructor(props) {
    super(props);
    this.state = { events: [], loading: true, searchValue: "" };
  }

  componentDidMount() {
    this.fetchData('api/log/all');
  }

  renderLogs(data) {
    data.sort(function(a, b) {  
      return new Date(b.date) - new Date(a.date);
    });
    
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">  
        <thead>
          <tr>
            {Object.keys(data[0]).map(key =>
              <td>{key}</td>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((log) => (
            <tr className={(log.sourceName+" "+log.targetName+" "+log.data).toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ? 'user' : 'user removed'} key={log.id}>
              {Object.keys(log).map(key => 
                key == 'source' ? 
                <td>
                  <button onClick={() => {
                    this.props.history.push("/char/id?source="+log.source)
                    this.fetchData("api/char/id?source="+log.source)
                    }}>
                    {log[key]}
                  </button>
                </td> : 
                <td>
                  {log[key]}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {

    let content = this.state.loading ? 
    <p>Loading...</p> : this.renderLogs(this.state.events)

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



