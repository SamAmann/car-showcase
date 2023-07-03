/** @format */

'use client';
import { useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import Image from 'next/image';
import React from 'react';

import { manufacturers } from '@/constants';

interface SearchManufacturerProps {
  selected: string;
  setSelected: (manufacturer: string) => void;
}

export default function SearchManufacturer({
  selected,
  setSelected,
}: SearchManufacturerProps) {
  const [query, setQuery] = useState('');
  const [filteredManufacturers, setFilteredManufacturers] =
    useState(manufacturers);

  useEffect(() => {
    // Filter the manufacturers based on the query
    const filtered =
      query === ''
        ? manufacturers
        : manufacturers.filter((item) =>
            item
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
          );

    // Set the filtered manufacturers
    setFilteredManufacturers(filtered);
  }, [query]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
  }

  return (
    <div className="flex-1 max-sm:w-full flex justify-start items-center">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              alt="Car Logo"
              width={20}
              height={20}
              className="ml-4"
            />
          </Combobox.Button>
          <Combobox.Input
            className="w-full h-[48px] pl-12 p-4 rounded-l-full max-sm:rounded-full bg-light-white outline-none cursor-pointer text-sm"
            placeholder="Volkswagen"
            displayValue={(manufacturers: string) => manufacturers}
            onChange={handleChange}
          />
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options>
              {filteredManufacturers.length === 0 && query !== '' ? (
                <Combobox.Option
                  value={query}
                  className="cursor-default select-none py-2 pl-10 pr-4"
                >
                  Nothing found
                </Combobox.Option>
              ) : (
                filteredManufacturers.map((manufacturer) => (
                  <Combobox.Option
                    key={manufacturer}
                    value={manufacturer}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-primary-blue text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {manufacturer}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? 'text-white'
                                : 'text-primary-blue bg-primary-blue'
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
