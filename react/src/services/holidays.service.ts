import { HOLIDAYS_BASE_URL, HOLIDAYS_LOCAL_URL } from '../constants/endpoints';

import { Holiday } from '../store/@types';
import { Week } from '../lib/weekHelper';
import getParsedResponseFrom from '../lib/getResponseFrom';

const getPublicHolidaysURL = (
  year: number,
  countryCode: string = 'LT',
): URL => {
  return new URL(
    `/api/v3/PublicHolidays/${year}/${countryCode}`,
    HOLIDAYS_BASE_URL,
  );
};

const getPublicHolidays = async (
  year: number,
): Promise<Holiday[] | undefined> => {
  try {
    const response = await fetch(
      getPublicHolidaysURL<Holiday[] | undefined>(year, 'LT'),
    );

    if (response.ok) return await response.json();
  } catch (error) {
    console.error('Error:', error);
    console.table({ error });

    throw error;
  }
};

export const getLocalHolidays = async (
  week: Week,
): Promise<Holiday[] | undefined> => {
  let callouts = 0;

  const year = week[6].getFullYear();

  const getJSONServerResponse = async (attempt: number) => {
    if (attempt === 2) return;
    const url = new URL(`?date_like=^${year}`, HOLIDAYS_LOCAL_URL);
    const indexedYearHolidays = await getParsedResponseFrom<Holiday[]>(
      url.toString(),
      {},
    );

    return indexedYearHolidays;
  };

  const localData = await getJSONServerResponse(callouts);

  callouts++;

  if (localData?.length) return localData;

  const saveResult: Promise<Holiday>[] = await insertHolidaysRowByRowFrom(year);
  const resolvedHolidays = await Promise.all(saveResult);

  return resolvedHolidays;
};

const insertHolidaysRowByRowFrom = async (year: number) => {
  const saveResult: Array<Promise<Holiday>> = [];
  (await getPublicHolidays(year))?.forEach((record: Holiday) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    };

    saveResult.push(
      getParsedResponseFrom<Holiday>(HOLIDAYS_LOCAL_URL, options),
    );
  });

  return saveResult;
};
