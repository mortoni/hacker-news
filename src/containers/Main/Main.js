import React, { Component } from 'react';
import './Main.css';
import * as SearchAPI from '../../api';
import Header from '../../components/Header';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import { If, Then, Else } from 'react-if';
import { HashLoader } from 'react-spinners';


const CommentsHeader = (props) => {
    const { articles } = props;

    return (
        <If condition={ articles.length > 0 }>
            <Then>
                <div className="row sticky-top">
                    <div className="col-12">
                        <span className="float-right comments">comments</span>
                    </div>
                </div>
            </Then>
        </If>
    )
}

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            articles: [],
            page: 0,
            maxPages: 0,
            loading: false
        }
    }

    onSearch() {
        const query = `search?query=${this.state.query}
            &tags=story&page=${this.state.page}`;

        this.setState({loading: true});
        SearchAPI.search(query)
        .then(data => {
            this.setState({loading: false});
            this.setState({
                articles: data.hits,
                maxPages: data.nbPages,

            });
        }).catch(error => console.log(error));
    }

    handleInputChange = (query) => {
        let { page } = this.state;
        if(query !== this.state.query) {
            page = 0;
        }

        this.setState({
            query,
            page
        }, () => {
            if (this.state.query && this.state.query.length > 3) {
                this.onSearch();
            }
        });
    }

    next = () => {
        const { page, maxPages } = this.state;
        if((page + 1) >= maxPages) { return }

        this.setState({
            page: this.state.page + 1
        });

        this.onSearch();
    }

    previous = () => {
        const { page } = this.state;

        if(page <= 0) { return }

        this.setState({
            page: this.state.page - 1
        });

        this.onSearch();
    }

    render() {
        const { articles, maxPages, page, loading } = this.state;

        return(
            <div>
                <Header handleInputChange={ this.handleInputChange }/>

                <div className="container">
                    <CommentsHeader articles={ articles }/>

                    <div className="news-container">
                        <If condition={ loading }>
                            <Then>
                                <div className="row">
                                    <div className="col d-flex justify-content-center">
                                        <HashLoader
                                          color={'#e7ecef'}
                                          loading={ loading }
                                        />
                                    </div>
                                </div>
                            </Then>
                            <Else>
                                { articles.map(article => (
                                    <Article
                                        key={ article.objectID }
                                        { ...article }/>
                                )) }
                            </Else>
                        </If>
                    </div>

                    <Footer
                        articles={ articles }
                        maxPages={ maxPages }
                        page={ page }
                        loading={ loading }
                        previous={ this.previous }
                        next={ this.next }/>
                </div>

            </div>

        );
    }
}

export default Main
