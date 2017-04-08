import React, {Component} from 'react';
import Client from './Client';
import StockNewsArticle from './StockNewsArticle';
import './StockNews.css';

class StockNews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ticker: props.symbol,
            loaded: false,
            news: []
        };

        var symbol = this.state.ticker;

        Client.getNews(symbol, (news) => {
            if (news.data !== undefined) {
                news = news.data.map(obj => obj);
            } else {
                news = [];
            }
            
            this.setState({
                loaded: true,
                news: news
            });
        });
    }
    
    loadNews = () => {
        if (this.state.loaded) {
            return (
                this.state.news.length === 0 ?
                    <li><p>Cannot load news</p></li> :
                    this.state.news.map((news, i) => <StockNewsArticle key={i} news={news}/>)
            )
        }
    }

    render() {
        return(
            <div className={`stock-news ${this.state.loaded ? '' : 'loading'}`}>
                <h4>Related News</h4>
                <ul className="stock-news-items">
                    {this.loadNews()}
                </ul>
            </div>
        );
    }

}

export default StockNews;
