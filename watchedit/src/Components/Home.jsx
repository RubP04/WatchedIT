import React from 'react'

const Home = () => {
  return (
    <>
    <div className="content">
      <div className="paragraph-content">
        <h2 style={{marginRight: 20}}>Find movies and create a watchlist that's right for</h2><h2 style={{backgroundColor: "black", color: "white", padding: 12}}>you...</h2>
      </div>
    </div>
    <div className="gif-container">
      <div>
        <p1>Movies recommended based on your preferences.</p1>
      </div>
      <div style={{ height: 0, paddingBottom: 'calc(56.25%)', position: 'relative', width: '100%'}}>
        <iframe
          allow="autoplay; gyroscope;"
          allowFullScreen
          height="100%"
          referrerPolicy="strict-origin"
          src="https://www.kapwing.com/e/67958d08c63ad2b1bbb1fb1e"
          style={{
            border: 0,
            height: '40%',
            left: 0,
            overflow: 'hidden',
            position: 'absolute',
            top: 0,
            width: '80%',
            margin: 0,
          }}
          title="Embedded content made on Kapwing"
          width="100%"
        ></iframe>
        </div>
      </div>
    </>
  )
}

export default Home