import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { createTask, retrieveTaskById, updateTask } from "../service/TaskApiService";
import { addTask, editTask } from "../redux/taskSlice";

const AddTaskComponent = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status
  const [errors, setErrors] = useState({ title: "", description: "", dueDate: "" });

  useEffect(() => {
    if (id) {
      retrieveTaskById(id)
        .then((response) => {
          const { title, description, dueDate, status } = response.data.object;
          setTitle(title);
          setDescription(description);
          setDueDate(dueDate);
          setStatus(status);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  function saveTask(event) {
    event.preventDefault();
    if (validateForm()) {
      const taskObj = {
        title,
        description,
        dueDate,
        status,
        taskCreatedAt: id ? undefined : new Date().toISOString(), // Only set taskCreatedAt on create
        updatedAt: new Date().toISOString(), // Always set updatedAt
      };

      if (id) {
        updateTask(taskObj, id)
          .then(() => {
            dispatch(editTask({ id, updatedTask: taskObj }));
            navigate("/tasks");
          })
          .catch((error) => console.error(error));
      } else {
        dispatch(addTask({ ...taskObj, id: Math.random(100) }));
        navigate("/tasks");
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!title.trim()) {
      errorsCopy.title = "Title is required";
      valid = false;
    } else {
      errorsCopy.title = "";
    }

    if (!description.trim()) {
      errorsCopy.description = "Description is required";
      valid = false;
    } else {
      errorsCopy.description = "";
    }

    if (!dueDate) {
      errorsCopy.dueDate = "Due date is required";
      valid = false;
    } else {
      errorsCopy.dueDate = "";
    }

    setErrors(errorsCopy);
    return valid;
  }

  function AddUpdateText() {
    return id ? "Update" : "Add";
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="shadow rounded-lg">
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <FaTasks className="mr-3 text-primary" size={32} />
                  <h2 className="m-0">{AddUpdateText()} Task</h2>
                </div>
                <Form onSubmit={saveTask}>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter task title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      isInvalid={!!errors.title}
                      className="rounded-lg"
                    />
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter task description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      isInvalid={!!errors.description}
                      className="rounded-lg"
                    />
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formDueDate" className="mt-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={dueDate}
                      onChange={(event) => setDueDate(event.target.value)}
                      isInvalid={!!errors.dueDate}
                      className="rounded-lg"
                    />
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {errors.dueDate}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formStatus" className="mt-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                      className="rounded-lg"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </Form.Control>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3 w-100 rounded-pill"
                  >
                    {AddUpdateText()} Task
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddTaskComponent;
