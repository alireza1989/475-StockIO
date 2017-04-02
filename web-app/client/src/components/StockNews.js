import React, {Component} from 'react';
import Client from './Client';
import StockNewsArticle from './StockNewsArticle';
import './StockNews.css';

class StockNews extends Component {
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
                <h4>Related News</h4>
                <ul className="stock-news-items">
                    {this.state.news.map((news, i) => <StockNewsArticle key={i} news={news}/>)}
                </ul>
            </div>
        );
    }

}

export default StockNews;
