import React, { useEffect, useState } from 'react'

import {Line} from 'react-chartjs-2';

function LineGraph() {

    const [data, setData] = useState({});

    // "https://disease.sh/v3/covid-19/historical/all?lastdays=120"

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
        })
    }, [])


    return (
        <div className="linegraph">
            <h2>Chart</h2>
            {/* <Line
            data
            options 
            /> */}
        </div>
    )
}

export default LineGraph
