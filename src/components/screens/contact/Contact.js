import React from 'react'
function Contact() {
    return (
        <div>
            <section className="contact section">
                <h2 className="section__title">Contact ME</h2>
                <span className="section__subtitle">Get in touch</span>

                <div className="contact__container container grid">
                    <div>
                        <div className="contact__information">
                            <i class="uil uil-phone contact__icon"></i>
                            <div>
                                <h3 className="contact__title">Call / Whatsapp</h3>
                                <span className="contact__subtitle">+230 58 26 68 23</span>
                            </div>
                        </div>
                        <div className="contact__information">
                            <i class="uil uil-envelope contact__icon"></i>
                            <div>
                                <h3 className="contact__title">Email</h3>
                                <span className="contact__subtitle">
                                    herinambinina66@gmail.com
                                </span>
                            </div>
                        </div>
                        <div className="contact__information">
                            <i class="uil uil-map-marker contact__icon"></i>
                            <div>
                                <h3 className="contact__title">Location</h3>
                                <span className="contact__subtitle">
                                    Quatre Bornes - Mauritius
                                </span>
                            </div>
                        </div>
                    </div>

                    <form action="" className="contact__form grid">
                        <div className="contact__inputs grid">
                            <div className="contact__content">
                                <label htmlFor="" className="contact__label">
                                    Name
                                </label>
                                <input type="text" className="contact__input" />
                            </div>
                            <div className="contact__content">
                                <label htmlFor="" className="contact__label">
                                    Email
                                </label>
                                <input type="email" className="contact__input" />
                            </div>
                        </div>
                        <div className="contact__content">
                            <label htmlFor="" className="contact__label">
                                Project
                            </label>
                            <input type="text" className="contact__input" />
                        </div>
                        <div className="contact__content">
                            <label htmlFor="" className="contact__label">
                                Message
                            </label>
                            <textarea
                                name=""
                                id=""
                                cols="0"
                                rows="7"
                                className="contact__input"
                            ></textarea>
                        </div>

                        <div>
                            <a href="#" className="button button--flex">
                                Send Message
                                <i class="uil uil-message button__icon"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Contact
