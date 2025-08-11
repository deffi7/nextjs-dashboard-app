"use client";

import { useState, useEffect } from "react";
import UserForm from "@/components/UserForm";
import UserTable from "@/components/UserTable";
import { User } from "@/types/user";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    } else {
      console.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const handleCancel = () => {
    setEditingUser(undefined);
  };

  return (
    <main className="container mx-auto p-4">
      <UserForm user={editingUser} onSubmit={() => { fetchUsers(); setEditingUser(undefined); }} onCancel={handleCancel} />
      <UserTable users={users} onEdit={setEditingUser} onDelete={handleDelete} />
    </main>
  );
}