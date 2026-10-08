// =============================================================================
// MDT312 Assignment 6 login.js
// Modernized: ES6 (const/let), event.preventDefault(), and for loop
// =============================================================================

// กำหนดให้เรียกใช้ฟังก์ชัน loginLoad เมื่อหน้าเว็บโหลดเสร็จสมบูรณ์
window.onload = loginLoad;

/**
 * ฟังก์ชันเตรียมความพร้อมของหน้าเข้าสู่ระบบ (Login)
 * ทำหน้าที่ผูก Event Listener (onsubmit) ของฟอร์มเข้ากับฟังก์ชันตรวจเช็กการล็อกอิน
 */
function loginLoad() {
    // ดึง element ฟอร์ม login ผ่าน id="myLogin"
    const form = document.getElementById("myLogin");
    
    // ผูกเหตุการณ์การส่งฟอร์ม (submit) ให้ไปเรียกใช้ฟังก์ชัน checkLogin
    form.onsubmit = checkLogin;
}

/**
 * ฟังก์ชันตรวจสอบชื่อผู้ใช้และรหัสผ่านเข้าสู่ระบบ
 * @param {Event} event - ออบเจกต์เหตุการณ์การคลิก/ส่งฟอร์ม
 */
function checkLogin(event) {
    // 1. ป้องกันหน้าเว็บรีเฟรชเองทันทีเมื่อกดปุ่ม Submit (Login)
    if (event) {
        event.preventDefault();
    }

    // 2. ดึงข้อมูลจาก localStorage ทีละตัว แล้วนำมาใส่ใน Array of Objects
    // สร้าง Array พร้อมผู้ใช้เริ่มต้น (Default User) สำหรับทดสอบ
    const users = [{username: "admin", password: "123456"}];

    // ดึงข้อมูล username และ password ที่บันทึกไว้ใน localStorage จากหน้า Register
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // ถ้าพบข้อมูลผู้ใช้ใน localStorage ให้นำมาบันทึกเพิ่มลงใน Array (users)
    if (storedUsername && storedPassword) {
        users.push({ username: storedUsername, password: storedPassword });
    }

    // 3. ตรวจสอบว่ามีข้อมูลผู้ใช้ในระบบหรือไม่
    if (users.length === 0) {
        alert("ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาลงทะเบียนที่หน้า Register ก่อน");
        window.location.href = "register.html"; // นำทางผู้ใช้ไปยังหน้า Register
        return false;
    }

    // 4. ดึงค่าที่ผู้ใช้กรอกในฟอร์ม Login ปัจจุบัน ( Username และ Password )
    const inputUsername = document.forms["myLogin"]["username"].value.trim();
    const inputPassword = document.forms["myLogin"]["password"].value;

    // 5. ใช้ for loop วนหาใน Array ว่ามี username และ password ที่ตรงกับที่กรอกหรือไม่
    let isLoginSuccess = false; // ตัวแปร flag บันทึกสถานะการล็อกอิน

    for (let i = 0; i < users.length; i++) {
        // ตรวจสอบว่ามีทั้ง username และ password ตรงกับสมาชิกใน Array หรือไม่
        if (users[i].username === inputUsername && users[i].password === inputPassword) {
            isLoginSuccess = true; // เปลี่ยนสถานะเป็นสำเร็จ
            break; // หยุดการวนลูปทันทีเมื่อเจอข้อมูลที่ตรงกัน
        }
    }

    // 6. ตรวจสอบผลลัพธ์จากการวนลูป และแสดง Alert ให้ผู้ใช้ทราบ
    if (isLoginSuccess) {
        alert("Login success! ยินดีต้อนรับเข้าสู่ระบบ"); // แสดงข้อความสำเร็จ
        return true;
    } else {
        alert("Username หรือ password ไม่ถูกต้อง"); // แสดง alert เตือนเพื่อให้กรอกใหม่ตามโจทย์
        return false;
    }
}