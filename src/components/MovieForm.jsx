import React, { useState } from 'react';
import { RotateCcw, Send, CheckCircle2 } from 'lucide-react';
import movies from '../data/MovieList'; 
import { validateMovieForm, hasFormErrors } from '../utils/validation';

export default function MovieForm() {
  // --- [State Group 1: Domain Data] ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    selectedMovie: '',
    comment: ''
  });

  // --- [State Group 2: UI Errors State] ---
  const [formErrors, setFormErrors] = useState({
    name: { active: false, message: '' },
    email: { active: false, message: '' },
    movie: { active: false, message: '' }
  });

  // --- [State Group 3: UI Navigation Flow State] ---
  const [isSubmit, setIsSubmit] = useState(false);

  // ฟังก์ชันจัดการอัปเดต Input ค่าทั่วไป
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearInputError(name, value);
  };

  // ฟังก์ชันจัดการอัปเดต Radio Button ของหนัง
  const handleMovieSelect = (movieTitle) => {
    setFormData((prev) => ({ ...prev, selectedMovie: movieTitle }));
    setFormErrors((prev) => ({ ...prev, movie: { active: false, message: '' } }));
  };

  // ฟังก์ชันสำหรับล้าง Error เฉพาะ Field เมื่อเริ่มพิมพ์ (Single Concern)
  const clearInputError = (fieldName, value) => {
    if (value.trim() !== '') {
      setFormErrors((prev) => ({ ...prev, [fieldName]: { active: false, message: '' } }));
    }
  };

  // ฟังก์ชันควบคุมการส่งข้อมูล (Single Concern)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // เรียกใช้ Pure Function ด้านนอกเพื่อ Validate
    const validationResults = validateMovieForm(formData);
    setFormErrors(validationResults);

    // ตรวจสอบผลลัพธ์
    if (!hasFormErrors(validationResults)) {
      setIsSubmit(true);
    }
  };

  // ฟังก์ชันสำหรับรีเซ็ตฟอร์ม (Single Concern)
  const handleReset = () => {
    setFormData({ name: '', email: '', selectedMovie: '', comment: '' });
    setFormErrors({
      name: { active: false, message: '' },
      email: { active: false, message: '' },
      movie: { active: false, message: '' }
    });
    setIsSubmit(false);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 text-left">
      {/* ส่วนหัวฟอร์ม (Header) */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white flex items-center gap-2">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <h1 className="!text-xl !font-bold !m-0 text-white tracking-wide">Movie Survey</h1>
      </div>

      {isSubmit ? (
        /* ================= หน้าแสดงผลสำเร็จ ================= */
        <div className="p-6 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-gray-700">
            <div className="flex items-center gap-2 text-green-600 text-lg mb-4">
              <CheckCircle2 className="w-6 h-6" />
              <span>ส่งแบบสำรวจสำเร็จ!</span>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-gray-500">ชื่อ:</span>
                <span className="col-span-2 text-gray-800 break-words">{formData.name}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-500">อีเมล:</span>
                <span className="col-span-2 text-gray-800 break-words">{formData.email}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-500">หนังที่เลือก:</span>
                <span className="col-span-2 text-purple-600 font-semibold">{formData.selectedMovie}</span>
              </div>
            </div>

            {formData.comment.trim() !== '' && (
              <>
                <hr className="border-green-100 my-4" />
                <div className="space-y-2 text-sm text-left">
                  <span className="block text-gray-500">ความคิดเห็น:</span>
                  <div className="w-full p-3 bg-white/60 border border-green-100/50 rounded-lg text-gray-800 break-words whitespace-pre-wrap">
                    {formData.comment}
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#16171d] hover:bg-black text-white rounded-md transition-colors text-sm font-semibold shadow-sm"
          >
            <RotateCcw className="w-4 h-4" /> ทำแบบสำรวจใหม่
          </button>
        </div>
      ) : (
        /* ================= หน้าฟอร์มปกติ ================= */
        <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
          {/* ช่องกรอกชื่อ */}
          <div>
            <label className="block text-gray-800 font-bold mb-1">ชื่อ <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="กรุณากรอกชื่อของคุณ" 
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${formErrors.name.active ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
            />
            {formErrors.name.active && <p className="text-red-500 text-xs mt-1">{formErrors.name.message}</p>}
          </div>

          {/* ช่องกรอกอีเมล */}
          <div>
            <label className="block text-gray-800 font-bold mb-1">อีเมล <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@email.com" 
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${formErrors.email.active ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
            />
            {formErrors.email.active && <p className="text-red-500 text-xs mt-1">{formErrors.email.message}</p>}
          </div>

          {/* รายการเลือกหนัง */}
          <div>
            <label className="block text-gray-800 font-bold mb-2">เลือกหนังที่คุณชอบ <span className="text-red-500">*</span></label>
            <div className={`space-y-4 p-4 border rounded-md bg-white transition-all ${formErrors.movie.active ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}>
              {movies.map((movie) => (
                <label key={movie.title} className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="movie" 
                    value={movie.title}
                    checked={formData.selectedMovie === movie.title}
                    onChange={() => handleMovieSelect(movie.title)}
                    className="mt-1 accent-purple-600 scale-110"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-gray-800">
                      {movie.title} ({movie.year})
                    </span>
                    <span className="block text-xs text-gray-500">
                      Director: {movie.director}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            {formErrors.movie.active && <p className="text-red-500 text-xs mt-1">{formErrors.movie.message}</p>}
          </div>

          {/* ช่องความคิดเห็น */}
          <div>
            <label className="block text-gray-800 font-bold mb-1">ความคิดเห็นเกี่ยวกับหนัง</label>
            <textarea 
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows="3" 
              placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..." 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <hr className="border-gray-200 my-4" />

          {/* ปุ่มรีเซ็ตและส่งท้ายฟอร์ม */}
          <div className="flex justify-between items-center pt-2">
            <button 
              type="button" 
              onClick={handleReset}
              className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" /> รีเซ็ต
            </button>
            <button 
              type="submit" 
              className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors text-sm font-medium shadow-sm"
            >
              <Send className="w-4 h-4" /> ส่งแบบสำรวจ
            </button>
          </div>
        </form>
      )}
    </div>
  );
}