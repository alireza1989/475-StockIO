import React, {Component} from 'react';
import Client from './Client';
import NewsRow from './NewsRow';
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
        <div className="news-sidebar">
          <h4> Related News </h4>
          <ul>
            {this.state.news.map((news, i) => <NewsRow key={i} news={news}/>)}
          </ul>
        </div>
      );
  }

}

export default News;
