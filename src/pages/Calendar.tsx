import { useState, useEffect } from 'react'

function Calendar() { 
    const d = new Date()
    const [year, setYear] = useState<number>(d.getFullYear())
    const [month, setMonth] = useState<number>(d.getMonth())
    const [days, setDays] = useState<(number | string)[]>([])
    const [holidays, setHolidays] = useState<{ [key: string]: string }>({})
    const [monthlyHolidays, setMonthlyHolidays] = useState<string[]>([]) // Lista de feriados do mês

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 
        'Maio', 'Junho', 'Julho', 'Agosto', 
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]   

    const getDiasMes = (month: number, year: number) => {
        let daysArray: (number | string)[] = []
        const firstDayOfMonth = new Date(year, month, 1).getDay()
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate()

        for (let i = 0; i < firstDayOfMonth; i++) daysArray.push('')
        for (let i = 1; i <= totalDaysInMonth; i++) daysArray.push(i)

        setDays(daysArray)
    }

    useEffect(() => {
        getDiasMes(month, year)
    }, [month, year])

    useEffect(() => {
        fetch('./src/data/feriados_nacionais.json')
            .then((response) => response.json())
            .then((data) => {
                setHolidays(data)
            })
            .catch((error) => console.error("Erro ao carregar o JSON:", error))
    }, [])

    const isHoliday = (day: number) => {
        const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        return holidays[formattedDate]
    }

    const updateMonthlyHolidays = () => {
        const holidaysInMonth: string[] = []

        days.forEach(day => {
            if (typeof day === 'number') {
                const holidayName = isHoliday(day)
                if (holidayName) {
                    holidaysInMonth.push(`${day} - ${holidayName}`)
                }
            }
        })

        setMonthlyHolidays(holidaysInMonth)
    }

    useEffect(() => {
        updateMonthlyHolidays()
    }, [days, holidays])

    const renderCalendar = () => {
        return days.map((day, index) => {
            const holidayName = isHoliday(day as number)
            
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
            )
        })
    }

    const renderWeek = () => {
        const week = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.']
        return week.map((weekday, index) => (
            <span key={index}>{weekday}</span>
        ))
    }

    const handlePrevMonth = () => {
        if (month === 0) {
            setMonth(11)
            setYear(prevYear => prevYear - 1)
        } else {
            setMonth(prevMonth => prevMonth - 1)
        }
    }

    const handleNextMonth = () => {
        if (month === 11) {
            setMonth(0)
            setYear(prevYear => prevYear + 1)
        } else {
            setMonth(prevMonth => prevMonth + 1)
        }
    }

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
    )
}

export default Calendar