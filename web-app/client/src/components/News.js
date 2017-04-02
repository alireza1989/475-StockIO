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

        Client.getNews((news) => {
            this.setState({news: news});
        });
    }

    render() {
        return(
            <div className="stock-news">
                <h3>Related News</h3>
                <ul className="stock-news-items">
                    {this.state.news.map((news, i) => <NewsRow key={i} news={news}/>)}
                </ul>
            </div>
        );
    }

}

export default News;
