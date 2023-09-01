import React from 'react'

 const Newsitem =(props)=> {
    
        let { title, description, imageUrl, newsUrl, author, date } = props
        return (
            <div className='container my-3' >
                <div className="card" style={{ width: "18rem" }}>
                    <img src={!imageUrl ? "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary"> By {!author ? "publisher" : author} on {new Date(date).toGMTString()}</small></p>

                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default Newsitem
