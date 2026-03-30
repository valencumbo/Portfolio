import React, { useState, useEffect, useRef, useContext, createContext } from 'react';

import clonwppImg from './assets/clonwpp.png';
import hostingerImg from './assets/hostinger.png';
import pekkoImg from './assets/pekko.png';
import perfumesImg from './assets/perfumes.png';
import barberiaImg from './assets/barberia.png';
import clinicaImg from './assets/clinica.png';

// --- SISTEMA DE TRADUCCION ---

const translations = {
    es: {
        navHome: 'Inicio',
        navProjects: 'Proyectos',
        navResume: 'CV',
        portfolioTitle: 'Mi portafolio',
        heroGreeting: 'Hola, soy',
        heroTitle: 'Desarrollador Front-End',
        heroDescription: 'Apasionado por crear interfaces de usuario interactivas y funcionales. Transformo ideas en experiencias web modernas y accesibles. Actualmente perfeccionando mis habilidades en el stack MERN.',
        heroButton: 'Ver mis proyectos',
        projectsTitle: 'Mis Proyectos',
        project1Title: 'Clon de Whatsapp',
        project1Desc: 'Este fue presentado como proyecto final de Front End en mi diplomatura FullStack en UTN. Estilo libre, aunque bastante fiel a la web original.',
        project2Title: 'Clon de Landing Page',
        project2Desc: 'Réplica de la landing page de Hostinger, enfocada en lograr un diseño pixel-perfect y totalmente responsive.',
        project4Title: 'Prototipo Landing Page Pekko',
        project4Desc: 'Prototipo de landing page para una empresa de insumos, con sistema de contacto y de verificación de certificados.',
        project5Title: 'Emprendimiento de Perfumes',
        project5Desc: 'Sitio web oficial de mi propio emprendimiento. Enfocado en la elegancia visual, catálogo de fragancias y una experiencia de usuario fluida para facilitar la compra.',
        project6Title: 'Sistema de Reservas (Barbería)',
        project6Desc: 'Sistema de reservas para barberías o centros de estética. Los clientes pueden agendar turnos dejando su email y WhatsApp, recibiendo confirmación automática por correo. Incluye un panel de administración para gestionar turnos manualmente y un acceso directo al chat de WhatsApp del cliente.',
        project7Title: 'Gestión de Clínica Dental',
        project7Desc: 'Proyecto final para la diplomatura Full Stack en UTN. Aplicación web end-to-end para la administración de pacientes, tratamientos y reservas de turnos. Desarrollada con el stack MERN, incluye seguridad con JWT y bcrypt, envío automatizado de correos y arquitectura backend por capas.',
        viewProject: 'Ver Proyecto',
        resumeTitle: 'Mi Currículum',
        downloadCV: 'Descargar CV',
        education: 'Educación',
        diploTitle: 'Diplomatura Full Stack Developer',
        diploSchool: 'Universidad Tecnologica Nacional (UTN)',
        diploDate: '2025 - Presente',
        degreeTitle: 'Ingenieria Informatica',
        degreeSchool: 'Universidad Nacional de Avellaneda (UNDAV)',
        degreeDate: '2022 - 2028 (Estimado de finalizacion)',
        experience: 'Experiencia',
        experienceDesc: 'Actualmente enfocado en proyectos personales y académicos para construir mi portafolio profesional.',
        languages: 'Idiomas',
        spanish: 'Español',
        native: 'Nativo',
        english: 'Ingles B2',
        englishCert: '[First Certificate in English (FCE)] | Cambridge Assessment English.',
        skills: 'Habilidades Técnicas',
        footerRights: 'Todos los derechos reservados.',
    },
    en: {
        navHome: 'Home',
        navProjects: 'Projects',
        navResume: 'Resume',
        portfolioTitle: 'My portfolio',
        heroGreeting: "Hi, I'm",
        heroTitle: 'Front-End Developer',
        heroDescription: 'Passionate about creating interactive and functional user interfaces. I transform ideas into modern and accessible web experiences. Currently perfecting my skills in the MERN stack.',
        heroButton: 'View my projects',
        projectsTitle: 'My Projects',
        project1Title: 'Whatsapp Clone',
        project1Desc: 'This was presented as the final Front-End project for my Full Stack diploma at UTN. Freestyle, although quite faithful to the original website.',
        project2Title: 'Landing Page Clone',
        project2Desc: 'A replica of the Hostinger landing page, focused on achieving a pixel-perfect and fully responsive design.',
        project4Title: 'Pekko Landing Page Prototype',
        project4Desc: 'Prototype of a landing page for a supplies company, featuring a contact system and a certificate verification system.',
        project5Title: 'Perfume Business Website',
        project5Desc: 'Official website for my own business. Focused on visual elegance, fragrance catalog, and a seamless user experience to facilitate sales.',
        project6Title: 'Booking System (Barbershop)',
        project6Desc: 'Reservation system for barbershops or beauty salons. Clients can book appointments using their email and WhatsApp, receiving automatic email confirmations. Includes an admin panel to manage appointments manually and a direct access button to the client\'s WhatsApp chat.',
        project7Title: 'Dental Clinic Management',
        project7Desc: 'Final project for the Full Stack diploma at UTN. End-to-end web app for managing patients, treatments, and appointment bookings. Built with the MERN stack, it features JWT/bcrypt security, automated email notifications, and a layered backend architecture.',
        viewProject: 'View Project',
        resumeTitle: 'My Resume',
        downloadCV: 'Download CV',
        education: 'Education',
        diploTitle: 'Full Stack Developer Diploma',
        diploSchool: 'National Technological University (UTN)',
        diploDate: '2025 - Present',
        degreeTitle: 'Computer Engineering',
        degreeSchool: 'National University of Avellaneda (UNDAV)',
        degreeDate: '2022 - 2028 (Estimated)',
        experience: 'Experience',
        experienceDesc: 'Currently focused on personal and academic projects to build my professional portfolio.',
        languages: 'Languages',
        spanish: 'Spanish',
        native: 'Native',
        english: 'English B2',
        englishCert: 'First Certificate in English (FCE) | Cambridge Assessment English.',
        skills: 'Technical Skills',
        footerRights: 'All rights reserved.',
    }
};

