import React, {Component} from 'react';
import Client from '../components/Client';
import NewsRow from '../components/NewsRow';
import './News.css';

class News extends Component {

  constructor(props) {
      super(props);

      this.state = {
          news: []
      };
  }

  componentWillMount() {
      Client.getNews((newsList) => {
          const news = newsList.map(obj => obj);
          this.setState({news});
      }).catch(function(){
          const news = News.news;
          this.setState({news});
      });
  }


  render() {
      return(
        <div className="App">
          <h1> This is the news page </h1>
          <ul>
            {this.state.news.map((news, i) => <NewsRow key={i} news={news}/>)}
          </ul>
        </div>
      );
  }

}

export default News;
