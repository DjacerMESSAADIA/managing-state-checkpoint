import { ListTodo, CheckCircle2, Circle, LayoutDashboard } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { TaskProvider, useTaskContext } from './context/TaskContext';

// Main app content component
const AppContent = () => {
  const {
    editingTask,
    filter,
    activeCount,
    completedCount,
    tasks,
    filteredTasks,
    setFilter
  } = useTaskContext();

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <ListTodo className="w-8 h-8 text-[#4F46E5]" />
            <h1 className="text-3xl font-bold text-[#1E293B]">
              Task Manager
            </h1>
          </div>
          <p className="text-[#64748B] pl-11">Stay organized and productive</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[350px,1fr]">
          {/* Left Sidebar - Contains Task Form and Statistics */}
          <div className="space-y-8">
            {/* Task Form Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
              <h2 className="text-lg font-semibold text-[#1E293B] mb-6">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h2>
              <TaskForm />
            </div>

            {/* Statistics Overview Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-4">
                <LayoutDashboard className="w-5 h-5 text-[#4F46E5]" />
                <h2 className="text-lg font-semibold text-[#1E293B]">Overview</h2>
              </div>
              <div className="space-y-3">
                {/* Active Tasks Count */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Circle className="w-4 h-4 text-[#64748B]" />
                    <span className="text-[#64748B]">Active tasks</span>
                  </div>
                  <span className="text-[#1E293B] font-medium">{activeCount}</span>
                </div>
                {/* Completed Tasks Count */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#64748B]" />
                    <span className="text-[#64748B]">Completed tasks</span>
                  </div>
                  <span className="text-[#1E293B] font-medium">{completedCount}</span>
                </div>
                {/* Total Tasks Count */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ListTodo className="w-4 h-4 text-[#64748B]" />
                    <span className="text-[#64748B]">Total tasks</span>
                  </div>
                  <span className="text-[#1E293B] font-medium">{tasks.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Task List and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0]">
            {/* Filter Controls */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#1E293B]">Your Tasks</h2>
              <div className="flex gap-2">
                {['all', 'active', 'completed'].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === filterType
                        ? 'bg-[#EEF2FF] text-[#4F46E5]'
                        : 'text-[#64748B] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Task List Component */}
            <TaskList tasks={filteredTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Root component wrapped with TaskProvider
const App = () => {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
};

export default App;
