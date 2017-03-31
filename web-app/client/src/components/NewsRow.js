import React, { Component } from 'react';


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
                <h5> {this.state.title} </h5>
                <p className="date"> Date: {this.state.date} </p>
                <p> {this.state.summary} </p>
                <a> {this.state.url} </a>
            </li>
        );
    }
}

export default NewsRow;
