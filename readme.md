# 🏠 SamRooms - AirBNB Clone

Welcome to **SamRooms**, a full-stack AirBNB-inspired web application for listing, signup,reviews, searching(will be available soon), and booking(will be available soon) unique places to stay!  
Built with Node.js, Express, MongoDB, EJS, and Cloudinary.

![SamRooms Banner](https://github.com/sanket-singh-sameer/SamRooms/blob/5bc6af29176648d0b1488954f7de6130c21a4963/assets/readme/banner.png?raw=true)

---

## 🚀 Features

- 📝 **User Authentication** (Sign Up, Login, Logout)
- 🏡 **Create, Edit, Delete Listings** with image upload (Cloudinary)
- 🔍 **Search Listings** by destination (will add this feature soon)
- 💬 **Review System** for listings
- 🛡️ **Authorization** (Only owners can edit/delete their listings)
- 📱 **Responsive Design** (Mobile-friendly UI)
- ⚡ **Flash Messages** for user feedback
- 🌩️ **Image Uploads** with file size/type validation

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap 5
- **Authentication:** Passport.js
- **Image Storage:** Cloudinary, Multer
- **Session Store:** connect-mongo
- **Validation:** Joi/Zod (Not implemented as of now)
- **Architecture:** MVC (Model-View-Controller) pattern

---

## 📸 Screenshots

![SamRooms Banner](https://github.com/sanket-singh-sameer/SamRooms/blob/5bc6af29176648d0b1488954f7de6130c21a4963/assets/readme/listingPage.png?raw=true)

![SamRooms Banner](https://github.com/sanket-singh-sameer/SamRooms/blob/5bc6af29176648d0b1488954f7de6130c21a4963/assets/readme/showPage.png?raw=true)

![SamRooms Banner](https://github.com/sanket-singh-sameer/SamRooms/blob/5bc6af29176648d0b1488954f7de6130c21a4963/assets/readme/newPage.png?raw=true)

---

## 🌟 Inspiration

Inspired by the amazing user experience and business model of AirBNB, I wanted to challenge myself to recreate a similar platform from scratch and learn the full stack development process.

---

## 🙏 Special Thanks To

- The open source community and countless online tutorials.
- My friends and mentors for their support and feedback.
- [Apna College](https://www.youtube.com/@ApnaCollegeOfficial) for foundational knowledge.

---

## 🔗 Project Links

- **Live Demo:** [https://samrooms.onrender.com](https://samrooms.onrender.com/listings)
- **GitHub Repository:** [https://github.com/sanket-singh-sameer/SamRooms](https://github.com/sanket-singh-sameer/SamRooms)

---

## ⚠️ Please Note

**Do not abuse the web app!**  
SamRooms is hosted on free-tier services (Render, Cloudinary, MongoDB Atlas) and may have usage limits or downtime. The app is for learning and demonstration purposes only.

---

## 🧑‍💻 Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/sanket-singh-sameer/SamRooms.git
    cd SamRooms
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and add:
    ```
    CLOUD_NAME=your_cloudinary_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    MONGO_ATLAS=your_mongodb_connection_string
    SESSION_SECRET=your_session_secret
    NODE_ENV=development
    ```

4. **Run the app**
    ```bash
    node app.js
    ```
    Visit [http://localhost:8080](http://localhost:8080)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

**Sanket Singh Sameer**  
[Portfolio](https://sanket-singh-sameer.github.io/) | [GitHub](https://github.com/sanket-singh-sameer)

---

> ⭐️ If you like this project, give it a star on GitHub! It helps me a lot.