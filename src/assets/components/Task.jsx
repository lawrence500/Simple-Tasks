import { Button, Container } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";


import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from 'react-bootstrap/Modal';


const Task = (props) => {
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem(props.taskKey)) || []);
    const [task, setTask] = useState('');
    // const [inputPlaceholder, setPlaceholderValue] = useState("Enter task");
    const [inputValue, setInputValue] = useState('')
    const [modelActive, setModelActive] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [title, setTile] = useState(props.taskKey)


    useEffect(() => {
        localStorage.setItem(props.taskKey, JSON.stringify([...taskList]))
    }, [taskList])

    // model functions
    const showModel = (task, i) => {
      setModelActive(true)
      setSelectedTask([task, i])
    }
    const hideModel = () => setModelActive(false)
  
    // task app functions
    function updateTask(e) {
      e.preventDefault()
      setTask((t) => ({ ...t, taskName: e.target.value }));
      setTask(e.target.value)
    }
  
    function addTask(e) {
      setTaskList([...taskList, {taskName:task,isComplete:false}]);
      setInputValue('')
      setTask('')
  
    }
  
    function deleteTask() {
      const newTasks = taskList.filter((t, index) => index !== selectedTask[1]);
      setTaskList(newTasks);
      hideModel()
      setSelectedTask(null)
    }
  
    function checkTask(t, i) {
      taskList[i].isComplete = !taskList[i].isComplete
      setTaskList([...taskList])
      document.querySelectorAll('.task-text')[i].classList.add('complete')
    }
  
      //deleteTask(i)
    function Displaytask() {
      return taskList.map((task, i) => {
        return (
          <ListGroup.Item key={i}>
            <p className={task.isComplete ? 'task-text complete' : 'task-text'}>
              {task.taskName}
            </p>
  
            <div className="task-controls">
              <Button variant="outline-danger" onClick={() => showModel(task.taskName, i)}>
                Delete
              </Button>
            
              <Button
                variant="outline-success"
                onClick={() => {
                  checkTask(task, i);
                }}
              >
                Check
              </Button>
            </div>
          </ListGroup.Item>
        );
      });
    }

    return (
        <>
          <div className="container tasks">
            <h2>{title}</h2>
            <div className="input-box">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter task"
                  aria-label="Task Input"
                  aria-describedby="btnGroupAddon"
                  onChange={(e) => {updateTask(e), setInputValue(e.target.value)}}
                  onKeyDown={(e) => {
                    e.key === "Enter" ? addTask() : "";
                  }}
                  value={inputValue}
                />
                <InputGroup.Text id="btnGroupAddon" onClick={() => addTask()}>
                  submit
                </InputGroup.Text>
              </InputGroup>
    
              <ListGroup>{taskList.length > 0 ? <Displaytask /> : ""}</ListGroup>
            </div>
          </div>
    
    
          <Modal show={modelActive} onHide={() => hideModel()}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this task ({selectedTask !== null ? selectedTask[0] : ''})</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => hideModel()}>
                Close
              </Button>
              <Button variant="danger" onClick={() => deleteTask(selectedTask)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );

}

export default Task
