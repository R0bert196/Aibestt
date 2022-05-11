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
import { getDatasetAtEvent, Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import api from "../utilities/Api";
import state from "../state";
import { useAtom } from "jotai";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
    

function EmployeeGraph() {
  let { id } = useParams()

  const [token, setToken] = useAtom(state.token);
  const axiosPrivate = useAxiosPrivate();

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
  const controller = new AbortController();
  const getData = async () => {
  const[globalData, companyData] = await Promise.all([
    
    axiosPrivate.get("api/globalEmployeeSalary", {
        signal: controller.signal
      }),
    axiosPrivate.get(`empGraph?companyId=${id}`, {
        signal: controller.signal
      })
    ])
    .then(data => {
      const tableData = []
      
      data[0].data.forEach(element => {
        let row = {}
        row["name"] = element[0] + " " + element[1]
        row["dataset1"] = element[2]
        row["dataset2"] = 0
        console.log(row)
        tableData.push(row)
        console.log(tableData)        
      });


      data[1].data.forEach(element => {
        let needToAdd = true;
        for(let elem of tableData){            
            if(elem.name === element[0] + " " + element[1]){
              elem["dataset2"] = element[2]
              needToAdd = false;
              break;            
            } 
        }
        if (needToAdd) {
          let row = {};
          row["name"] = element[0] + " " + element[1];
          row["dataset1"] = 0;
          row["dataset2"] = element[2];
          tableData.push(row);
        }
      })       
      setChartData(tableData);
         
      });    

  }

  useEffect(() => {getData()}, [])
  


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