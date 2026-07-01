import React from 'react';
import MovieForm from './components/MovieForm.jsx'; // ดึงเอาฟอร์มที่เขียนแยกไว้เข้ามา

export default function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <MovieForm />
    </div>
  );
}
