// =============================================================================
// MDT312 Assignment 7  - Square Game
// Modern JavaScript: DOM, Event, Timer
// =============================================================================

// เมื่่อหน้าเว็บเพจโหลดสมบูรณ์แล้ว ให้เรียกทำงานฟังก์ชัน pageLoad
window.onload = pageLoad;

// ประกาศตัวแปรเก็บอ้างอิงของ Timer ในระดับ Global เพื่อให้ทุกฟังก์ชันจัดการสั่งหยุดหรือเคลียร์เวลาได้
let timer = null;

// ฟังก์ชันสำหรับเตรียมการทำงานของหน้าเว็บเมื่อเปิดขึ้นมาครั้งแรก
function pageLoad(){
 // 1. ผูกเหตุการณ์คลิกปุ่ม Start ด้วย const
 // ดึง Element ปุ่ม Start จาก ID "start" มาเก็บไว้ที่ตัวแปร startBtn
 const startBtn = document.getElementById("start");
 // เมื่อมีการคลิกที่ปุ่ม Start ให้เรียกทำงานฟังก์ชัน startGame
 startBtn.onclick = startGame;

 // 2. ใช้ Event Delegation (สไลด์หน้า 50–52):
 // ดึง Element กล่องแม่ที่มี ID "layer" มาเก็บไว้ในตัวแปร gameLayer
 const gameLayer = document.getElementById("layer");
 // ผูก event รับการคลิกไว้ที่กล่องแม่ #layer เพียงจุดเดียว
 gameLayer.onclick = function(event) {
  // ตรวจสอบว่า Element ที่ถูกคลิกจริง (event.target) มีคลาสชื่อ "square" หรือไม่
  if (event.target.classList.contains("square")) {
   // หากเป็นกล่องสี่เหลี่ยม ให้ทำการลบ Element นั้นออกจากหน้าจอ
   event.target.remove();
  }
 };
}

// ฟังก์ชันสำหรับเริ่มเกมใหม่เมื่อกดปุ่ม Start
function startGame(){
 // แสดงป๊อปอัปแจ้งเตือนว่าผู้เล่นพร้อมแล้ว
 alert("Ready");
 // ล้างกล่องเก่าที่อาจค้างอยู่ออกทั้งหมดก่อนเริ่มรอบใหม่
 clearScreen();
 // สุ่มสร้างกล่องสี่เหลี่ยมขึ้นมาใหม่ตามจำนวนและสีที่กำหนด
 addBox();
 // เริ่มการนับเวลาถอยหลัง 30 วินาที
 timeStart();
}

