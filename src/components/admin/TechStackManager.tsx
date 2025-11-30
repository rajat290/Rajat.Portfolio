import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface TechStack {
  _id: string;
  category: string;
  technologies: Array<{
    name: string;
    icon: string;
    color: string;
  }>;
  order: number;
  createdAt: string;
}

const TechStackManager: React.FC = () => {
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTechStack, setEditingTechStack] = useState<TechStack | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    technologies: [] as Array<{ name: string; icon: string; color: string }>,
    order: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTechStacks();
  }, []);

  const fetchTechStacks = async () => {
    try {
      const response = await fetch('/api/techstack');
      if (!response.ok) throw new Error('Failed to fetch tech stacks');

      const data = await response.json();
      setTechStacks(data.data || []);
    } catch (error) {
      console.error('Failed to fetch tech stacks:', error);
      toast({
        title: "Error",
        description: "Failed to load tech stacks.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingTechStack ? `/api/techstack/${editingTechStack._id}` : '/api/techstack';
      const method = editingTechStack ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save tech stack');

      const data = await response.json();

      toast({
        title: "Success",
        description: `Tech stack ${editingTechStack ? 'updated' : 'created'} successfully.`,
      });

      setIsDialogOpen(false);
      setEditingTechStack(null);
      resetForm();
      fetchTechStacks();
    } catch (error) {
      console.error('Failed to save tech stack:', error);
      toast({
        title: "Error",
        description: "Failed to save tech stack.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tech stack category?')) return;

    try {
      const response = await fetch(`/api/techstack/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete tech stack');

      toast({
        title: "Success",
        description: "Tech stack deleted successfully.",
      });

      fetchTechStacks();
    } catch (error) {
      console.error('Failed to delete tech stack:', error);
      toast({
        title: "Error",
        description: "Failed to delete tech stack.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (techStack: TechStack) => {
    setEditingTechStack(techStack);
    setFormData({
      category: techStack.category,
      technologies: techStack.technologies,
      order: techStack.order
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      category: '',
      technologies: [],
      order: 0
    });
  };

  const addTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, { name: '', icon: '', color: '' }]
    }));
  };

  const updateTechnology = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.map((tech, i) =>
        i === index ? { ...tech, [field]: value } : tech
      )
    }));
  };

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading tech stacks...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tech Stack</h2>
          <p className="text-muted-foreground">Manage your technology categories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingTechStack(null); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTechStack ? 'Edit Tech Stack' : 'Add New Tech Stack'}</DialogTitle>
              <DialogDescription>
                {editingTechStack ? 'Update the tech stack details below.' : 'Fill in the details for your new tech stack category.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category Name</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              {/* Technologies Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Technologies</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addTechnology}>
                    Add Technology
                  </Button>
                </div>
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 mb-2 items-end">
                    <div>
                      <Input
                        value={tech.name}
                        onChange={(e) => updateTechnology(index, 'name', e.target.value)}
                        placeholder="Name"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        value={tech.icon}
                        onChange={(e) => updateTechnology(index, 'icon', e.target.value)}
                        placeholder="Icon"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        value={tech.color}
                        onChange={(e) => updateTechnology(index, 'color', e.target.value)}
                        placeholder="Color"
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTechnology(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTechStack ? 'Update' : 'Create'} Tech Stack
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tech Stack Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tech Stack Categories</CardTitle>
          <CardDescription>
            A list of all your technology categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {techStacks.map((techStack) => (
                <TableRow key={techStack._id}>
                  <TableCell className="font-medium">{techStack.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {techStack.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline">
                          {tech.name}
                        </Badge>
                      ))}
                      {techStack.technologies.length > 3 && (
                        <Badge variant="outline">
                          +{techStack.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{techStack.order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(techStack)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(techStack._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechStackManager;
