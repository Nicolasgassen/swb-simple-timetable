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

  const fetchData = async () => {
    try {
      const response = await fetch("https://swb-mobil.de/api/v1/stationboards/ass/" + String(stationID) + "?v=" + String(getRandomInteger()) + "&limit=" + String(limit));
      const jsonData = await response.json();

      // Hash values are created, so that each item has a unique key
      // This allows for multiple trains to stop at the same time without causing duplicate key errors
      jsonData.data.forEach(element => {
        element.hash = hashCode(String(element.time) + String(element.headsign));
      });
      setData(jsonData.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const hashCode = (value) => {
    value = String(value);
    var hash = 0, i, chr;
    if (value.length === 0) return hash;
    for (i = 0; i < value.length; i++) {
      chr = value.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  useEffect(() => {
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
          {data.map((item) => (
            <tr key={item.hash}>
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
