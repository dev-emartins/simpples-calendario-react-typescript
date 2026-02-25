import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calendar: React.FC = () => { 
    const d = new Date();
    const [year, setYear] = useState<number>(d.getFullYear());
    const [month, setMonth] = useState<number>(d.getMonth());
    const [days, setDays] = useState<(number | string)[]>([]);
    const [holidays, setHolidays] = useState<{ [key: string]: string }>({});
    const [commemorative, setCommemorative] = useState<{ [key: string]: string }>({});
    const [monthlyHolidays, setMonthlyHolidays] = useState<string[]>([]);
    const [monthlyCommemoratives, setMonthlyCommemoratives] = useState<string[]>([]);

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

        const holy = {
            [`01/01/${year}`]: "Confraternização Universal",

            [formatDate(new Date(carnival.getTime() - 86400000))]: "Carnaval",
            [formatDate(carnival)]: "Carnaval",
            [formatDate(goodFriday)]: "Sexta-Feira Santa",
            [formatDate(corpusChristi)]: "Corpus Christi",

            [`21/04/${year}`]: "Tiradentes",
            [`01/05/${year}`]: "Dia do Trabalho",
            [`07/09/${year}`]: "Independência do Brasil",
            [`12/10/${year}`]: "Nossa Sr.ª Aparecida",
            [`02/11/${year}`]: "Finados",
            [`15/11/${year}`]: "Proclamação da República",
            [`20/11/${year}`]: "Consciência Negra",
            [`25/12/${year}`]: "Natal",

            // Estaduais/Municipais
            [`05/08/${year}`]: "Fundação da Paraíba",
            [`24/09/${year}`]: "N. Sra. da Guia - Patos",
            [`24/10/${year}`]: "Emancipação Política (Patos)",
            [`24/11/${year}`]: "Emancipação Política (Santa Luzia)",
            [`08/12/${year}`]: "N. Sra. da Conceição",
            [`13/12/${year}`]: "Santa Luzia"
        };

        setHolidays(holy);

        const celebrate = {
            [formatDate(new Date(carnival.getTime() + 86400000))]: "Cinzas",

            [`08/03/${year}`]: "Dia da Mulher",
            [`19/04/${year}`]: "Dia do Índio",
            [`22/04/${year}`]: "Descobrimento do Brasil",
            [`10/05/${year}`]: "Dia das Mães",
            [`13/05/${year}`]: "Dia da Abolição da Escravatura",
            [`05/06/${year}`]: "Dia Mundial do Meio Ambiente",
            [`12/06/${year}`]: "Dia dos Namorados",
            [`24/06/${year}`]: "São João",
            [`29/06/${year}`]: "São Pedro",
            [`20/07/${year}`]: "Dia do Amigo",
            [`10/08/${year}`]: "Dia dos Pais",
            [`15/10/${year}`]: "Dia do Professor",
            [`28/10/${year}`]: "Dia do Servidor Público"
        };
        setCommemorative(celebrate);
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

    const isCelebrate = (day: number) => {
        const formattedDate = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
        return commemorative[formattedDate];
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

    const updateMonthlyCommemoratives = () => {
        const celebrateInMonth: string[] = [];

        days.forEach(day => {
            if (typeof day === 'number') {
                const celebrateName = isCelebrate(day);
                if (celebrateName) {
                    celebrateInMonth.push(`${day} - ${celebrateName}`);
                }
            }
        });

        setMonthlyCommemoratives(celebrateInMonth);
    };

    

    useEffect(() => {
        updateMonthlyHolidays();
        updateMonthlyCommemoratives();
    }, [days, holidays, commemorative]);

    const renderCalendar = () => {
        return days.map((day, index) => {
            const holidayName = isHoliday(day as number);
            const celebrateName = isCelebrate(day as number);
            
            return (
                <div 
                    key={index}                    
                    className={`grid place-items-center
                        w-10 h-10 min-w-10 min-h-10 cursor-pointer
                        text-sm font-medium rounded-full transition-colors
                        ${day === d.getDate() 
                            && month === d.getMonth() 
                            && year === d.getFullYear() 
                            ? 'bg-activeday text-primary-text font-bold'
                            : holidayName
                                ? 'text-holyday'
                                : celebrateName ? 'text-celebrate' : 'text-primary-text hover:text-accent'
                        }`}
                >
                    {day}               
                </div>                
            );
        });
    };

    const renderWeek = () => {
        const week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
        return week.map((weekday, index) => (
            <span key={ index } className="px-1.75 py-2.5 text-xs font-bold text-primary-text select-none">
                { weekday }
            </span>
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
       <div className="bg-secondary-bg max-w-82.5 w-fit px-5 pb-5 pt-2.5 text-center rounded-lg">

            {/* Cabeçalho do mês */}
            <div className="flex items-center justify-between p-1 text-md font-semibold">
                <span 
                onClick={ handlePrevMonth }
                className="px-2 py-2 text-sm cursor-pointer text-primary-text hover:text-accent transition-colors">
                    <FaChevronLeft />
                </span>                
                <h2 className="py-2 text-primary-text font-bold">{`${ months[month] } de ${ year }`}</h2>
                <span 
                onClick={ handleNextMonth }
                className="px-2 py-2 text-sm cursor-pointer text-primary-text hover:text-accent transition-colors">
                    <FaChevronRight />
                </span>                
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-1 py-1.5 border-b border-secondary-text/30">
                {renderWeek()}
            </div>

            {/* Grade de dias */}
            <div className="grid grid-cols-7 gap-1 py-2">
                {renderCalendar()}
            </div>

            {(monthlyHolidays.length > 0 || monthlyCommemoratives.length > 0) && (
                <div className="mt-2 border-t border-secondary-text/30 pt-2 px-1 w-full space-y-1">

                    {/* Feriados */}
                    {monthlyHolidays.map((holiday, index) => (
                    <span
                        key={`holiday-${index}`}
                        className="block w-full text-left text-xs font-medium leading-tight text-primary-text
                        before:content-['\2726'] before:text-sm before:mr-1.5 before:text-holyday"
                    >
                        {holiday}
                    </span>
                    ))}

                    {/* Datas Comemorativas */}
                    {monthlyCommemoratives.map((date, index) => (
                    <span
                        key={`commemorative-${index}`}
                        className="block w-full text-left text-xs font-medium leading-tight text-primary-text
                        before:content-['\263C'] before:text-sm before:mr-1.5 before:text-celebrate"
                    >
                        {date}
                    </span>
                    ))}
                </div>
            )}
        </div>        
    );
}

export default Calendar;