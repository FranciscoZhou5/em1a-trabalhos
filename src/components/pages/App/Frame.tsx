import { useCallback } from "react";

export default function Frame() {
  const getClassSeries = useCallback(() => {
    const initialYear = 2012;
    const currentYear = new Date().getFullYear();

    const result = currentYear - initialYear;

    return result >= 10 ? result - 9 : result;
  }, []);

  return (
    <div className="w-full md:max-w-lg xl:max-w-5xl shadow-normal rounded-lg">
      <div className="relative w-full h-48 md:h-56 xl:h-80 bg-frame bg-cover bg-center border-gray100 rounded-lg">
        <div className="w-full h-full border-gray100 rounded-lg bg-[linear-gradient(-180deg,transparent,#000)] flex flex-col justify-end px-4 py-3 md:px-8 md:py-6">
          <h1>Ensino Médio {getClassSeries()}ª</h1>

          <p className="indent-1">
            <span className="text-base"> EM{getClassSeries()}A - Dohms Capão </span>
          </p>
        </div>
      </div>
    </div>
  );
}
