import React, { useEffect, useState } from "react";
import {
  deleteTask,
  retrieveAllTasks,
} from "../service/TaskApiService";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaPen, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/tasks.css";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, removeTask, updateTaskStatus } from "../redux/taskSlice";
import { getRemainingTime } from "../utils/timeUtils";
import { ProgressBar } from "react-bootstrap";

const TasksComponent = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.taskSlice.tasks);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  useEffect(() => {
    applyFiltersSortAndSearch();
  }, [tasks, sortOption, filterOption, searchQuery]);

  const fetchTasks = () => {
    retrieveAllTasks(userId)
      .then((response) => {
        dispatch(setTasks(response.data));
      })
      .catch((error) => console.log(error));
  };

  const applyFiltersSortAndSearch = () => {
    let sortedTasks = [...tasks];

    // Apply sorting
    if (sortOption === "soonest") {
      sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortOption === "latest") {
      sortedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    }

    // Apply filtering
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);
    const nextMonth = new Date();
    nextMonth.setMonth(now.getMonth() + 1);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    if (filterOption === "nextWeek") {
      sortedTasks = sortedTasks.filter(
        (task) =>
          new Date(task.dueDate) <= nextWeek && new Date(task.dueDate) >= now
      );
    } else if (filterOption === "nextMonth") {
      sortedTasks = sortedTasks.filter(
        (task) =>
          new Date(task.dueDate) <= nextMonth && new Date(task.dueDate) >= now
      );
    } else if (filterOption === "overdueWeek") {
      sortedTasks = sortedTasks.filter(
        (task) => new Date(task.dueDate) < oneWeekAgo && !task.completed
      );
    }

    // Apply search
    if (searchQuery) {
      sortedTasks = sortedTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(sortedTasks);
  };

  const updateTask = (id) => {
    navigate(`/update-task/${id}`);
  };

  const deleteTaskFun = (id) => {
    deleteTask(id)
      .then(() => {
        dispatch(removeTask(id));
        toast.success("Task deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete task");
      });
  };

  const handleStatusChange = (task, newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    dispatch(updateTaskStatus({ id: task.id, status: newStatus }));

    updateTaskStatusAPI(updatedTask, task.id)
      .then(() => {
        dispatch(updateTaskStatus({ id: task.id, status: newStatus }));
        toast.success(`Task status updated to ${newStatus}`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update task status");
      });
  };

  const viewTaskDetails = (task) => {
    navigate(`/task-details/${task.id}`, { state: task });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="m-0">Task List</h2>
                <Link to="/add-task" className="btn btn-primary btn-sm">
                  <FaPlus className="me-2" /> Add Task
                </Link>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by task name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-between mb-4">
                <div>
                  <label className="form-label">Sort by:</label>
                  <select
                    className="form-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="soonest">Soonest Deadline</option>
                    <option value="latest">Latest Deadline</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Filter by:</label>
                  <select
                    className="form-select"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="nextWeek">Due in Next Week</option>
                    <option value="nextMonth">Due in Next Month</option>
                    <option value="overdueWeek">Overdue by Week or More</option>
                  </select>
                </div>
              </div>

              {filteredTasks.map((task) => (
                <div key={task.id} className="mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-end gap-2 mb-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => viewTaskDetails(task)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateTask(task.id)}
                        >
                          <FaPen />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteTaskFun(task.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className={`${
                            task.status === "Completed"
                              ? "text-decoration-line-through text-muted"
                              : ""
                          }`}
                        >
                          <strong>{task.title}</strong>
                        </div>
                      </div>
                      <div className="mt-2">
                        <small className="text-muted">
                          Due in: {getRemainingTime(new Date(task.dueDate))}
                        </small>
                      </div>
                      <div className="mt-3">
                        <label className="form-label">Status:</label>
                        <select
                          className="form-select"
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(task, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksComponent;
