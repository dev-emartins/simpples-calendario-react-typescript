import React, { useEffect, useState } from "react";

const JSONReader: React.FC = () => {
  const [holidays, setHolidays] = useState<any[]>([]);

  const d = new Date();;
  const year = d.getFullYear().toString();

  const extractYear = (dateStr: string) => {
    return dateStr.split('/')[2];
  };

  useEffect(() => {
    fetch('./src/data/feriados_nacionais.json')
      .then((response) => response.json())
      .then((data) => {        
        const filteredHolidays = data.filter((holiday: any) => extractYear(holiday.Date) === year);
        setHolidays(filteredHolidays);
      })
      .catch((error) => console.error("Erro ao carregar o JSON:", error));
  }, []);

  return (
    <div>
      <h1>Feriados de {year}</h1>
      {holidays.map((holiday, index) => (
        <div key={index}>
          <strong>Data:</strong> {holiday.Date},{" "}
          <strong>Dia da semana:</strong> {holiday.Weekday},{" "}
          <strong>Feriado:</strong> {holiday.Hollyday}
        </div>
      ))}
    </div>
  );
};

export default JSONReader;
