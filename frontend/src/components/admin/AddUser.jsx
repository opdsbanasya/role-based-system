import { useState } from "react";
import { addUserAPI } from "../../utills/api";

const AddUser = ({ onUserAdded }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", role: "student" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUserAPI(form);
    onUserAdded();
    setForm({ firstName: "", lastName: "", email: "", password: "", role: "student" });
  };

  return (
    <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4 font-bold text-center">Add User</h2>
      <input className="w-full mb-3 p-2 border" placeholder="First Name" required
        onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
      <input className="w-full mb-3 p-2 border" placeholder="Last Name" required
        onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
      <input className="w-full mb-3 p-2 border" placeholder="Email" required type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full mb-3 p-2 border" placeholder="Password" required type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select className="w-full mb-3 p-2 border" onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button className="bg-green-500 text-white px-4 py-2 w-full" type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
