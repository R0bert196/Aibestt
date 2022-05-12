import GraphHeader from "./GraphHeader";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import api from "../utilities/Api";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import state from "../state";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

function LineGraph({ title, yourUrl, averageUrl }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

    //haeder: Angajati per durata schimb
  // const [chart, setChart] = useState([])
  // label: '# of Votes',
  // url  `getEmployeesByShiftCount?companyId=${id}`,


  const axiosPrivate = useAxiosPrivate();
  let { id } = useParams();
  const [yourchart, setYourChart] = useState();
  const [averageChart, setAverageChart] = useState();
  
  const getData = async () => {
    const controller = new AbortController();
    try {
      await Promise.all([
    
    axiosPrivate.get(`${averageUrl}`, {
        signal: controller.signal
      }),
    axiosPrivate.get(`${yourUrl}?companyId=${id}`, {
        signal: controller.signal
      })
      ]).then((response) => {
      setYourChart(response[1]);
      setAverageChart(response[0]);
    })
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

  let nutData = {
    labels: averageChart?.data.map((x) => toMonthName(x.month)),
    datasets: [
      {
        label: "Your Company",
        data: yourchart?.data.map((x) => x.value),
        backgroundColor: [
          "rgba(255, 206, 85, 1)"
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "Industry Average",
        data: averageChart?.data.map((x) => x.value),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
      
    ],
  };

  return (
    <div className=' mx-4 shadow-md rounded-b-md'>
      <GraphHeader title={title} />
      <Line
        style={{ backgroundColor: "#f8f9fc", border: "1px solid #e3e6f0" }}
        data={nutData}
        className='p-2 rounded-b-md outline-2 text-primary font-bold '
      />
    </div>
  );
}

export default LineGraph;
