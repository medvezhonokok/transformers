import { useEffect, useState } from 'react';
import { supabase, Game } from '../lib/supabase';
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

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
      const gameDate = new Date(game.game_date);
      return (
        gameDate.getDate() === date.getDate() &&
        gameDate.getMonth() === date.getMonth() &&
        gameDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
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

  return (
    <div className="page-container">
      <div className="schedule-hero">
        <Calendar size={48} />
        <h1 className="page-title">Расписание игр</h1>
      </div>

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
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
              <div className="game-detail">
                <Clock size={18} />
                <span>{formatTime(selectedGame.game_date)}</span>
              </div>
              <div className="game-detail">
                <MapPin size={18} />
                <span>{selectedGame.location}</span>
              </div>
            </div>

            <div className={`game-status ${selectedGame.status}`}>
              {getStatusLabel(selectedGame.status)}
            </div>

            {selectedGame.score && (
              <div className="game-score">
                Счет: {selectedGame.score}
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
    </div>
  );
}