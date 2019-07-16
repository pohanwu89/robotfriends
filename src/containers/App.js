import React, { Component } from 'react';
import CardList from '../ components/CardList.js';
import SearchBox from '../ components/SearchBox.js';
import './App.css';
import Scroll from '../ components/Scroll.js';
import ErrorBoundary from '../ components/ErrorBoundary';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });
  }

  onSearchChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { robots, searchField } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    if (robots.length === 0) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f2">Robot Friends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
