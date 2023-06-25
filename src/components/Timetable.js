import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Timetable.css";
import "moment-duration-format";

const getRemainingTime = (timestamp) => {
  return moment.unix(timestamp).format("HH:mm");
};

const Timetable = () => {
  const stationName = process.env.REACT_APP_STATION_NAME;
  const stationID = process.env.REACT_APP_STATION_ID;
  const limit = process.env.REACT_APP_TIMETABLE_LIMIT;
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://swb-mobil.de/api/v1/stationboards/ass/" + String(stationID) + "?v=" + String(getRandomInteger()) + "&limit=" + String(limit));
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  function getRandomInteger() {
    return Math.floor(Math.random() * (10000000000) ) + 10000000000;
  }

  return (
    <div className="timetable-container">
      <h2 className="title">{stationName}</h2>
      <table className="timetable">
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="name">
                {item.line.name}
              </td>
              <td className="headsign">
                {item.headsign}
              </td>
              <td className="time">
                {getRemainingTime(item.realtime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
