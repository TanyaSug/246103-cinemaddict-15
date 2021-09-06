const countByFieldName = (data, name)=>{
  if(!Array.isArray(data)){
    return 0;
  }
  return data.reduce((accumulator, element)=>{
    accumulator += element.userDetails && element.userDetails[name]?1:0;
    return accumulator;
  },0);
};

export const createSiteMenuMock = (data) => ({
  watchlistCount: countByFieldName(data,'watchlist'),//getRandomInteger(1, 20),
  historyCount: countByFieldName(data,'alreadyWatched'),//getRandomInteger(1, 10),
  favoritesCount: countByFieldName(data,'favorite'),//getRandomInteger(1, 15),
});

