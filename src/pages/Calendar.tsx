import React, { useState, useEffect } from 'react';
import '../styles/Calendar.css';

const Calendar: React.FC = () => {
    const d = new Date();
    const [year, setYear] = useState<number>(d.getFullYear());
    const [month, setMonth] = useState<number>(d.getMonth());
    const [days, setDays] = useState<(number | string)[]>([]);    
    
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

    const renderCalendar = () => {
        return days.map((day, index) => (
        <span 
            key={index}
            className={`day 
                ${day === d.getDate() 
                    && month === d.getMonth() 
                    && year === d.getFullYear() 
                    ? 'current' : ''
                }`
            }
        >{day}</span>
        ));
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
        </div>
    );
};

export default Calendar;
