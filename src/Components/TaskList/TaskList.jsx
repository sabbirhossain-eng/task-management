
import { useDrag, useDrop } from 'react-dnd';

const DraggableTask = ({ task, index }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { index, task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid #000',
        padding: '8px',
        marginBottom: '8px',
      }}
    >
      {task.title}
    </div>
  );
};

const DropTargetList = ({ tasks, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onDrop(item.index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        border: isOver ? '2px dashed #42a5f5' : '2px solid #42a5f5',
        minHeight: '150px', minWidth: '100%', marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {tasks.map((task, index) => (
        <DraggableTask key={task._id} task={task} index={index} />
      ))}
    </div>
  );
};

const TaskList = ({ title, tasks, onDrop }) => {
  return (
    <div className='w-full border border-blue-800'>
      <h2>{title}</h2>
      <DropTargetList tasks={tasks} onDrop={onDrop} />
    </div>
  );
};

export default TaskList;
