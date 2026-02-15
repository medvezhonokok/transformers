import {MapPin, Phone, Mail, Clock, Send, Trophy, Calendar} from 'lucide-react';

export default function Contacts() {
    return (
        <div className="page-container">
            <div className="contacts-hero">
                <h1 className="page-title">Контакты</h1>
                <p className="page-subtitle">
                    Будь на связи
                </p>
            </div>

            <div className="contacts-grid">
                <div className="contacts-info-card">
                    <h2 className="contacts-title">Связь с нами</h2>

                    <div className="contacts-list">
                        <div className="contact-item">
                            <div className="contact-icon">
                                <Send size={20}/>
                            </div>
                            <div className="contact-details">
                                <span className="contact-label">Telegram</span>
                                <a
                                    href="https://t.me/transiforms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-value contact-link"
                                >
                                    @transiforms
                                </a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <Send size={20}/>
                            </div>
                            <div className="contact-details">
                                <span className="contact-label">Капитан</span>
                                <a
                                    href="https://t.me/medvezhonokok"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-value contact-link"
                                >
                                    @medvezhonokok
                                </a>
                                <span className="contact-note">Ким Михаил</span>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <Send size={20}/>
                            </div>
                            <div className="contact-details">
                                <span className="contact-label">Помощник капитана</span>
                                <a
                                    href="https://t.me/benoturself"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-value contact-link"
                                >
                                    @benoturself
                                </a>
                                <span className="contact-note">Воронцов Максим</span>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <MapPin size={20}/>
                            </div>
                            <div className="contact-details">
                                <span className="contact-label">Домашняя площадка</span>
                                <span className="contact-value">СПб, ул. Кирочная 8Б</span>
                                <span className="contact-note">Спортзал, метро Чернышевская</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contacts-social-card">
                    <h2 className="contacts-title">Мы в соцсетях</h2>

                    <div className="social-links">
                        <a
                            href="https://t.me/transiforms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link telegram"
                        >
                            <Send size={24}/>
                            <span>Telegram</span>
                        </a>

                        <a
                            href="#"
                            className="social-link vk"
                        >
                            <span className="social-icon">VK</span>
                            <span>ВКонтакте</span>
                        </a>

                        <a
                            href="#"
                            className="social-link instagram"
                        >
                            <span className="social-icon">IG</span>
                            <span>Instagram</span>
                        </a>
                    </div>
                </div>

                <div className="contacts-map-card">
                    <h2 className="contacts-title">Как нас найти</h2>
                    <div className="map-placeholder">
                        <MapPin size={32}/>
                        <p>Спортзал на Кирочной 8Б</p>
                        <p className="map-note">м. Чернышевская, 5 минут пешком</p>
                        <a
                            href="https://yandex.ru/maps/-/CPUZBPi5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="map-link"
                        >
                            Открыть в картах
                        </a>
                    </div>
                </div>
            </div>

            <div className="contacts-form-card">
                <h2 className="contacts-title">Напиши нам</h2>
                <p className="form-subtitle">
                    Хочешь присоединиться к команде или задать вопрос? Заполни форму! (Это никуда не отправится)
                </p>

                <form className="contacts-form">
                    <div className="form-row">
                        <input
                            type="text"
                            placeholder="Твое имя"
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="Telegram / телефон"
                            className="form-input"
                        />
                    </div>

                    <textarea
                        placeholder="Сообщение"
                        className="form-textarea"
                        rows={4}
                    />

                    <button type="submit" className="form-button">
                        Отправить
                        <Send size={16}/>
                    </button>
                </form>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-copyright">
                        © {new Date().getFullYear()} Трансформеры. Все права защищены.
                    </div>
                </div>
            </footer>
        </div>
    );
}