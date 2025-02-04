import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
        const calculateEaster = (year: number) => {
            const a = year % 19;
            const b = Math.floor(year / 100);
            const c = year % 100;
            const d = Math.floor(b / 4);
            const e = b % 4;
            const f = Math.floor((b + 8) / 25);
            const g = Math.floor((b - f + 1) / 3);
            const h = (19 * a + b - d - g + 15) % 30;
            const i = Math.floor(c / 4);
            const k = c % 4;
            const l = (32 + 2 * e + 2 * i - h - k) % 7;
            const m = Math.floor((a + 11 * h + 22 * l) / 451);
            const month = Math.floor((h + l - 7 * m + 114) / 31);
            const day = ((h + l - 7 * m + 114) % 31) + 1;
            return new Date(year, month - 1, day);
        };

        const easter = calculateEaster(year);

        const carnival = new Date(easter);
        carnival.setDate(easter.getDate() - 47);

        const goodFriday = new Date(easter);
        goodFriday.setDate(easter.getDate() - 2);

        const corpusChristi = new Date(easter);
        corpusChristi.setDate(easter.getDate() + 60);

        const feriados = {
            [`01/01/${year}`]: "Confraternização Universal",            
            [formatDate(new Date(carnival.getTime() - 86400000))]: "Facultativo",
            [formatDate(carnival)]: "Carnaval",
            [formatDate(new Date(carnival.getTime() + 86400000))]: "Facultativo",
            [`08/03/${year}`]: "Dia da Mulher",
            [formatDate(goodFriday)]: "Sexta-Feira Santa",
            [`21/04/${year}`]: "Tiradentes",
            [`01/05/${year}`]: "Dia do Trabalho",
            [formatDate(corpusChristi)]: "Corpus Christi",
            [`24/06/${year}`]: "São João",
            [`05/08/${year}`]: "Fundação do Estado da Paraíba",
            [`11/08/${year}`]: "Dia dos Pais",
            [`07/09/${year}`]: "Independência do Brasil",
            [`24/09/${year}`]: "Patos - Padroeira",
            [`12/10/${year}`]: "Nossa Sr.ª Aparecida",
            [`15/10/${year}`]: "Dia do Professor",
            [`24/10/${year}`]: "Emancipação Política (Patos)",
            [`28/10/${year}`]: "Dia do Servidor Público",
            [`02/11/${year}`]: "Finados",
            [`15/11/${year}`]: "Proclamação da República",
            [`20/11/${year}`]: "Consciência Negra",
            [`24/11/${year}`]: "Emancipação Política (Santa Luzia)",
            [`08/12/${year}`]: "N. Sra. da Conceição",
            [`13/12/${year}`]: "Santa Luzia",
            [`25/12/${year}`]: "Natal"
        };

        setHolidays(feriados);
    }, [year]);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

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
                <FaChevronLeft onClick={handlePrevMonth} className="icon" /> 
                <h2>{`${months[month]} de ${year}`}</h2>
                <FaChevronRight onClick={handleNextMonth} className="icon" />
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