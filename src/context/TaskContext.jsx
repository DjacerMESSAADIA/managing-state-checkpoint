import { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create a context for managing task-related state globally
const TaskContext = createContext();

// Define all possible action types for the reducer
const ACTIONS = {
  SET_TASKS: 'SET_TASKS',        // Set the entire tasks array (used for initialization)
  ADD_TASK: 'ADD_TASK',         // Add a new task
  DELETE_TASK: 'DELETE_TASK',    // Delete a task by ID
  TOGGLE_TASK: 'TOGGLE_TASK',    // Toggle task completion status
  UPDATE_TASK: 'UPDATE_TASK',    // Update an existing task
  SET_FILTER: 'SET_FILTER',      // Change the current filter
  SET_EDITING_TASK: 'SET_EDITING_TASK'  // Set the task being edited
};

// Initial state for the reducer
const initialState = {
  tasks: [],          // Array of all tasks
  filter: 'all',      // Current filter: 'all', 'active', or 'completed'
  editingTask: null   // Currently edited task or null
};

// Reducer function to handle all state updates
const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TASKS:
      return { ...state, tasks: action.payload };
    
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: Date.now(), completed: false }]
      };
    
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    
    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        )
      };
    
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
        editingTask: null  // Clear editing state after update
      };
    
    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };
    
    case ACTIONS.SET_EDITING_TASK:
      return { ...state, editingTask: action.payload };
    
    default:
      return state;
  }
};

// Provider component that wraps the app and provides task-related state and actions
export const TaskProvider = ({ children }) => {
  // Initialize reducer with initial state
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from localStorage when the app starts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch({ type: ACTIONS.SET_TASKS, payload: JSON.parse(savedTasks) });
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Filter tasks based on current filter selection
  const filteredTasks = state.tasks.filter(task => {
    if (state.filter === 'active') return !task.completed;
    if (state.filter === 'completed') return task.completed;
    return true;
  });

  // Calculate task statistics
  const activeCount = state.tasks.filter(task => !task.completed).length;
  const completedCount = state.tasks.filter(task => task.completed).length;

  // Action creators for task operations
  const addTask = (task) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: task });
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
    }
  };

  const toggleTaskCompletion = (taskId) => {
    dispatch({ type: ACTIONS.TOGGLE_TASK, payload: taskId });
  };

  const updateTask = (task) => {
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: task });
  };

  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  const setEditingTask = (task) => {
    dispatch({ type: ACTIONS.SET_EDITING_TASK, payload: task });
  };

  // Create the context value object with state and actions
  const value = {
    tasks: state.tasks,
    filteredTasks,
    filter: state.filter,
    editingTask: state.editingTask,
    activeCount,
    completedCount,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    updateTask,
    setFilter,
    setEditingTask
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Custom hook to easily access the task context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

// PropTypes validation
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired
}; 