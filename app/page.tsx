/** @format */

// This is CSR (Client Side Rendering) code, as SSR is not working as of Next.js 13.4

'use client';

import { CustomContainer, Hero, SearchBar, ShowMore } from '@/components';
import CarCard from '@/components/CarCard';
import { fuels, yearsOfProduction } from '@/constants';
import { FilterProps, fetchCars } from '@/utils';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

interface HomeProps {
  searchParams: FilterProps;
}

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // search states
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  // filter states
  const [year, setYear] = useState('2022');
  const [fuel, setFuel] = useState('');

  // pagination states
  const [limit, setLimit] = useState(10);

  function getCars() {
    setLoading(true);
    fetchCars({
      manufacturer: manufacturer || '',
      model: model || '',
      year: year || '2022',
      fuel: fuel || '',
      limit: limit || 8,
    })
      .then((res) => {
        setAllCars(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log('err', err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getCars();

    return () => {};
  }, [manufacturer, model, year, fuel, limit]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div
        className="mt-12 sm:px-16 px-6 py-4 max-w-[1440px] mx-auto"
        id="discover"
      >
        <div className="flex flex-col items-start justify-start gap-y-2.5 text-black-100">
          <h1 className="text-4xl font-extrabold">Car Catalog</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="mt-12 w-full flex-between items-center flex-wrap gap-5">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="flex justify-start flex-wrap items-center gap-2">
            <CustomContainer title="fuel" options={fuels} setFilter={setFuel} />
            <CustomContainer
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            {loading && (
              <div className="mt-16 flex justify-center items-center flex-col gap-2">
                <h2 className="text-black text-xl font-bold"> Loading... </h2>
                <Loader />
              </div>
            )}
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="mt-16 flex justify-center items-center flex-col gap-2">
            <h2 className="text-black text-xl font-bold"> Oops, no results </h2>
          </div>
        )}
      </div>
    </main>
  );
}
