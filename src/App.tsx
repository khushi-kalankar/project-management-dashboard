import { useState } from "react";
import {AnimatePresence, motion, useInView } from "framer-motion";
import {
  BarChart3,
  Calendar,
  DollarSign,
  Layout,
  ListTodo,
  PieChart,
  Plus,
  Users,
  ChevronDown,
  ChevronUp,
  Clock,
  Tag,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Mock data
const projects = [
  {
    id: 1,
    name: "Website Redesign",
    progress: 75,
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    status: "In Progress",
    budget: 15000,
    spent: 10000,
    description:
      "Complete overhaul of company website with modern design and improved UX",
    tasks: [
      {
        id: 1,
        name: "Design System",
        description: "Create a comprehensive design system",
        deadline: "2024-03-25",
        status: "In Progress",
        priority: "High",
      },
      {
        id: 2,
        name: "Homepage Redesign",
        description: "Implement new homepage layout",
        deadline: "2024-03-30",
        status: "Pending",
        priority: "Medium",
      },
      {
        id: 3,
        name: "Mobile Optimization",
        description: "Ensure responsive design across devices",
        deadline: "2024-04-15",
        status: "Not Started",
        priority: "High",
      },
    ],
  },
  {
    id: 2,
    name: "Mobile App Development",
    progress: 30,
    startDate: "2024-03-01",
    endDate: "2024-06-30",
    status: "On Track",
    budget: 25000,
    spent: 8000,
    description: "Native mobile application for iOS and Android platforms",
    tasks: [
      {
        id: 4,
        name: "User Authentication",
        description: "Implement secure login system",
        deadline: "2024-03-30",
        status: "In Progress",
        priority: "High",
      },
      {
        id: 5,
        name: "Core Features",
        description: "Develop main app functionality",
        deadline: "2024-05-15",
        status: "Not Started",
        priority: "High",
      },
      {
        id: 6,
        name: "Testing Phase",
        description: "Comprehensive testing across devices",
        deadline: "2024-06-15",
        status: "Not Started",
        priority: "Medium",
      },
    ],
  },
  {
    id: 3,
    name: "Marketing Campaign",
    progress: 90,
    startDate: "2024-01-15",
    endDate: "2024-03-30",
    status: "At Risk",
    budget: 10000,
    spent: 9500,
    description: "Q1 digital marketing campaign across social media platforms",
    tasks: [
      {
        id: 7,
        name: "Content Strategy",
        description: "Define content themes and schedule",
        deadline: "2024-03-20",
        status: "Completed",
        priority: "High",
      },
      {
        id: 8,
        name: "Ad Campaign",
        description: "Setup and monitor ad campaigns",
        deadline: "2024-03-25",
        status: "In Progress",
        priority: "High",
      },
      {
        id: 9,
        name: "Analytics Review",
        description: "Analyze campaign performance",
        deadline: "2024-03-30",
        status: "Pending",
        priority: "Medium",
      },
    ],
  },
];

const monthlyData = [
  { name: "Jan", completed: 4, active: 6 },
  { name: "Feb", completed: 3, active: 8 },
  { name: "Mar", completed: 2, active: 9 },
  { name: "Apr", completed: 5, active: 7 },
  { name: "May", completed: 6, active: 5 },
  { name: "Jun", completed: 4, active: 6 },
];

const budgetData = [
  { name: "Website", value: 15000 },
  { name: "Mobile App", value: 25000 },
  { name: "Marketing", value: 10000 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

function App() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const toggleProject = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="min-h-screen font-montserrat">
      {/* Header */}
      <header className="bg-gradient-to-r from-white to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div //@ts-ignore 
              initial={{ x: '-100vw' }}  // Start off-screen on the left
              animate={{ x: 0 }}         // Slide to the center
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                duration: 1,
              }} className="flex items-center">
              <Layout className="h-8 w-8 text-orange-600" />
              <h1 className="ml-2 text-2xl font-bold text-black"
              >ProjectHub</h1>
            </motion.div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-full text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </button>
          </div>
        </div>
      </header>
      <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_3px),linear-gradient(to_bottom,#8080800a_1px,transparent_3px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-200 opacity-20 blur-[100px]"></div></div>
        {/* Main Content */}
        <motion.main 
        initial={{ y: '100vh' }}  // Start off-screen at the bottom
        animate={{ y: 0 }}        // Slide to the center
        transition={{
          type: "spring",
          stiffness: 100,         // Increased stiffness for quicker animation
          damping: 20,            // Adjusted damping for quicker end
          duration: 0.5,          // Faster slide-in duration
        }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Projects"
              value="12"
              icon={<Layout className="h-6 w-6 text-indigo-600" />}
              trend="+2 this month"
              
            />
            <StatCard
              title="Active Tasks"
              value="28"
              icon={<ListTodo className="h-6 w-6 text-green-600" />}
              trend="6 due today"
            />
            <StatCard
              title="Team Members"
              value="18"
              icon={<Users className="h-6 w-6 text-blue-600" />}
              trend="2 new this week"
            />
            <StatCard
              title="Total Budget"
              value="$50,000"
              icon={<DollarSign className="h-6 w-6 text-yellow-600" />}
              trend="$12,000 remaining"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Project Timeline Chart */}
            <div className="bg-yellow-200/30 rounded-3xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-orange-600 mb-4">
                Project Timeline
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="completed"
                      stackId="1"
                      stroke="#4F46E5"
                      fill="#4F46E5"
                    />
                    <Area
                      type="monotone"
                      dataKey="active"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Budget Distribution */}
            <div className="bg-yellow-400/30 rounded-3xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-orange-600 mb-4">
                Budget Distribution
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4F46E5">
                      {budgetData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-3xl border-2 border-dashed border-orange-500">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-orange-600">
                Active Projects
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {projects.map((project) => (
                <div key={project.id} className="p-6">
                  <div
                    className="cursor-pointer"
                    onClick={() => toggleProject(project.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {project.name}
                        </h3>
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            project.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : project.status === "On Track"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      {expandedProject === project.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        {project.startDate} - {project.endDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                        Budget: ${project.budget.toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        Spent: ${project.spent.toLocaleString()}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div>
                        <div
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                      </div>
                      
                    </div>
                  </div>

                  {/* Expanded Project Details */}
                  <AnimatePresence>
                  {expandedProject === project.id && (
                    <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }} className="mt-6 border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-semibold text-orange-600 mb-4">
                        Project Tasks
                      </h4>
                      <div className="grid gap-4">
                        {project.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="bg-gray-50 rounded-2xl p-4 hover:bg-yellow-100 transition-colors duration-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                
                                <h5 className="font-medium text-gray-900">
                                {"\u2022"} {task.name}
                                </h5>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    task.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : task.status === "In Progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : task.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {task.status}
                                </span>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    task.priority === "High"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-orange-100 text-orange-800"
                                  }`}
                                >
                                  {task.priority} Priority
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">
                              {task.description}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-2 text-red-600" />
                              Due: {task.deadline}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
interface props {
  title: string;
  value: string;
  icon: any;
  trend: string;
}

function StatCard({ title, value, icon, trend }: props) {
  return (
    <motion.div 
    whileHover={{
      rotateX: 8,
      rotateY: 8,
      scale: 1.08,
      boxShadow: "10px 10px 30px rgba(0,0,0,0.3)",
    }}
    transition={{
      type: "spring",
      stiffness: 200,
      damping: 20,
    }} className="bg-orange-200 rounded-3xl p-6 border-purple-600 transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-700">{value}</p>
        </div>
        <div className="bg-white p-3 rounded-full">{icon}</div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{trend}</p>
    </motion.div>
  );
}

export default App;
