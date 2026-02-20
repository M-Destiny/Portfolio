import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroScene from './components/3d/HeroScene';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  fork: boolean;
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.button 
          onClick={() => scrollTo('hero')}
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold tracking-tight"
        >
          <span className="text-white">d</span><span className="text-indigo-500">.</span>
        </motion.button>
        
        <div className="hidden md:flex gap-8">
          {['About', 'Work', 'Skills', 'Contact'].map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              whileHover={{ y: -2 }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" className="h-screen relative flex items-center justify-center overflow-hidden">
      <HeroScene />
      
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-indigo-400 text-sm tracking-[0.3em] mb-4 uppercase">
            Full Stack Developer
          </p>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl font-black mb-6 tracking-tight"
        >
          <span className="gradient-text">Destiny</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building digital experiences that push boundaries. 
          Specializing in modern web technologies and immersive interfaces.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          <motion.a 
            href="#work"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            View Work
          </motion.a>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-gray-700 rounded-full font-semibold hover:border-white transition-all"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-600 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-indigo-500 text-sm tracking-[0.2em] mb-4 uppercase">About</p>
          <h2 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">
            Crafting digital
            <br />
            <span className="gradient-text">experiences</span> that
            <br />
            matter.
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <div>
              <p className="text-xl text-gray-400 leading-relaxed">
                I'm a passionate developer with a keen eye for design and a love for creating 
                immersive web experiences. With expertise spanning from frontend to backend, 
                I bring ideas to life through clean code and creative solutions.
              </p>
              <p className="text-xl text-gray-400 leading-relaxed mt-6">
                Currently focused on building developer tools, multiplayer games, and 
                exploring the boundaries of web 3D experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: '15+', label: 'Projects' },
                { num: '3+', label: 'Years Exp' },
                { num: '10+', label: 'Technologies' },
                { num: '100%', label: 'Dedication' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass p-6 rounded-2xl"
                >
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.num}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Work() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/M-Destiny/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => {
        setRepos(data.filter((r: Repo) => !r.fork));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="work" className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-indigo-500 text-sm tracking-[0.2em] mb-4 uppercase">Selected Work</p>
          <h2 className="text-5xl md:text-7xl font-bold">Featured Projects</h2>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.slice(0, 6).map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group glass p-8 rounded-3xl block"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">
                    {repo.name}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {repo.stargazers_count}
                  </div>
                </div>
                <p className="text-gray-400 mb-6 line-clamp-3">
                  {repo.description || 'No description'}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                      {repo.language}
                    </span>
                  )}
                  <span>{repo.forks_count} forks</span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href="https://github.com/M-Destiny"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
          >
            View all projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind']
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'Socket.io', 'REST APIs']
    },
    {
      title: 'Tools',
      skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma']
    }
  ];

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-indigo-500 text-sm tracking-[0.2em] mb-4 uppercase">Expertise</p>
          <h2 className="text-5xl md:text-7xl font-bold">Skills & Technologies</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-bold mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-indigo-500 text-sm tracking-[0.2em] mb-4 uppercase">Get in Touch</p>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Let's create something <span className="gradient-text">amazing</span> together.
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          
          <div className="flex justify-center gap-6 mb-16">
            {[
              { name: 'GitHub', url: 'https://github.com/M-Destiny' },
              { name: 'LinkedIn', url: 'https://linkedin.com/in/destinymehul' },
              { name: 'Email', url: 'mailto:mehulr2801@gmail.com' }
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener"
                whileHover={{ scale: 1.1, y: -5 }}
                className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-indigo-500/20 transition-all"
              >
                {social.name === 'GitHub' && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                )}
                {social.name === 'LinkedIn' && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
                {social.name === 'Email' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </motion.a>
            ))}
          </div>
          
          <motion.a
            href="mailto:mehulr2801@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            Say Hello 👋
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Destiny. All rights reserved.
        </p>
        <p className="text-gray-500 text-sm">
          Built with React, Three.js & Framer Motion
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Work />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
