import { Chart, registerables } from "chart.js";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import NavBar from "../../components/NavBar/NavBar";
import { convertToMinutes, extractDate } from "../../utils/timeUtils";
import * as weightHistoryApi from "../../api/weightHistoryApi";
import * as workoutEventApi from "../../api/workoutEventApi";
import "./ReportsPage.scss";
import { extractWeightReport } from "../../utils/reportUtils";

const MAX_DATES = 5;

Chart.register(...registerables);

const ReportsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [weightData, setWeightData] = useState([]);
    const [weightInfo, setWeightInfo] = useState({});
    const [workoutReport, setWorkoutReport] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchData();
        if(isLoading){
         setTimeout(() => {
             setIsLoading(false);
         }, 1000)
        }
     }, [isLoading]);

     const fetchData = async () => {
        const userId = user?.id;

        // Get weight history data
        const weightHistoryResponse = await weightHistoryApi.getWeightHistory(userId);
        console.log("Wight history", weightHistoryResponse?.data);
        setWeightData(weightHistoryResponse?.data);

        const weightInformation = extractWeightReport(weightHistoryResponse?.data);
        setWeightInfo(weightInformation);

        const workoutReportResponse = await workoutEventApi.getUserWorkoutReport(userId);
        setWorkoutReport(workoutReportResponse?.data);
     }
 
     if(isLoading) {
         return (
             <div className="mainContainer">
                 <Spinner />
             </div>
         )
     }

     return (
        <div className="mainContainer">
            <ul className="reportsSection">
                <li>
                    <div className="reportCard">
                        <div className="statsCard">
                            <h4>WORKOUTS</h4>
                            <p>{workoutReport?.totalWorkouts}</p>
                        </div>
                        <div className="statsCard">
                            <h4>CALORIES BURNT</h4>
                            <p>{workoutReport?.totalCaloriesBurnt} kcal</p>
                        </div>
                        <div className="statsCard">
                            <h4>TOTAL MINUTES</h4>
                            <p>{convertToMinutes(workoutReport?.totalMinutes)}</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="reportCard ">
                        <div className="titleCard">
                            <h4>WEIGHT</h4>
                        </div>
                        <div className="weightCard">
                            <p>Current: <b>{weightInfo?.currentWeight}kg</b></p>
                        </div>
                        <div className="weightCard">
                            <p>Heaviest: <b>{weightInfo?.maxWeight}kg</b></p>
                        </div>
                        <div className="weightCard">
                            <p>Lightest: <b>{weightInfo?.minWeight}kg</b></p>
                        </div>
                        <WeightLineChart weightData={weightData}/>
                    </div>
                </li>
            </ul>
            <NavBar />
        </div>
     )
}

const WeightLineChart = ({weightData}) => {
    const extractLabels = () => {
        let labelSource = weightData;
        // Restrict dates to 5 since it can make the graph too dense
        if(weightData.length > MAX_DATES){
            labelSource = weightData.slice(weightData.length - MAX_DATES, weightData.length);
        }

        const labels = labelSource.map((data) => extractDate(data.date_added));
        return labels;
    }
    
    return (
        <div className="weightChart bg-white mb-4">
             <Line data={
                    {
                        labels: extractLabels(),
                        datasets: [
                            {
                                label: "Weight over time",
                                data: weightData.map((data) => data.weight),
                            }
                        ]
                    }
                }
            />
        </div>
    )
}

export default ReportsPage;