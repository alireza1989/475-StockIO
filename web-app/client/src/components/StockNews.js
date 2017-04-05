import React, {Component} from 'react';
import Client from './Client';
import StockNewsArticle from './StockNewsArticle';
// import loader from "../assets/loader.svg";
import './StockNews.css';

class StockNews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ticker: props.symbol,
            news: []
        };

        var symbol = this.state.ticker;

        Client.getNews(symbol, (newsList) => {
            const news = newsList.data.map(obj => obj);
            this.setState({news});
        }).catch(function() {
            const news = StockNews.news;
            this.setState({news});
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
