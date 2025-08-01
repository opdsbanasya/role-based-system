import { useState, useEffect } from "react";
import { updateUserAPI } from "../../utills/api";

const UpdateUser = ({ user, onUserUpdated }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    if (user) {
      setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserAPI(user._id, form);
    onUserUpdated();
  };

  return (
    <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4 font-bold text-center">Update User</h2>
      <input className="w-full mb-3 p-2 border" placeholder="First Name" required value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
      <input className="w-full mb-3 p-2 border" placeholder="Last Name" required value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
      <input className="w-full mb-3 p-2 border" placeholder="Email" required type="email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <button className="bg-blue-500 text-white px-4 py-2 w-full" type="submit">Update User</button>
    </form>
  );
};

export default UpdateUser;
