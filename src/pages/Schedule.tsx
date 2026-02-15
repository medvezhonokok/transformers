import { useEffect, useState } from 'react';
import { supabase, Game } from '../lib/supabase';
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight, Trophy, AlertCircle, PieChart } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Schedule() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    try {
      const { data, error } = await supabase
          .from('schedule')
          .select('*')
          .order('game_date');

      if (error) throw error;
      setGames(data || []);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setLoading(false);
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getGamesForDate = (date: Date) => {
    return games.filter(game => {
      if (!game.game_date) return false;
      const gameDate = new Date(game.game_date);
      return (
          gameDate.getDate() === date.getDate() &&
          gameDate.getMonth() === date.getMonth() &&
          gameDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Данные для круговой диаграммы
  const getChartData = () => {
    const completed = games.filter(g => g.status === 'completed').length;
    const scheduled = games.filter(g => g.status === 'scheduled').length;
    const postponed = games.filter(g => g.status === 'postponed').length;
    const total = games.length;

    // Считаем победы и поражения (если есть счет)
    let wins = 0;
    let losses = 0;

    games.forEach(game => {
      if (game.status === 'completed' && game.score) {
        const [homeScore, awayScore] = game.score.split(':').map(Number);
        if (game.home_team === 'Трансформеры') {
          if (homeScore > awayScore) wins++;
          else if (homeScore < awayScore) losses++;
        } else if (game.away_team === 'Трансформеры') {
          if (awayScore > homeScore) wins++;
          else if (awayScore < homeScore) losses++;
        }
      }
    });

    return [
      { name: 'Победы', value: wins, color: '#4d5489' },
      { name: 'Поражения', value: losses, color: '#b10edf' },
      { name: 'Предстоит', value: scheduled, color: '#ec680a' },
      { name: 'Перенесено', value: postponed, color: '#ec3968' }
    ].filter(item => item.value > 0); // Показываем только те, у которых есть значения
  };

  const getCompletedGames = () => {
    return games.filter(game => game.status === 'completed').length;
  };

  const getScheduledGames = () => {
    return games.filter(game => game.status === 'scheduled').length;
  };

  const getPostponedGames = () => {
    return games.filter(game => game.status === 'postponed').length;
  };

  const getWinRate = () => {
    const completed = games.filter(g => g.status === 'completed');
    let wins = 0;

    completed.forEach(game => {
      if (game.score) {
        const [homeScore, awayScore] = game.score.split(':').map(Number);
        if (game.home_team === 'Трансформеры' && homeScore > awayScore) wins++;
        else if (game.away_team === 'Трансформеры' && awayScore > homeScore) wins++;
      }
    });

    return completed.length > 0 ? Math.round((wins / completed.length) * 100) : 0;
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Дата не назначена';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return 'Время не назначено';
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершена';
      case 'postponed': return 'Перенесена';
      default: return 'Запланирована';
    }
  };

  if (loading) {
    return (
        <div className="page-container">
          <div className="loading">Загрузка...</div>
        </div>
    );
  }

  const chartData = getChartData();

  return (
      <div className="page-container">
        <div className="schedule-hero">
          <h1 className="page-title">Расписание игр</h1>
          <p className="page-subtitle">
            Здесь те, кого мы будем *** уже этой весной
          </p>
        </div>

        <div className="schedule-content">
          <div className="calendar-container">
            <div className="calendar-header">
              <button onClick={previousMonth} className="calendar-nav">
                <ChevronLeft size={20} />
              </button>
              <h2 className="calendar-month">{monthName}</h2>
              <button onClick={nextMonth} className="calendar-nav">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="calendar-grid">
              <div className="calendar-day-name">Вс</div>
              <div className="calendar-day-name">Пн</div>
              <div className="calendar-day-name">Вт</div>
              <div className="calendar-day-name">Ср</div>
              <div className="calendar-day-name">Чт</div>
              <div className="calendar-day-name">Пт</div>
              <div className="calendar-day-name">Сб</div>

              {Array.from({ length: startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1 }).map((_, i) => (
                  <div key={`empty-${i}`} className="calendar-day empty"></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const date = new Date(year, month, day);
                const dayGames = getGamesForDate(date);
                const hasGames = dayGames.length > 0;

                return (
                    <div
                        key={day}
                        className={`calendar-day ${hasGames ? 'has-game' : ''}`}
                        onClick={() => hasGames && setSelectedGame(dayGames[0])}
                    >
                      <span className="day-number">{day}</span>
                      {hasGames && (
                          <div className="game-indicators">
                            {dayGames.map((game, idx) => (
                                <div
                                    key={idx}
                                    className={`game-dot ${game.status}`}
                                    title={`${game.home_team} vs ${game.away_team}`}
                                />
                            ))}
                          </div>
                      )}
                    </div>
                );
              })}
            </div>
          </div>

          <div className="stats-pie-container">
            <div className="pie-chart-card">
              <h2 className="stats-title">
                <PieChart size={20} />
                Статистика сезона
              </h2>
              <div className="pie-chart-wrapper">
                <ResponsiveContainer width="100%" height={250}>
                  <RePieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                    >
                      {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          fontSize: '0.4rem'
                        }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>

              <div className="pie-legend">
                {chartData.map((item, index) => (
                    <div key={index} className="legend-item">
                      <span className="legend-color" style={{ background: item.color }} />
                      <span className="legend-name">{item.name}</span>
                      <span className="legend-value">{item.value}</span>
                    </div>
                ))}
              </div>

              <div className="win-rate">
                <div className="win-rate-label">Процент побед</div>
                <div className="win-rate-value">{getWinRate()}%</div>
                <div className="win-rate-bar">
                  <div
                      className="win-rate-fill"
                      style={{ width: `${getWinRate()}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedGame && (
            <div className="game-modal-overlay" onClick={() => setSelectedGame(null)}>
              <div className="game-modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="game-modal-title">
                  {selectedGame.home_team} vs {selectedGame.away_team}
                </h3>

                <div className="game-details">
                  <div className="game-detail">
                    <Calendar size={18} />
                    <span>{formatDate(selectedGame.game_date)}</span>
                  </div>
                  {selectedGame.game_date && (
                      <div className="game-detail">
                        <Clock size={18} />
                        <span>{formatTime(selectedGame.game_date)}</span>
                      </div>
                  )}
                  <div className="game-detail">
                    <MapPin size={18} />
                    <span>{selectedGame.location || 'Место не указано'}</span>
                  </div>
                </div>

                <div className={`game-status ${selectedGame.status}`}>
                  {getStatusLabel(selectedGame.status)}
                </div>

                {selectedGame.score && (
                    <div className="game-score">
                      Счёт: {selectedGame.score.replace(':', ' — ')}
                    </div>
                )}

                {selectedGame.status === 'postponed' && (
                    <div className="game-postponed-note">
                      Игра перенесена на неопределенную дату
                    </div>
                )}

                <button
                    onClick={() => setSelectedGame(null)}
                    className="game-modal-close"
                >
                  Закрыть
                </button>
              </div>
            </div>
        )}

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