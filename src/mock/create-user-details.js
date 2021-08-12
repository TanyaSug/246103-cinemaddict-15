export const createUserDetails = (index) => ({
  watchlist: (index % 2) === 0,
  alreadyWatched: (index % 3) === 0,
  watchingDate: new Date().toISOString(),
  favorite: (index % 7) === 0,
});
// const a = [];
// const map = (cb) => {
//   const r = [];
//   for (let idx = 0; idx < a.length; ++idx) {
//     const v = a[idx];
//     const rv = cb(v, idx, a);
//     r[idx] = rv;
//   }
//   return r;
// }
// const callback = (v, idx) => v * idx;
// const result = map((v, idx) =>  v + idx);
// const result2 = map((v, idx) => callback(v, idx));
