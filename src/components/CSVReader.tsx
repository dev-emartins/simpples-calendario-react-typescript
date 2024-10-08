import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const CSVReader: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);  

    const filterByDateRange = (data: any[], startDate: string, endDate: string) => {
        const filtered = data.filter((row: any) => {
            const rowDate = row["Data"];
            return rowDate >= startDate && rowDate <= endDate;
        });
        return filtered;
    };
    
    const loadCSV = () => {
        Papa.parse('', {
            download: true,
            header: true,
            complete: (result) => {
                const parsedData = result.data;
                setData(parsedData);
                
                const startDate = '01/01/2024';
                const endDate = '31/12/2024';

                const filtered = filterByDateRange(data, startDate, endDate);
                setFilteredData(filtered);
            }
        });
    };

    useEffect(() => {
        loadCSV(); 
    }, []);

    return (
        <div>
            <h2>Dados Filtrados</h2>
            <ul>
                {filteredData.map((row, index) => (
                    <li key={index}>
                        {row["Data"]}: {JSON.stringify(row)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CSVReader;