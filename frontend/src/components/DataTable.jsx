import React from 'react';
import './DataTable.css';
import { useEffect, useState } from 'react';
import Table from './Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function DataTable() {

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/apis/db-view/', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => setData(response))
            .catch(err => console.error(err));
    })


    return (
        <div className="container">
            <h1 className="title" style={{ marginTop: '5%' }}>Previous Results</h1>
            <Table data={data} />
            <div style={{ backgroundColor: 'darkslategray', marginTop: '20px' }}>

                <Link to="/" style={{ textDecoration: 'none', color: 'white', width: '100%' }}><Button variant="" style={{ backgroundColor: 'darkslategray', width: '100%', color: 'white', fontWeight: 'bold' }}>Back
                </Button></Link>

            </div>
        </div>

    )
}

export default DataTable
