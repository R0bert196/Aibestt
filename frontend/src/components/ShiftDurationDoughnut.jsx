import GraphHeader from "./GraphHeader"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import state from "../state";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";



function DoughnutGraph() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  const axiosPrivate = useAxiosPrivate();
let { id } = useParams();
const [chart, setChart] = useState([])
  
const [token, setToken] = useAtom(state.token);

  
  useEffect(() => {
   const controller = new AbortController();
  const getData = async () => {
    try {
      const response = await axiosPrivate.get(
        `getEmployeesByShiftCount?companyId=${id}`,
        {
          signal: controller.signal,
        }
      );

      console.log(response)
    setChart(response.data);
    } catch(err) {
        console.error(err);
    }
    
  }
  getData();
}, [])

      let nutData = {
        labels: chart?.map(x => x.duration + " ore"),
        datasets: [
          {
            label: '# of Votes',
            data: chart?.map(x => x.employee_number),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };





    return (
      <div className=" mx-4 shadow-md rounded-b-md"> 
        <GraphHeader title={'Angajati per durata schimb'} />
        <Doughnut style={{ backgroundColor: '#f8f9fc', border: '1px solid #e3e6f0' }} data={nutData} className="p-2 rounded-b-md outline-2 text-primary font-bold "/>
      </div>
  )
}

export default DoughnutGraph