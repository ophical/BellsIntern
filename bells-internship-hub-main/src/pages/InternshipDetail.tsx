import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Clock, Banknote, Calendar, Building2, 
  ArrowLeft, Bookmark, BookmarkCheck, Share2, CheckCircle 
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ApplyModal } from '@/components/internships/ApplyModal';
import { InternshipCard } from '@/components/internships/InternshipCard';
import { internships, savedInternships as initialSaved } from '@/lib/mockData';

const InternshipDetail = () => {
  const { id } = useParams();
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [saved, setSaved] = useState(initialSaved);

  const internship = internships.find(i => i.id === id);

  if (!internship) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Internship Not Found</h1>
          <p className="text-muted-foreground mb-8">The internship you're looking for doesn't exist.</p>
          <Link to="/internships">
            <Button>Browse Internships</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const isSaved = saved.includes(internship.id);
  const toggleSave = () => {
    setSaved(prev => 
      prev.includes(internship.id) 
        ? prev.filter(s => s !== internship.id) 
        : [...prev, internship.id]
    );
  };

  const relatedInternships = internships
    .filter(i => i.id !== internship.id && i.category === internship.category)
    .slice(0, 2);

  const typeColors = {
    Remote: 'bg-success/10 text-success border-success/20',
    'On-site': 'bg-accent/10 text-accent border-accent/20',
    Hybrid: 'bg-primary/10 text-primary border-primary/20',
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/internships" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Internships
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border p-6 md:p-8"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={internship.logo}
                  alt={internship.company}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {internship.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">{internship.company}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className={typeColors[internship.type]}>
                  {internship.type}
                </Badge>
                <Badge variant="outline" className="bg-secondary/50">
                  {internship.category}
                </Badge>
              </div>

              {/* Quick Info */}
              <div className="grid sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{internship.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium text-foreground">{internship.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stipend</p>
                    <p className="font-medium text-foreground">{internship.stipend}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p className="font-medium text-foreground">
                      {new Date(internship.deadline).toLocaleDateString('en-NG', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">About This Internship</h2>
                <p className="text-muted-foreground leading-relaxed">{internship.description}</p>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {internship.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsibilities */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {internship.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Related Internships */}
            {relatedInternships.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Similar Internships</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedInternships.map((related, index) => (
                    <InternshipCard
                      key={related.id}
                      internship={related}
                      isSaved={saved.includes(related.id)}
                      onToggleSave={(id) => setSaved(prev => 
                        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
                      )}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="sticky top-24 space-y-6"
            >
              {/* Apply Card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <Button 
                  size="lg" 
                  className="w-full mb-4"
                  onClick={() => setIsApplyOpen(true)}
                >
                  Apply Now
                </Button>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-2"
                    onClick={toggleSave}
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 fill-current" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Company Card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  About {internship.company}
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={internship.logo}
                    alt={internship.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{internship.company}</p>
                    <p className="text-sm text-muted-foreground">{internship.location}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  A leading organization in the {internship.category.toLowerCase()} sector, 
                  committed to nurturing young talent and providing valuable industry experience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        internshipTitle={internship.title}
        company={internship.company}
      />
    </Layout>
  );
};

export default InternshipDetail;