const LanguageContext = createContext();

const useTranslations = () => {
    const { language } = useContext(LanguageContext);
    return (key) => translations[language][key] || key;
};

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('es');
    const value = { language, setLanguage };
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// --- ÍCONOS SVG ---
const GithubIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path> </svg> );
const LinkedinIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path> <rect x="2" y="9" width="4" height="12"></rect> <circle cx="4" cy="4" r="2"></circle> </svg> );
const ExternalLinkIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path> <polyline points="15 3 21 3 21 9"></polyline> <line x1="10" y1="14" x2="21" y2="3"></line> </svg> );
const DownloadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="7 10 12 15 17 10"></polyline> <line x1="12" y1="15" x2="12" y2="3"></line> </svg> );
const TranslateIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="12" r="10"></circle> <line x1="2" y1="12" x2="22" y2="12"></line> <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path> </svg> );

// --- COMPONENTE DEL FONDO ANIMADO ---
const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();
        let particlesArray = [];
        const mouse = { x: null, y: null, radius: 100 };
        const handleMouseMove = (e) => { mouse.x = e.x; mouse.y = e.y; };
        window.addEventListener('mousemove', handleMouseMove);

        class Particle {
            constructor(x, y, dx, dy, size) {
                this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(107, 114, 128, 0.4)';
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
                if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
                let dist = Math.sqrt((mouse.x - this.x)**2 + (mouse.y - this.y)**2);
                if (dist < mouse.radius) {
                    if (mouse.x < this.x && this.x < canvas.width - 20) this.x += 2;
                    if (mouse.x > this.x && this.x > 20) this.x -= 2;
                    if (mouse.y < this.y && this.y < canvas.height - 20) this.y += 2;
                    if (mouse.y > this.y && this.y > 20) this.y -= 2;
                }
                this.x += this.dx; this.y += this.dy;
                this.draw();
            }
        }
        const init = () => {
            particlesArray = [];
            let n = (canvas.width * canvas.height) / 10000;
            for (let i = 0; i < n; i++) {
                let s = Math.random() * 2 + 1;
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let dx = (Math.random() - 0.5) * 0.8;
                let dy = (Math.random() - 0.5) * 0.8;
                particlesArray.push(new Particle(x, y, dx, dy, s));
            }
        };
        const connect = () => {
            for (let i = 0; i < particlesArray.length; i++) {
                for (let j = i; j < particlesArray.length; j++) {
                    let d = (particlesArray[i].x - particlesArray[j].x)**2 + (particlesArray[i].y - particlesArray[j].y)**2;
                    if (d < (canvas.width / 8) * (canvas.height / 8)) {
                        ctx.strokeStyle = `rgba(107, 114, 128, ${1 - d/20000})`;
                        ctx.lineWidth = 1; ctx.beginPath();
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }
        };
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => p.update());
            connect();
            requestAnimationFrame(animate);
        };
        window.addEventListener('resize', () => { setSize(); init(); });
        init(); animate();
        return () => { window.removeEventListener('mousemove', handleMouseMove); };
    }, []);
    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

