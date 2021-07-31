import React from 'react'
import './Home.css'
import landing from './img/landing.jpeg'
import SendIcon from '@material-ui/icons/Send';

function Home() {
    return (
        <div className="main">

            <section className="home section">

                <div className="home__container container grid">
                    <div className="home__content grid">

                        <div className="home__img">
                            <div className="home__blob">
                                <img src="https://waitlist.me/static/img/mobile_feature.png" alt="" className="home__blob-img" />
                            </div>
                        </div>

                        <div className="home__data">
                            <h1 className="home__title">Hi, I'am Sitraka</h1>
                            <h3 className="home__subtitle">
                                A Full Stack Developer at Flow Corporation
                            </h3>
                            <p className="home__description">
                                High Lve experience in web development
                            </p>
                            <a href="" className="button button--flex">

                                Contact Me <SendIcon className="button__icon" />
                            </a>
                        </div>
                    </div>

                </div>


            </section>

        </div>
    )
}

export default Home
