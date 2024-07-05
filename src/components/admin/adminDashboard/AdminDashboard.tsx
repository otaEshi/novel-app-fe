import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUserPerTime, getViewPerGenre, getViewPerTag } from './dashboardApi';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define types for the chart data and options
interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
    }[];
}

interface ChartOptions {
    responsive: boolean;
    plugins: {
        legend: {
            position: 'top';
        };
        title: {
            display: boolean;
            text: string;
        };
    };
}

function AdminDashboard() {
    const dispatch = useAppDispatch();

    const viewPerGenreData = useAppSelector((state) => state.dashboard.viewPerGenre);
    const viewPerTagData = useAppSelector((state) => state.dashboard.viewPerTag);
    const userPerTimeData = useAppSelector((state) => state.dashboard.userPerTime);

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [accountType, setAccountType] = useState<'new' | 'total'>('new');

    useEffect(() => {
        dispatch(getUserPerTime({ year: String(selectedYear), isNewAccount: accountType === 'new' }));
    }, [selectedYear, accountType, dispatch]);

    useEffect(() => {
        dispatch(getViewPerGenre());
        dispatch(getViewPerTag());
    }, [])

    const accountData: ChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: userPerTimeData.isNewAccount ? 'New Accounts' : 'Total Accounts',
                data: userPerTimeData.userPerTime.userCount,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const accountOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'New Accounts Per Month',
            },
        },
    };

    // Data and options for View per genre
    const genreData: ChartData = {
        labels: (viewPerGenreData && viewPerGenreData.length > 0) ? viewPerGenreData.map(data => data.genre) : [],
        datasets: [
            {
                label: 'Views',
                data: viewPerGenreData && viewPerGenreData.map(data => data.viewCount),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const genreOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Views Per Genre',
            },
        },
    };

    // Data and options for View per tags
    const tagData: ChartData = {
        labels: (viewPerTagData && viewPerTagData.length > 0) ? viewPerTagData.map(data => data.tag) : [],
        datasets: [
            {
                label: 'Views',
                data: viewPerTagData && viewPerTagData.map(data => data.viewCount),
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    };

    const tagOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Views Per Tag',
            },
        },
    };

    return (
        <div className="container mt-4">
            <h2>Admin Dashboard</h2>


            <div className="mt-4">
                <h3>Account per month</h3>
                <div className="mt-4">
                    <div className='d-flex'>
                        <b className='me-2'>Select year: </b>
                        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="me-4 mt-1">
                        <b className='me-2'>Type: </b>
                        <select value={accountType} onChange={(e) => setAccountType(e.target.value as 'new' | 'total')}>
                            <option value="new">New accounts</option>
                            <option value="total">Total accounts</option>
                        </select>
                    </div>
                </div>
                <Bar data={accountData} options={accountOptions} />
            </div>

            <div className="mt-4">
                <h3>View per genre</h3>
                <Bar data={genreData} options={genreOptions} />
            </div>

            <div className="mt-4">
                <h3>View per tags</h3>
                <Bar data={tagData} options={tagOptions} />
            </div>
        </div>
    );
};

export default AdminDashboard;