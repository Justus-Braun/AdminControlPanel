import React, {Component, useState} from 'react';
import SearchBar from './SearchBar';
import './SearchBar.css'

export class Admin extends Component {
    static displayName = Admin.name;
   

    constructor(props) {
        super(props);
        this.state = { events: [], loading: true, searchValue: "" };
    }

    componentDidMount() {
        this.fetchData('api/admins/all');
    }

    renderUser(admins) {
        console.log(admins);
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    {Object.keys(admins[0]).map(key =>
                        <td>{key}</td>
                    )}
                </tr>
                </thead>
                <tbody>
                {admins.map((admin) => (
                    <tr>
                        {Object.keys(admin).map(key =>
                            <td>
                                {admin[key]}
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
        console.log(fetchDomain)
        this.setState({ loading: true })
        const response = await fetch(fetchDomain);
        console.log(response);
        const data = await response.json();
        console.log(data);
        this.setState({ events: data, loading: false });
    }
}
