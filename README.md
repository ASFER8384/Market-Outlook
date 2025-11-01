🔷 Instructions

- The project is deployed on Vercel. To run it locally, please follow these steps:

- Clone the repository from GitHub.

- Install the dependencies using npm install.

- Create a .env.local file in the root directory.

- Add your [database](.env.local) connection string to .env.local.

- Start the development server with npm run dev.




🔷 Time Spend - 20hrs to 28hrs




🔷 Project Overview

This project enables users to log in and add notes in real time. All data is securely stored in a MongoDB database, and routes are protected with authentication. Key features include:

🔐 Authentication: Users can only access their own notes; unauthorized access is blocked.

📂 Protected Routes: If not logged in, users are restricted from accessing any protected URLs.

📋 Notes Feature: Users can create and manage notes dynamically.

📅 Dynamic Dashboard: Weeks are calculated dynamically based on the stored data.

💻 UI/UX: Simple, functional, and slightly responsive UI.

⚙️ Pending Work: A few minor features are pending due to time constraints.




👨‍💻 About Me

- I’m a certified MERN stack developer with hands-on experience in frontend development. 

- In my previous role at Urbanrise Constructions Pvt Ltd, one of South India’s largest firms

- Contributed to multiple products with real-time functionality.

- Earned recognition for implementing innovative ideas.

- Specialized in frontend development while also handling backend logic.

- Used Figma for design handoffs and visual planning.

- Currently focusing on product design with a practical, result-driven mindset.




📁 Folder Structure

| Folder/File            | Description                         |
| ---------------------- | ----------------------------------- |
| `src/`                 | Root source folder                  |
| ├── `app/`             | Application-specific folders        |
| ├──── `api/`           | API route handlers                  |
| ├──── `components/`    | Page-level reusable UI components   |
| └──── `pages/`         | (Optional) Next.js pages            |
| `components/`          | Globally shared reusable components |
| `lib/`                 | Library utilities and helpers       |
| └── `mongodb.js`       | MongoDB connection setup            |
| `models/`              | Mongoose schemas                    |
| ├──── `userSchema.js`  | User schema                         |
| └──── `notesSchema.js` | Notes schema                        |
| `redux/`               | Redux Toolkit related code          |
| └── `apiSlice.js`      | API calls and queries               |





🛠️ Tech Stack

- Next.js – Full-stack framework for SSR and API routes

- MongoDB – NoSQL database to store users and notes

- Tailwind CSS – Utility-first CSS framework




📦 Dependencies Used

| Dependency        | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| **Redux Toolkit** | Simplified global state management & API calls |
| **bcrypt**        | Secure password hashing                        |
| **date-fns**      | Date manipulation and formatting               |
| **dotenv**        | Environment variable management                |
| **jsonwebtoken**  | JWT-based secure user authentication           |
| **lucide-react**  | Icon set for UI components                     |
| **mongoose**      | MongoDB ODM and schema handling                |
| **notistack**     | Toast message handling with notifications      |




🔌 API Testing

- Use Postman to test API endpoints
- 🔗 [Postman Workspace Link](https://martian-robot-496005.postman.co/workspace/Team-Workspace~6de5bd93-27bf-4d69-8b7b-1fe94007fca7/request/32018086-32635c1d-5689-40d8-94e2-98ddb21b5751)




🚀 Hosting

- App is live on Vercel
- 🔗 [Live App](https://ten-twenty-two.vercel.app/login)




📝 Final Note

- Every detail in this document and on my resume reflects real experiences and work. If this aligns with your expectations, I’d be happy to have a detailed conversation soon.





