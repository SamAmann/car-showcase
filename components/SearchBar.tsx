/** @format */

'use client';

import { useEffect, useState } from 'react';
import SearchManufacturer from './SearchManufacturer';
import Image from 'next/image';

function SearchButton({ otherClasses }: { otherClasses: string }) {
  return (
    <button
      title="Search"
      className={`-ml-3 z-10 ${otherClasses}`}
      type="submit"
    >
      <Image
        src="/magnifying-glass.svg"
        alt="magnifying-glass"
        width={40}
        height={40}
        className="object-contains"
      />
    </button>
  );
}

interface SearchBarProps {
  setManufacturer: (manufacturer: string) => void;
  setModel: (model: string) => void;
}

export default function SearchBar({
  setManufacturer,
  setModel,
}: SearchBarProps) {
  const [searchManufacturer, setSearchManufacturer] = useState('');
  const [searchModel, setSearchModel] = useState('');

  useEffect(() => {
    setModel(searchModel.toLowerCase());
    setManufacturer(searchManufacturer.toLowerCase());
  }, [searchManufacturer, searchModel]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchManufacturer === '' && searchModel === '') {
      return alert('Please enter a manufacturer or model');
    }

    setModel(searchModel.toLowerCase());
    setManufacturer(searchManufacturer.toLowerCase());
  }

  return (
    <form
      className="flex items-center justify-start max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl"
      onSubmit={handleSearch}
    >
      <div className="flex-1 max-sm:w-full flex justify-start items-center relative">
        <SearchManufacturer
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="flex-1 max-sm:w-full flex justify-start items-center relative">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder="Tiguan..."
          className="w-full h-[48px] pl-12 p-4 bg-light-white rounded-r-full max-sm:rounded-full outline-none cursor-pointer text-sm"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
}
