import React from 'react'

const Newsitem =(props) =>{

    let { title, description, imageurl, newsurl, date, author, source } = props;

    return (
      <div className='my-3'>
        <div className="card" style={{ width: '400px', position: "relative" }}>
          <span className="position-absolute top-0  badge rounded-pill bg-danger" style={{ right: 0, zIndex: 1, padding: "8px" }}>{source ? source : "WebNews"}</span>
          <img src={imageurl} className="card-img-top" alt="Loading..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text" style={{ color: 'red' }}><strong><small>By: {author} on {new Date(date).toGMTString()} </small></strong></p>
            <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
}   

export default Newsitem;