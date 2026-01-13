import { motion } from 'framer-motion';
import { MapPin, Clock, Banknote, Bookmark, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Internship } from '@/lib/mockData';

interface InternshipCardProps {
  internship: Internship;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
  index?: number;
}

export function InternshipCard({ internship, isSaved = false, onToggleSave, index = 0 }: InternshipCardProps) {
  const typeColors = {
    Remote: 'bg-success/10 text-success border-success/20',
    'On-site': 'bg-accent/10 text-accent border-accent/20',
    Hybrid: 'bg-primary/10 text-primary border-primary/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-xl border border-border p-5 card-hover"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <img
            src={internship.logo}
            alt={internship.company}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <Link to={`/internships/${internship.id}`}>
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors truncate">
                {internship.title}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm">{internship.company}</p>
          </div>
        </div>
        
        {onToggleSave && (
          <button
            onClick={() => onToggleSave(internship.id)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline" className={typeColors[internship.type]}>
          {internship.type}
        </Badge>
        <Badge variant="outline" className="bg-secondary/50">
          {internship.category}
        </Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{internship.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{internship.duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Banknote className="w-4 h-4" />
          <span>{internship.stipend}</span>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Link to={`/internships/${internship.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Link to={`/internships/${internship.id}`}>
          <Button>Apply</Button>
        </Link>
      </div>
    </motion.div>
  );
}
