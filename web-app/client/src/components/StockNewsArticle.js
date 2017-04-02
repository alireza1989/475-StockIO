import React, { Component } from 'react';
import './StockNewsArticle.css';

class StockNewsArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: props.news.publication_date,
            summary: props.news.summary,
            title: props.news.title,
            url: props.news.url
        };
    }

    render() {
        return (
            <li className="stock-news-article">
                <a onClick={() => {window.open(this.state.url, '_blank')}}>
                    <span className="article-title">{this.state.title}</span>
                    <span className="article-date">{new Date(this.state.date).toDateString()}</span>
                    <span className="article-summary">{this.state.summary}</span>
                </a>
            </li>
        );
    }
}

export default StockNewsArticle;