// ฟังก์ชันตั้งค่าและควบคุมตัวนับเวลาถอยหลัง
function timeStart(){
 // กำหนดรอบระยะเวลา 1,000 มิลลิวินาที (1 วินาที)
 const TIMER_TICK = 1000;
 // เคลียร์ timer เดิมก่อนเริ่มนับใหม่ เพื่อป้องกันการนับเวลาเร่งความเร็วเมื่อกด Start ซ้ำ
 if (timer !== null) {
  // ยกเลิก Interval เดิมที่กำลังทำงานอยู่
  clearInterval(timer);
  // รีเซ็ตค่าตัวแปร timer กลับเป็น null
  timer = null;
 }

 // กำหนดเวลา 0.5 นาที (30 วินาที) ตามเงื่อนไขของเกม
 const min = 0.5;
 // แปลงนาทีให้กลายเป็นหน่วยวินาที (0.5 * 60 = 30 วินาที)
 let second = min * 60; 
 // ดึง Element สำหรับแสดงตัวเลขเวลาจาก ID 'clock'
 const clockDisplay = document.getElementById('clock');
 // แสดงเวลาเริ่มต้น (30) ลงบนหน้าจอ
 clockDisplay.textContent = second;
 
 // ตั้งเวลาด้วย setInterval ให้เรียกฟังก์ชัน timeCount ทุกๆ 1 วินาที (สไลด์หน้า 12)
 timer = setInterval(timeCount, TIMER_TICK);
 
 // ฟังก์ชันภายในสำหรับคำนวณและตรวจสอบเงื่อนไขการจบเกมในแต่ละวินาที
 function timeCount(){
  // ดึงรายการกล่อง <div> ทั้งหมดที่ยังอยู่ในพื้นที่ #layer
  const allbox = document.querySelectorAll("#layer div");
  
  // จัดการเกี่ยวกับเวลาตามเงื่อนไขโจทย์:
  // 1. ถ้าไม่มีกล่องเหลือแล้ว (ลบหมด) และเวลายังเหลือมากกว่า 0 วินาที จะขึ้นว่า You win!
  if (allbox.length === 0 && second > 0) {
   // แจ้งเตือนข้อความว่า ชนะแล้ว
   alert("You win!");
   // สั่งหยุดการนับถอยหลังของ Timer
   clearInterval(timer);
   // คืนค่า timer กลับเป็น null
   timer = null;
   // เคลียร์ข้อความตัวเลขบนหน้าจอแสดงผลเวลา
   clockDisplay.textContent = "";
  } 
  // 2. ถ้าเวลาหมด (0 วินาที) แต่ยังมีกล่องเหลืออยู่ จะบอกว่า Game over และทำการ clear screen
  else if (second === 0 && allbox.length > 0) {
   // แจ้งเตือนข้อความว่า แพ้เกมแล้ว
   alert("Game over");
   // สั่งหยุดการนับถอยหลังของ Timer
   clearInterval(timer);
   // คืนค่า timer กลับเป็น null
   timer = null;
   // ลบกล่องสี่เหลี่ยมทั้งหมดออกจากหน้าจอ
   clearScreen();
   // เคลียร์ข้อความตัวเลขบนหน้าจอแสดงผลเวลา
   clockDisplay.textContent = "";
  } 
  // 3. ถ้ายังมีกล่องเหลืออยู่ และเวลายังไม่หมด เวลาจะลดลงเรื่อยๆ
  else if (second > 0) {
   // ลดค่าเวลาลง 1 วินาที
   second--;
   // อัปเดตตัวเลขเวลาที่เหลือแสดงบนหน้าจอ
   clockDisplay.textContent = second;
  }
 }
}

// ฟังก์ชันสำหรับสร้างกล่องสี่เหลี่ยมและสุ่มตำแหน่งบนหน้าจอ
function addBox(){
 // อ่านค่าจำนวนกล่องจากช่องใส่ตัวเลข #numbox (แปลงเป็นตัวเลข int หากไม่มีค่าให้เป็น 0)
 const numbox = parseInt(document.getElementById("numbox").value) || 0;
 // ดึง Element พื้นที่สำหรับวางกล่อง #layer
 const gameLayer = document.getElementById("layer");
 // ดึงค่าสีที่เลือกจากตัวเลือก Dropdown #color
 const colorDrop = document.getElementById("color").value;
 
 // วนลูปสร้างกล่องตามจำนวน numbox ที่กำหนด
 for (let i = 0; i < numbox; i++){
  // สร้างแท็ก <div> ใหม่ขึ้นมาในระบบ DOM
  const tempbox = document.createElement("div"); 
  // กำหนดคลาสเป็น "square" ต่อด้วยชื่อสีที่เลือก (เช่น "square red")
  tempbox.className = "square " + colorDrop;   
  // กำหนด ID ให้แต่ละกล่องไม่ซ้ำกัน เช่น box0, box1, box2
  tempbox.id = "box" + i;
  // สุ่มตำแหน่งแนวนอน (left) ให้อยู่ในกรอบ 500x500px (หักลบขนาดกล่อง 25px)
  tempbox.style.left = Math.random() * (500 - 25) + "px";
  // สุ่มตำแหน่งแนวตั้ง (top) ให้อยู่ในกรอบ 500x500px (หักลบขนาดกล่อง 25px)
  tempbox.style.top = Math.random() * (500 - 25) + "px";
  
  // เพิ่มโหนดกล่องสี่เหลี่ยมเข้าไปใน #layer เพื่อแสดงบนหน้าเว็บ
  gameLayer.appendChild(tempbox);
 }
}

// ฟังก์ชันสำหรับลบกล่องสี่เหลี่ยมทั้งหมดออกจากหน้าจอ
function clearScreen(){
 // ดึง NodeList ของกล่องสี่เหลี่ยม <div> ทั้งหมดภายใน #layer (สไลด์หน้า 29)
 const allbox = document.querySelectorAll("#layer div");
 // วนลูปทีละกล่องเพื่อลบออกจากหน้าจอ
 for (let i = 0; i < allbox.length; i++) {
  // สั่งลบโหนดกล่องลำดับที่ i ออกจาก DOM
  allbox[i].remove();
 }
}