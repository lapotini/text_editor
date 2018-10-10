import React, { Component } from 'react';
import classes from './Layout.css';
import TextEditor from '../../components/TextEditor/TextEditor';
import Loader from '../../UI/Loader/Loader';
import axios from '../../axios-text';

class ExampleLayout extends Component {
  state = {
    html: '',
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios.get('/texteditor.json')
      .then(response => {
        this.setState({ html: response.data.textData, loading: false});
      })
      .catch(error => {
        this.setState({ loading: false});
      })
  }

  onChange = (data) => {
    this.setState({ html: data });
  };

  saveText = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    console.log(this.state.html);
    axios.put('/texteditor.json', {textData: this.state.html})
      .then(response => {
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let content = (
      <main className={classes.Content}>
        <TextEditor value={this.state.html} onChange={this.onChange}/>
        <button onClick={this.saveText}>Save</button>
      </main>
    );
    if (this.state.loading) {
      content = <Loader/>
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default ExampleLayout;