"use client"

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export function ExampleChart(){

    const option = {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: ["Physics","Maths", "History", "Geography", "Chem", "English"]
        },
        colors: ['#00CBB8']
      }

    const series = [{
        name: 'series-1',
        data: [88, 98, 66, 56, 72, 68]
      }]

    return(
        <>
            <ApexChart type="bar" options={option} series={series} height={200} width={400} />
        </>
    )
    
}
