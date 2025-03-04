import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Brain, Search, Filter, ArrowRight, Download, UserPlus, MapPinned, CreditCard, Star, ChevronDown, Smartphone, Award, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Footer } from './components/Footer';
import React, { useState, useEffect, useRef } from 'react';

// Add responsive viewport meta tag to the HTML file
// <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

// Updated Image Carousel Component with better responsiveness
const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const images = [
    {
      src: "src/images/team/view-basketball-court.jpg",
      alt: "Basketball court",
      title: "Premium Basketball Courts",
      description: "State-of-the-art indoor courts with professional flooring"
    },
    {
      src: "src/images/team/ten.jpg",
      alt: "Tennis court",
      title: "Championship Tennis Courts",
      description: "Well-maintained courts for players of all skill levels"
    },
    {
      src: "https://images.unsplash.com/photo-1546717003-caee5f93a9db?q=80&w=3178&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Soccer field",
      title: "Professional Soccer Fields",
      description: "Full-size and training fields with perfect turf conditions"
    },
    {
      src: "src/images/team/swim.jpg",
      alt: "Swimming pool",
      title: "Swimming Pools",
      description: "Temperature-controlled pools with lap swimming lanes"
    }
  ];

  // Auto advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage, isTransitioning]);

  const goToNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToSpecific = (index) => {
    if (currentImage === index || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentImage(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      goToNext();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      goToPrev();
    }
  };

  return (
      <div className="relative z-10 rounded-3xl border-4 sm:border-8 border-navy-800 overflow-hidden bg-navy-800 h-full w-full">
        {/* Shadow effect */}
        <div className="absolute -inset-4 bg-black/20 blur-xl -z-40 opacity-50"></div>

        {/* Carousel container */}
        <div
            className="relative h-full w-full overflow-hidden z-10"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
          {/* Images */}
          {images.map((image, index) => (
              <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                      currentImage === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                />

                {/* Content overlay */}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent flex flex-col justify-end pb-6 sm:pb-12 p-4 sm:p-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 sm:p-3 border border-white/20 self-start w-full xs:w-5/6 sm:w-3/4 md:w-2/3 lg:w-2/3">
                    <h3 className="text-lg xs:text-xl md:text-2xl lg:text-3xl font-bold mb-1 text-white">{image.title}</h3>
                    <p className="text-stone-200 text-xs xs:text-sm lg:text-base mb-2">{image.description}</p>
                    <button
                        className="mt-1 sm:mt-2 bg-navy-600 hover:bg-navy-700 transition-colors px-2 sm:px-3 py-1 rounded-lg text-xs md:text-sm font-medium text-white">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
          ))}

          {/* Navigation arrows - Responsive sizing */}
          <button
              onClick={goToPrev}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md z-20 rounded-full p-1 sm:p-2 transition-all"
              aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6"/>
          </button>

          <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md z-20 rounded-full p-1 sm:p-2 transition-all"
              aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6"/>
          </button>

          {/* Indicator dots */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
            {images.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSpecific(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                        currentImage === index ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                />
            ))}
          </div>

          {/* Status indicator */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 bg-black/50 backdrop-blur-md rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-white">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      </div>
  );
};

const AISearchSection = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const sectionRef = useRef(null);

  // Predefined search query
  const searchQuery = "Basketball court near me with parking";

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Start typing effect
            let currentIndex = 0;
            const typeText = () => {
              if (currentIndex <= searchQuery.length) {
                setSearchText(searchQuery.slice(0, currentIndex));
                currentIndex++;
                setTimeout(typeText, 100);
              } else {
                // Show results after typing is complete
                setTimeout(() => {
                  setShowResults(true);
                }, 500);
              }
            };
            typeText();
          }
        },
        { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Sample search results
  const searchResults = [
    {
      title: "Indoor Basketball Court with Parking",
      location: "Colombo Central Sports Hub",
      distance: "2.3 miles away",
      available: "5 courts available",
      amenities: ["Showers", "Parking", "Equipment Rental"],
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=200&h=120"
    },
    {
      title: "Premium Basketball Courts",
      location: "Nugegoda Sports Complex",
      distance: "3.7 miles away",
      available: "3 courts available",
      amenities: ["Showers", "Parking", "Locker Room"],
      rating: 4.5,
      image: "src/images/team/basket.jpg"
    }
  ];

  return (
      <section
          ref={sectionRef}
          className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 ${isDarkMode ? 'bg-navy-800/50' : 'bg-navy-100'} relative overflow-hidden`}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-navy-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-stone-500/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-5xl">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-8 sm:mb-12 md:mb-16 text-center"
          >
          <span className={`inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full ${isDarkMode ? 'bg-white/10 text-stone-300' : 'bg-navy-700/10 text-navy-800'} text-xs sm:text-sm font-semibold mb-3 md:mb-4`}>
            AI-POWERED SEARCH
          </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
              Find Your <span className={isDarkMode ? "text-stone-300 underline decoration-navy-500 underline-offset-8" : "text-navy-600 underline decoration-navy-400 underline-offset-8"}>Perfect</span> Venue
            </h2>
            <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-stone-300' : 'text-navy-700'} max-w-3xl mx-auto`}>
              Our intelligent search understands natural language and knows exactly what you're looking for.
            </p>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
          >
            {/* Enhanced AI Search Interface */}
            <div className={`rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl ${isDarkMode ? 'bg-navy-700/70 backdrop-blur-lg border border-white/10' : 'bg-white border border-navy-200'}`}>
              {/* Search header */}
              <div className={`px-4 sm:px-6 md:px-8 py-4 sm:py-6 ${isDarkMode ? 'bg-navy-800/80 border-b border-white/10' : 'bg-navy-50/50 border-b border-navy-100'}`}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-navy-600' : 'bg-navy-100'}`}>
                      <Brain className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-white' : 'text-navy-700'}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>AI Search</h3>
                      <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-stone-300' : 'text-navy-600'}`}>Ask naturally, get perfect results</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main search area */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Search input with typing effect */}
                <div className={`relative mb-4 sm:mb-6 transition-all duration-300 group ${isDarkMode ? 'hover:shadow-navy-500/30 hover:shadow-lg' : 'hover:shadow-lg'}`}>
                  <div className={`absolute inset-y-0 left-0 pl-3 sm:pl-5 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-navy-500`}>
                    <Search className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-stone-400' : 'text-navy-400'}`} />
                  </div>

                  {/* Input with typewriter effect */}
                  <div
                      className={`w-full pl-10 sm:pl-14 pr-4 sm:pr-36 py-3 sm:py-5 rounded-lg sm:rounded-xl ${
                          isDarkMode
                              ? 'bg-navy-800/50 border border-white/10 text-white'
                              : 'bg-navy-50/30 border border-navy-100 text-navy-800'
                      } focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-navy-500/30' : 'focus:ring-navy-500/20'} transition-all duration-300 flex items-center h-12 sm:h-16`}
                  >
                    <span className="min-h-[20px] sm:min-h-[24px] text-sm sm:text-base">{searchText}</span>
                    <span
                        className={`ml-0.5 inline-block w-1 sm:w-2 h-4 sm:h-5 bg-current ${
                            searchText.length < searchQuery.length ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-200`}
                    ></span>
                  </div>
                </div>

                {/* Search results */}
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`rounded-lg sm:rounded-xl p-3 sm:p-6 mb-4 sm:mb-6 ${isDarkMode ? 'bg-navy-800/70 border border-white/5' : 'bg-navy-50/50 border border-navy-100'}`}
                    >
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h4 className={`text-sm sm:text-base font-bold ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                          Search results for "{searchQuery}"
                        </h4>
                        <div className={`text-xs px-2 py-0.5 sm:py-1 rounded-full ${isDarkMode ? 'bg-navy-600/50 text-stone-300' : 'bg-navy-100 text-navy-700'}`}>
                          {searchResults.length} results found
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {searchResults.map((result, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.2 }}
                                className={`p-3 sm:p-4 rounded-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                                    isDarkMode
                                        ? 'hover:bg-navy-700 border border-white/10'
                                        : 'hover:bg-white border border-navy-100/50 hover:shadow-md'
                                }`}
                            >
                              <div className="flex gap-3 sm:gap-4">
                                <div className="w-20 h-16 sm:w-24 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                  <img
                                      src={result.image}
                                      alt={result.title}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src = "/api/placeholder/100/80";
                                      }}
                                  />
                                </div>
                                <div className="flex-grow min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <h5 className={`text-sm sm:text-base font-semibold truncate ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                                      {result.title}
                                    </h5>
                                    <div className={`flex items-center text-xs ${isDarkMode ? 'text-amber-400' : 'text-amber-600'} mt-1 sm:mt-0`}>
                                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                      {result.rating}
                                    </div>
                                  </div>
                                  <p className={`text-xs sm:text-sm truncate ${isDarkMode ? 'text-stone-400' : 'text-navy-600'}`}>
                                    {result.location}
                                  </p>
                                  <div className="flex flex-wrap gap-1 mt-1 sm:mt-2">
                                    {result.amenities.slice(0, window.innerWidth < 640 ? 2 : result.amenities.length).map((amenity, idx) => (
                                        <span
                                            key={idx}
                                            className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                                                isDarkMode
                                                    ? 'bg-navy-600/50 text-stone-300'
                                                    : 'bg-navy-100 text-navy-700'
                                            }`}
                                        >
                                  {amenity}
                                </span>
                                    ))}
                                    {window.innerWidth < 640 && result.amenities.length > 2 && (
                                        <span className="text-xs text-stone-400">+{result.amenities.length - 2} more</span>
                                    )}
                                  </div>
                                  <div className="flex justify-between items-center mt-1 sm:mt-2">
                              <span className={`text-xs ${isDarkMode ? 'text-stone-400' : 'text-navy-500'}`}>
                                {result.distance}
                              </span>
                                    <span className={`text-xs ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                {result.available}
                              </span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                        ))}
                      </div>
                    </motion.div>
                )}

                {/* Quick filter chips - Made scrollable for small screens */}
                <div className="mb-6 sm:mb-8 overflow-x-auto pb-2">
                  <div className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                    Popular filters:
                  </div>
                  <div className="flex flex-nowrap gap-2 min-w-max">
                    {[
                      { label: "Basketball", icon: "🏀" },
                      { label: "Tennis", icon: "🎾" },
                      { label: "Swimming", icon: "🏊" },
                      { label: "After 6 PM", icon: "🌙" },
                      { label: "With Parking", icon: "🅿️" }
                    ].map((filter, index) => (
                        <button
                            key={index}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2 whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                                isDarkMode
                                    ? 'bg-navy-600/50 hover:bg-navy-600 text-white border border-navy-500'
                                    : 'bg-navy-50 hover:bg-navy-100 text-navy-800 border border-navy-100'
                            }`}
                        >
                          <span>{filter.icon}</span>
                          {filter.label}
                        </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
  );
};

const AthlonPhoneCarousel = ({ isDarkMode }) => {
  const [selectedPhone, setSelectedPhone] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [direction, setDirection] = useState('next');
  const timeRef = useRef(null);
  const phoneFrameRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Athlon app screen data with realistic descriptions
  const phones = [
    {
      src: "/src/images/team/courts.jpeg",
      fallback: "/api/placeholder/600/1200?text=Discover",
      title: "Available Sports",
      description: "Explore a variety of sports and find courts for your favorite games. Browse availability and choose the perfect spot for your next match.",
      icon: MapPin,
      color: "from-blue-500 to-indigo-600"
    },
    {
      src: "/src/images/team/booking.jpeg",
      fallback: "/api/placeholder/600/1200?text=Booking",
      title: "Real-Time Booking",
      description: "Select available time slots with our intuitive calendar interface. See real-time availability updates and secure your spot instantly with just a few taps.",
      icon: Calendar,
      color: "from-emerald-500 to-teal-600"
    },
    {
      src: "/src/images/team/details.jpeg",
      fallback: "/api/placeholder/600/1200?text=Profile",
      title: "Court Details",
      description: "Get all the information you need about a court, including location, pricing, amenities, and user reviews before making a reservation.",
      icon: Users,
      color: "from-amber-500 to-orange-600"
    },
    {
      src: "/src/images/team/user.jpeg",
      fallback: "/api/placeholder/600/1200?text=Reviews",
      title: "User Profile",
      description: "Contribute to the sports community by reading and sharing detailed reviews of sports facilities. Rate venues based on court quality, staff, amenities, and overall experience.",
      icon: Star,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const selectPhone = (index) => {
    setDirection(index > selectedPhone || (selectedPhone === phones.length - 1 && index === 0) ? 'next' : 'prev');
    setAnimationClass('changing');

    if (phoneFrameRef.current) {
      phoneFrameRef.current.style.animation = 'none';
      phoneFrameRef.current.style.transform = direction === 'next'
          ? 'perspective(1500px) rotateY(-25deg) scale(0.9)'
          : 'perspective(1500px) rotateY(25deg) scale(0.9)';
    }

    setTimeout(() => {
      setSelectedPhone(index);
      setAnimationClass('arriving');

      if (phoneFrameRef.current) {
        phoneFrameRef.current.style.transform = 'perspective(1500px) rotateY(0deg) scale(1)';

        setTimeout(() => {
          if (phoneFrameRef.current) {
            phoneFrameRef.current.style.animation = 'floatPhone 6s ease-in-out infinite';
          }
        }, 400);
      }

      setTimeout(() => {
        setAnimationClass('');
      }, 400);
    }, 300);
  };

  const nextPhone = () => {
    const nextIndex = (selectedPhone + 1) % phones.length;
    selectPhone(nextIndex);
  };

  const prevPhone = () => {
    const prevIndex = selectedPhone === 0 ? phones.length - 1 : selectedPhone - 1;
    selectPhone(prevIndex);
  };

  useEffect(() => {
    const autoRotate = setTimeout(() => {
      nextPhone();
    }, 5000);

    return () => clearTimeout(autoRotate);
  }, [selectedPhone]);

  useEffect(() => {
    if (timeRef.current) {
      timeRef.current.style.animation = 'none';
      timeRef.current.offsetHeight;
      timeRef.current.style.animation = 'runningTime 5s linear 1 forwards';
    }
  }, [selectedPhone]);

  // Create responsive styles for the phone showcase based on viewport width
  const getPhoneSize = () => {
    if (windowWidth < 480) return { width: 'w-48', height: 'h-[380px]' };
    if (windowWidth < 640) return { width: 'w-56', height: 'h-[440px]' };
    if (windowWidth < 768) return { width: 'w-64', height: 'h-[500px]' };
    if (windowWidth < 1024) return { width: 'w-72', height: 'h-[580px]' };
    return { width: 'w-80', height: 'h-[650px]' };
  };

  const { width, height } = getPhoneSize();

  // Determine layout based on screen size
  const isSmallScreen = windowWidth < 768;

  return (
      <section className={`athlon-phone-showcase py-12 sm:py-16 md:py-24 px-4 sm:px-6 ${isDarkMode ? 'bg-navy-800/50 text-white' : 'bg-navy-100 text-navy-800'} relative overflow-hidden`}>
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-navy-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-stone-500/10 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

          {/* Decorative elements */}
          <div className={`absolute top-1/4 right-1/3 w-6 sm:w-8 h-6 sm:h-8 rounded-full ${isDarkMode ? 'border-2 border-white/10' : 'border-2 border-navy-300/50'} animate-spin`} style={{animationDuration: '12s'}}></div>
          <div className={`absolute bottom-1/3 left-1/3 w-4 sm:w-6 h-4 sm:h-6 rounded-full ${isDarkMode ? 'bg-navy-500/20' : 'bg-navy-500/10'} animate-bounce`} style={{animationDuration: '8s'}}></div>
        </div>

        <div className="container mx-auto">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16"
          >
          <span className={`inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full ${isDarkMode ? 'bg-white/10 text-stone-300' : 'bg-navy-700/10 text-navy-800'} text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>
            MOBILE EXPERIENCE
          </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
              Experience Athlon on Your <span className={isDarkMode ? "text-stone-300 underline decoration-navy-500 underline-offset-8" : "text-navy-600 underline decoration-navy-400 underline-offset-8"}>Mobile</span>
            </h2>
            <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
              Book sports facilities on the go with our sleek, intuitive app designed for the ultimate user experience.
            </p>
          </motion.div>

          <div className="time-indicator" ref={timeRef}></div>

          {/* Main showcase container - Reorganized for better mobile experience */}
          <div className={`max-w-6xl mx-auto ${isSmallScreen ? 'flex flex-col' : 'md:flex md:items-center md:gap-6 lg:gap-16'}`}>
            {/* Reordered for mobile: Phone first, then description */}
            {isSmallScreen && (
                <div className={`featured-phone ${animationClass} ${direction} w-full flex items-center justify-center mb-8`}>
                  <div
                      className={`phone-frame iphone-16-pro-max ${isDarkMode ? 'dark-frame' : 'light-frame'} ${width} ${height} mx-auto`}
                      ref={phoneFrameRef}
                      style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        transform: 'perspective(1500px) rotateY(0deg) scale(1)'
                      }}
                  >
                    <div className="phone-notch"></div>
                    <div className="dynamic-island"></div>
                    <div className="phone-buttons">
                      <div className="volume-up"></div>
                      <div className="volume-down"></div>
                      <div className="power-button"></div>
                      <div className="action-button"></div>
                    </div>
                    <img
                        src={phones[selectedPhone].src}
                        alt={phones[selectedPhone].title}
                        onError={(e) => {
                          e.target.src = phones[selectedPhone].fallback;
                        }}
                        className="w-full h-full object-cover"
                    />
                    <div className="phone-reflection"></div>

                    {/* UI overlay elements */}
                    <div className="ui-overlay">
                      <div className={`status-bar ${isDarkMode ? 'dark-ui' : 'light-ui'}`}>
                        <div className="time">9:41</div>
                        <div className="icons">
                          <div className="signal"></div>
                          <div className="wifi"></div>
                          <div className="battery"></div>
                        </div>
                      </div>

                      {selectedPhone === 1 && (
                          <div className={`booking-indicator ${isDarkMode ? 'dark-ui' : 'light-ui'}`}>
                            <div className="indicator-dot pulse"></div>
                            <span>Available Now</span>
                          </div>
                      )}

                      {selectedPhone === 2 && (
                          <div className={`notification-badge ${isDarkMode ? 'dark-ui' : 'light-ui'}`}>
                            <span>2</span>
                          </div>
                      )}
                    </div>
                  </div>

                  {/* Navigation buttons overlaid on the phone */}
                  <div className="phone-navigation">
                    <button className="nav-button prev" onClick={prevPhone}>
                      <ChevronLeft />
                    </button>
                    <button className="nav-button next" onClick={nextPhone}>
                      <ChevronRight />
                    </button>
                  </div>
                </div>
            )}

            {/* Minimalist screen description panel - LEFT on desktop, BOTTOM on mobile */}
            <div className={`${isSmallScreen ? 'w-full' : 'md:w-1/3'} mb-8 md:mb-0`}>
              {phones.map((phone, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: selectedPhone === index ? 1 : 0,
                        y: selectedPhone === index ? 0 : 10
                      }}
                      transition={{ duration: 0.3 }}
                      className="description-panel"
                      style={{ display: selectedPhone === index ? 'block' : 'none' }}
                  >
                    {/* Simple icon */}
                    <div className="mb-4 sm:mb-6 flex items-center">
                      <phone.icon className={`w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 ${isDarkMode ? 'text-white' : 'text-navy-600'}`} />
                      <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                        {phone.title}
                      </h3>
                    </div>

                    {/* Clean description */}
                    <p className={`text-sm sm:text-base mb-6 sm:mb-8 ${isDarkMode ? 'text-stone-300' : 'text-navy-600'} leading-relaxed`}>
                      {phone.description}
                    </p>

                    {/* Minimal navigation dots */}
                    <div className="flex space-x-2 items-center mb-4 sm:mb-6">
                      {phones.map((_, idx) => (
                          <button
                              key={idx}
                              onClick={() => selectPhone(idx)}
                              className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all ${
                                  idx === selectedPhone
                                      ? isDarkMode ? 'bg-white' : 'bg-navy-600'
                                      : isDarkMode ? 'bg-white/30' : 'bg-navy-300'
                              } ${idx === selectedPhone ? 'scale-125' : ''}`}
                              aria-label={`View ${phones[idx].title}`}
                          />
                      ))}
                      <span className="text-xs ml-2 opacity-60">{selectedPhone + 1}/{phones.length}</span>
                    </div>

                    {/* Simple, clean button */}
                    <button
                        className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors
                    ${isDarkMode
                            ? 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                            : 'bg-navy-600 hover:bg-navy-700 text-white'}`}
                    >
                      Learn more
                    </button>
                  </motion.div>
              ))}
            </div>

            {/* Featured phone in the middle - CENTERED on desktop, TOP on mobile */}
            {!isSmallScreen && (
                <div className={`featured-phone ${animationClass} ${direction} w-full md:w-1/3 flex items-center justify-center`}>
                  <div
                      className={`phone-frame iphone-16-pro-max ${isDarkMode ? 'dark-frame' : 'light-frame'} ${width} ${height} mx-auto`}
                      ref={phoneFrameRef}
                      style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        transform: 'perspective(1500px) rotateY(0deg) scale(1)'
                      }}
                  >
                    <div className="phone-notch"></div>
                    <div className="dynamic-island"></div>
                    <div className="phone-buttons">
                      <div className="volume-up"></div>
                      <div className="volume-down"></div>
                      <div className="power-button"></div>
                      <div className="action-button"></div>
                    </div>
                    <img
                        src={phones[selectedPhone].src}
                        alt={phones[selectedPhone].title}
                        onError={(e) => {
                          e.target.src = phones[selectedPhone].fallback;
                        }}
                        className="w-full h-full object-cover"
                    />
                    <div className="phone-reflection"></div>

                    {/* UI overlay elements */}
                    <div className="ui-overlay">
                      <div className={`status-bar ${isDarkMode ? 'dark-ui' : 'light-ui'}`}>
                        <div className="time">9:41</div>
                        <div className="icons">
                          <div className="signal"></div>
                          <div className="wifi"></div>
                          <div className="battery"></div>
                        </div>
                      </div>

                      {selectedPhone === 1 && (
                          <div className={`booking-indicator ${isDarkMode ? 'dark-ui' : 'light-ui'}`}>
                            <div className="indicator-dot pulse"></div>
                            <span>Available Now</span>
                          </div>
                      )}

                      {selectedPhone === 2 && (
                          <div className={`notification-badge ${isDarkMode ? 'dark-ui' : 'light-ui'}`}>
                            <span>2</span>
                          </div>
                      )}
                    </div>
                  </div>

                  {/* Navigation buttons overlaid on the phone */}
                  <div className="phone-navigation">
                    <button className="nav-button prev" onClick={prevPhone}>
                      <ChevronLeft />
                    </button>
                    <button className="nav-button next" onClick={nextPhone}>
                      <ChevronRight />
                    </button>
                  </div>
                </div>
            )}

            {/* Phone thumbnails grid - Now in a horizontal scrollable container on small screens */}
            <div className={`phone-thumbnails-grid ${isSmallScreen ? 'flex overflow-x-auto space-x-4 pb-4' : 'grid grid-cols-2 gap-4 sm:gap-6 md:gap-8'} mx-auto max-w-md ${isDarkMode ? 'dark-mode' : ''}`}>
              {phones.map((phone, index) => (
                  <div
                      className={`phone-thumb ${selectedPhone === index ? 'active' : ''} p-1 sm:p-2 ${isSmallScreen ? 'flex-shrink-0 w-24 sm:w-32' : ''}`}
                      key={index}
                      onClick={() => selectPhone(index)}
                  >
                    <div
                        className={`
                    thumb-frame 
                    aspect-[9/16] 
                    rounded-lg sm:rounded-2xl 
                    overflow-hidden 
                    relative 
                    transition-all 
                    duration-300 
                    shadow-lg
                    ${selectedPhone === index
                            ? (isDarkMode
                                ? 'border-2 sm:border-3 border-white/40 scale-110'
                                : 'border-2 sm:border-3 border-navy-600/40 scale-110')
                            : (isDarkMode
                                ? 'border border-transparent hover:border-white/20'
                                : 'border border-transparent hover:border-navy-600/20')}
                    ${isDarkMode ? 'dark-frame' : 'light-frame'}
                  `}
                    >
                      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 right-1 sm:right-2 h-2 sm:h-4 bg-gray-900/10 rounded-t-xl"></div>
                      <img
                          src={phone.src}
                          alt={`${phone.title} thumbnail`}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = phone.fallback;
                          }}
                      />
                      <div
                          className={`
                      absolute 
                      inset-0 
                      bg-gradient-to-t 
                      from-black/50 
                      to-transparent 
                      flex 
                      items-end 
                      p-2 sm:p-3
                    `}
                      >
                    <span className={`
                      text-white 
                      text-xs sm:text-sm 
                      font-medium
                      ${selectedPhone === index ? 'opacity-100' : 'opacity-70'}
                    `}>
                      {phone.title}
                    </span>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Mobile features highlight section */}
          <div className="mobile-features-grid">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-16">
              {[
                { title: "Instant Booking", subtitle: "Reserve courts in seconds" },
                { title: "Real-time Availability", subtitle: "See court status right now" },
                { title: "Facility Details", subtitle: "View all amenities and photos" },
                { title: "User Reviews", subtitle: "Read trusted community ratings" }
              ].map((feature, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`feature-card ${isDarkMode ? 'dark-card' : 'light-card'} p-3 sm:p-4`}
                  >
                    <h3 className="feature-title text-sm sm:text-base font-semibold">{feature.title}</h3>
                    <p className="feature-subtitle text-xs sm:text-sm mt-1">{feature.subtitle}</p>
                  </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

function App() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [visibleSection, setVisibleSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Countdown timer state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Simplified state for progress bar animation - just need to know if it's animated or not
  const [progressAnimated, setProgressAnimated] = useState(false);

  // Add ref for the progress bars section
  const progressSectionRef = useRef(null);

  const features = [
    {
      title: "Interactive 3D Maps",
      description: "Explore facilities in stunning 3D detail. Virtual tours and interactive maps help you choose the perfect court for your needs.",
      image: "src/images/team/3dmap.avif",
      icon: MapPin
    },
    {
      title: "AI Search Facility",
      description: "Our AI-powered system learns your preferences and suggests the best facilities based on your playing style and history.",
      image: "src/images/team/ai.webp",
      icon: Brain
    },
    {
      title: "Connect with Players",
      description: "Coordinate with friends, teammates, or facility managers directly through our built-in messaging system.",
      image: "src/images/team/connect.jpg",
      icon: Users
    }
  ];

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Countdown timer effect
  useEffect(() => {
    // Set launch date (e.g., 30 days from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const updateCountdown = () => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference <= 0) {
        // Launch date has passed
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    // Initial update
    updateCountdown();

    // Update every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Set up Intersection Observer for the progress bars
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when just 10% of the element is visible
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        // If the section is visible and animation hasn't run yet
        if (entry.isIntersecting && !progressAnimated) {
          // Trigger the animation
          animateProgressBars();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (progressSectionRef.current) {
      observer.observe(progressSectionRef.current);
    }

    return () => {
      if (progressSectionRef.current) {
        observer.unobserve(progressSectionRef.current);
      }
    };
  }, [progressAnimated]);

  // Simplified animation function - just sets progressAnimated to true
  // CSS transitions handle the actual animation
  const animateProgressBars = () => {
    setProgressAnimated(true);
  };

  useEffect(() => {
    // Using a longer interval to reduce frequent re-renders
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 8000);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Reduce scroll event processing by using requestAnimationFrame
      if (!window.requestedScrollFrame) {
        window.requestedScrollFrame = true;
        window.requestAnimationFrame(() => {
          // Track visible section for animations - but with fewer checks
          const sections = document.querySelectorAll('section[id]');
          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop - 300 && scrollTop < sectionTop + sectionHeight - 200) {
              setVisibleSection(section.getAttribute('id'));
            }
          });
          window.requestedScrollFrame = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [features.length]);

  const howItWorksSteps = [
    {
      icon: Download,
      title: "Download the App",
      description: "Get started by downloading the Athlon app from the App Store or Google Play."
    },
    {
      icon: UserPlus,
      title: "Create an Account",
      description: "Sign up with your email or social media accounts to get full access to all features."
    },
    {
      icon: MapPinned,
      title: "Find a Facility",
      description: "Browse through our extensive selection of sports facilities and filter by location, type, or availability."
    },
    {
      icon: CreditCard,
      title: "Book and Pay",
      description: "Select your desired time slot, make the payment securely, and you're all set to play!"
    }
  ];

  const [billingCycle, setBillingCycle] = useState('monthly');

  const pricingPlans = [
    {
      name: 'Basic',
      price: 999,
      description: "Perfect for individual players and casual enthusiasts",
      features: [
        'Up to 5 bookings per month',
        'Basic facility analytics',
        'Email support',
        'Access to standard locations',
      ],
    },
    {
      name: 'Pro',
      price: 1999,
      description: "Ideal for regular players and teams",
      features: [
        'Unlimited monthly bookings',
        'Advanced facility insights',
        'Priority customer support',
        'Group booking features',
        'AI-powered recommendations',
      ],
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: 3999,
      description: "Tailored for sports organizations and complexes",
      features: [
        'Unlimited custom booking management',
        'Dedicated account manager',
        'Custom platform integration',
        'Advanced reporting',
        'Premium API access',
      ],
    },
  ];

  const statsItems = [
    { value: "10+", label: "Sports Facilities", icon: MapPin },
    { value: "0", label: "Active Users", icon: Users },
    { value: "100%", label: "Satisfaction Rate", icon: Star },
    { value: "24/7", label: "Customer Support", icon: Clock }
  ];

  // Optimized animation variants with reduced complexity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced stagger time for faster rendering
        duration: 0.4 // Shorter animation duration
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 }, // Reduced y distance
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3 // Shorter duration
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced y distance
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4 // Shorter duration
      }
    }
  };

  // Determine breakpoints for responsive layouts
  const isSmallScreen = windowWidth < 640;
  const isMediumScreen = windowWidth >= 640 && windowWidth < 1024;
  const isLargeScreen = windowWidth >= 1024;

  // Add CSS to dynamically handle responsive layout
  useEffect(() => {
    // Add custom responsive CSS
    const style = document.createElement('style');
    style.id = 'responsive-styles';
    style.innerHTML = `
      /* Base responsive styles */
      @media (max-width: 640px) {
        .xs\\:hidden { display: none !important; }
        .xs\\:flex-col { flex-direction: column !important; }
        .xs\\:text-center { text-align: center !important; }
        .xs\\:text-sm { font-size: 0.875rem !important; }
        .xs\\:text-xs { font-size: 0.75rem !important; }
        .xs\\:p-2 { padding: 0.5rem !important; }
        .xs\\:p-4 { padding: 1rem !important; }
        .xs\\:w-5\\/6 { width: 83.333333% !important; }
      }
      
      /* Responsive animations for mobile */
      @media (max-width: 768px) {
        .animate-float { 
          animation-duration: 4s !important;
          animation-name: floatMobile !important;
        }
        
        @keyframes floatMobile {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      }
      
      /* Phone frame responsive styles */
      .phone-frame {
        transition: all 0.3s ease-out;
      }
      
      /* Navigation button responsive styles */
      .nav-button {
        transition: all 0.3s ease;
      }
      
      @media (max-width: 480px) {
        .nav-button {
          transform: scale(0.8);
        }
      }
      
      /* Add responsive animation for carousel elements */
      @keyframes floatPhone {
        0%, 100% { transform: perspective(1500px) rotateY(0deg) translateY(0) scale(1); }
        50% { transform: perspective(1500px) rotateY(0deg) translateY(-10px) scale(1); }
      }
      
      /* Responsive text handling */
      @media (max-width: 768px) {
        .truncate-mobile {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .line-clamp-2-mobile {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('responsive-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-navy-900 text-white' : 'bg-stone-100 text-navy-900'}`}>
        {/* Simplified Navigation with fewer animations */}
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? isDarkMode
                        ? 'bg-navy-900/90 backdrop-blur-md py-2 sm:py-3 shadow-lg'
                        : 'bg-white/90 backdrop-blur-md py-2 sm:py-3 shadow-lg'
                    : 'bg-transparent py-3 sm:py-6'
            }`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <a href="#" className="text-xl sm:text-2xl font-bold">
                  <span className={`${isDarkMode ? 'text-stone-200' : 'text-navy-700'}`}>athlon</span>
                </a>
              </div>

              <div className="hidden md:flex items-center space-x-4 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
                <a href="#about" className={`text-sm lg:text-base font-medium ${isDarkMode ? 'text-white/80 hover:text-white' : 'text-navy-800/80 hover:text-navy-900'} transition-colors`}>About</a>
                <a href="#features" className={`text-sm lg:text-base font-medium ${isDarkMode ? 'text-white/80 hover:text-white' : 'text-navy-800/80 hover:text-navy-900'} transition-colors`}>Features</a>
                <a href="#how-it-works" className={`text-sm lg:text-base font-medium ${isDarkMode ? 'text-white/80 hover:text-white' : 'text-navy-800/80 hover:text-navy-900'} transition-colors`}>How It Works</a>
                <a href="#team" className={`text-sm lg:text-base font-medium ${isDarkMode ? 'text-white/80 hover:text-white' : 'text-navy-800/80 hover:text-navy-900'} transition-colors`}>Team</a>
                <a href="#pricing" className={`text-sm lg:text-base font-medium ${isDarkMode ? 'text-white/80 hover:text-white' : 'text-navy-800/80 hover:text-navy-900'} transition-colors`}>Pricing</a>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className={`p-1.5 sm:p-2 rounded-full ${
                        isDarkMode
                            ? 'bg-white/10 hover:bg-white/20'
                            : 'bg-navy-900/10 hover:bg-navy-900/20'
                    } transition-colors`}
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </svg>
                  ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>
                  )}
                </button>

                <button className={`${isDarkMode ? 'bg-white text-navy-900' : 'bg-navy-700 text-white'} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity hidden md:block`}>
                  Sign up
                </button>

                <button
                    className={`md:hidden p-1.5 sm:p-2 rounded-full ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-navy-900/10 hover:bg-navy-900/20'}`}
                    onClick={() => setShowMobileMenu(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu with simplified animation */}
        <AnimatePresence>
          {showMobileMenu && (
              <motion.div
                  className={`fixed inset-0 z-40 ${isDarkMode ? 'bg-navy-900/95' : 'bg-white/95'} backdrop-blur-lg pt-16 sm:pt-20`}
                  initial={{ opacity: 0, x: '50%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '50%' }}
                  transition={{ duration: 0.3 }} // Faster transition
              >
                {/* Mobile navigation content */}
                <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col space-y-4 sm:space-y-6">
                  {['features', 'how-it-works', 'about', 'pricing', 'team'].map((item) => (
                      <a
                          key={item}
                          href={`#${item}`}
                          className={`text-xl sm:text-2xl font-semibold border-b ${isDarkMode ? 'border-white/10' : 'border-navy-900/10'} pb-3 sm:pb-4 capitalize hover:translate-x-2 transition-transform duration-200`}
                          onClick={() => setShowMobileMenu(false)}
                      >
                        {item.replace('-', ' ')}
                      </a>
                  ))}
                  <div className="flex flex-col sm:flex-row sm:items-center mt-4 sm:mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={toggleTheme}
                        className={`p-3 rounded-full ${
                            isDarkMode
                                ? 'bg-white/10 hover:bg-white/20'
                                : 'bg-navy-900/10 hover:bg-navy-900/20'
                        } transition-colors sm:mr-4 text-sm sm:text-base`}
                    >
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <button
                        className="bg-navy-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-white text-base sm:text-xl hover:bg-navy-800 transition-colors duration-200"
                        onClick={() => setShowMobileMenu(false)}
                    >
                      Coming Soon
                    </button>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Hero Section (Home page) - Updated with better responsive layout */}
        <section className="min-h-screen pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 flex items-center relative overflow-hidden">
          {/* Static background elements */}
          <div className="absolute inset-0 -z-10">
            <div className={`absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 ${isDarkMode ? 'bg-navy-500/20' : 'bg-navy-500/10'} rounded-full filter blur-3xl`}></div>
            <div className={`absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 ${isDarkMode ? 'bg-stone-500/20' : 'bg-stone-500/10'} rounded-full filter blur-3xl`}></div>
            <div className={`absolute top-1/3 right-1/3 w-48 sm:w-64 h-48 sm:h-64 ${isDarkMode ? 'bg-stone-500/5' : 'bg-navy-300/5'} rounded-full filter blur-3xl`}></div>
          </div>

          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              <motion.div
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.6}}
                  className="text-center lg:text-left lg:max-w-2xl lg:w-2/5"
              >
                <div
                    className={`inline-block px-3 sm:px-4 py-1 rounded-full ${isDarkMode ? 'bg-white/10 border border-white/20' : 'bg-navy-700/10 border border-navy-700/20'} text-xs sm:text-sm font-medium mb-4 sm:mb-6`}>
                  #1 Sports Facility Booking Platform in Sri Lanka
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-8 leading-tight">
                <span className={isDarkMode ? "text-stone-300" : "text-navy-600"}>
                  Seamless Sports Complex Booking at Your Fingertips!
                </span>

                </h1>

                <h4 className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-stone-300' : 'text-navy-700'} mb-6 sm:mb-10`}>
                  <span>Book your favorite sports facilities instantly, manage your reservations,</span>
                  <span className="hidden sm:inline"> <br/> </span>
                  <span>and connect with other sports enthusiasts all in one powerful app.</span>
                </h4>

                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <button
                      className="bg-navy-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg text-white hover:bg-navy-800 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    Coming Soon <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5"/>
                  </button>
                </div>

                {/* Feature highlights (moved from floating positions) - Hide on small screens */}
                <div className="mt-6 hidden sm:flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <div
                      className={`${isDarkMode ? 'bg-white/10 border border-white/20' : 'bg-white border border-navy-700/20'} backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-xl w-full sm:w-56`}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`p-1.5 sm:p-2 rounded-full ${isDarkMode ? 'bg-navy-700/20' : 'bg-navy-700/10'}`}>
                        <Calendar className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}/>
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">Easy Scheduling</p>
                        <p className={`text-xs ${isDarkMode ? 'text-stone-300' : 'text-navy-600'}`}>Book in seconds</p>
                      </div>
                    </div>
                  </div>

                  <div
                      className={`${isDarkMode ? 'bg-white/10 border border-white/20' : 'bg-white border border-navy-700/20'} backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-xl w-full sm:w-56`}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`p-1.5 sm:p-2 rounded-full ${isDarkMode ? 'bg-navy-700/20' : 'bg-navy-700/10'}`}>
                        <Award className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}/>
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">Premium Facilities</p>
                        <p className={`text-xs ${isDarkMode ? 'text-stone-300' : 'text-navy-600'}`}>Verified quality</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Updated Interactive Image Carousel - with better sizing for laptop screens */}
              <motion.div
                  initial={{opacity: 0, x: 30}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 0.6}}
                  className="relative w-full lg:w-3/5 h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px] mt-8 lg:mt-0"
              >
                <div className="h-full w-full">
                  {/* Image Carousel Component */}
                  <ImageCarousel />
                </div>
              </motion.div>
            </div>

            {/* Simple static scroll indicator */}
            <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-stone-400' : 'text-navy-600'} mb-1 sm:mb-2`}>Scroll to explore</p>
              <ChevronDown className={`w-4 h-4 sm:w-6 sm:h-6 ${isDarkMode ? 'text-white/60' : 'text-navy-600/60'}`} />
            </div>
          </div>
        </section>

        {/* Stats Section - simplified with border removed in light mode */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
              {statsItems.map((stat, index) => (
                  <div
                      key={index}
                      className={`${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-navy-900/5'} backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-200`}
                  >
                    <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-4 ${isDarkMode ? 'text-stone-400 group-hover:text-stone-300' : 'text-navy-600 group-hover:text-navy-700'} transition-colors duration-300`} />
                    <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-navy-700'}`}>{stat.value}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-stone-300' : 'text-navy-600'}`}>{stat.label}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. About Us Section - Pre-Launch Version */}
        <section id="about" className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10">
            <div className={`absolute top-0 -right-24 w-64 sm:w-96 h-64 sm:h-96 ${isDarkMode ? 'bg-navy-500/20' : 'bg-navy-300/30'} rounded-full filter blur-3xl`}></div>
            <div className={`absolute bottom-0 -left-24 w-48 sm:w-64 h-48 sm:h-64 ${isDarkMode ? 'bg-stone-500/20' : 'bg-stone-400/20'} rounded-full filter blur-3xl`}></div>

            {/* Decorative lines */}
            <div className={`absolute top-1/4 left-0 w-full h-px ${isDarkMode ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-navy-700/20 to-transparent'}`}></div>
            <div className={`absolute bottom-1/4 left-0 w-full h-px ${isDarkMode ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-navy-700/20 to-transparent'}`}></div>
          </div>

          <div className="container mx-auto relative z-10">
            {/* Section header with animated underline */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={{
                  hidden: {opacity: 0},
                  visible: {opacity: 1, transition: {duration: 0.6}}
                }}
                className="max-w-3xl mx-auto text-center mb-8 sm:mb-16"
            >
            <span
                className={`inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full ${isDarkMode ? 'bg-white/10 text-stone-300' : 'bg-navy-700/10 text-navy-800'} text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>ABOUT US</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                About <span
                  className={isDarkMode ? "text-stone-300 underline decoration-navy-500 underline-offset-8" : "text-navy-600 underline decoration-navy-400 underline-offset-8"}>Athlon</span>
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                The future of sports facility booking, coming soon
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 items-center">
              {/* Main content column */}
              <motion.div
                  variants={{
                    hidden: {opacity: 0, y: 20},
                    visible: {opacity: 1, y: 0, transition: {duration: 0.6}}
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{once: true}}
                  className="lg:col-span-6"
              >
                {/* Content card with subtle gradient */}
                <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-8 ${isDarkMode ?
                    'bg-gradient-to-br from-white/10 to-white/5 border border-white/10' :
                    'bg-gradient-to-br from-white to-navy-50 border border-navy-100 shadow-lg'}`}
                >
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start">
                      <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-navy-700/30' : 'bg-navy-100'} mr-3 sm:mr-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 sm:h-6 sm:w-6 ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>Our Vision</h3>
                        <p className={`text-sm sm:text-base ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                          Revolutionizing sports facility booking by making it seamless, convenient, and accessible for all. We aim to bring players and venues together with just a few taps.
                        </p>
                      </div>
                    </div>

                    <div className={`h-px w-full ${isDarkMode ? 'bg-white/10' : 'bg-navy-200'}`}></div>

                    <div className="flex items-start">
                      <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-navy-700/30' : 'bg-navy-100'} mr-3 sm:mr-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 sm:h-6 sm:w-6 ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>Our Team</h3>
                        <p className={`text-sm sm:text-base ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                          A passionate group of tech enthusiasts and sports lovers dedicated to building a smooth, user-friendly platform that enhances every player's experience.
                        </p>
                      </div>
                    </div>

                    <div className={`h-px w-full ${isDarkMode ? 'bg-white/10' : 'bg-navy-200'}`}></div>

                    <div className="flex items-start">
                      <div className={`p-2 sm:p-3 rounded-full ${isDarkMode ? 'bg-navy-700/30' : 'bg-navy-100'} mr-3 sm:mr-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 sm:h-6 sm:w-6 ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>Our Commitment</h3>
                        <p className={`text-sm sm:text-base ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                          Ensuring top-notch service, security, and reliability. Every facility on our platform is carefully verified to provide the best possible experience.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <button
                        className={`group relative overflow-hidden ${isDarkMode ?
                            'bg-white/10 hover:bg-white/20 text-white border border-white/20' :
                            'bg-navy-700/10 hover:bg-navy-700/20 text-navy-800 border border-navy-700/20'} 
                      backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300`}
                    >
                      <span className="relative z-10">Learn More About Us</span>
                      <span className={`absolute inset-0 w-0 ${isDarkMode ? 'bg-white/20' : 'bg-navy-700/20'} transition-all duration-300 group-hover:w-full`}></span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Launch countdown and newsletter signup */}
              <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="lg:col-span-6"
              >
                <div className={`rounded-xl sm:rounded-2xl overflow-hidden ${isDarkMode ?
                    'bg-gradient-to-br from-white/10 to-white/5 border border-white/10' :
                    'bg-gradient-to-br from-white to-navy-50 border border-navy-100 shadow-lg'}`}
                >
                  {/* Countdown timer */}
                  <div className="p-4 sm:p-8">
                    <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>Launching Soon</h3>

                    <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                      We're putting the finishing touches on Athlon. Be among the first to experience the future of sports facility booking.
                    </p>

                    {/* Countdown boxes - Now using dynamic values */}
                    <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                      {[
                        { value: countdown.days.toString().padStart(2, '0'), label: "Days" },
                        { value: countdown.hours.toString().padStart(2, '0'), label: "Hours" },
                        { value: countdown.minutes.toString().padStart(2, '0'), label: "Minutes" },
                        { value: countdown.seconds.toString().padStart(2, '0'), label: "Seconds" }
                      ].map((item, index) => (
                          <div
                              key={index}
                              className={`flex flex-col items-center py-2 sm:py-4 rounded-lg sm:rounded-xl ${isDarkMode ?
                                  'bg-navy-700/30 border border-navy-600/30' :
                                  'bg-navy-100/70 border border-navy-200'}`}
                          >
                            <span className={`text-xl sm:text-2xl md:text-3xl font-bold mb-0 sm:mb-1 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>{item.value}</span>
                            <span className={`text-xxs sm:text-xs ${isDarkMode ? 'text-stone-400' : 'text-navy-600'}`}>{item.label}</span>
                          </div>
                      ))}
                    </div>

                    {/* Development progress - Added ref here for scroll trigger */}
                    <div ref={progressSectionRef}>
                      <h4 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>Development Progress</h4>

                      <div className="space-y-3 sm:space-y-4">
                        {[
                          { feature: "User Interface", progress: 90 },
                          { feature: "Booking System", progress: 75 },
                          { feature: "Payment Processing", progress: 60 },
                          { feature: "Mobile Apps", progress: 40 }
                        ].map((item, index) => (
                            <div key={index}>
                              <div className="flex justify-between mb-1">
                                <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>{item.feature}</span>
                                <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                              {progressAnimated ? item.progress : 0}%
                            </span>
                              </div>
                              <div className={`h-1.5 sm:h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-300'} overflow-hidden`}>
                                <div
                                    className={`h-1.5 sm:h-2 rounded-full ${isDarkMode ? 'bg-white/80' : 'bg-navy-600'} transform origin-left`}
                                    style={{
                                      width: `${item.progress}%`,
                                      transform: `scaleX(${progressAnimated ? 1 : 0})`,
                                      transition: `transform 1.5s ${index * 0.1}s cubic-bezier(0.26, 0.86, 0.44, 0.985)`
                                    }}
                                ></div>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stay connected */}
                  <div className={`p-4 sm:p-6 ${isDarkMode ? 'bg-white/5' : 'bg-navy-50'}`}>
                    <h4 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>Stay Connected</h4>
                    <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                      Follow our development journey and be the first to know when we launch.
                    </p>

                    <div className="flex space-x-3 sm:space-x-4">
                      {[
                        { name: "Instagram", icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 4h9a3.5 3.5 0 013.5 3.5v9a3.5 3.5 0 01-3.5 3.5h-9A3.5 3.5 0 014 16.5v-9A3.5 3.5 0 017.5 4zm9 14h.01", href: "https://www.instagram.com/athlon.app?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
                        { name: "LinkedIn", icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" }
                      ].map((social, i) => (
                          <a
                              key={i}
                              href={social.href}
                              className={`p-2 sm:p-3 rounded-full ${isDarkMode ?
                                  'bg-navy-700/30 hover:bg-navy-700/50 text-white' :
                                  'bg-white hover:bg-navy-100 text-navy-700'} transition-colors`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={social.icon} />
                            </svg>
                          </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Animated accent line */}
            <div className="relative mt-12 sm:mt-24">
              <motion.div
                  className={`h-px w-full ${isDarkMode ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent' : 'bg-gradient-to-r from-transparent via-navy-700/30 to-transparent'}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
              ></motion.div>
            </div>
          </div>
        </section>

        {/* 3. Why Choose Us Section */}
        <section className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 ${isDarkMode ? 'bg-gradient-to-b from-navy-800/50 to-navy-900/70' : 'bg-gradient-to-b from-navy-100 to-navy-200'} relative overflow-hidden`}>
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute left-0 bottom-0 h-full w-1/3 text-white/5 transform -translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,0 100,100 0,100" />
            </svg>
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-navy-500/30 rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-1/4 left-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-stone-500/20 rounded-full filter blur-3xl opacity-30"></div>

            {/* Decorative patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute left-1/3 top-1/4 w-6 sm:w-8 h-6 sm:h-8 border-4 border-navy-500 rounded-full"></div>
              <div className="absolute right-1/4 bottom-1/3 w-8 sm:w-12 h-8 sm:h-12 border-8 border-stone-400 rounded-xl"></div>
              <div className="absolute left-1/2 top-1/2 w-12 sm:w-16 h-2 sm:h-3 bg-stone-300 rounded-full"></div>
            </div>
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-3xl mx-auto text-center mb-8 sm:mb-16"
            >
              <span className={`inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full ${isDarkMode ? 'bg-white/10 text-stone-300' : 'bg-navy-700/10 text-navy-800'} text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>WHY PEOPLE LOVE US</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                Why Choose <span className={isDarkMode ? "text-stone-300 underline decoration-navy-500 underline-offset-8" : "text-navy-600 underline decoration-navy-400 underline-offset-8"}>Athlon</span>?
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-stone-300' : 'text-navy-700'} max-w-2xl mx-auto`}>
                We combine cutting-edge technology with a passion for sports to deliver the ultimate booking experience that puts you in control.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12">
              {[
                {
                  title: "Effortless Booking",
                  description: "Book your preferred sports facility in just a few taps. Our intuitive interface and smart recommendations make finding the perfect court a breeze.",
                  icon: Calendar,
                  gradient: "from-blue-500 to-indigo-600",
                  delay: 0.1
                },
                {
                  title: "Premium Facilities",
                  description: "We partner exclusively with top-rated sports complexes, ensuring every venue meets our rigorous quality standards for an exceptional experience.",
                  icon: Award,
                  gradient: "from-purple-500 to-pink-600",
                  delay: 0.2
                },
                {
                  title: "24/7 Concierge",
                  description: "Our dedicated support team is always at your service, ready to assist with booking changes, special requests, or any questions you might have.",
                  icon: Clock,
                  gradient: "from-emerald-500 to-teal-600",
                  delay: 0.3
                }
              ].map((item, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: item.delay }}
                      viewport={{ once: true }}
                      className="group relative"
                  >
                    {/* Card with hover effects */}
                    <div className={`relative h-full ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-navy-200'} backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center hover:-translate-y-3 hover:shadow-xl transition-all duration-500 overflow-hidden`}>
                      {/* Accent top border */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>

                      {/* Icon with gradient background */}
                      <div className="relative mb-6 sm:mb-8">
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}></div>
                        <div className={`relative z-10 p-4 sm:p-5 rounded-full bg-gradient-to-br ${item.gradient} group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                        </div>
                      </div>

                      <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-navy-800'} group-hover:translate-y-[-5px] transition-transform duration-300`}>{item.title}</h3>
                      <p className={`text-sm sm:text-base ${isDarkMode ? 'text-stone-300' : 'text-navy-600'} leading-relaxed group-hover:translate-y-[-3px] transition-transform duration-500`}>{item.description}</p>

                      {/* Learn more link */}
                      <div className="mt-4 sm:mt-6 pt-2 sm:pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                        <span className={`text-sm sm:text-base font-medium ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Features Grid (Powerful Features) */}
        <section id="features" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative">
          {/* Simple, elegant background */}
          <div className="absolute inset-0 -z-10">
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-navy-900/30' : 'bg-navy-50/50'} backdrop-blur-sm`}></div>
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.3}}
                className="max-w-3xl mx-auto text-center mb-8 sm:mb-16"
            >
            <span
                className={`inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full ${isDarkMode ? 'bg-white/10 text-stone-300' : 'bg-navy-700/10 text-navy-800'} text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>PLATFORM FEATURES</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                Powerful <span
                  className={isDarkMode ? "text-stone-300 underline decoration-navy-500 underline-offset-8" : "text-navy-600 underline decoration-navy-400 underline-offset-8"}>Features</span>
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-stone-300' : 'text-navy-700'} mb-6 sm:mb-10`}>
                Discover the cutting-edge features that make Athlon the premier choice for sports facility booking.
              </p>
            </motion.div>

            {/* Feature cards in a clean, organized layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
              {[
                {
                  icon: Calendar,
                  title: "Real-Time Booking",
                  description: "Check availability and book courts instantly with our real-time booking system.",
                  tag: "Popular",
                  tagColor: "bg-emerald-500"
                },
                {
                  icon: MapPin,
                  title: "Multi-Location Support",
                  description: "Find and book courts across multiple locations with interactive maps.",
                  tag: "Essential",
                  tagColor: "bg-blue-500"
                },
                {
                  icon: Users,
                  title: "Group Booking",
                  description: "Easily organize group sessions with integrated cost splitting.",
                  tag: "Social",
                  tagColor: "bg-purple-500"
                },
                {
                  icon: Brain,
                  title: "AI Recommendations",
                  description: "Get personalized suggestions based on your preferences and booking history.",
                  tag: "Smart",
                  tagColor: "bg-amber-500"
                },
                {
                  icon: Search,
                  title: "Smart Search",
                  description: "Find the perfect court with our AI-powered natural language search.",
                  tag: "Discovery",
                  tagColor: "bg-cyan-500"
                },
                {
                  icon: Filter,
                  title: "Dynamic Filtering",
                  description: "Sort and filter facilities based on your specific requirements.",
                  tag: "Utility",
                  tagColor: "bg-pink-500"
                }
              ].map((feature, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                  >
                    <div className={`h-full ${
                        isDarkMode
                            ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                            : 'bg-white hover:bg-navy-50 border border-navy-100 shadow-sm hover:shadow-md'
                    } rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden`}
                    >
                      {/* Tag at the top */}
                      <div className="relative">
                        <div className={`absolute top-4 sm:top-6 right-4 sm:right-6 ${feature.tagColor} text-white text-xxs sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full`}>
                          {feature.tag}
                        </div>
                      </div>

                      <div className="p-4 sm:p-8">
                        {/* Icon in a contrasting circle */}
                        <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl mb-4 sm:mb-6 ${
                            isDarkMode ? 'bg-navy-700' : 'bg-navy-100'
                        } transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <feature.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${
                              isDarkMode ? 'text-white' : 'text-navy-700'
                          }`} />
                        </div>

                        <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${
                            isDarkMode ? 'text-white' : 'text-navy-800'
                        } group-hover:text-navy-500 transition-colors duration-300`}>
                          {feature.title}
                        </h3>

                        <p className={`text-sm sm:text-base ${
                            isDarkMode ? 'text-stone-300' : 'text-navy-600'
                        }`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </div>

            {/* Feature showcase banner */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`mt-8 sm:mt-16 p-6 sm:p-8 rounded-xl sm:rounded-2xl ${
                    isDarkMode
                        ? 'bg-gradient-to-r from-navy-700 to-navy-800 border border-white/10'
                        : 'bg-gradient-to-r from-navy-600 to-navy-800 text-white'
                }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
                <div className="md:w-2/3">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                    Want to see all our amazing features?
                  </h3>
                  <p className={`text-sm sm:text-base ${isDarkMode ? 'text-stone-300' : 'text-stone-200'} mb-4 md:mb-0`}>
                    We have many more features designed to make your sports facility booking experience seamless and enjoyable.
                  </p>
                </div>
                <div>
                  <button className={`whitespace-nowrap px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold ${
                      isDarkMode
                          ? 'bg-white text-navy-900 hover:bg-stone-200'
                          : 'bg-white text-navy-900 hover:bg-stone-200'
                  } transition-colors duration-300 flex items-center gap-2`}>
                    Explore All Features
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. AI Search Section */}
        <AISearchSection isDarkMode={isDarkMode} />

        {/* 6. How It Works Section */}
        <section id="how-it-works" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute right-0 top-0 h-full w-1/3 text-white/5 transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,0 100,0 50,100" />
            </svg>
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-3xl mx-auto text-center mb-8 sm:mb-16"
            >
            <span className={`inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full ${isDarkMode ? 'bg-white/10 text-stone-300' : 'bg-navy-700/10 text-navy-800'} text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>
              GETTING STARTED
            </span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                How It <span className={isDarkMode ? "text-stone-300 underline decoration-navy-500 underline-offset-8" : "text-navy-600 underline decoration-navy-400 underline-offset-8"}>Works</span>
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                Get started with Athlon in four simple steps and transform your sports facility booking experience forever.
              </p>
            </motion.div>

            <div className="relative">
              {/* Connecting line for desktop */}
              <div className={`hidden lg:block absolute top-1/2 left-0 right-0 h-1 ${isDarkMode ? 'bg-stone-500/30' : 'bg-navy-500/30'} transform -translate-y-1/2 rounded-full`} />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
                {howItWorksSteps.map((step, index) => (
                    <div
                        key={index}
                        className="relative z-10"
                    >
                      <div className={`${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-navy-200'} backdrop-blur-lg rounded-lg sm:rounded-xl p-6 sm:p-8 flex flex-col items-center text-center h-full hover:border-navy-400 hover:-translate-y-2 transition-all duration-300`}>
                        <div className="relative mb-4 sm:mb-6">
                          <div className={`absolute inset-0 ${isDarkMode ? 'bg-stone-500/20' : 'bg-navy-500/20'} rounded-full blur-xl`} />
                          <div className="relative z-10 bg-navy-700 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                            <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </div>
                        </div>
                        <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-stone-400' : 'text-navy-500'} mb-1 sm:mb-2`}>Step {index + 1}</span>
                        <h3 className={`text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>{step.title}</h3>
                        <p className={`text-sm sm:text-base ${isDarkMode ? 'text-stone-300' : 'text-navy-600'}`}>{step.description}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>

            <div className="mt-8 sm:mt-16 text-center">
              <button className="bg-navy-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg text-white hover:bg-navy-800 transition-colors duration-300">
                Get Started Now
              </button>
            </div>
          </div>
        </section>

        {/* 7. App Screenshots Section (Explore Our App) - Enhanced with iPhone 16 Pro Max */}
        <AthlonPhoneCarousel isDarkMode={isDarkMode} />

        {/* 9. Team Section (Meet Our Team) - Updated with working images */}
        <section id="team" className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 ${isDarkMode ? 'bg-navy-800/50' : 'bg-navy-100'} relative`}>
          <div className="absolute inset-0 -z-10">
            {/* Reduced number of blur elements */}
            <div className="absolute bottom-1/3 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-stone-500/10 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-16">
              <span className={`inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full ${isDarkMode ? 'bg-white/10 text-stone-300' : 'bg-navy-700/10 text-navy-800'} text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>OUR AMAZING TEAM</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                Meet the <span className={isDarkMode ? "text-stone-300 underline decoration-navy-500 underline-offset-8" : "text-navy-600 underline decoration-navy-400 underline-offset-8"}>Minds</span> Behind Athlon
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>A passionate team of sports enthusiasts and tech innovators dedicated to revolutionizing how you book sports facilities.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  name: 'Santhasoruban Niththilan',
                  role: 'Frontend Developer',
                  image: '/src/images/team/nith 2.jpg',
                  linkedin: 'https://www.linkedin.com/in/niththilan-santhasoruban-20391b247/',
                  instagram: 'https://www.instagram.com/niththilan_10?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
                },
                {
                  name: 'Kamalanandan Nishvaraj',
                  role: 'Frontend Developer',
                  image: '/src/images/team/nishhh.jpg',
                  linkedin: 'https://www.linkedin.com/in/nishvaraj-kamalananthan-35760b176/m',
                  instagram: 'https://www.instagram.com/nishvaraj?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
                },
                {
                  name: 'Kavishani Yoganathan',
                  role: 'Frontend Developer',
                  image: '/src/images/team/kavi2 2.jpeg',
                  linkedin: 'https://www.linkedin.com/in/kavishani-yoganathan-27a938275/',
                  instagram: 'https://www.instagram.com/kavishaniy/',
                },
                {
                  name: 'Ragulan Keshan',
                  role: 'Backend Developer',
                  image: '/src/images/team/keshan.jpg',
                  linkedin: 'https://www.linkedin.com/in/ragulan-kopikeshan-ba24902b4/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
                  instagram: 'https://www.instagram.com/iamkeshan_/',
                },
                {
                  name: 'Ashvitha Raveendran',
                  role: 'Backend Developer',
                  image: '/src/images/team/ashvi.jpg',
                  linkedin: 'https://www.linkedin.com/in/ashvitha-ravindran-611819265/',
                  instagram: 'https://www.instagram.com/ashvi_ravi/',
                },
                {
                  name: 'Balendran Harishith',
                  role: 'Backend Developer',
                  image: '/src/images/team/harishith.jpg',
                  linkedin: 'https://www.linkedin.com/in/balendran-harishith-560823292/',
                  instagram: 'https://www.instagram.com/horried_shith9/',
                }
              ].map((member, index) => (
                  <div
                      key={index}
                      className="group"
                  >
                    <div className={`h-full ${isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-white border border-navy-200 hover:border-navy-400'} rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}>
                      {/* Image container with error handling */}
                      <div className="relative overflow-hidden h-48 sm:h-64 md:h-72">
                        {/* Fallback color while image loads */}
                        <div className="absolute inset-0 bg-navy-800"></div>

                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 relative z-10"
                            onError={(e) => {
                              console.error(`Failed to load image for ${member.name}`);
                              // Set a fallback image using the placeholder API
                              e.target.src = `/api/placeholder/400/400?text=${member.name.split(' ')[0]}`;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                      </div>

                      {/* Content section */}
                      <div className="p-4 sm:p-6">
                        <h3 className={`text-lg sm:text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                          {member.name}
                        </h3>
                        <p className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${isDarkMode ? 'text-stone-400' : 'text-navy-600'}`}>
                          {member.role}
                        </p>

                        <p className={`text-xs sm:text-sm mb-4 sm:mb-5 ${isDarkMode ? 'text-stone-300' : 'text-navy-700'} line-clamp-2 group-hover:line-clamp-none transition-all duration-300`}>
                          {member.bio || "Team member bringing expertise to the Athlon platform development."}
                        </p>

                        {/* Social links */}
                        <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4 border-t border-dashed border-opacity-50 border-stone-500">
                          {/* LinkedIn icon */}
                          <a href={member.linkedin || "#"} className={`p-1.5 sm:p-2 rounded-full ${isDarkMode ? 'bg-navy-700/30 hover:bg-navy-700/70 text-white' : 'bg-navy-100 hover:bg-navy-200 text-navy-700'} transition-colors`} title="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="sm:w-4 sm:h-4">
                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                            </svg>
                          </a>

                          {/* Instagram icon - only if present */}
                          {member.instagram && (
                              <a href={member.instagram} className={`p-1.5 sm:p-2 rounded-full ${isDarkMode ? 'bg-navy-700/30 hover:bg-navy-700/70 text-white' : 'bg-navy-100 hover:bg-navy-200 text-navy-700'} transition-colors`} title="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="sm:w-4 sm:h-4">
                                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                </svg>
                              </a>
                          )}

                          {/* CV/Resume icon */}
                          <a href="#" className={`p-1.5 sm:p-2 rounded-full ${isDarkMode ? 'bg-navy-700/30 hover:bg-navy-700/70 text-white' : 'bg-navy-100 hover:bg-navy-200 text-navy-700'} transition-colors`} title="Download CV">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="sm:w-4 sm:h-4">
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder's Story Video Section */}
        <section className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 ${isDarkMode ? 'bg-navy-800/50' : 'bg-navy-100'} relative overflow-hidden`}>
          {/* Background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-navy-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-stone-500/10 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-16">
                {/* Video Player Side */}
                <div className="lg:w-3/5 relative w-full">
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl"
                  >
                    {/* Video Thumbnail with Play Button Overlay */}
                    <div className="relative aspect-video">
                      {/* Video thumbnail */}
                      <div className="absolute inset-0 bg-navy-900 overflow-hidden">
                        <img
                            src="/api/placeholder/800/450?text=Founder's+Story"
                            alt="Athlon Founder's Story"
                            className="w-full h-full object-cover opacity-80"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-navy-900 via-navy-900/70 to-transparent"></div>
                      </div>

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative group cursor-pointer">
                          <div className="absolute inset-0 rounded-full bg-navy-500/30 blur-xl group-hover:bg-navy-500/50 transition-colors duration-300"></div>
                          <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-colors duration-300 group-hover:scale-110 transform-gpu">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-navy-700 group-hover:text-navy-900 transition-colors duration-300 ml-1"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Video duration */}
                      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black/60 backdrop-blur-sm rounded-md text-xxs sm:text-xs text-white">
                        3:45
                      </div>
                    </div>

                    {/* Video caption */}
                    <div className={`p-3 sm:p-5 ${isDarkMode ? 'bg-navy-800' : 'bg-white'}`}>
                      <h3 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                        The Story Behind Athlon: Revolutionizing Sports Facility Booking
                      </h3>
                      <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-stone-300' : 'text-navy-600'}`}>
                        Published on February 10, 2025
                      </p>
                    </div>
                  </motion.div>

                  {/* Video quality badge */}
                  <div className="mt-3 sm:mt-6 px-2">
                  <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xxs sm:text-xs font-medium ${isDarkMode ? 'bg-navy-600/50 text-stone-300' : 'bg-navy-100 text-navy-700'}`}>
                    HD Quality
                  </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-2/5 mt-8 lg:mt-0">
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                  >
                  <span className={`inline-block px-3 sm:px-4 py-1 rounded-full ${isDarkMode ? 'bg-white/10 text-stone-300' : 'bg-navy-100 text-navy-800'} text-xs sm:text-sm font-semibold mb-4 sm:mb-6`}>
                    OUR JOURNEY
                  </span>

                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                      The <span className={isDarkMode ? "text-stone-300" : "text-navy-600"}>Inspiration</span> Behind Athlon
                    </h2>

                    <div className={`space-y-3 sm:space-y-4 mb-6 sm:mb-8 ${isDarkMode ? 'text-stone-300' : 'text-navy-700'} text-sm sm:text-base`}>
                      <p>
                        "The idea for Athlon was born out of our own frustration with booking sports facilities. As avid sports enthusiasts, we experienced firsthand the challenges of finding and reserving courts."
                      </p>
                      <p>
                        "We envisioned a platform that would make the entire process seamless - from discovering facilities to managing bookings and connecting with other players."
                      </p>
                      <blockquote className={`pl-3 sm:pl-4 border-l-2 sm:border-l-4 ${isDarkMode ? 'border-navy-500 text-stone-300 italic' : 'border-navy-500 text-navy-700 italic'} my-4 sm:my-6`}>
                        "Our mission is simple: to remove all barriers between players and the sports they love."
                      </blockquote>
                    </div>

                    {/* Quote attribution */}
                    <div className="mb-6 sm:mb-8">
                      <p className={`italic text-xs sm:text-sm ${isDarkMode ? 'text-stone-400' : 'text-navy-600'}`}>
                        — The Athlon Founding Team
                      </p>
                    </div>

                    {/* Additional quote */}
                    <div className="mb-6 sm:mb-8">
                      <p className={`text-sm sm:text-base ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                        "We're committed to creating a platform that truly understands the needs of both players and facility managers. Athlon isn't just about booking—it's about building a thriving sports community."
                      </p>
                    </div>

                    {/* Share options */}
                    <div>
                      <p className={`text-xs sm:text-sm mb-2 sm:mb-3 ${isDarkMode ? 'text-stone-400' : 'text-navy-600'}`}>Share this story:</p>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {['Twitter', 'Facebook', 'LinkedIn', 'Email'].map((platform, i) => (
                            <a
                                key={i}
                                href="#"
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${
                                    isDarkMode
                                        ? 'bg-white/10 hover:bg-white/20 text-white'
                                        : 'bg-navy-100 hover:bg-navy-200 text-navy-700'
                                } transition-colors`}
                            >
                              {platform}
                            </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Newsletter signup */}
              <div className="mt-12 sm:mt-16">
                <div className={`p-6 sm:p-8 rounded-xl sm:rounded-2xl ${isDarkMode ? 'bg-navy-700/50 border border-navy-600/30' : 'bg-navy-700 border border-navy-600'} text-white`}>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Stay Updated on Our Launch</h3>
                      <p className="text-xs sm:text-sm text-stone-300">Subscribe to our newsletter for the latest updates and exclusive early access.</p>
                    </div>

                    <div className="w-full md:w-auto">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg placeholder-stone-400 text-white text-sm focus:outline-none focus:bg-white/20 w-full"
                        />
                        <button className="bg-white text-navy-900 hover:bg-stone-200 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm transition-colors">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 13. Interactive Features Slider (Discover More Features) - Enhanced Version */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10">
            <div className={`absolute top-1/3 left-0 w-64 sm:w-96 h-64 sm:h-96 ${isDarkMode ? 'bg-navy-500/10' : 'bg-navy-300/20'} rounded-full filter blur-3xl`}></div>
            <div className={`absolute bottom-1/4 right-0 w-48 sm:w-64 h-48 sm:h-64 ${isDarkMode ? 'bg-stone-500/10' : 'bg-stone-400/10'} rounded-full filter blur-3xl`}></div>

            {/* Animated accent line */}
            <div className={`absolute left-0 right-0 top-1/3 h-px ${isDarkMode ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-navy-700/10 to-transparent'}`}></div>
            <div className={`absolute left-0 right-0 bottom-1/3 h-px ${isDarkMode ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-navy-700/10 to-transparent'}`}></div>
          </div>

          <div className="container mx-auto">
            <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-3xl mx-auto text-center mb-8 sm:mb-16"
            >
            <span className={`inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full ${isDarkMode ? 'bg-white/10 text-stone-300' : 'bg-navy-700/10 text-navy-800'} text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>
              INNOVATIVE FEATURES
            </span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                Discover <span className={isDarkMode ? "text-stone-300 underline decoration-navy-500 underline-offset-8" : "text-navy-600 underline decoration-navy-400 underline-offset-8"}>Powerful</span> Features
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                Explore the innovative technologies that make Athlon the premier sports facility booking platform.
              </p>
            </motion.div>

            {/* Feature showcase area - Responsive grid that becomes stacked on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Feature navigation sidebar */}
              <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="lg:col-span-4 z-20 order-2 lg:order-1"
              >
                <div className={`rounded-xl sm:rounded-2xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-navy-200 shadow-lg'}`}>
                  <div className="p-4 sm:p-6">
                    <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>Explore Features</h3>
                    <p className={`text-xs sm:text-sm mb-4 sm:mb-6 ${isDarkMode ? 'text-stone-300' : 'text-navy-600'}`}>
                      Click on any feature to learn more about how it enhances your booking experience.
                    </p>
                  </div>

                  {/* Feature navigation buttons */}
                  <div className="space-y-1 px-3 pb-6">
                    {features.map((feature, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentFeature(index)}
                            className={`w-full text-left p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
                                currentFeature === index
                                    ? isDarkMode
                                        ? 'bg-navy-700 text-white'
                                        : 'bg-navy-100 text-navy-800'
                                    : isDarkMode
                                        ? 'hover:bg-white/5 text-stone-300'
                                        : 'hover:bg-navy-50 text-navy-600'
                            }`}
                        >
                          <div className={`p-1.5 sm:p-2 rounded-full ${
                              currentFeature === index
                                  ? isDarkMode
                                      ? 'bg-white/20'
                                      : 'bg-navy-200/50'
                                  : isDarkMode
                                      ? 'bg-navy-800/50'
                                      : 'bg-navy-100'
                          }`}>
                            <feature.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="text-sm sm:text-base font-medium">{feature.title}</span>

                          {currentFeature === index && (
                              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-auto" />
                          )}
                        </button>
                    ))}
                  </div>

                  {/* Additional features teaser */}
                  <div className={`border-t ${isDarkMode ? 'border-white/10' : 'border-navy-100'} p-4 sm:p-6`}>
                    <p className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                      And many more features including:
                    </p>
                    <ul className={`text-xs sm:text-sm space-y-1.5 sm:space-y-2 ${isDarkMode ? 'text-stone-400' : 'text-navy-600'}`}>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span>Virtual Facility Tours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                        <span>Team Management Tools</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                        <span>AI Recommendations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Feature showcase display */}
              <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="lg:col-span-8 order-1 lg:order-2 mb-6 lg:mb-0"
              >
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] shadow-xl sm:shadow-2xl border-4 sm:border-8 border-navy-800">
                  {/* Feature image slider */}
                  {features.map((feature, index) => (
                      <div
                          key={index}
                          className={`absolute inset-0 transition-all duration-700 ${
                              currentFeature === index
                                  ? 'opacity-100 z-10 scale-100'
                                  : 'opacity-0 z-0 scale-105'
                          }`}
                      >
                        <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Content overlay with glass effect */}
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent flex flex-col justify-end">
                          <div
                              className={`mx-4 sm:mx-8 mb-4 sm:mb-8 p-4 sm:p-6 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-navy-900/60'} backdrop-blur-md border border-white/20`}>
                            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                              <div className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-navy-500 to-navy-700 self-start">
                                <feature.icon className="w-5 h-5 sm:w-8 sm:h-8 text-white"/>
                              </div>
                              <div>
                                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">{feature.title}</h3>
                                <p className="text-sm sm:text-lg text-stone-200 leading-relaxed">{feature.description}</p>

                                {/* Feature highlights - Customized for each feature - Hide on very small screens */}
                                <div className="hidden xs:flex mt-3 sm:mt-5 pt-3 sm:pt-5 border-t border-white/20 flex-wrap gap-2 sm:gap-4">
                                  {index === 0 && [ // Interactive 3D Maps
                                    {text: "Virtual tours", icon: MapPin},
                                    {text: "3D venue details", icon: MapPin},
                                    {text: "Interactive navigation", icon: MapPin},
                                    {text: "Visual exploration", icon: MapPin}
                                  ].map((highlight, idx) => (
                                      <div key={idx} className="flex items-center gap-1 sm:gap-2">
                                        <div className="p-0.5 sm:p-1 rounded-full bg-white/20">
                                          <highlight.icon className="w-2 h-2 sm:w-3 sm:h-3 text-white"/>
                                        </div>
                                        <span className="text-xxs sm:text-xs font-medium text-stone-300">{highlight.text}</span>
                                      </div>
                                  ))}

                                  {index === 1 && [ // AI Search Facility
                                    {text: "Smart recommendations", icon: Brain},
                                    {text: "Learning algorithms", icon: Brain},
                                    {text: "Preference-based results", icon: Brain},
                                    {text: "Personalized experience", icon: Search}
                                  ].map((highlight, idx) => (
                                      <div key={idx} className="flex items-center gap-1 sm:gap-2">
                                        <div className="p-0.5 sm:p-1 rounded-full bg-white/20">
                                          <highlight.icon className="w-2 h-2 sm:w-3 sm:h-3 text-white"/>
                                        </div>
                                        <span className="text-xxs sm:text-xs font-medium text-stone-300">{highlight.text}</span>
                                      </div>
                                  ))}

                                  {index === 2 && [ // Connect with Players
                                    {text: "In-app messaging", icon: Users},
                                    {text: "Team coordination", icon: Users},
                                    {text: "Facility communication", icon: Users},
                                    {text: "Community building", icon: Users}
                                  ].map((highlight, idx) => (
                                      <div key={idx} className="flex items-center gap-1 sm:gap-2">
                                        <div className="p-0.5 sm:p-1 rounded-full bg-white/20">
                                          <highlight.icon className="w-2 h-2 sm:w-3 sm:h-3 text-white"/>
                                        </div>
                                        <span className="text-xxs sm:text-xs font-medium text-stone-300">{highlight.text}</span>
                                      </div>
                                  ))}
                                </div>

                                {/* CTA Button */}
                                <button
                                    className="mt-3 sm:mt-5 bg-white text-navy-900 hover:bg-stone-200 transition-colors duration-300 px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2">
                                  Learn more <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4"/>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}

                  <div className="absolute top-[35%] left-2 sm:left-4 transform -translate-y-1/2 z-20">
                    <button
                        onClick={() => setCurrentFeature(prev => (prev === 0 ? features.length - 1 : prev - 1))}
                        className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white"/>
                    </button>
                  </div>

                  <div className="absolute top-[35%] right-2 sm:right-4 transform -translate-y-1/2 z-20">
                    <button
                        onClick={() => setCurrentFeature(prev => (prev === features.length - 1 ? 0 : prev + 1))}
                        className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white"/>
                    </button>
                  </div>

                  {/* Custom progress indicator */}
                  <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 sm:gap-4">
                    {features.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentFeature(index)}
                            className="group relative"
                        >
                          <div className={`w-6 sm:w-10 h-1 rounded-full transition-all duration-300 ${
                              currentFeature === index ? 'bg-white' : 'bg-white/30'
                          } group-hover:bg-white/60`}></div>

                          {/* Show feature number on hover - Hide on mobile */}
                          <div
                              className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 text-navy-900 text-xxs sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md pointer-events-none hidden sm:block">
                            Feature {index + 1}
                          </div>
                        </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 11. Pricing Plans Section */}
        <section id="pricing"
                 className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 ${isDarkMode ? 'bg-navy-900' : 'bg-navy-50'} relative overflow-hidden`}>
          {/* Background decorations */}
          <div className="absolute inset-0 -z-10">
            <div
                className={`absolute top-1/4 left-0 w-64 sm:w-96 h-64 sm:h-96 ${isDarkMode ? 'bg-navy-500/10' : 'bg-navy-300/20'} rounded-full filter blur-3xl`}></div>
            <div
                className={`absolute bottom-1/4 right-0 w-48 sm:w-64 h-48 sm:h-64 ${isDarkMode ? 'bg-stone-500/10' : 'bg-stone-400/10'} rounded-full filter blur-3xl`}></div>
          </div>

          <div className="container mx-auto">
            <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.3}}
                className="max-w-3xl mx-auto text-center mb-8 sm:mb-16"
            >
            <span className={`inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full ${isDarkMode ? 'bg-white/10 text-stone-300' : 'bg-navy-700/10 text-navy-800'} text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>
              FLEXIBLE PRICING
            </span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>
                Simple, Transparent <span className={isDarkMode ? "text-stone-300 underline decoration-navy-500 underline-offset-8" : "text-navy-600 underline decoration-navy-400 underline-offset-8"}>Pricing</span>
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                Choose a plan that fits your sporting needs. First month is completely free for all plans!
              </p>
            </motion.div>

            {/* Pricing Toggle */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className={`inline-flex rounded-full p-1 ${isDarkMode ? 'bg-navy-800' : 'bg-navy-100'}`}>
                <button
                    className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300 ${
                        billingCycle === 'monthly'
                            ? (isDarkMode
                                ? 'bg-navy-600 text-white'
                                : 'bg-navy-700 text-white')
                            : (isDarkMode
                                ? 'text-stone-400 hover:text-stone-200'
                                : 'text-navy-600 hover:text-navy-800')
                    }`}
                    onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
                <button
                    className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300 ${
                        billingCycle === 'annual'
                            ? (isDarkMode
                                ? 'bg-navy-600 text-white'
                                : 'bg-navy-700 text-white')
                            : (isDarkMode
                                ? 'text-stone-400 hover:text-stone-200'
                                : 'text-navy-600 hover:text-navy-800')
                    }`}
                    onClick={() => setBillingCycle('annual')}
                >
                  Annual
                  <span className={`ml-1 sm:ml-2 text-xxs sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                      billingCycle === 'annual'
                          ? 'bg-emerald-500 text-white'
                          : (isDarkMode
                              ? 'bg-emerald-900/50 text-emerald-400'
                              : 'bg-emerald-100 text-emerald-700')
                  }`}>
                  Save 20%
                </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {pricingPlans.map((plan, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative"
                  >
                    <div
                        className={`
                    h-full rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-300
                    ${plan.recommended
                            ? (isDarkMode
                                ? 'bg-navy-700 border-2 border-navy-500 shadow-2xl'
                                : 'bg-navy-700 text-white shadow-xl')
                            : (isDarkMode
                                ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                                : 'bg-white border border-navy-200 hover:shadow-lg')}
                  `}
                    >
                      {plan.recommended && (
                          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-xxs sm:text-xs font-semibold ${
                              isDarkMode
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-emerald-500 text-white'
                          }`}>
                            Most Popular
                          </div>
                      )}

                      <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-4 ${
                          plan.recommended
                              ? 'text-white'
                              : (isDarkMode ? 'text-white' : 'text-navy-800')
                      }`}>
                        {plan.name}
                      </h3>

                      <p className={`mb-4 sm:mb-6 text-sm ${
                          plan.recommended
                              ? 'text-stone-200'
                              : (isDarkMode ? 'text-stone-300' : 'text-navy-600')
                      }`}>
                        {plan.description || "Perfect for individual players and casual enthusiasts"}
                      </p>

                      <div className="mb-4 sm:mb-6">
                    <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${
                        plan.recommended
                            ? 'text-white'
                            : (isDarkMode ? 'text-white' : 'text-navy-800')
                    }`}>
                      {billingCycle === 'monthly'
                          ? `LKR ${plan.price}`
                          : `LKR ${Math.round(plan.price * 12 * 0.8)}`}
                    </span>
                        <span className={`text-xs sm:text-sm ml-1 sm:ml-2 ${
                            plan.recommended
                                ? 'text-stone-300'
                                : (isDarkMode ? 'text-stone-400' : 'text-navy-600')
                        }`}>
                      {billingCycle === 'monthly' ? '/month' : '/year'}
                    </span>
                      </div>

                      <ul className={`mb-6 sm:mb-8 space-y-2 sm:space-y-3 flex-grow ${
                          plan.recommended
                              ? 'text-stone-200'
                              : (isDarkMode ? 'text-stone-300' : 'text-navy-600')
                      } text-sm`}>
                        {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 sm:gap-3">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                      plan.recommended
                                          ? 'text-emerald-400'
                                          : (isDarkMode ? 'text-navy-500' : 'text-navy-700')
                                  }`}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                        ))}
                      </ul>

                      <button
                          className={`w-full py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                              plan.recommended
                                  ? 'bg-white text-navy-900 hover:bg-stone-200'
                                  : (isDarkMode
                                      ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                      : 'bg-navy-700/10 text-navy-800 hover:bg-navy-700/20 border border-navy-700/20')
                          }`}
                      >
                        Choose {plan.name}
                      </button>
                    </div>
                  </motion.div>
              ))}
            </div>

            {/* Pricing Details */}
            <div className="mt-12 sm:mt-16 max-w-4xl mx-auto text-center">
              <p className={`text-base sm:text-lg ${isDarkMode ? 'text-stone-300' : 'text-navy-700'}`}>
                All plans include:
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4 sm:mt-6">
                {[
                  "First month free",
                  "Instant booking",
                  "24/7 Support",
                  "Cancel anytime"
                ].map((detail, index) => (
                    <div
                        key={index}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                            isDarkMode
                                ? 'bg-white/10 text-stone-300'
                                : 'bg-navy-100 text-navy-700'
                        }`}
                    >
                      {detail}
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 13. Call to Action (Ready to Transform...) */}
        <section className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 ${isDarkMode ? 'bg-navy-800/50' : 'bg-navy-100'} relative`}>
          <div className="absolute inset-0">
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-navy-700/30' : 'bg-navy-700/10'} backdrop-blur-sm`}></div>
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
            >
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-8 ${isDarkMode ? 'text-white' : 'text-navy-800'}`}>Ready to Transform Your Sports Facility Booking Experience?</h2>
              <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-white/90' : 'text-navy-700'} mb-8 sm:mb-12 max-w-3xl mx-auto`}>
                Join thousands of satisfied users who have made Athlon their go-to platform for managing sports activities.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <button className={`${isDarkMode ? 'bg-white text-navy-900' : 'bg-navy-700 text-white'} px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto`}>
                  Launching Soon
                </button>

                <button className={`${isDarkMode ? 'bg-transparent border-2 border-white text-white' : 'bg-transparent border-2 border-navy-700 text-navy-800'} px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto`}>
                  Book a Demo <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Add CSS for extra small screens */}
        <style jsx global>{`
        @media (max-width: 480px) {
          .text-xxs {
            font-size: 0.6875rem;
          }
        }
      `}</style>
      </div>
  );
}

export default App;