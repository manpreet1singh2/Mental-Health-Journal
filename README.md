# Mental Health Journal

A beautiful, AI-powered journaling application that helps users understand their emotional state and improve mental wellbeing through regular reflection.

![Mental Health Journal Screenshot]([/placeholder.svg?height=400&width=800](https://v0-new-project-pa77fmpbxit.vercel.app/))

## Features

### Core Functionality
- **AI-Powered Emotion Analysis**: Uses Groq's LLama3 model to analyze journal entries and identify emotional states
- **Daily Journal Entries**: Write about your thoughts, feelings, and experiences
- **Structured Journal Templates**: Choose from various templates like Gratitude, Reflection, Stress Management, and more
- **Voice Input**: Record your thoughts using speech-to-text functionality
- **Emoji-Based Quick Mood Logging**: Quickly log your mood with emoji selection
- **Weekly Mood Chart**: Visualize emotional trends over time
- **Streak System**: Track consecutive days of journaling
- **Personalized Self-Care Tips**: Receive customized suggestions based on your emotional state

### Journal Templates
- **Free Writing**: Express your thoughts freely without any structure
- **Gratitude Journal**: Focus on appreciation and positive aspects of your life
- **Daily Reflection**: Reflect on your experiences and emotions
- **Stress Management**: Track and manage your stress levels
- **Goal Setting**: Set intentions and track your progress
- **Self-Compassion**: Practice kindness and understanding toward yourself

### User Experience
- **Beautiful UI**: Clean, modern interface with animations and visual feedback
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works on all devices from mobile to desktop
- **Animated Background**: Calming, subtle animations in the background
- **Journal Prompts**: Inspiration for daily reflection
- **Milestone Celebrations**: Confetti animations for streak milestones

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **UI Components**: shadcn/ui component library
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts for data visualization
- **AI Integration**: Groq API with AI SDK
- **State Management**: React Hooks
- **Storage**: Browser localStorage for data persistence

## Getting Started

### Prerequisites
- Node.js 18.0.0 or later
- Groq API key

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/mental-health-journal.git
   cd mental-health-journal
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env.local` file in the root directory and add your Groq API key:
   \`\`\`
   GROQ_API_KEY=your_groq_api_key_here
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Choose Your Journaling Method**:
   - **Free Writing**: Type your thoughts freely
   - **Templates**: Select a structured template for guided journaling
   - **Quick Mood**: Use the emoji selector for a quick mood log

2. **Complete Your Journal Entry**: Follow the prompts or write freely about your day

3. **View Analysis**: After submitting, view your emotional analysis and personalized self-care tips

4. **Track Progress**: Monitor your mood trends and journaling streak

## Privacy and Data Storage

All journal entries and emotional analyses are stored locally in your browser's localStorage. No data is sent to external servers except for the text analysis which is processed by the Groq API.

## Future Enhancements

- User authentication for secure cloud storage
- Export functionality for journal entries
- More detailed emotion trend analysis
- Additional journal templates
- Mobile app version
- Social sharing of insights (optional)
- Integration with other mental health resources

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Groq for providing the AI model API
- shadcn/ui for the beautiful component library
- All contributors and users of this application

---

Built with ❤️ for better mental health
