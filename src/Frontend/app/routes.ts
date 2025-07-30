import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("register", "./routes/register.tsx"),
  route("login", "./routes/login.tsx"),
  route("dashboard", "./routes/dashboard.tsx"),
  route("booking/:id", "./routes/booking.tsx"),
  route("contact", "./routes/contact.tsx"),
  route("admin", "./routes/admin.tsx"),
] satisfies RouteConfig;
