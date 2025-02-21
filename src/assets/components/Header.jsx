import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Task from "./Task";

const Header = (props) => {

  const [taskKeys, setTaskKeys] =  useState(JSON.parse(localStorage.getItem('taskKeys')) || [])


  useEffect(() => {
    localStorage.setItem('taskKeys', JSON.stringify(taskKeys))
  }, [taskKeys])

  function createNewTasks() {
    let taskKey = prompt("Enter new tasks list name");

    if(taskKey === '') return taskKey = prompt("Enter new tasks list name");

    setTaskKeys([...taskKeys, taskKey])

    console.log(taskKey)
    displayTasks(<Task taskKey={taskKey}/>)
  }
  function displayTasks(content) {

    props.setContent('')

    setTimeout(() => {
      props.setContent(content);
    }, 100)
  }

  const DisplayTaskList = () => {
   return taskKeys.map((key, i) => {
      return(
        <Nav.Link key={i} onClick={() => displayTasks(<Task taskKey={key} />)}>{key}</Nav.Link>
      )
    })
  };

  // updateTaskList()

  return (
    <header>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Simple || Tasks</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => createNewTasks()}>Create</Nav.Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Tasks" id="basic-nav-dropdown">
                  <DisplayTaskList />
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
