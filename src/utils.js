// const USER_STATUSES {
//   0 — звание не отображается;
// от 1 до 10 — novice;
// от 11 до 20 — fan;
// от 21 и выше — movie buff;
// }

export const getUserStatus = (numMovies) => {
  if (numMovies > 0) {
    if (numMovies <= 10) {
      return `novice`;
    } else if (numMovies <= 20) {
      return `fan`;
    } else {
      return `movie buff`;
    }
  }
  return ``;
};
