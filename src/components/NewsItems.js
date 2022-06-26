import React from 'react'

export default function NewsItems(props) {
 
    let { title, description, imageUrl, newsUrl, author, publishedAt } = props;
    return (
        <>
            <div className='my-4'>
                <div className="card">
                    <img src={!imageUrl ? "https://image.cnbcfm.com/api/v1/image/107072159-1654612804938-gettyimages-1240891252-DAVOS_WEF_2022.jpeg?v=1654612931&w=1920&h=1080" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <div className="text-muted ">
                        By {!author?"Unknown":author} on {new Date(publishedAt).toGMTString()}
                        </div>
                        <a href={newsUrl} target="_black" className="btn btn-primary btn-myStyle btn-sm my-2">Read More</a>

                        
                    </div>
                </div>
            </div>
        </>
    )
  
}
