import ChatBot from "views/ChatBot";
import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/chatbot",
    name: "ChatBot",
    icon: "tim-icons icon-chat-33",
    // icon: "tim-icons icon-support-17",
    component: <ChatBot />,
    layout: "/admin",
  },
];
export default routes;
