import PropTypes from 'prop-types';
import { Pencil, Trash2, AlertCircle } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const TaskList = ({ tasks }) => {
  const { deleteTask, toggleTaskCompletion, setEditingTask } = useTaskContext();

  // Show empty state when there are no tasks
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
        <div className="text-[#64748B] mb-2">No tasks yet</div>
        <p className="text-sm text-[#94A3B8]">Add your first task to get started</p>
      </div>
    );
  }

  return (
    // Task list container with scrolling
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
      {/* Map through tasks and render each task card */}
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`group relative p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
            task.completed
              ? 'bg-[#F8FAFC] border-[#E2E8F0]' // Completed task styling
              : 'bg-white border-[#E2E8F0] hover:border-[#4F46E5]' // Active task styling
          }`}
        >
          {/* Task card content layout */}
          <div className="flex items-start gap-4">
            {/* Checkbox for task completion */}
            <div className="flex-shrink-0 pt-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="h-4 w-4 rounded border-[#CBD5E1] text-[#4F46E5] focus:ring-[#4F46E5] focus:ring-offset-2"
              />
            </div>

            {/* Task title and description */}
            <div className="flex-grow min-w-0">
              <h3
                className={`text-base font-medium break-words ${
                  task.completed ? 'text-[#94A3B8] line-through' : 'text-[#1E293B]'
                }`}
              >
                {task.title}
              </h3>
              <p
                className={`mt-1 text-sm break-words ${
                  task.completed ? 'text-[#94A3B8]' : 'text-[#64748B]'
                }`}
              >
                {task.description}
              </p>
            </div>

            {/* Action buttons - visible on hover */}
            <div className="flex-shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Edit button */}
              <button
                onClick={() => setEditingTask(task)}
                className="p-1.5 text-[#4F46E5] hover:bg-[#EEF2FF] rounded-lg transition-colors flex items-center gap-1"
              >
                <Pencil className="w-4 h-4" />
                <span className="text-sm font-medium">Edit</span>
              </button>
              {/* Delete button */}
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm font-medium">Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TaskList; 