export interface Player {
  id: string;
  name: string;
  birth_year: number;
  height: number;
  skill_level: string;
  position: string;
  story: string;
  color: string;
  created_at: string;
}

export interface Game {
  id: string;
  home_team: string;
  away_team: string;
  game_date: string;
  location: string;
  score: string | null;
  status: 'scheduled' | 'postponed' | 'completed';
  created_at: string;
}


const MOCK_PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Бураков Георгий Евгеньевич',
    birth_year: 2008,
    height: 176,
    skill_level: 'любитель',
    position: 'Доигровщик',
    story: 'Начал играть в волейбол с 3 месяцев, когда случайно отбил погремушку головой. Умеет кидать мяч вверх настолько высоко, что тот возвращается только на следующий день.',
    color: '#FF6B6B',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Васильев Игорь Дмитриевич',
    birth_year: 2007,
    height: 187,
    skill_level: 'любитель',
    position: 'Центральный блокирующий',
    story: 'Его блок настолько мощный, что закрывает не только мяч, но и обзор на все грешные мысли соперника. В раздевалке ходят слухи, что его главный аргумент тяжелее гантели, которой он не пользуется — и так хорош.',
    color: '#4ECDC4',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Волков Владимир Григорьевич',
    birth_year: 2003,
    height: 180,
    skill_level: 'любитель',
    position: 'Диагональный',
    story: 'Играет по диагонали, думает по диагонали, даже пись стоит по диагонали. Пьёт только светлое, потому что тёмное делает его слишком задумчивым. Его девиз: "Подача должна быть неожиданной, как утренний звонок бывшей".',
    color: '#45B7D1',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Воронцов Максим Михайлович',
    birth_year: 2006,
    height: 185,
    skill_level: 'любитель',
    position: 'Доигровщик',
    story: 'Однажды сыграл целый тайм левой рукой, потому что правой держал пиво, и всё равно забил решающий мяч. В раздевалке известен тем, что его инструмент настолько фотогеничен, что сам просится на обложку мужского журнала.',
    color: '#96CEB4',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Иванов Анатолий Павлович',
    birth_year: 2003,
    height: 190,
    skill_level: 'любитель',
    position: 'Связующий',
    story: 'Связывает игру, связывает людей, связывает пиво с закуской — настоящий MVP. Его передачи точны, как взгляд опытной женщины. Поговаривают, что его главный актив всегда в тонусе, потому что Анатолий постоянно держит ситуацию в своих руках.',
    color: '#FFEEAD',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Ким Михаил Дмитриевич',
    birth_year: 2003,
    height: 178,
    skill_level: 'любитель',
    position: 'Доигровщик',
    story: 'Прыгает так высоко, что его достоинство касается сетки раньше, чем руки. В раздевалке его уважают не только за игру: Миша — единственный, кто может открыть пиво своим главным аргументом, не пролив ни капли. Говорят, именно за это его и взяли в команду.',
    color: '#D4A5A5',
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Меньшиков Дмитрий Евгеньевич',
    birth_year: 2009,
    height: 191,
    skill_level: 'любитель',
    position: 'Центральный блокирующий',
    story: 'Его рост интересует девушек меньше, чем то, что находится ниже пояса. А находится там инструмент, которым можно не только гвозди забивать. Имеет член длиной с предплечье, на подаче использует его как дополнительный рычаг. Судьи до сих пор не решили, разрешено ли такое правилами.',
    color: '#9B59B6',
    created_at: new Date().toISOString()
  }
];

const MOCK_GAMES: Game[] = [
  {
    id: '1',
    home_team: 'Трансформеры',
    away_team: 'Горбатая гора',
    game_date: '2026-02-08T11:00:00',
    location: 'Кирочная 8Б',
    score: '3:1',
    status: 'completed',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    home_team: 'VOLLEYART 4',
    away_team: 'Трансформеры',
    game_date: null,
    location: '',
    score: null,
    status: 'postponed',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    home_team: 'Трансформеры',
    away_team: 'ВК ПРЕЗИДЕНТ КОНСАЛТ 2',
    game_date: '2026-02-22T11:00:00',
    location: 'Кирочная 8Б',
    score: null,
    status: 'scheduled',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    home_team: 'VC SAMURAIS 2',
    away_team: 'Трансформеры',
    game_date: '2026-02-25T20:55:00',
    location: 'Приморский проспект, 50б',
    score: null,
    status: 'scheduled',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    home_team: 'Трансформеры',
    away_team: 'AllMaze',
    game_date: '2026-03-15T11:00:00',
    location: 'Кирочная 8Б',
    score: null,
    status: 'scheduled',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    home_team: 'Трансформеры',
    away_team: 'Мoлния',
    game_date: '2026-03-22T11:00:00',
    location: 'Кирочная 8Б',
    score: null,
    status: 'scheduled',
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    home_team: 'Ultima',
    away_team: 'Трансформеры',
    game_date: '2026-03-29T16:40:00',
    location: 'Миргородская ул. 24-28',
    score: null,
    status: 'scheduled',
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    home_team: 'Кронштейн',
    away_team: 'Трансформеры',
    game_date: '2026-04-02T21:00:00',
    location: 'м. Академическая 15 мин. пешком',
    score: null,
    status: 'scheduled',
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    home_team: 'Трансформеры',
    away_team: 'Фомальгуат',
    game_date: '2026-04-12T11:00:00',
    location: 'Кирочная 8Б',
    score: null,
    status: 'scheduled',
    created_at: new Date().toISOString()
  }
];

export const supabase = {
  from: (table: string) => ({
    select: (fields: string) => ({
      order: (column: string, options?: { ascending?: boolean }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (table === 'players') {
              resolve({
                data: [...MOCK_PLAYERS].sort((a, b) =>
                    options?.ascending !== false
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name)
                ),
                error: null
              });
            } else if (table === 'schedule') {
              resolve({
                data: [...MOCK_GAMES].sort((a, b) => {
                  if (!a.game_date) return 1;
                  if (!b.game_date) return -1;
                  return options?.ascending !== false
                      ? new Date(a.game_date).getTime() - new Date(b.game_date).getTime()
                      : new Date(b.game_date).getTime() - new Date(a.game_date).getTime();
                }),
                error: null
              });
            }
            resolve({ data: [], error: null });
          }, 100);
        });
      }
    })
  })
};

export const mockData = {
  players: MOCK_PLAYERS,
  games: MOCK_GAMES
};