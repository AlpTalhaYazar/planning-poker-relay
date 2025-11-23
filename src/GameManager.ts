import { Server } from 'socket.io';

interface Bug {
  id: number;
  x: number;
  y: number;
  type: 'bug' | 'feature';
  createdAt: number;
}

interface GameState {
  sessionId: string;
  bugs: Bug[];
  scores: Record<string, number>;
  timeLeft: number;
  isActive: boolean;
  timerInterval?: NodeJS.Timeout;
  spawnerInterval?: NodeJS.Timeout;
}

export class GameManager {
  private games: Map<string, GameState> = new Map();
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  startGame(sessionId: string) {
    if (this.games.has(sessionId)) {
      this.stopGame(sessionId);
    }

    const gameState: GameState = {
      sessionId,
      bugs: [],
      scores: {},
      timeLeft: 30,
      isActive: true,
    };

    this.games.set(sessionId, gameState);
    this.broadcastState(sessionId);

    // Timer
    gameState.timerInterval = setInterval(() => {
      const game = this.games.get(sessionId);
      if (!game) return;

      game.timeLeft -= 1;
      if (game.timeLeft <= 0) {
        this.stopGame(sessionId);
      } else {
        // Optional: Broadcast time sync occasionally or rely on client timer
      }
    }, 1000);

    // Spawner
    gameState.spawnerInterval = setInterval(() => {
      this.spawnBug(sessionId);
    }, 600);
  }

  stopGame(sessionId: string) {
    const game = this.games.get(sessionId);
    if (!game) return;

    if (game.timerInterval) clearInterval(game.timerInterval);
    if (game.spawnerInterval) clearInterval(game.spawnerInterval);

    game.isActive = false;
    game.timeLeft = 0;
    this.broadcastState(sessionId);
    
    // Cleanup after some time
    setTimeout(() => {
      this.games.delete(sessionId);
    }, 60000);
  }

  spawnBug(sessionId: string) {
    const game = this.games.get(sessionId);
    if (!game || !game.isActive) return;

    // Assume 800x600 virtual canvas for consistency
    const x = Math.random() * 760;
    const y = Math.random() * 360;
    const isFeature = Math.random() > 0.8;

    const bug: Bug = {
      id: Date.now() + Math.random(),
      x,
      y,
      type: isFeature ? 'feature' : 'bug',
      createdAt: Date.now(),
    };

    game.bugs.push(bug);

    this.io.to(sessionId).emit('game.spawn', {
      event: 'game.spawn',
      sessionId,
      payload: { bug },
    });
  }

  handleSmash(sessionId: string, bugId: number, userId: string) {
    const game = this.games.get(sessionId);
    if (!game || !game.isActive) return;

    const bugIndex = game.bugs.findIndex(b => b.id === bugId);
    if (bugIndex === -1) return; // Already smashed or invalid

    const bug = game.bugs[bugIndex];
    game.bugs.splice(bugIndex, 1);

    const currentScore = game.scores[userId] || 0;
    const points = bug.type === 'feature' ? -5 : 1;
    const newScore = Math.max(0, currentScore + points);
    game.scores[userId] = newScore;

    this.io.to(sessionId).emit('game.smashed', {
      event: 'game.smashed',
      sessionId,
      payload: {
        bugId,
        actorId: userId,
        newScore,
      },
    });
  }

  getState(sessionId: string) {
    return this.games.get(sessionId);
  }

  private broadcastState(sessionId: string) {
    const game = this.games.get(sessionId);
    if (!game) return;

    this.io.to(sessionId).emit('game.state', {
      event: 'game.state',
      sessionId,
      payload: {
        bugs: game.bugs,
        scores: game.scores,
        timeLeft: game.timeLeft,
      },
    });
  }
}
