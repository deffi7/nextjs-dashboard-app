import { useState, useEffect, FormEvent } from "react";
import { User } from "@/types/user";

interface UserFormProps {
  user?: User;
  onSubmit: () => void;
  onCancel?: () => void;
}

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [age, setAge] = useState(user?.age?.toString() || "");

  // Atualiza os estados quando a prop 'user' muda
  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setAge(user?.age?.toString() || "");
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const userData: User = { name, email, age: parseInt(age) };

    try {
      if (user?.id) {
        await fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
      } else {
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
      }
      onSubmit();
      setName("");
      setEmail("");
      setAge("");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setAge("");
    if (onCancel) onCancel();
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">{user ? "Editar Usuário" : "Criar Usuário"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Idade</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {user ? "Atualizar" : "Criar"}
          </button>
          {user && (
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}