import React from 'react';
import './Footer.css';
import { If, Then } from 'react-if'

const Footer = (props) => {
    const { articles, previous, page, maxPages, next, loading } = props;

    const isNext = () => {
        if((page + 1) < maxPages && !loading) { return true; }
        return false
    }

    const isPrevious = () => {
        if(page > 0 && !loading) { return true; }
        return false;
    }

    return (
        <If condition={ articles.length > 0 }>
            <Then>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm float-left"
                                    onClick={ previous }
                                    disabled={ !isPrevious() }>
                                    Previous
                                </button>
                            </div>

                            <div className="col text-center">
                                <span>Page { page + 1 } of { maxPages }</span>
                            </div>

                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm float-right"
                                    disabled={ !isNext() }
                                    onClick={ next }>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Then>
        </If>
    )
}

export default Footer
