import { data } from 'jquery';
import React, { Component } from 'react';

export class CharRedirect extends Component {
  static displayName = CharRedirect.name;

  constructor(props) {
    super(props);
    this.state = { events: [], loading: true, searchValue: "" };
  }

  componentDidMount() {
    this.fetchData('api/character/id?source=' + new URLSearchParams(this.props.location.search).get("source"));
  }

  render() {

    let content = this.state.loading ? <h1>Waiting for redirect</h1> : this.props.history.push("/user/id?identifer=" + this.state.events[0]);

    return(
        <div>
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



