import { useState, useEffect } from 'react';
import { PlusCircle, Save, Type, AlignLeft } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const TaskForm = () => {
  const { addTask, editingTask, updateTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description
      });
    } else {
      setFormData({ title: '', description: '' });
    }
  }, [editingTask]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editingTask) {
        updateTask({ ...editingTask, ...formData });
      } else {
        addTask(formData);
      }
      setFormData({ title: '', description: '' });
      setErrors({});
    }
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Input Field */}
      <div>
        <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-[#475569] mb-1">
          <Type className="w-4 h-4" />
          Task Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-white border ${
            errors.title ? 'border-red-500' : 'border-[#E2E8F0]'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent text-[#1E293B] placeholder-[#94A3B8]`}
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      {/* Description Input Field */}
      <div>
        <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-[#475569] mb-1">
          <AlignLeft className="w-4 h-4" />
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className={`w-full px-3 py-2 bg-white border ${
            errors.description ? 'border-red-500' : 'border-[#E2E8F0]'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent text-[#1E293B] placeholder-[#94A3B8]`}
          placeholder="Enter task description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-2.5 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {editingTask ? (
            <>
              <Save className="w-4 h-4" />
              Update Task
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              Add Task
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;