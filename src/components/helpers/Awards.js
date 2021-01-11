export const awardTypes = num => {
  // ['Award_DreamTeam', 'Award_MVP', 'Award_MaxScorer', 'Award_MaxGoalKeeper']
  switch (num) {
    case 0:
      return 'Award_DreamTeam';
    case 1:
      return 'Award_MVP';
    case 2:
      return 'Award_MaxScorer';
    case 10:
      return 'AwardType10'; // Top Scorers Ranking
    case 20:
      return 'AwardType20'; // Top Goalkeepers Ranking
    case 30:
      return 'AwardType30'; // Top Assistances Ranking
    case 40:
      return 'AwardType40'; // Top MVPs Ranking
    case 50:
      return 'AwardType50'; // Best Fair Play
    default:
      return '';
  }
};
