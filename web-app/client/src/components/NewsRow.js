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
                <div> Date: {this.state.date} </div>
                <div> Title: {this.state.title} </div>
                <div> Summary: {this.state.summary} </div>
                <div> URL: {this.state.url} </div>
                <div>=========================================</div>

            </li>
        );
    }
}

export default NewsRow;
