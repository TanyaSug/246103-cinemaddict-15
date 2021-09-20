import dayjs from 'dayjs';

const addLeadZero = (value) => value < 10 ? `0${value}` : String(value);
const getRuntimeHours = (runtime) => Math.floor(dayjs.duration(runtime, 'm').asHours());
const getRuntimeMinutes = (runtime) => dayjs.duration(runtime, 'm').minutes();
export const getRuntime = (runtime) => {
  const hours = getRuntimeHours(runtime);
  const minutes = getRuntimeMinutes(runtime);

  return `${hours ? `${hours  }h` : ''} ${`${addLeadZero(minutes)  }m`}`;
};
