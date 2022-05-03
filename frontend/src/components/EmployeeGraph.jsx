import GraphHeader from "./GraphHeader"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import api from "../utilities/Api";
import state from "../state";
import { useAtom } from "jotai";
    

function EmployeeGraph() {
  const [token, setToken] = useAtom(state.token);
    ChartJS.register(
                    CategoryScale,
                    LinearScale,
                    PointElement,
                    LineElement,
                    Title,
                    Tooltip,
                    Legend
                    );

     const options = {
                        responsive: true,
                        plugins: {
                            legend: {
                            position: 'top',
                            },
                            title: {
                            display: true,
                            text: 'Chart.js Line Chart',
                            },
                        },
                    };

const [chartData, setChartData] = useState([])

const labels = chartData?.map(x => x.name)

useEffect(() => {
  const getData = async () => {
    api.get("empGraph?companyId=1", { headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => setChartData(response.data))
  }
  getData();
}, [])

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: chartData.map(x => x.dataset1),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: chartData.map(x => x.dataset2),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

    return (
        <div>
        <GraphHeader title={'Employee Overview'} className='shadow-md'/>
        <Line style={{ backgroundColor: '#f8f9fc', border: '1px solid #e3e6f0' }} options={options} data={data} className="p-2 rounded-b-md outline-2 text-primary font-bold "/>            
        </div>    
    )
}

export default EmployeeGraph