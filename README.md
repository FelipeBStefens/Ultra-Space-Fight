# 🚀 Ultra Space Fight

## **[Play Now](http://felipebstefens.github.io/Ultra-Space-Fight)** 

## 👨‍💻 School Project - Integrative Project

This project, **"Ultra Space Fight"**, was developed as part of the **Integrative Project** curriculum at **IFSul (Federal Institute of Education, Science and Technology of Rio Grande do Sul), Sapucaia do Sul Campus**.

The main objective of the Projeto Integrador was to implement and integrate two core components, showcasing essential skills in backend development:

* **Database Implementation:** Creating and managing a **MySQL** database.
* **Server Development:** Building a server in **Java** using **pure JDBC** (Java Database Connectivity) for database communication.

---

## 🌌 About Ultra Space Fight

**Ultra Space Fight** is a classic-style **spaceship game** that draws inspiration from timeless arcade hits like **Space Invaders** and **Asteroids**.

### Game Concept

In the game, the player takes control of a single spacecraft, facing off against an endless barrage of enemies.

* **Gameplay:** Control your ship, move, and fire to destroy incoming adversaries.
* **Action:** Enemies appear from all sides, requiring quick reflexes and strategic shooting.
* **Challenge:** The game features increasing difficulty and includes intense **boss fights** to test your piloting and combat skills.

The project blends the fun and challenge of old-school arcade shooters with the technical implementation of modern backend systems.

---

## 🚀 The Ships

Players can choose from 5 distinct ships, each with unique stats and combat styles:

| Ship Name | Key Features | Attack Pattern | Stats Profile |
| :--- | :--- | :--- | :--- |
| **Standart Ship** | Basic, balanced starter ship. | Single small shot. | Low Health, Low Speed, Low Damage. |
| **Speed Ship** | Designed for swift movement and agility. | Dual small shots. | High Speed. |
| **Destroyer Ship** | Focuses on raw firepower. | Triple small shots. | High Damage. |
| **Freighter Ship** | Built for endurance and heavy defense. | Dual large shots. | High Health. |
| **Elite Ship** | The top-tier choice, excelling in all areas. | Triple large shots. | High Health, High Speed, High Damage. |

---

## 👾 The Enemies

The player will face various enemy types, each presenting a different threat and requiring specific tactics:

### Standard Enemies

* **Scout Enemy:** A basic threat. It has no long-range attack and is defeated upon collision with the player.
* **Soldier Enemy:** A ranged combatant. This enemy keeps its distance and fires shots at the player.
* **Tank Enemy:** A highly durable enemy. It approaches the player and attacks, featuring significantly high health.
* **Elite Enemy:** A dangerous long-range threat. It stays very far from the player and fires a powerful triple-shot pattern.

### Bosses

The game features two formidable bosses that represent major challenges:

* **Battle Cruiser:** A fast boss that circles the screen, unleashing a rapid 5-shot attack pattern.
* **Space Dreadnought:** An enormous, stationary boss positioned at the top of the screen. It attacks using two powerful turrets and continuously spawns smaller enemies.

---

## ⭐ Achievements System

The game rewards players' dedication and skill with an integrated achievement system. These goals are tracked and categorized into three tiers: **Bronze**, **Silver**, and **Gold**.

The tracked achievements include:

* **Total Score:** Accumulated lifetime score across all matches.
* **Match Score:** Highest score achieved in a single game session.
* **Enemies Defeated:** Total quantity of all standard enemies destroyed.
* **Elite Enemies Defeated:** Total count of the powerful Elite Enemies destroyed.
* **Bosses Defeated:** Total count of major Boss encounters won.

---

## 👥 Contributors

This project was a collaborative effort by:

* **[Felipe Bianchi Stefens](https://github.com/FelipeBStefens)**
* **[Luís Henrique Silva de Souza](https://github.com/Luis-Henrique-Silva-de-Souza)**

---

## 🛠️ Technologies Used (Focus of the Project)

The project is structured around three main components: Database, Backend Server, and Frontend/Game, utilizing a modern CI/CD approach for deployment.

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Database** | **MySQL** (DBMS) | Stores game data, such as high scores, user information, and persistence logic. |
| | **SQL** (Language) | Used for querying and manipulating data. |
| | **Aiven** (Deploy) | Cloud platform used for managed database deployment. |
| **Backend** | **Java** (Language) | Core language for the server logic. |
| | **Spring Boot** (Framework) | Provides a robust and fast way to build the standalone server API. |
| | **Render** and **Docker** (Deploy) | Used for containerization and cloud hosting of the Java application. |
| **Frontend/Game** | **HTML, CSS, JS** (Languages) | Core web technologies used to build the game and interface (client-side). |
| | **GitHub Actions** and **GitHub Pages** (Deploy) | Automated deployment workflow for hosting the game publicly. |
