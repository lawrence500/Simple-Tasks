import React, { useEffect, useState } from "react";
import Task from "./assets/components/Task";
import "./css/app.css";
import Header from "./assets/components/Header";

const App = () => {
  const [content, setContent] = useState('hello');


  return (
    <>
    <Header setContent={setContent}/>
      <main>{content}</main>
    </>
  );
};

export default App;
