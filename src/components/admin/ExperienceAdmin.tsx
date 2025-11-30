import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye, GraduationCap, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

interface Experience {
  _id: string;
  type: 'education' | 'experience';
  title: string;
  subtitle: string;
  date: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const ExperienceAdmin = () => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch experiences
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['admin-experience'],
    queryFn: async () => {
      const response = await apiClient.get('/experience');
      return response.data.data || [];
    },
  });

  // Create experience mutation
  const createMutation = useMutation({
    mutationFn: async (newExperience: Omit<Experience, '_id' | 'createdAt' | 'updatedAt'>) => {
      const response = await apiClient.post('/experience', newExperience);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-experience'] });
      setIsCreateDialogOpen(false);
      toast.success('Experience created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create experience');
    },
  });

  // Update experience mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Experience> }) => {
      const response = await apiClient.put(`/experience/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-experience'] });
      setIsEditDialogOpen(false);
      toast.success('Experience updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update experience');
    },
  });

  // Delete experience mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/experience/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-experience'] });
      toast.success('Experience deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete experience');
    },
  });

  const handleCreate = (formData: FormData) => {
    const newExperience = {
      type: formData.get('type') as 'education' | 'experience',
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string,
      date: formData.get('date') as string,
      description: formData.get('description') as string,
      order: parseInt(formData.get('order') as string) || 0,
    };
    createMutation.mutate(newExperience);
  };

  const handleUpdate = (formData: FormData) => {
    if (!selectedExperience) return;
    const updatedExperience = {
      type: formData.get('type') as 'education' | 'experience',
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string,
      date: formData.get('date') as string,
      description: formData.get('description') as string,
      order: parseInt(formData.get('order') as string) || 0,
    };
    updateMutation.mutate({ id: selectedExperience._id, data: updatedExperience });
  };

  // Separate education and work experience
  const educationExperiences = experiences.filter((exp: Experience) => exp.type === 'education');
  const workExperiences = experiences.filter((exp: Experience) => exp.type === 'experience');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Experience Management</h1>
          <p className="mt-2 text-gray-600">Manage your education and work experience</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Experience</DialogTitle>
            </DialogHeader>
            <ExperienceForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Education Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          Education ({educationExperiences.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {educationExperiences.map((experience: Experience) => (
            <ExperienceCard
              key={experience._id}
              experience={experience}
              onView={() => {
                setSelectedExperience(experience);
                setIsViewDialogOpen(true);
              }}
              onEdit={() => {
                setSelectedExperience(experience);
                setIsEditDialogOpen(true);
              }}
              onDelete={() => {
                if (confirm('Are you sure you want to delete this experience?')) {
                  deleteMutation.mutate(experience._id);
                }
              }}
            />
          ))}
          {educationExperiences.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No education entries yet
            </div>
          )}
        </div>
      </div>

      {/* Work Experience Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-green-600" />
          Work Experience ({workExperiences.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workExperiences.map((experience: Experience) => (
            <ExperienceCard
              key={experience._id}
              experience={experience}
              onView={() => {
                setSelectedExperience(experience);
                setIsViewDialogOpen(true);
              }}
              onEdit={() => {
                setSelectedExperience(experience);
                setIsEditDialogOpen(true);
              }}
              onDelete={() => {
                if (confirm('Are you sure you want to delete this experience?')) {
                  deleteMutation.mutate(experience._id);
                }
              }}
            />
          ))}
          {workExperiences.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No work experience entries yet
            </div>
          )}
        </div>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedExperience?.title}</DialogTitle>
          </DialogHeader>
          {selectedExperience && <ExperienceDetails experience={selectedExperience} />}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Experience</DialogTitle>
          </DialogHeader>
          {selectedExperience && (
            <ExperienceForm
              experience={selectedExperience}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Experience Card Component
const ExperienceCard = ({
  experience,
  onView,
  onEdit,
  onDelete
}: {
  experience: Experience;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{experience.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{experience.subtitle}</p>
            <p className="text-sm text-gray-500 mt-1">{experience.date}</p>
          </div>
          <Badge variant={experience.type === 'education' ? 'default' : 'secondary'}>
            {experience.type === 'education' ? 'Education' : 'Work'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm line-clamp-2 mb-4">{experience.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onView}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Experience Form Component
const ExperienceForm = ({ experience, onSubmit }: { experience?: Experience; onSubmit: (formData: FormData) => void }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="type">Type</Label>
        <Select name="type" defaultValue={experience?.type || 'experience'}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="experience">Work Experience</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={experience?.title}
          placeholder="e.g., Bachelor of Computer Science"
          required
        />
      </div>

      <div>
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          name="subtitle"
          defaultValue={experience?.subtitle}
          placeholder="e.g., University Name, Company Name"
          required
        />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          defaultValue={experience?.date}
          placeholder="e.g., 2020 - 2024, Jan 2023 - Present"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={experience?.description}
          rows={4}
          placeholder="Describe your experience, achievements, or responsibilities"
          required
        />
      </div>

      <div>
        <Label htmlFor="order">Order</Label>
        <Input
          id="order"
          name="order"
          type="number"
          defaultValue={experience?.order || 0}
        />
      </div>

      <Button type="submit" className="w-full">
        {experience ? 'Update Experience' : 'Create Experience'}
      </Button>
    </form>
  );
};

// Experience Details Component
const ExperienceDetails = ({ experience }: { experience: Experience }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-3xl mb-4">
          {experience.type === 'education' ? <GraduationCap className="mx-auto text-blue-600" /> : <Briefcase className="mx-auto text-green-600" />}
        </div>
        <h3 className="text-xl font-semibold">{experience.title}</h3>
        <p className="text-gray-600 mt-1">{experience.subtitle}</p>
        <p className="text-purple-600 font-medium mt-2">{experience.date}</p>
        <Badge variant={experience.type === 'education' ? 'default' : 'secondary'} className="mt-2">
          {experience.type === 'education' ? 'Education' : 'Work Experience'}
        </Badge>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Description</h4>
        <p className="text-gray-700 whitespace-pre-wrap">{experience.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Order:</span> {experience.order}
        </div>
        <div>
          <span className="font-medium">Created:</span> {new Date(experience.createdAt).toLocaleDateString()}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {new Date(experience.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ExperienceAdmin;
