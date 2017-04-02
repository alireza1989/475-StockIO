import React, { Component } from 'react';
import './NewsRow.css';

class NewsRow extends Component {
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
            <li className="news-article">
                <p className="date">{new Date(this.state.date).toDateString()}</p>
                <a onClick={() => {window.open(this.state.url, '_blank')}}><h5>{this.state.title}</h5></a>
                <p className="summary">{this.state.summary}</p>
            </li>
        );
    }
}

export default NewsRow;
