import { useEffect, useRef, useState } from 'react'
import './App.css'

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Kareem Qadry',
    role: 'Frontend Developer',
    image: '/team/person1.jpg'
  },
  {
    id: 2,
    name: 'Ahmed Abdeen',
    role: 'Frontend Developer',
    image: '/team/person2.jpg'
  },
  {
    id: 3,
    name: 'Youssef Asharf',
    role: 'Backend Developer',
    image: '/team/person3.jpg'
  },
  {
    id: 4,
    name: ' Ziad Ayman',
    role: 'Backend Developer',
    image: '/team/person4.jpg'
  },
  {
    id: 5,
    name: 'Ahmed Abd Elhalim',
    role: 'UI/UX Designer',
    image: '/team/person5.jpg'
  },
  {
    id: 6,
    name: 'Ahmed Afify',
    role: 'Frontend Developer',
    image: '/team/person6.jpg'
  }
]

// Animated background component
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-500" />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}

// Team card component with animations
function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect behind card */}
      <div 
        className={`absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-2xl blur-xl transition-all duration-500 ${
          isHovered ? 'opacity-60 scale-105' : 'opacity-0 scale-100'
        }`}
      />
      
      {/* Card */}
      <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          
          {/* Gradient overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-80' : 'opacity-60'
            }`}
          />
          
          {/* Shimmer effect on hover */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000 ${
              isHovered ? 'translate-x-full' : ''
            }`}
          />
        </div>

        {/* Content */}
        <div className="relative p-6 text-center">
          {/* Animated line */}
          <div 
            className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent transition-all duration-500 ${
              isHovered ? 'w-3/4' : 'w-0'
            }`}
          />
          
          <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
            isHovered ? 'text-cyan-400' : 'text-white'
          }`}>
            {member.name}
          </h3>
          
          <p className="text-slate-400 font-medium">
            {member.role}
          </p>
          
          {/* Social icons that appear on hover */}
          <div 
            className={`flex justify-center gap-3 mt-4 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Animated title component
function AnimatedTitle() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200)
  }, [])

  return (
    <div className="text-center mb-16">
      <div 
        className={`inline-block transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 relative">
          <span className="bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            فريقنا
          </span>
          {/* Underline animation */}
          <span 
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 delay-500 ${
              isVisible ? 'w-24' : 'w-0'
            }`}
          />
        </h1>
      </div>
      
      <p 
        className={`text-slate-400 text-lg max-w-2xl mx-auto mt-6 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <br />
      </p>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-900 relative" dir="rtl">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-between items-center">
              <div className="text-2xl font-bold text-white">
                <span className="text-blue-400">FCAI</span> Team
              </div>
              <div className="hidden md:flex gap-6">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">الرئيسية</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">عن الفريق</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">تواصل معنا</a>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedTitle />
          
          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-slate-500 text-sm">
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
