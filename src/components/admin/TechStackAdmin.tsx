
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
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface TechStack {
  _id: string;
  category: string;
  icon: string;
  technologies: Array<{
    name: string;
    icon: string;
    color: string;
  }>;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const TechStackAdmin = () => {
  const [selectedTechStack, setSelectedTechStack] = useState<TechStack | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch tech stack
  const { data: techStacks = [], isLoading } = useQuery({
    queryKey: ['admin-techstack'],
    queryFn: async () => {
      const response = await apiClient.get('/techstack');
      return response.data.data || [];
    },
  });

  // Create tech stack mutation
  const createMutation = useMutation({
    mutationFn: async (newTechStack: Omit<TechStack, '_id' | 'createdAt' | 'updatedAt'>) => {
      const response = await apiClient.post('/techstack', newTechStack);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-techstack'] });
      setIsCreateDialogOpen(false);
      toast.success('Tech stack category created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create tech stack category');
    },
  });

  // Update tech stack mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TechStack> }) => {
      const response = await apiClient.put(`/techstack/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-techstack'] });
      setIsEditDialogOpen(false);
      toast.success('Tech stack category updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update tech stack category');
    },
  });

  // Delete tech stack mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/techstack/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-techstack'] });
      toast.success('Tech stack category deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete tech stack category');
    },
  });

  const handleCreate = (formData: FormData) => {
    const newTechStack = {
      category: formData.get('category') as string,
      icon: formData.get('icon') as string,
      technologies: JSON.parse(formData.get('technologies') as string || '[]'),
      order: parseInt(formData.get('order') as string) || 0,
    };
    createMutation.mutate(newTechStack);
  };

  const handleUpdate = (formData: FormData) => {
    if (!selectedTechStack) return;
    const updatedTechStack = {
      category: formData.get('category') as string,
      icon: formData.get('icon') as string,
      technologies: JSON.parse(formData.get('technologies') as string || '[]'),
      order: parseInt(formData.get('order') as string) || 0,
    };
    updateMutation.mutate({ id: selectedTechStack._id, data: updatedTechStack });
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
          <h1 className="text-3xl font-bold text-gray-900">Tech Stack Management</h1>
          <p className="mt-2 text-gray-600">Manage your technology stack categories</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Tech Stack Category</DialogTitle>
            </DialogHeader>
            <TechStackForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techStacks.map((techStack: TechStack) => (
          <Card key={techStack._id}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">{techStack.icon}</span>
                {techStack.category}
              </CardTitle>
              <p className="text-sm text-gray-600">
                {techStack.technologies.length} technologies
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-4">
                {techStack.technologies.slice(0, 4).map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech.name}
                  </Badge>
                ))}
                {techStack.technologies.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{techStack.technologies.length - 4}
                  </Badge>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTechStack(techStack);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTechStack(techStack);
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
                    if (confirm('Are you sure you want to delete this tech stack category?')) {
                      deleteMutation.mutate(techStack._id);
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTechStack?.category}</DialogTitle>
          </DialogHeader>
          {selectedTechStack && <TechStackDetails techStack={selectedTechStack} />}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Tech Stack Category</DialogTitle>
          </DialogHeader>
          {selectedTechStack && (
            <TechStackForm
              techStack={selectedTechStack}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Tech Stack Form Component
const TechStackForm = ({ techStack, onSubmit }: { techStack?: TechStack; onSubmit: (formData: FormData) => void }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="category">Category Name</Label>
        <Input
          id="category"
          name="category"
          defaultValue={techStack?.category}
          placeholder="e.g., Frontend, Backend, Database"
          required
        />
      </div>

      <div>
        <Label htmlFor="icon">Icon (emoji or text)</Label>
        <Input
          id="icon"
          name="icon"
          defaultValue={techStack?.icon}
          placeholder="e.g., 💻"
          required
        />
      </div>

      <div>
        <Label htmlFor="technologies">Technologies (JSON format)</Label>
        <Textarea
          id="technologies"
          name="technologies"
          defaultValue={JSON.stringify(techStack?.technologies || [], null, 2)}
          rows={8}
          placeholder='[
  {"name": "React", "icon": "react", "color": "#61DAFB"},
  {"name": "TypeScript", "icon": "typescript", "color": "#3178C6"}
]'
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          Format: [&lbrace;"name": "Tech Name", "icon": "icon-name", "color": "#hexcolor"&rbrace;]
        </p>
      </div>

      <div>
        <Label htmlFor="order">Order</Label>
        <Input
          id="order"
          name="order"
          type="number"
          defaultValue={techStack?.order || 0}
        />
      </div>

      <Button type="submit" className="w-full">
        {techStack ? 'Update Category' : 'Create Category'}
      </Button>
    </form>
  );
};

// Tech Stack Details Component
const TechStackDetails = ({ techStack }: { techStack: TechStack }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4">{techStack.icon}</div>
        <h3 className="text-xl font-semibold">{techStack.category}</h3>
        <p className="text-gray-600 mt-2">{techStack.technologies.length} technologies</p>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Technologies</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techStack.technologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: tech.color }}
              ></div>
              <div>
                <p className="font-medium">{tech.name}</p>
                <p className="text-sm text-gray-500">{tech.icon}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Order:</span> {techStack.order}
        </div>
        <div>
          <span className="font-medium">Created:</span> {new Date(techStack.createdAt).toLocaleDateString()}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {new Date(techStack.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TechStackAdmin;
