import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, FileText, MapPin, Clock, Mail, Link as LinkIcon,
  Eye, CheckCircle, ArrowLeft
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  title: string;
  company: string;
  description: string;
  requirements: string;
  responsibilities: string;
  location: string;
  type: string;
  duration: string;
  stipend: string;
  category: string;
  applyLink: string;
  applyEmail: string;
  deadline: string;
}

const PostInternship = () => {
  const { toast } = useToast();
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    company: '',
    description: '',
    requirements: '',
    responsibilities: '',
    location: '',
    type: '',
    duration: '',
    stipend: '',
    category: '',
    applyLink: '',
    applyEmail: '',
    deadline: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    toast({
      title: "Internship Posted!",
      description: "Your internship listing has been published successfully.",
    });
  };

  const typeColors = {
    Remote: 'bg-success/10 text-success border-success/20',
    'On-site': 'bg-accent/10 text-accent border-accent/20',
    Hybrid: 'bg-primary/10 text-primary border-primary/20',
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Internship Posted!</h1>
            <p className="text-muted-foreground mb-8">
              Your internship listing "{formData.title}" has been published successfully. 
              Students can now view and apply to your opportunity.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  title: '',
                  company: '',
                  description: '',
                  requirements: '',
                  responsibilities: '',
                  location: '',
                  type: '',
                  duration: '',
                  stipend: '',
                  category: '',
                  applyLink: '',
                  applyEmail: '',
                  deadline: '',
                });
              }}>
                Post Another
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/internships'}>
                View Listings
              </Button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (isPreview) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => setIsPreview(false)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Editing
          </button>

          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              {/* Preview Header */}
              <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                Preview Mode
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {formData.title || 'Internship Title'}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {formData.company || 'Company Name'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {formData.type && (
                  <Badge variant="outline" className={typeColors[formData.type as keyof typeof typeColors] || ''}>
                    {formData.type}
                  </Badge>
                )}
                {formData.category && (
                  <Badge variant="outline" className="bg-secondary/50">
                    {formData.category}
                  </Badge>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl mb-8">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{formData.location || 'Location not specified'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{formData.duration || 'Duration not specified'}</span>
                </div>
              </div>

              {formData.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground mb-3">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{formData.description}</p>
                </div>
              )}

              {formData.requirements && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground mb-3">Requirements</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{formData.requirements}</p>
                </div>
              )}

              {formData.responsibilities && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground mb-3">Responsibilities</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{formData.responsibilities}</p>
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-border">
                <Button variant="outline" className="flex-1" onClick={() => setIsPreview(false)}>
                  Edit
                </Button>
                <Button className="flex-1" onClick={handleSubmit}>
                  Post Internship
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Post an Internship</h1>
            <p className="text-muted-foreground">
              Create a new internship opportunity for Bells University students
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-6"
          >
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Basic Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Internship Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g., Software Engineering Intern"
                    className="mt-1.5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    placeholder="e.g., TechCorp Nigeria"
                    className="mt-1.5"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Describe the internship opportunity, what the intern will learn, and the team they'll work with..."
                  rows={4}
                  className="mt-1.5"
                  required
                />
              </div>
            </div>

            {/* Requirements & Responsibilities */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Requirements & Responsibilities</h2>
              
              <div>
                <Label htmlFor="requirements">Requirements *</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => updateField('requirements', e.target.value)}
                  placeholder="List the skills, qualifications, and experience required (one per line)..."
                  rows={4}
                  className="mt-1.5"
                  required
                />
              </div>

              <div>
                <Label htmlFor="responsibilities">Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  value={formData.responsibilities}
                  onChange={(e) => updateField('responsibilities', e.target.value)}
                  placeholder="List the main responsibilities and tasks (one per line)..."
                  rows={4}
                  className="mt-1.5"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Details
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="e.g., Lagos, Nigeria"
                    className="mt-1.5"
                    required
                  />
                </div>
                <div>
                  <Label>Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => updateField('type', value)}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="On-site">On-site</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => updateField('duration', e.target.value)}
                    placeholder="e.g., 3 months"
                    className="mt-1.5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stipend">Stipend</Label>
                  <Input
                    id="stipend"
                    value={formData.stipend}
                    onChange={(e) => updateField('stipend', e.target.value)}
                    placeholder="e.g., ₦80,000/month"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => updateField('category', value)}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => updateField('deadline', e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>

            {/* Application Method */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Application Method
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applyLink">Application Link</Label>
                  <div className="relative mt-1.5">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="applyLink"
                      value={formData.applyLink}
                      onChange={(e) => updateField('applyLink', e.target.value)}
                      placeholder="https://..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="applyEmail">Or Application Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="applyEmail"
                      type="email"
                      value={formData.applyEmail}
                      onChange={(e) => updateField('applyEmail', e.target.value)}
                      placeholder="careers@company.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => setIsPreview(true)}
              >
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button
                type="submit"
                className="flex-1"
                onClick={handleSubmit}
              >
                Post Internship
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </Layout>
  );
};

export default PostInternship;
