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
                <a href={this.state.url}>
                    <h5> {this.state.title} </h5>
                </a>
                <p className="date">{this.state.date} </p><br/>
                <p className="summary"> {this.state.summary} </p>
            </li>
        );
    }
}

export default NewsRow;
