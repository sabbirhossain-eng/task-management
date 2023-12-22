import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  TablePagination,
 
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import useAuth from "../../../Components/Hooks/useAuth";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskList from "../../../Components/TaskList/TaskList";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TaskManagementDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { refetch, data = [] } = useQuery({
    queryKey: ["addedTasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks_by_email/${user.email}`);
      return res.data;
    },
  });

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sliceData = page * rowsPerPage;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  
  const handleDeleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tasks/delete/${id}`).then((res) => {
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const [todoTasks, setTodoTasks] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleDrop = ({sourceIndex, targetList}) => {
    let draggedTask;

    if (targetList === 0) {
      draggedTask = todoTasks[sourceIndex];
      setTodoTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        newTasks.splice(sourceIndex, 1);
        setOngoingTasks((prevOngoingTasks) => [...prevOngoingTasks, draggedTask]);
        return newTasks;
      });
    } else if (targetList === 1) {
      draggedTask = ongoingTasks[sourceIndex];
      setOngoingTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        newTasks.splice(sourceIndex, 1);
        setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, draggedTask]);
        return newTasks;
      });
    } else if (targetList === 2) {
      draggedTask = completedTasks[sourceIndex];
      setCompletedTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        newTasks.splice(sourceIndex, 1);
        setTodoTasks((prevTodoTasks) => [...prevTodoTasks, draggedTask]);
        return newTasks;
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Serial Number</StyledTableCell>
                <StyledTableCell align="right">Title</StyledTableCell>
                <StyledTableCell align="right">Priority</StyledTableCell>
                <StyledTableCell align="right">Deadline</StyledTableCell>
                <StyledTableCell align="right">Edit</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 &&
                data
                  .slice(sliceData, sliceData + rowsPerPage)
                  .map((task, index) => (
                    <StyledTableRow key={task._id}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      {/* title */}
                      <StyledTableCell align="right">
                       {task.title}
                      </StyledTableCell>
                      {/* Priority */}
                      <StyledTableCell align="right">
                        {task.priority}
                      </StyledTableCell>
                      {/* deadline */}
                      <StyledTableCell align="right">
                       {task.deadline}
                      </StyledTableCell>
                      {/* edit */}
                      <StyledTableCell align="right">
                        <Link to={`/dashboard/taskUpdate/${task._id}`}>
                        <Button>
                          <BorderColorIcon color="" />
                        </Button>
                        </Link>
                      </StyledTableCell>
                      {/* delete */}
                      <StyledTableCell align="right">
                        <Button onClick={() => handleDeleteTask(task._id)}>
                          <DeleteIcon color="error" />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={8} />
                </StyledTableRow>
              )}
              
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="flex justify-between gap-6">
                <TaskList
                  title="To-Do"
                  tasks={todoTasks}
                  onDrop={(index) => handleDrop(index, 0)}
                />
                <TaskList
                  title="Ongoing"
                  tasks={ongoingTasks}
                  onDrop={(index) => handleDrop(index, 1)}
                />
                <TaskList
                  title="Completed"
                  tasks={completedTasks}
                  onDrop={(index) => handleDrop(index, 2)}
                />
              </div>
      </div>
    </DndProvider>
  );
};

export default TaskManagementDashboard;
