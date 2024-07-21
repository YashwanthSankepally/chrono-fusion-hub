import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import TablePagination from "@mui/material/TablePagination";
import "./Todo.scss";
import Header from "../Header/Header";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");
  const [editDueDate, setEditDueDate] = useState(null);
  const [editDueTime, setEditDueTime] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("creation");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.getItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        priority: "Low",
        dueDate: editDueDate ? editDueDate.toISOString().split("T")[0] : "",
        dueTime: editDueTime
          ? editDueTime.toISOString().split("T")[1].split(".")[0]
          : "",
        details: "",
      };
      setTodos([...todos, newTask]);
      setNewTodo("");
      setEditDueDate(null);
      setEditDueTime(null);
    }
  };

  const handleEditTodo = (id) => {
    setEditTodoId(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodoText(todoToEdit.text);
    setEditDueDate(todoToEdit.dueDate ? new Date(todoToEdit.dueDate) : null);
    setEditDueTime(
      todoToEdit.dueTime ? new Date(`1970-01-01T${todoToEdit.dueTime}`) : null
    );
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editTodoId
        ? {
            ...todo,
            text: editTodoText,
            dueDate: editDueDate ? editDueDate.toISOString().split("T")[0] : "",
            dueTime: editDueTime
              ? editDueTime.toISOString().split("T")[1].split(".")[0]
              : "",
          }
        : todo
    );
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditTodoText("");
    setEditDueDate(null);
    setEditDueTime(null);
  };

  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getFilteredTodos = () => {
    const filteredTodos = todos.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "active") return !todo.completed;
      return true;
    });

    return filteredTodos.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getSortedTodos = () => {
    const sortedTodos = [...getFilteredTodos()];
    sortedTodos.sort((a, b) => {
      if (sortOption === "creation") {
        return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
      }
      if (sortOption === "completion") {
        return sortDirection === "asc"
          ? a.completed - b.completed
          : b.completed - a.completed;
      }
      if (sortOption === "priority") {
        const priorityOrder = { Low: 1, Medium: 2, High: 3 };
        return sortDirection === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });
    return sortedTodos;
  };

  const paginatedTodos = getSortedTodos().slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Header />
      <section className="cfh-todo-section">
        <div className="todo-app">
          <div className="todo-input">
            <TextField
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              label="Add a new task"
            />
            <Button variant="contained" onClick={handleAddTodo}>
              Add
            </Button>
          </div>

          {editTodoId !== null && (
            <div className="todo-edit">
              <TextField
                type="text"
                value={editTodoText}
                onChange={(e) => setEditTodoText(e.target.value)}
                label="Edit Task"
              />
              <DatePicker
                label="Due Date"
                value={editDueDate}
                onChange={(date) => setEditDueDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Due Time"
                value={editDueTime}
                onChange={(time) => setEditDueTime(time)}
                renderInput={(params) => <TextField {...params} />}
              />
              <Button variant="contained" onClick={handleSaveEdit}>
                Save
              </Button>
            </div>
          )}

          <div className="todo-filters">
            <FormControl variant="outlined">
              <InputLabel>Filter</InputLabel>
              <Select
                onChange={handleFilterChange}
                value={filter}
                label="Filter"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="active">Active</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              label="Search tasks"
            />
            <FormControl variant="outlined">
              <InputLabel>Sort By</InputLabel>
              <Select
                onChange={handleSortChange}
                value={sortOption}
                label="Sort By"
              >
                <MenuItem value="creation">Sort by Creation</MenuItem>
                <MenuItem value="completion">Sort by Completion</MenuItem>
                <MenuItem value="priority">Sort by Priority</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel>Direction</InputLabel>
              <Select
                onChange={handleSortDirectionChange}
                value={sortDirection}
                label="Direction"
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </div>

          <ul className="todo-list">
            {paginatedTodos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                <span>{todo.text}</span>
                {todo.dueDate && (
                  <span className="todo-due-date">
                    Due:{" "}
                    {new Date(todo.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}{" "}
                    at{" "}
                    {todo.dueTime &&
                      new Date(`1970-01-01T${todo.dueTime}`).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                  </span>
                )}
                <Button
                  onClick={() => handleEditTodo(todo.id)}
                  disabled={false}
                  id="editButton"
                >
                  Edit
                </Button>
                <Button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>

          <TablePagination
            component="div"
            count={getSortedTodos().length}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            showFirstButton
            showLastButton
          />
        </div>
      </section>
    </>
  );
};

export default TodoApp;
