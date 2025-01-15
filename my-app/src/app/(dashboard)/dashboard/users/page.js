"use client";
import { useState, useEffect, useMemo } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../../../actions/userActions";
import Loading from "@/app/components/Loading";
import Table from "../../../components/Table";
import { Edit2, Trash2 } from "lucide-react";

export default function UsersManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: {
      student: false,
      teacher: false,
      admin: false
    }
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const columns = useMemo(
    () => [
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Roles",
        accessorKey: "roles",
        cell: ({ row }) => (
          <div className="flex gap-1">
            {Object.keys(row.original.roles).map((role) => (
              <span
                key={role}
                className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
              >
                {role}
              </span>
            ))}
          </div>
        ),
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="p-1 text-blue-600 hover:text-blue-800"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(row.original._id)}
              className="p-1 text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.items);
      setError(null);
    } catch (err) {
      setError("Failed to load users");
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateUser(editingId, formData);
      } else {
        await createUser(formData);
      }
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roles: {
          student: false,
          teacher: false,
          admin: false
        }
      });
      setEditingId(null);
      setError(null);
      loadUsers();
    } catch (err) {
      setError(`Failed to ${editingId ? "update" : "create"} user`);
      console.error("Error saving user:", err);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: { ...user.roles }
    });
    setEditingId(user._id);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        loadUsers();
        setError(null);
      } catch (err) {
        setError("Failed to delete user");
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleRoleToggle = (role) => {
    setFormData({
      ...formData,
      roles: {
        ...formData.roles,
        [role]: !formData.roles[role]
      }
    });
  };

  if (loading) return <div className="mx-auto"><Loading /></div>;

  return (
    <div className="p-4 w-4/5 mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {!editingId && (
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}

        <div className="flex gap-4">
          {["student", "teacher", "admin"].map((role) => (
            <label key={role} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.roles[role]}
                onChange={() => handleRoleToggle(role)}
                className="rounded"
              />
              <span className="capitalize">{role}</span>
            </label>
          ))}
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update User" : "Add User"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                roles: {
                  student: false,
                  teacher: false,
                  admin: false
                }
              });
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Table */}
      <Table data={users} columns={columns} />
    </div>
  );
}