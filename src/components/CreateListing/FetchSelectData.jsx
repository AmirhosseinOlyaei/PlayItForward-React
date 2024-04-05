import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FetchSelectData() {
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://localhost:8000/api/v1/toys");
      const categories = await response.json();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   const fetchNames = async (processing) => {
  //     // try {
  //     await axios
  //       .get("http://localhost:8000/api/v1/toys")
  //       .then((res) => {
  //         if (processing) {
  //           setCategories(res.data);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   // Fetch names list for selector Catgory
  //   const response1 = await fetch("http://localhost:8000/api/v1/");
  //   const categories = await response1.data;
  //   // const conditions = await response1.data;
  //   // const deliveries = await response1.data;
  //   setCategories(categories);
  //   // setConditions(conditions);
  //   // setDeliveries(deliveries);
  //   // // Fetch names list for selector Conditions
  //   // const response2 = await axios.get("http://localhost:8000/api/v1/toys");
  //   // setConditions(response2.data);
  //   // // Fetch names list for selector Deliveries
  //   // const response3 = await axios.get("http://localhost:8000/api/v1/toys");
  //   // setDeliveries(response3.data);
  // } catch (error) {
  //   console.error("Error fetching names:", error);
  // }
  //   };

  //   fetchNames();
  // }, []);
  console.log("categ", categories);
  console.log("cond", conditions);
  console.log("deliv", deliveries);

  return (
    <div>
      <h1>Fetch Select Data</h1>

      {/* <label>Select Name 1:</label>
      <select>
        {namesList1.map((name) => (
          <option key={name.id} value={name.value}>
            {name.label}
          </option>
        ))}
      </select>

      <label>Select Name 2:</label>
      <select>
        {namesList2.map((name) => (
          <option key={name.id} value={name.value}>
            {name.label}
          </option>
        ))}
      </select> */}
    </div>
  );
}
