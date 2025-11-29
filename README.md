# 🎮 Tetris Game – HTML, CSS, JavaScript

A fully functional **Tetris game** built using **HTML Canvas**, **CSS**, and **JavaScript**.

Includes:
- Pause & Resume  
- Increasing Speed / Difficulty  
- Score System  
- Collision & Rotation  

---

## 🚀 Demo
 https://adityapaliwal2.github.io/Tetris-Game/
---

## 📂 Project Structure

📁 tetris-game/
│── index.html
│── style.css
│── script.js
│── README.md

---

## 🕹 Controls

| Key | Action |
|-----|--------|
| ⬅️ | Move Left |
| ➡️ | Move Right |
| ⬆️ | Rotate |
| ⬇️ | Soft Drop |
| P (optional) | Pause |
| R (optional) | Restart |

---
## 🧠 How It Works

### 🎨 Canvas Rendering
The game uses HTML Canvas with `fillRect()` to draw:
- The grid 
- Active piece  
- Locked blocks  

### 🧱 Collision Detection
Before moving or rotating a piece, checks:
- Walls  
- Floor  
- Other blocks  

### 🔁 Game Loop
A `setInterval()` handles gravity.  
When speed changes, the loop restarts automatically.

---

## 🔧 Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/tetris-game.git

