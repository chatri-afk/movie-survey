/**
 * ตรวจสอบรูปแบบ Email ด้วย Regular Expression
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  /**
   * ตรวจสอบความถูกต้องของข้อมูลในฟอร์มแบบ Single Concern
   * @param {Object} formData ข้อมูลจากฟอร์ม
   * @returns {Object} currentErrors ออบเจกต์ผลลัพธ์การตรวจสอบ
   */
  export const validateMovieForm = (formData) => {
    const errors = {
      name: { active: false, message: '' },
      email: { active: false, message: '' },
      movie: { active: false, message: '' }
    };
  
    // 1. ตรวจสอบชื่อ
    if (!formData.name || formData.name.trim() === '') {
      errors.name = { active: true, message: 'โปรดใส่ชื่อของคุณ' };
    }
  
    // 2. ตรวจสอบอีเมล
    if (!formData.email || formData.email.trim() === '') {
      errors.email = { active: true, message: 'โปรดใส่อีเมลของคุณ' };
    } else if (!validateEmailFormat(formData.email.trim())) {
      errors.email = { active: true, message: 'รูปแบบอีเมลไม่ถูกต้อง' };
    }
  
    // 3. ตรวจสอบการเลือกหนัง
    if (!formData.selectedMovie || formData.selectedMovie === '') {
      errors.movie = { active: true, message: 'กรุณาเลือกหนังที่คุณชอบ' };
    }
  
    return errors;
  };
  
  /**
   * เช็คว่าจากผลลัพธ์ validation มี error ตัวไหนถูก trigger หรือไม่
   * @param {Object} errors 
   * @returns {boolean}
   */
  export const hasFormErrors = (errors) => {
    return errors.name.active || errors.email.active || errors.movie.active;
  };