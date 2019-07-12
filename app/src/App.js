import React from 'react';
import './App.css';
import axios from 'axios';
import ProjectList from './components/Projects';

export const baseURL = 'http://localhost:4000/api'

function createAPIUrl(extension) {
  return `${baseURL}${extension}`;
}
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      actions: [],
    }
  }

  componentDidMount() {
    axios
    .get(createAPIUrl('/projects'))
    .then(res => {
      this.setState({projects: res.data});
    })
  }

  render() {
    return (
      <div>
        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
