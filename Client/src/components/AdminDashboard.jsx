import { Link } from "react-router-dom";
import {
  FaUsers,
  FaQuestionCircle,
  FaBoxOpen,
  FaShoppingCart,
  FaChartLine,
} from "react-icons/fa";

const cards = [
  {
    title: "Customers",
    text: "Manage all customers and their details.",
    icon: <FaUsers size={28} className="text-primary mb-2" />,
    link: "/Customers",
  },
  {
    title: "Inquiries",
    text: "View and manage customer inquiries.",
    icon: <FaQuestionCircle size={28} className="text-primary mb-2" />,
    link: "/dashboard/inquiries",
  },
  {
    title: "Items",
    text: "Add, edit, or remove items for sale.",
    icon: <FaBoxOpen size={28} className="text-primary mb-2" />,
    link: "/dashboard/items",
  },
  {
    title: "Orders",
    text: "Track and manage all orders.",
    icon: <FaShoppingCart size={28} className="text-primary mb-2" />,
    link: "/dashboard/orders",
  },
  {
    title: "Sales",
    text: "View sales analytics and reports.",
    icon: <FaChartLine size={28} className="text-primary mb-2" />,
    link: "/dashboard/sales",
  },
];

const AdminDashboard = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center fw-bold">Admin Dashboard</h1>
      <div className="row g-4">
        {cards.map((card, index) => (
          <div key={index} className="col-md-4">
            <div className="card h-100 shadow-sm border-0 hover-card">
              <div className="card-body d-flex flex-column align-items-start">
                {card.icon}
                <h5 className="card-title fw-semibold">{card.title}</h5>
                <p className="card-text">{card.text}</p>
                <Link
                  to={card.link}
                  className="btn btn-primary mt-auto w-100"
                >
                  Go to {card.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
