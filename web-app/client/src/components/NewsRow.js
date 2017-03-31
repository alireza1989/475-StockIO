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
            <li>   
                <div className="news-article">
                    <h4> Title: {this.state.title} </h4>
                    <h5> Date: {this.state.date} </h5>
                    <p> Summary: {this.state.summary} </p>
                    <a> {this.state.url} </a>
                </div>
                <div>=========================================</div>

            </li>
        );
    }
}

export default NewsRow;
