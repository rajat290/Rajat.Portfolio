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
import { Plus, Edit, Trash2, Eye, User, FileText, Target, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface About {
  _id: string;
  section: 'hero' | 'bio' | 'approach' | 'interests';
  title: string;
  content: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const AboutAdmin = () => {
  const [selectedAbout, setSelectedAbout] = useState<About | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch about sections
  const { data: aboutSections = [], isLoading } = useQuery({
    queryKey: ['admin-about'],
    queryFn: async () => {
      const response = await apiClient.get('/about');
      return response.data.data || [];
    },
  });

  // Create about section mutation
  const createMutation = useMutation({
    mutationFn: async (newAbout: Omit<About, '_id' | 'createdAt' | 'updatedAt'>) => {
      const response = await apiClient.post('/about', newAbout);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-about'] });
      setIsCreateDialogOpen(false);
      toast.success('About section created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create about section');
    },
  });

  // Update about section mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<About> }) => {
      const response = await apiClient.put(`/about/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-about'] });
      setIsEditDialogOpen(false);
      toast.success('About section updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update about section');
    },
  });

  // Delete about section mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/about/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-about'] });
      toast.success('About section deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete about section');
    },
  });

  const handleCreate = (formData: FormData) => {
    const newAbout = {
      section: formData.get('section') as 'hero' | 'bio' | 'approach' | 'interests',
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      order: parseInt(formData.get('order') as string) || 0,
    };
    createMutation.mutate(newAbout);
  };

  const handleUpdate = (formData: FormData) => {
    if (!selectedAbout) return;
    const updatedAbout = {
      section: formData.get('section') as 'hero' | 'bio' | 'approach' | 'interests',
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      order: parseInt(formData.get('order') as string) || 0,
    };
    updateMutation.mutate({ id: selectedAbout._id, data: updatedAbout });
  };

  // Group sections by type
  const sectionsByType = {
    hero: aboutSections.filter((section: About) => section.section === 'hero'),
    bio: aboutSections.filter((section: About) => section.section === 'bio'),
    approach: aboutSections.filter((section: About) => section.section === 'approach'),
    interests: aboutSections.filter((section: About) => section.section === 'interests'),
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'hero':
        return <User className="h-5 w-5 text-blue-600" />;
      case 'bio':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'approach':
        return <Target className="h-5 w-5 text-purple-600" />;
      case 'interests':
        return <Heart className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSectionColor = (section: string) => {
    switch (section) {
      case 'hero':
        return 'bg-blue-100 text-blue-800';
      case 'bio':
        return 'bg-green-100 text-green-800';
      case 'approach':
        return 'bg-purple-100 text-purple-800';
      case 'interests':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">About Management</h1>
          <p className="mt-2 text-gray-600">Manage your portfolio about sections</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New About Section</DialogTitle>
            </DialogHeader>
            <AboutForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Sections by Type */}
      {Object.entries(sectionsByType).map(([sectionType, sections]) => (
        <div key={sectionType}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 capitalize">
            {getSectionIcon(sectionType)}
            {sectionType} ({sections.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section: About) => (
              <Card key={section._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <Badge className={`mt-2 ${getSectionColor(section.section)}`}>
                        {section.section}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm line-clamp-3 mb-4">{section.content}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAbout(section);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAbout(section);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this about section?')) {
                          deleteMutation.mutate(section._id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {sections.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No {sectionType} sections yet
              </div>
            )}
          </div>
        </div>
      ))}

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedAbout?.title}</DialogTitle>
          </DialogHeader>
          {selectedAbout && <AboutDetails about={selectedAbout} />}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit About Section</DialogTitle>
          </DialogHeader>
          {selectedAbout && (
            <AboutForm
              about={selectedAbout}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// About Form Component
const AboutForm = ({ about, onSubmit }: { about?: About; onSubmit: (formData: FormData) => void }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="section">Section Type</Label>
        <Select name="section" defaultValue={about?.section || 'hero'}>
          <SelectTrigger>
            <SelectValue placeholder="Select section type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hero">Hero</SelectItem>
            <SelectItem value="bio">Bio</SelectItem>
            <SelectItem value="approach">Approach</SelectItem>
            <SelectItem value="interests">Interests</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={about?.title}
          placeholder="e.g., Welcome to My Portfolio"
          required
        />
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={about?.content}
          rows={6}
          placeholder="Enter the content for this section"
          required
        />
      </div>

      <div>
        <Label htmlFor="order">Order</Label>
        <Input
          id="order"
          name="order"
          type="number"
          defaultValue={about?.order || 0}
        />
      </div>

      <Button type="submit" className="w-full">
        {about ? 'Update Section' : 'Create Section'}
      </Button>
    </form>
  );
};

// About Details Component
const AboutDetails = ({ about }: { about: About }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-3xl mb-4">
          {about.section === 'hero' && <User className="mx-auto text-blue-600" />}
          {about.section === 'bio' && <FileText className="mx-auto text-green-600" />}
          {about.section === 'approach' && <Target className="mx-auto text-purple-600" />}
          {about.section === 'interests' && <Heart className="mx-auto text-red-600" />}
        </div>
        <h3 className="text-xl font-semibold">{about.title}</h3>
        <Badge className={`mt-2 ${
          about.section === 'hero' ? 'bg-blue-100 text-blue-800' :
          about.section === 'bio' ? 'bg-green-100 text-green-800' :
          about.section === 'approach' ? 'bg-purple-100 text-purple-800' :
          'bg-red-100 text-red-800'
        }`}>
          {about.section}
        </Badge>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Content</h4>
        <p className="text-gray-700 whitespace-pre-wrap">{about.content}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Order:</span> {about.order}
        </div>
        <div>
          <span className="font-medium">Created:</span> {new Date(about.createdAt).toLocaleDateString()}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {new Date(about.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default AboutAdmin;
