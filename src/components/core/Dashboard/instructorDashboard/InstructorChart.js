import React, { useState } from 'react'
import {Chart, registerables} from 'chart.js'
import {Pie} from 'react-chartjs-2'
 

Chart.register(...registerables);
 

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState('students')

    //function to generate random colors in a array
    const getRandomColors = (numColors) =>{
        const colors=[];
        for(let i=0; i<numColors; i++)
        {
            const color =  `rgb(${Math.floor(Math.random() * 255)} ,   ${Math.floor(Math.random() * 255)} ,  ${Math.floor(Math.random() * 255)} ) `
            colors.push(color)
        }
        return colors;
    }


    //creating data for Students for displaying in chart
    const chartDataForStudents = {
        labels: courses?.map((course) => course?.courseName),
        datasets: [
            {
                data: courses?.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses?.length),
            }
        ]
    }


    //creating data for Income for displaying in chart
    const chartDataForIncome = {
        labels: courses?.map((course) => course?.courseName),
        datasets: [
            {
                data: courses?.map((course) => course?.totalAmountGenerated),
                backgroundColor: getRandomColors(courses?.length),
            }
        ]
    }

 
    // creating options
    const options = {

    };


  return (
    <div>
        <p>Visualise</p>
        <div>
            <button onClick={()=>setCurrChart('students')} >
                Student
            </button>

            <button onClick={()=>setCurrChart('income')}>
                Income
            </button>
        </div>

        <div>
            <Pie 
                data={ currChart === 'students' ? chartDataForStudents : chartDataForIncome }
                options={options}
            
            />
        </div>

    </div>
  )
}

export default InstructorChart