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
import { Plus, Edit, Trash2, Eye, Star, StarOff, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  points: string[];
  tech: Array<{
    name: string;
    icon: string;
    color: string;
  }>;
  links: Array<{
    name: string;
    url: string;
  }>;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const ProjectsAdmin = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const response = await apiClient.get('/projects');
      return response.data.data || [];
    },
  });

  // Create project mutation
  const createMutation = useMutation({
    mutationFn: async (newProject: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>) => {
      const response = await apiClient.post('/projects', newProject);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setIsCreateDialogOpen(false);
      toast.success('Project created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create project');
    },
  });

  // Update project mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Project> }) => {
      const response = await apiClient.put(`/projects/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setIsEditDialogOpen(false);
      toast.success('Project updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update project');
    },
  });

  // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Project deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete project');
    },
  });

  // Toggle featured mutation
  const toggleFeaturedMutation = useMutation({
    mutationFn: async (id: string) => {
      const project = projects.find((p: Project) => p._id === id);
      if (project) {
        await apiClient.put(`/projects/${id}`, { featured: !project.featured });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Project featured status updated');
    },
    onError: (error: any) => {
      toast.error('Failed to update featured status');
    },
  });

  const handleCreate = (formData: FormData) => {
    const newProject = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      longDescription: formData.get('longDescription') as string,
      images: (formData.get('images') as string).split(',').map(url => url.trim()),
      points: (formData.get('points') as string).split('\n').filter(p => p.trim()),
      tech: JSON.parse(formData.get('tech') as string || '[]'),
      links: JSON.parse(formData.get('links') as string || '[]'),
      featured: formData.get('featured') === 'on',
      order: parseInt(formData.get('order') as string) || 0,
    };
    createMutation.mutate(newProject);
  };

  const handleUpdate = (formData: FormData) => {
    if (!selectedProject) return;
    const updatedProject = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      longDescription: formData.get('longDescription') as string,
      images: (formData.get('images') as string).split(',').map(url => url.trim()),
      points: (formData.get('points') as string).split('\n').filter(p => p.trim()),
      tech: JSON.parse(formData.get('tech') as string || '[]'),
      links: JSON.parse(formData.get('links') as string || '[]'),
      featured: formData.get('featured') === 'on',
      order: parseInt(formData.get('order') as string) || 0,
    };
    updateMutation.mutate({ id: selectedProject._id, data: updatedProject });
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
          <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
          <p className="mt-2 text-gray-600">Manage your portfolio projects</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <ProjectForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <Card key={project._id} className="relative">
            {project.featured && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Featured
                </Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tech.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech.name}
                  </Badge>
                ))}
                {project.tech.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tech.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProject(project);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProject(project);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFeaturedMutation.mutate(project._id)}
                  >
                    {project.featured ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this project?')) {
                      deleteMutation.mutate(project._id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          {selectedProject && <ProjectDetails project={selectedProject} />}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <ProjectForm
              project={selectedProject}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Project Form Component
const ProjectForm = ({ project, onSubmit }: { project?: Project; onSubmit: (formData: FormData) => void }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={project?.title}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={project?.description}
          required
        />
      </div>

      <div>
        <Label htmlFor="longDescription">Long Description</Label>
        <Textarea
          id="longDescription"
          name="longDescription"
          defaultValue={project?.longDescription}
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="images">Images (comma-separated URLs)</Label>
        <Textarea
          id="images"
          name="images"
          defaultValue={project?.images.join(', ')}
          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          required
        />
      </div>

      <div>
        <Label htmlFor="points">Points (one per line)</Label>
        <Textarea
          id="points"
          name="points"
          defaultValue={project?.points.join('\n')}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="tech">Tech Stack (JSON format)</Label>
        <Textarea
          id="tech"
          name="tech"
          defaultValue={JSON.stringify(project?.tech || [], null, 2)}
          rows={4}
          placeholder='[{"name": "React", "icon": "react", "color": "#61DAFB"}]'
        />
      </div>

      <div>
        <Label htmlFor="links">Links (JSON format)</Label>
        <Textarea
          id="links"
          name="links"
          defaultValue={JSON.stringify(project?.links || [], null, 2)}
          rows={3}
          placeholder='[{"name": "Live Demo", "url": "https://example.com"}]'
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={project?.featured}
        />
        <Label htmlFor="featured">Featured Project</Label>
      </div>

      <div>
        <Label htmlFor="order">Order</Label>
        <Input
          id="order"
          name="order"
          type="number"
          defaultValue={project?.order || 0}
        />
      </div>

      <Button type="submit" className="w-full">
        {project ? 'Update Project' : 'Create Project'}
      </Button>
    </form>
  );
};

// Project Details Component
const ProjectDetails = ({ project }: { project: Project }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{project.longDescription}</p>
      </div>

      {project.points.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Key Points</h3>
          <ul className="list-disc list-inside space-y-1">
            {project.points.map((point, index) => (
              <li key={index} className="text-gray-700">{point}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-2">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, index) => (
            <Badge key={index} variant="outline">
              {tech.name}
            </Badge>
          ))}
        </div>
      </div>

      {project.links.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Links</h3>
          <div className="space-y-2">
            {project.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Order:</span> {project.order}
        </div>
        <div>
          <span className="font-medium">Featured:</span> {project.featured ? 'Yes' : 'No'}
        </div>
        <div>
          <span className="font-medium">Created:</span> {new Date(project.createdAt).toLocaleDateString()}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {new Date(project.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
