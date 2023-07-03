/** @format */

'use client';

import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface CustomButtonProps {
  title: string;
  containerStyles: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: 'button' | 'submit' | 'reset';
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export default function CustomButton({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
  isDisabled,
}: CustomButtonProps) {
  return (
    (isDisabled && (
      <button
        disabled={isDisabled}
        type={btnType || 'button'}
        className={`flex flex-row relative justify-center items-center py-3 px-6 outline-none ${containerStyles}`}
        onClick={handleClick}
      >
        <span className={`flex-1 ${textStyles}`}>{title}</span>
        {rightIcon && (
          <div className="relative w-6 h-6">
            <Image
              src={rightIcon}
              alt="right-icon"
              className="object-contain"
              fill
            />
          </div>
        )}
      </button>
    )) || (
      <button
        disabled={isDisabled}
        type={btnType || 'button'}
        className={`flex flex-row relative justify-center items-center py-3 px-6 outline-none ${containerStyles}`}
        onClick={handleClick}
      >
        <span className={`flex-1 ${textStyles}`}>{title}</span>
        {rightIcon && (
          <div className="relative w-6 h-6">
            <Image
              src={rightIcon}
              alt="right-icon"
              className="object-contain"
              fill
            />
          </div>
        )}
      </button>
    )
  );
}
