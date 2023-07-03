import { CarProps } from "@/types";


export interface FilterProps {
  manufacturer?: string;
  model?: string;
  year?: string;
  fuel?: string;
  limit?: number;
  pageNumber?: number;
}

export async function fetchCars(filters: FilterProps) {
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${filters.manufacturer}&model=${filters.model}&year=${filters.year}&fuel_type=${filters.fuel}&limit=${filters.limit}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fbe7424d72mshb9422d26878f473p183444jsn9cfc8bbef004',
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return(result);
        
    } catch (error) {
        console.error(error);
    }
    
}

export function calculateCarRent(city_mpg: number, year: number) {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;

    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
}

export function updateSearchParams(type: string, value: string) {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value);

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

    return newPathName;
}