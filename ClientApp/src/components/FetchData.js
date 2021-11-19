import { event } from 'jquery';
import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { events: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderEventsTable(events) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            {Object.keys(events[0]).map(key =>
              <td>{key}</td>
            )}
          </tr>
        </thead>
        <tbody>
          {events.map(event =>
            <tr>
              {Object.keys(event).map(key => 
                <td>
                  {event[key]}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderEventsTable(this.state.events);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ events: data, loading: false });
  }
}
