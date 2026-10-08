// =============================================================================
// MDT312 Assignment 6 register.js
// Modernized: ES6 (const/let), event.preventDefault(), and localStorage
// =============================================================================

// กำหนดให้เรียกใช้ฟังก์ชัน pageLoad เมื่อโหลดหน้าเว็บเสร็จสมบูรณ์
window.onload = pageLoad;

/**
 * ฟังก์ชันเตรียมความพร้อมของหน้าลงทะเบียน
 * ทำหน้าที่ผูก Event Listener (onsubmit) ของฟอร์มเข้ากับฟังก์ชันตรวจสอบข้อมูล
 */
function pageLoad() {
    // ดึง element ฟอร์มลงทะเบียนผ่าน id="myRegister"
    const form = document.getElementById("myRegister");
    
    // ผูกเหตุการณ์การส่งฟอร์ม (submit) ให้ไปเรียกใช้ฟังก์ชัน validateForm
    form.onsubmit = validateForm;
}

/**
 * ฟังก์ชันตรวจสอบความถูกต้องของข้อมูลในฟอร์มลงทะเบียนก่อนบันทึก
 * @param {Event} event - ออบเจกต์เหตุการณ์การคลิก/ส่งฟอร์ม
 */
function validateForm(event) {
    // ดึง element สำหรับแสดงข้อความแจ้งเตือนข้อผิดพลาด (id="errormsg")
    const errorMsg = document.getElementById("errormsg");

    // ดึงข้อมูลจากช่องกรอกต่างๆ ในฟอร์ม myRegister พร้อมตัดช่องว่างส่วนเกินหน้า-หลังด้วย .trim()
    const firstname = document.forms["myRegister"]["firstname"].value.trim();
    const lastname = document.forms["myRegister"]["lastname"].value.trim();
    const gender = document.forms["myRegister"]["gender"].value;
    const bday = document.forms["myRegister"]["bday"].value;
    const email = document.forms["myRegister"]["email"].value.trim();
    const username = document.forms["myRegister"]["username"].value.trim();

    // ดึงข้อมูลช่อง Password ทั้ง 2 ช่อง ( Index 0 = Password, Index 1 = Retype Password )
    const passwords = document.forms["myRegister"]["password"];
    const password = passwords[0].value;
    const retypePassword = passwords[1].value;

    // -------------------------------------------------------------------------
    // ตรวจสอบเงื่อนไขที่ 1: ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบทุกช่องหรือไม่
    // -------------------------------------------------------------------------
    if (!firstname || !lastname || !gender || !bday || !email || !username || !password || !retypePassword) {
        // แสดงข้อความเตือนบนหน้าเว็บ
        errorMsg.innerHTML = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
        
        // ป้องกันไม่ให้หน้าเว็บรีเฟรชหรือเปลี่ยนหน้า (คงอยู่ที่หน้าลงทะเบียน)
        if (event) {
            event.preventDefault();
        }
        return false;
    }

    // -------------------------------------------------------------------------
    // ตรวจสอบเงื่อนไขที่ 2: ตรวจสอบว่า Password ทั้ง 2 ช่องตรงกันหรือไม่
    // -------------------------------------------------------------------------
    if (password !== retypePassword) {
        // แสดงข้อความเตือนเมื่อรหัสผ่านทั้งสองช่องไม่ตรงกัน
        errorMsg.innerHTML = "รหัสผ่านไม่ตรงกัน";
        
        // ป้องกันไม่ให้เปลี่ยนหน้า (คงอยู่ที่หน้าลงทะเบียน)
        if (event) {
            event.preventDefault();
        }
        return false;
    }

    // -------------------------------------------------------------------------
    // เคลียร์ข้อความแจ้งเตือนเมื่อผ่านการตรวจสอบเงื่อนไขทั้งหมด
    // -------------------------------------------------------------------------
    errorMsg.innerHTML = "";

    // -------------------------------------------------------------------------
    // บันทึกข้อมูลลงใน localStorage
    // -------------------------------------------------------------------------
    // บันทึก username และ password ลงในความจำของ Browser (localStorage)
    // เพื่อความปลอดภัย: รหัสผ่านจะไม่ปรากฏบน Browser Address Bar และ Browser History
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // แสดงแจ้งเตือนผลการลงทะเบียนสำเร็จแก่ผู้ใช้
    alert("ลงทะเบียนสำเร็จ! ระบบบันทึกข้อมูลเรียบร้อย กำลังไปที่หน้า Login");

    // -------------------------------------------------------------------------
    // นำทางผู้ใช้ไปยังหน้า login.html
    // -------------------------------------------------------------------------
    if (event) {
        event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ
    }
    window.location.href = "login.html"; // เปลี่ยนเส้นทางไปยังหน้า Login
    return true;
}