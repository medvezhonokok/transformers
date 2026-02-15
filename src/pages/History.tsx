import {Trophy, Medal, Target, } from 'lucide-react';

export default function History() {
  const achievements = [
    {
      icon: Trophy,
      title: '15x Олимпийские игры',
      description: 'Золотые медали на всех Олимпиадах с 1926 года'
    },
    {
      icon: Medal,
      title: '100+ Чемпионатов',
      description: 'Победы на международных и национальных первенствах'
    },
    {
      icon: Target,
      title: '100 лет традиций',
      description: 'Непрерывная история успеха с 1926 года'
    }
  ];

  return (
    <div className="page-container">
      <div className="history-hero">
        <h1 className="page-title">История команды</h1>
        <p className="page-subtitle">
          Легенда волейбола, написанная столетием побед
        </p>
      </div>

      <div className="history-content">
        <div className="history-text">
          <p className="history-paragraph">
            Волейбольный клуб "Трансформеры" был основан в 1926 году группой энтузиастов,
            которые мечтали создать команду мирового уровня. За прошедшие 100 лет мы не просто
            осуществили эту мечту — мы превзошли все ожидания.
          </p>
          <p className="history-paragraph">
            Наша команда принимала участие во всех Олимпийских играх, начиная с первого включения
            волейбола в программу Олимпиады. Каждый раз мы возвращались домой с золотыми медалями,
            устанавливая абсолютный рекорд в истории волейбола.
          </p>
          <p className="history-paragraph">
            "Трансформеры" — это не просто команда, это философия. Мы трансформируем игру,
            трансформируем ожидания, трансформируем невозможное в реальность. Наши игроки —
            мастера своего дела, каждый из которых вносит уникальный вклад в общую победу.
          </p>
          <p className="history-paragraph">
            Сегодня мы продолжаем писать историю, тренируясь с тем же упорством и страстью,
            которые привели нас к вершинам мирового волейбола. Наша цель остается неизменной —
            быть лучшими во всем, что мы делаем.
          </p>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">
                <achievement.icon size={32} />
              </div>
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-description">{achievement.description}</p>
            </div>
          ))}
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-copyright">
              © {new Date().getFullYear()} Трансформеры. Все права защищены.
            </div>
          </div>
        </footer>
      </div>


    </div>
  );
}