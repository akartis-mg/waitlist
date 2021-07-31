import React from 'react'
import './Home.css'
import landing from './img/landing.jpeg'
function Home() {
    return (
        <div className="home">

            <section className="home_landing">


                <div className="home__section">

                    <div className="home__sectionText">
                        <h2> Landing template for startups </h2>
                        Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.
                        <button> Get Started </button>
                    </div>


                    <img className="home__sectionImage" src="https://waitlist.me/static/img/mobile_feature.png" alt="" />

                </div>

            </section>

        </div>
    )
}

export default Home
