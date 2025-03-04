import { motion } from 'framer-motion';
import { Linkedin, Instagram } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  instagram: string;
}

export const TeamMember = ({ name, role, image, linkedin, instagram }: TeamMemberProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
    >
      <div className="h-64 relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-navy-200 mb-4">{role}</p>
        <div className="flex gap-3">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-200 hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-200 hover:text-white transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};