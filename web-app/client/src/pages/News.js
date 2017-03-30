import React, {Component} from 'react';
import './News.css';

class News extends Component {

  render() {
      return(
        <div className="App">
          <h1> This is the news page </h1>
          <ul>
            <li>Item1</li>
            <li>Item2</li>
          </ul>
        </div>
      );
  }

}

export default News;
