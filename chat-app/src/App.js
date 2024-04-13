import { useEffect, useState } from "react";
import './App.css';
// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axiosInstance from './axiosConfig';

function App() {
  const [question, setQuestion] = useState()
  const [result, setResult] = useState()
  const [uploadStatus, setUploadStatus] = useState()

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleChange = async(event)=> {
    // setFile(event.target.files[0])
    const formData = new FormData();
    formData.append("file_from_react", event.target.files[0]);
    try {
      const response = axiosInstance.post('/upload',formData ,{headers:{
        "Content-Type": "multipart/form-data",
      },})
      .then((response) => {
        setUploadStatus(response.data)
        console.log(response.data)})
    } catch (error) {
      console.error("error mannn"+error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    setResult("Processing request...")
    // axiosInstance({
    //   method: "GET",
    //   url:"/",
    // })
    // .then((response) => {
    //   const res =response.data
    //   console.log(res)
    // }).catch((error) => {
    //   if (error.response) {
    //     console.log(error.response)
    //     }
    // })

    let data = JSON.stringify({
      value: question
    });
    try {
      console.log("query: "+ question)
      const response = axiosInstance.post('/chat', data,{headers:{"Content-Type" : "application/json"}})
      .then((response) => {
        setResult(response.data)
        console.log(response.data)})
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <form 
      onSubmit={handleSubmit} 
      className="mb-4">
        <input
          className="appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="question"
          id = "question"
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Ask your question here"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
        <input type="file" name="file" onChange={handleChange}/>
        {/* <button type="submit">Upload</button> */}
        <p>{uploadStatus}</p>
        {/* {result === undefined ? (
        <p>Processing request...</p>
      ) : (
        <p>{result}</p>
      )} */}
      <p>{result}</p>
      </form>


      </header>
    </div>
  );
}

export default App;