const Header = ({ setView }) => {
    const t = useTranslations();
    const { language, setLanguage } = useContext(LanguageContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

    return (
        <header className="bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white tracking-wider cursor-pointer" onClick={() => setView('home')}>
                    {t('portfolioTitle')}<span className="text-cyan-400">.</span>
                </h1>
                <nav className="hidden md:flex items-center space-x-8">
                    <button onClick={() => setView('home')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">{t('navHome')}</button>
                    <button onClick={() => setView('projects')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">{t('navProjects')}</button>
                    <button onClick={() => setView('resume')} className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">{t('navResume')}</button>
                    <button onClick={toggleLanguage} className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2 border border-gray-700 px-3 py-1 rounded-md">
                        <TranslateIcon /> {language === 'es' ? 'EN' : 'ES'}
                    </button>
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-gray-900 border-b border-white/5 py-4">
                    <nav className="flex flex-col items-center space-y-4">
                        <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="text-gray-300 text-lg">{t('navHome')}</button>
                        <button onClick={() => { setView('projects'); setIsMenuOpen(false); }} className="text-gray-300 text-lg">{t('navProjects')}</button>
                        <button onClick={() => { setView('resume'); setIsMenuOpen(false); }} className="text-gray-300 text-lg">{t('navResume')}</button>
                        <button onClick={() => { toggleLanguage(); setIsMenuOpen(false); }} className="text-gray-300 flex items-center gap-2"> <TranslateIcon /> {language === 'es' ? 'EN' : 'ES'} </button>
                    </nav>
                </div>
            )}
        </header>
    );
};

const HeroSection = ({ setView }) => {
    const t = useTranslations();
    return (
        <section className="container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                {t('heroGreeting')} <span className="text-cyan-400">[Valentino Cumbo]</span>
            </h2>
            <h3 className="text-2xl md:text-3xl text-gray-300 font-semibold mb-6">{t('heroTitle')}</h3>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">{t('heroDescription')}</p>
            <button onClick={() => setView('projects')} className="bg-cyan-500 text-white font-bold py-4 px-10 rounded-full hover:bg-cyan-600 transition-all transform hover:scale-105 shadow-xl shadow-cyan-500/20">
                {t('heroButton')}
            </button>
        </section>
    );
};

const ProjectsSection = () => {
    const t = useTranslations();


    
    const projects = [
        { titleKey: "project6Title", descriptionKey: "project6Desc", tags: ["React", "FullStack", "Dashboard"], imageUrl: barberiaImg, liveUrl: "https://turnosbarberia.vercel.app", githubUrl: "https://github.com/valencumbo/turnosbarberia", },
        { titleKey: "project7Title", descriptionKey: "project7Desc", tags: ["MERN Stack", "Node.js", "JWT"], imageUrl: clinicaImg, liveUrl: "https://clinica-dental-frontend-five.vercel.app", githubUrl: "https://github.com/valencumbo/clinica-dental-frontend", },
        { titleKey: "project1Title", descriptionKey: "project1Desc", tags: ["React", "API Rest", "Tailwind CSS"], imageUrl: clonwppImg, liveUrl: "https://tpfinal-valentinocumbo.netlify.app", githubUrl: "https://github.com/valencumbo/PROYECTO-FINAL-FRONT", },
        { titleKey: "project2Title", descriptionKey: "project2Desc", tags: ["HTML5", "CSS3", "JavaScript"], imageUrl: hostingerImg, liveUrl: "https://valencumbo.github.io/HOSTINGER-TP-CUMBO", githubUrl: "https://github.com/valencumbo/HOSTINGER-TP-CUMBO", },
        { titleKey: "project4Title", descriptionKey: "project4Desc", tags: ["React", "JavaScript", "Tailwind CSS"], imageUrl: pekkoImg, liveUrl: "https://valencumbo.github.io/Pekko-prototipo-web", githubUrl: "https://github.com/valencumbo/Pekko-prototipo-web", },
        { titleKey: "project5Title", descriptionKey: "project5Desc", tags: ["E-commerce", "Visuals", "Business"], imageUrl: perfumesImg, liveUrl: "https://fraganciasvalentino.netlify.app",  githubUrl: "https://github.com/valencumbo/Fragancias-Valentino", }
    ];

    return (
        <section className="container mx-auto px-6 py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t('projectsTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((p, i) => (
                    <div key={i} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all transform hover:-translate-y-2 flex flex-col h-full">
                        <div className="h-56 w-full overflow-hidden bg-gray-700">
                            <img src={p.imageUrl} alt={t(p.titleKey)} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-white mb-3">{t(p.titleKey)}</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {p.tags.map(tag => <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">{tag}</span>)}
                            </div>
                            <p className="text-gray-400 text-sm mb-6 flex-grow">{t(p.descriptionKey)}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm font-bold flex items-center gap-2"> {t('viewProject')} <ExternalLinkIcon /> </a>
                                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><GithubIcon /></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const ResumeSection = () => {
    const t = useTranslations();
    const skills = ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Tailwind CSS", "Git", "Node.js (L)", "Responsive Design"];
    return (
        <section className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto bg-gray-800/40 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div>
                        <h3 className="text-4xl font-bold text-white mb-2">[Valentino Cumbo]</h3>
                        <p className="text-cyan-400 text-xl font-medium">{t('heroTitle')}</p>
                    </div>
                    <a href="/cv.pdf" download="Valentino_Cumbo_CV.pdf" className="mt-6 md:mt-0 bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-2xl border border-white/10 transition-all flex items-center gap-3 cursor-pointer">
                        {t('downloadCV')} <DownloadIcon />
                    </a>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-10">
                        <div>
                            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">{t('education')}</h4>
                            <div className="space-y-6">
                                <div><p className="font-bold text-white">{t('diploTitle')}</p><p className="text-gray-400 text-sm">{t('diploSchool')} | {t('diploDate')}</p></div>
                                <div><p className="font-bold text-white">{t('degreeTitle')}</p><p className="text-gray-400 text-sm">{t('degreeSchool')} | {t('degreeDate')}</p></div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">{t('experience')}</h4>
                            <p className="text-gray-400 text-sm italic leading-relaxed">{t('experienceDesc')}</p>
                        </div>
                    </div>
                    <div className="space-y-10">
                        <div>
                            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">{t('languages')}</h4>
                            <div className="space-y-4">
                                <div><p className="font-bold text-white">{t('spanish')}</p><p className="text-gray-400 text-sm">{t('native')}</p></div>
                                <div><p className="font-bold text-white">{t('english')}</p><p className="text-gray-400 text-sm">{t('englishCert')}</p></div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">{t('skills')}</h4>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(s => <span key={s} className="bg-white/5 text-gray-300 text-xs font-semibold px-3 py-2 rounded-lg border border-white/5">{s}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    const t = useTranslations();
    return (
        <footer className="bg-gray-950/50 py-12 border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center space-x-8 mb-6">
                    <a href="https://github.com/valencumbo" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors"><GithubIcon /></a>
                    <a href="https://www.linkedin.com/in/valentino-cumbo-063971257" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors"><LinkedinIcon /></a>
                </div>
                <p className="text-gray-500 text-sm">© {new Date().getFullYear()} [Valentino] {t('footerRights')}</p>
            </div>
        </footer>
    );
};

function App() {
    const { language } = useContext(LanguageContext);
    const [view, setView] = useState('home');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(false);
        const t = setTimeout(() => { setVisible(true); window.scrollTo(0,0); }, 150);
        return () => clearTimeout(t);
    }, [view, language]);

    return (
        <div className="bg-[#0a0f1a] min-h-screen font-sans selection:bg-cyan-500/30">
            <AnimatedBackground />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header setView={setView} />
                <main className={`flex-grow transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {view === 'projects' ? <ProjectsSection /> : view === 'resume' ? <ResumeSection /> : <HeroSection setView={setView} />}
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default function Main() {
    return <LanguageProvider><App /></LanguageProvider>;
}