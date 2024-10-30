import React, { useState, useEffect } from 'react';

const Calendar: React.FC = () => { 
    const d = new Date();
    const [year, setYear] = useState<number>(d.getFullYear());
    const [month, setMonth] = useState<number>(d.getMonth());
    const [days, setDays] = useState<(number | string)[]>([]);
    const [holidays, setHolidays] = useState<{ [key: string]: string }>({});
    const [monthlyHolidays, setMonthlyHolidays] = useState<string[]>([]);

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 
        'Maio', 'Junho', 'Julho', 'Agosto', 
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];   

    const getDiasMes = (month: number, year: number) => {
        let daysArray: (number | string)[] = [];
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) daysArray.push('');
        for (let i = 1; i <= totalDaysInMonth; i++) daysArray.push(i);

        setDays(daysArray);
    };

    useEffect(() => {
        getDiasMes(month, year);
    }, [month, year]);

    useEffect(() => {  
        const feriados = {
            [`01/01/${year}`]: "Ano Novo e Confraternização Universal",
            [`12/02/${year}`]: "Facultativo - Carnaval",
            [`13/02/${year}`]: "Facultativo - Carnaval",
            [`14/02/${year}`]: "Facultativo - Quarta-feira de Cinzas",
            [`29/03/${year}`]: "Sexta-Feira Santa - Paixão de Cristo",
            [`21/04/${year}`]: "Tiradentes",
            [`01/05/${year}`]: "Dia do Trabalho",
            [`30/05/${year}`]: "Corpus Christi",
            [`24/06/${year}`]: "São João",
            [`05/08/${year}`]: "Fundação do Estado da Paraíba",
            [`11/08/${year}`]: "Dia dos Pais",
            [`07/09/${year}`]: "Independência do Brasil",
            [`24/09/${year}`]: "Patos - Padroeira",
            [`12/10/${year}`]: "Nossa Sr.ª Aparecida - Padroeira do Brasil",
            [`15/10/${year}`]: "Dia do Professor",
            [`24/10/${year}`]: "Patos - Emancipação Política",
            [`28/10/${year}`]: "Dia do Servidor Público",
            [`02/11/${year}`]: "Finados",
            [`15/11/${year}`]: "Proclamação da República",
            [`20/11/${year}`]: "Consciência Negra",
            [`24/11/${year}`]: "Santa Luzia - Emancipação Política",
            [`08/12/${year}`]: "N. Sra. da Conceição",
            [`13/12/${year}`]: "Santa Luzia - Padroeira",
            [`25/12/${year}`]: "Natal"
        };
        setHolidays(feriados);
    }, [year]);

    const isHoliday = (day: number) => {
        const formattedDate = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
        return holidays[formattedDate];
    };

    const updateMonthlyHolidays = () => {
        const holidaysInMonth: string[] = [];

        days.forEach(day => {
            if (typeof day === 'number') {
                const holidayName = isHoliday(day);
                if (holidayName) {
                    holidaysInMonth.push(`${day} - ${holidayName}`);
                }
            }
        });

        setMonthlyHolidays(holidaysInMonth);
    };

    useEffect(() => {
        updateMonthlyHolidays();
    }, [days, holidays]);

    const renderCalendar = () => {
        return days.map((day, index) => {
            const holidayName = isHoliday(day as number);
            
            return (
                <div 
                    key={index}
                    className={`day 
                        ${day === d.getDate() 
                            && month === d.getMonth() 
                            && year === d.getFullYear() 
                            ? 'current' : ''
                        } ${holidayName ? 'holiday' : ''}`}
                >
                    {day}               
                </div>                
            );
        });
    };

    const renderWeek = () => {
        const week = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'];
        return week.map((weekday, index) => (
            <span key={index}>{weekday}</span>
        ));
    };

    const handlePrevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(prevYear => prevYear - 1);
        } else {
            setMonth(prevMonth => prevMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(prevYear => prevYear + 1);
        } else {
            setMonth(prevMonth => prevMonth + 1);
        }
    };

    return (
        <div className="calendar">
            <div className="month">                
                <i onClick={handlePrevMonth} className="fa-solid fa-chevron-left"></i>
                <h2>{`${months[month]} de ${year}`}</h2>
                <i onClick={handleNextMonth} className="fa-solid fa-chevron-right"></i>
            </div>
            <div className="week">
                {renderWeek()}
            </div>
            <div className="days">
                {renderCalendar()}
            </div>
            {monthlyHolidays.length > 0 && (
                <div className="monthly-holidays">       
                    {monthlyHolidays.map((holiday, index) => (
                    <span key={index}>{holiday}</span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Calendar;