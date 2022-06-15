import { Request, Response } from 'express';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import TeamRanking from '../Interfaces/TeamRanking.interface';

function totalVictories(matches: Matches[]) {
  return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
}

function totalDraws(matches: Matches[]) {
  return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
}

function totalLosses(matches: Matches[]) {
  return matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
}

function goalsFavor(matches: Matches[]) {
  return matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
}

function goalsOwn(matches: Matches[]) {
  return matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
}

function totalPoints(matches: Matches[]) {
  return totalVictories(matches) * 3 + totalDraws(matches);
}

function mapMatches(team: Teams) {
  return {
    name: team.teamName,
    totalPoints: totalPoints(team.teamHome),
    totalGames: team.teamHome.length,
    totalVictories: totalVictories(team.teamHome),
    totalDraws: totalDraws(team.teamHome),
    totalLosses: totalLosses(team.teamHome),
    goalsFavor: goalsFavor(team.teamHome),
    goalsOwn: goalsOwn(team.teamHome),
    goalsBalance: goalsFavor(team.teamHome) - goalsOwn(team.teamHome),
    efficiency: +((totalPoints(team.teamHome) / (team.teamHome.length * 3)) * 100).toFixed(2),
  };
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function sortRanking(a: TeamRanking, b: TeamRanking) {
  if (a.totalPoints === b.totalPoints) {
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    return 0;
  }

  return b.totalPoints - a.totalPoints;
}

class LeaderboardController {
  public getAll = async (req: Request, res: Response) => {
    const teams = await Teams.findAll({
      include: [{
        model: Matches,
        as: 'teamHome',
        where: {
          inProgress: false,
        },
      }],
    });

    const rankingHome = teams
      .map((team) => (mapMatches(team)))
      .sort(sortRanking);

    return res.status(200).json(rankingHome);
  };
}

export default LeaderboardController;
