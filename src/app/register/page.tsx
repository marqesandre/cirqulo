'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const register = async (username: string, email: string, password: string, firstName: string, lastName: string, company: string) => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, firstName, lastName, company }),
  });
  return response.json();
};

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [company, setCompany] = useState('');
  const router = useRouter();

  const companies = ['Company A', 'Company B', 'Company C'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const username = uuidv4();
    const response = await register(username, email, password, firstName, lastName, company);

    if (response.ok) {
      router.push('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <button onClick={() => router.push('/login')} className="p-4 text-black text-md absolute top-4 left-4">
        Voltar para o Login
      </button>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/5 text-center">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Nome"
          className="p-4 border border-gray-300 rounded-xl"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Sobrenome"
          className="p-4 border border-gray-300 rounded-xl"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="p-4 border border-gray-300 rounded-xl"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="p-4 border border-gray-300 rounded-xl"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repita a Senha"
          className="p-4 border border-gray-300 rounded-xl"
        />
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="p-4 border border-gray-300 rounded-xl"
        >
          <option value="" disabled>Selecione a empresa</option>
          {companies.map((company) => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
        <button type="submit" className="p-4 bg-teal-600 hover:bg-teal-700 text-white text-xl rounded-xl">
          Cadastrar
        </button>
      </form>
    </div>
  );
}