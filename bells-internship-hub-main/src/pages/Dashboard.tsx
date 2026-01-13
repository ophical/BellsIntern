import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, GraduationCap, Briefcase, Heart, Settings,
  Edit2, Camera, Plus, X, Clock, CheckCircle, Eye, XCircle
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InternshipCard } from '@/components/internships/InternshipCard';
import { mockApplications, internships, savedInternships as initialSaved } from '@/lib/mockData';

const Dashboard = () => {
  const [saved, setSaved] = useState(initialSaved);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@bellsuniversity.edu.ng',
    bio: 'Passionate Computer Science student with a keen interest in software development and artificial intelligence. Looking for opportunities to apply my skills in real-world projects.',
    skills: ['JavaScript', 'React', 'Python', 'Node.js', 'SQL'],
    course: 'Computer Science',
    level: '400 Level',
  });
  const [newSkill, setNewSkill] = useState('');

  const toggleSave = (id: string) => {
    setSaved(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const savedInternshipsList = internships.filter(i => saved.includes(i.id));

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'Viewed':
        return <Eye className="w-4 h-4 text-primary" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-success/10 text-success border-success/20';
      case 'Viewed':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-warning/10 text-warning border-warning/20';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>

              {/* Edit Mode Toggle */}
              <Button
                variant="outline"
                className="w-full mb-6 gap-2"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Settings className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </Button>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Bio
                </h3>
                {isEditing ? (
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="resize-none"
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">{profile.bio}</p>
                )}
              </div>

              {/* Education */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  Education
                </h3>
                <div className="bg-muted/30 rounded-xl p-4">
                  <p className="font-medium text-foreground">Bells University of Technology</p>
                  {isEditing ? (
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={profile.course}
                        onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                        placeholder="Course"
                        className="flex-1"
                      />
                      <Input
                        value={profile.level}
                        onChange={(e) => setProfile({ ...profile, level: e.target.value })}
                        placeholder="Level"
                        className="w-28"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      {profile.course} • {profile.level}
                    </p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      {isEditing && (
                        <button onClick={() => removeSkill(skill)}>
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2 mt-3">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add skill"
                      onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                      className="flex-1"
                    />
                    <Button size="icon" onClick={addSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="applications" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="applications" className="gap-2">
                  <Briefcase className="w-4 h-4" />
                  My Applications
                </TabsTrigger>
                <TabsTrigger value="saved" className="gap-2">
                  <Heart className="w-4 h-4" />
                  Saved ({savedInternshipsList.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="applications">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {mockApplications.length > 0 ? (
                    mockApplications.map((application, index) => (
                      <motion.div
                        key={application.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-xl border border-border p-5 flex items-center justify-between gap-4"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {application.internshipTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {application.company}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Applied on {new Date(application.appliedDate).toLocaleDateString('en-NG', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                        <Badge variant="outline" className={`gap-1.5 ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          {application.status}
                        </Badge>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-16 bg-card rounded-xl border border-border">
                      <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No Applications Yet
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Start exploring and applying to internships
                      </p>
                      <Button>Browse Internships</Button>
                    </div>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="saved">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {savedInternshipsList.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {savedInternshipsList.map((internship, index) => (
                        <InternshipCard
                          key={internship.id}
                          internship={internship}
                          isSaved={true}
                          onToggleSave={toggleSave}
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-card rounded-xl border border-border">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No Saved Internships
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Save internships to review them later
                      </p>
                      <Button>Browse Internships</Button>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
