import React from 'react';
import './Article.css';
import moment from 'moment';

const Article = (props) => {
    return(
        <div className="article">
            <div className="row">
                <div className="col-10">
                    <h5>{props.title}</h5>
                </div>

                <div className="col-2">
                    <span className="badge badge-secondary float-right">
                        {props.num_comments}
                    </span>
                </div>

                <div className="col-12">
                    <span>{moment(props.created_at).format("Do MM YYYY")}</span>
                </div>
            </div>
        </div>
    )
}

export default Article
