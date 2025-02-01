# MediChat - AI-Powered Medical Assistant

MediChat is an intelligent medical chatbot that leverages advanced AI technology to provide reliable medical information and assistance. Built with modern web technologies and powered by the Google FLAN-T5-Large language model, MediChat offers a user-friendly interface for medical queries and consultations.

🔗 **Live Demo**: [https://vermillion-pie-3a5103.netlify.app/](https://vermillion-pie-3a5103.netlify.app/)

> **Disclaimer**: MediChat is an AI assistant and should not replace professional medical advice. Always consult with qualified healthcare professionals for medical decisions.

## 🚀 Features

- **AI-Powered Responses**: Utilizes Google's FLAN-T5-Large model for accurate and contextual medical information
- **Secure Authentication**: User authentication and data protection powered by Supabase
- **Real-time Chat Interface**: Smooth and responsive chat experience
- **Chat History**: Persistent chat history for registered users
- **Modern UI/UX**: Clean and intuitive interface built with React and Tailwind CSS

## 🛠️ Technologies Used

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Vite (Build tool)

### Backend & Services
- Supabase (Authentication & Database)
- Hugging Face API (FLAN-T5-Large model)

### Development Tools
- ESLint
- PostCSS
- TypeScript ESLint

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Hugging Face API key

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medichat.git
   cd medichat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_HUGGING_FACE_API_KEY=your_hugging_face_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔒 Security

- Secure user authentication via Supabase
- Protected API endpoints
- Environment variables for sensitive data
- Row Level Security (RLS) in Supabase

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
