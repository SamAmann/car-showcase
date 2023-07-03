/** @format */

'use client';

import { calculateCarRent } from '@/utils';
import Image from 'next/image';
import CustomButton from './CustomButton';
import { useState } from 'react';
import CarDetails from './CarDetails';
import { CarProps } from '@/types';

interface CarCardProps {
  car: CarProps;
}

export default function CarCard({ car }: CarCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const carRent = calculateCarRent(car.city_mpg, car.year);
  return (
    <div className="flex flex-col p-6 justify-center items-start text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md rounded-3xl group">
      <div className="w-full flex justify-between items-start gap-2">
        <h2 className="text-[22px] leading-[26px] font-bold capitalize">
          {car.make} {car.model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px]">
        <span className="self-start text-[14px] font-semibold">€</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src="/hero.png"
          fill
          priority
          className="object-contain"
          alt="car model picture"
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray-500">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              alt="steering-wheel"
              width={20}
              height={20}
            />
            <p className="text-[14px]">
              {car.transmission === 'a' ? 'Automatic' : 'Manual'}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" alt="tire" width={20} height={20} />
            <p className="text-[14px]">{car.drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" alt="gas" width={20} height={20} />
            <p className="text-[14px]">{car.city_mpg} MPG</p>
          </div>
        </div>
        <div className="hidden group-hover:flex absolute bottom-0 w-full z-10">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white font-bold text-[14px] leading-[17px]
                      "
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
}
