import React, { Component } from 'react';
import './Main.css';
import * as SearchAPI from '../../api';
import Header from '../../components/Header';
import Article from '../../components/Article';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            articles: []
        }
    }

    onSearch() {
        const query = `search?query=${this.state.query}&tags=story&numericFilters=num_comments>100&page=0`;
        SearchAPI.search(query)
        .then(data => {
            this.setState({articles: data.hits});
        }).catch(error => console.log(error));
    }

    handleInputChange = (query) => {
        this.setState({
            query
        }, () => {
            if (this.state.query && this.state.query.length > 3) {
                this.onSearch();
            }
        })
    }

    render() {
        const { articles } = this.state;

        return(
            <div>
                <Header handleInputChange={this.handleInputChange}/>

                <div className="container">
                    { articles.map(article => (
                        <Article {...article}/>
                    )) }
                </div>

            </div>

        );
    }
}

export default Main
