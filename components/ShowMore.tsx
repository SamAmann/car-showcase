/** @format */

'use client';

import CustomButton from './CustomButton';

interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
  setLimit: (limit: number) => void;
}

export default function ShowMore({
  pageNumber = 1,
  isNext = false,
  setLimit,
}: ShowMoreProps) {
  function handleNavigation() {
    const newLimit = (pageNumber + 1) * 10;
    setLimit(newLimit);
  }

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
}
