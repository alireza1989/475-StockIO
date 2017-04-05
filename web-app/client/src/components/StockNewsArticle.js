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
    
    formatDate() {
        var dateString = this.state.date;
        var regExp = /([0-9]{4}-[0-9]{2}-[0-9]{2}) ([0-9]{1,2}:[0-9]{2})/g;
        var match = regExp.exec(dateString);
        dateString = `${match[1]} at ${match[2]}`;
        return dateString;
    }

    render() {            
        return (
            <li className="stock-news-article">
                <a onClick={() => {window.open(this.state.url, '_blank')}}>
                    <span className="article-title">{this.state.title}</span>
                    <span className="article-date">{this.formatDate()}</span>
                    <span className="article-summary">{this.state.summary}</span>
                </a>
            </li>
        );
    }
}

export default StockNewsArticle;
