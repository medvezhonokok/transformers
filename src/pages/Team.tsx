import { useEffect, useState } from 'react';
import { supabase, Player } from '../lib/supabase';
import { Users } from 'lucide-react';

export default function Team() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayers();
  }, []);

  async function loadPlayers() {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('name');

      if (error) throw error;
      setPlayers(data || []);
    } catch (error) {
      console.error('Error loading players:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="team-hero">
        <Users size={48} className="team-icon" />
        <h1 className="page-title">Наша команда</h1>
        <p className="page-subtitle">
          Семь легенд, которые трансформируют игру
        </p>
      </div>

      <div className="players-grid">
        {players.map((player) => (
          <div
            key={player.id}
            className="player-card"
            style={{ '--player-color': player.color } as React.CSSProperties}
          >
            <div className="player-header">
              <div
                className="player-avatar"
                style={{ backgroundColor: player.color }}
              >
                {player.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            <div className="player-info">
              <h3 className="player-name">{player.name}</h3>
              <p className="player-position">{player.position}</p>

              <div className="player-stats">
                <div className="stat">
                  <span className="stat-label">Год</span>
                  <span className="stat-value">{player.birth_year}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Рост</span>
                  <span className="stat-value">{player.height} см</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Уровень</span>
                  <span className="stat-value">{player.skill_level}</span>
                </div>
              </div>

              <p className="player-story">{player.story}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}