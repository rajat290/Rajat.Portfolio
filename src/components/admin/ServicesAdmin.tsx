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
import { Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import { toast } from 'sonner';

interface Service {
  _id: string;
  title: string;
  description: string;
  price: string;
  ctaText: string;
  ctaLink: string;
  icon: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const ServicesAdmin = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch services
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const response = await apiClient.get('/services');
      return response.data.data || [];
    },
  });

  // Create service mutation
  const createMutation = useMutation({
    mutationFn: async (newService: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>) => {
      const response = await apiClient.post('/services', newService);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setIsCreateDialogOpen(false);
      toast.success('Service created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create service');
    },
  });

  // Update service mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Service> }) => {
      const response = await apiClient.put(`/services/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setIsEditDialogOpen(false);
      toast.success('Service updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update service');
    },
  });

  // Delete service mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast.success('Service deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete service');
    },
  });

  // Toggle active mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async (id: string) => {
      const service = services.find((s: Service) => s._id === id);
      if (service) {
        await apiClient.put(`/services/${id}`, { active: !service.active });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast.success('Service status updated');
    },
    onError: (error: any) => {
      toast.error('Failed to update service status');
    },
  });

  const handleCreate = (formData: FormData) => {
    const newService = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      ctaText: formData.get('ctaText') as string,
      ctaLink: formData.get('ctaLink') as string,
      icon: formData.get('icon') as string,
      order: parseInt(formData.get('order') as string) || 0,
      active: formData.get('active') === 'on',
    };
    createMutation.mutate(newService);
  };

  const handleUpdate = (formData: FormData) => {
    if (!selectedService) return;
    const updatedService = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      ctaText: formData.get('ctaText') as string,
      ctaLink: formData.get('ctaLink') as string,
      icon: formData.get('icon') as string,
      order: parseInt(formData.get('order') as string) || 0,
      active: formData.get('active') === 'on',
    };
    updateMutation.mutate({ id: selectedService._id, data: updatedService });
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
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="mt-2 text-gray-600">Manage your service offerings</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Service</DialogTitle>
            </DialogHeader>
            <ServiceForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: Service) => (
          <Card key={service._id} className={`relative ${!service.active ? 'opacity-60' : ''}`}>
            {!service.active && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  Inactive
                </Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">{service.icon}</span>
                {service.title}
              </CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-lg font-semibold text-purple-600">{service.price}</p>
                <p className="text-sm text-gray-600">{service.ctaText}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedService(service);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedService(service);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActiveMutation.mutate(service._id)}
                  >
                    {service.active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this service?')) {
                      deleteMutation.mutate(service._id);
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
            <DialogTitle>{selectedService?.title}</DialogTitle>
          </DialogHeader>
          {selectedService && <ServiceDetails service={selectedService} />}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <ServiceForm
              service={selectedService}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Service Form Component
const ServiceForm = ({ service, onSubmit }: { service?: Service; onSubmit: (formData: FormData) => void }) => {
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
          defaultValue={service?.title}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={service?.description}
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            defaultValue={service?.price}
            placeholder="e.g., $500, Contact for pricing"
            required
          />
        </div>

        <div>
          <Label htmlFor="icon">Icon (emoji or text)</Label>
          <Input
            id="icon"
            name="icon"
            defaultValue={service?.icon}
            placeholder="e.g., 💻"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ctaText">CTA Text</Label>
          <Input
            id="ctaText"
            name="ctaText"
            defaultValue={service?.ctaText}
            placeholder="e.g., Get Started"
            required
          />
        </div>

        <div>
          <Label htmlFor="ctaLink">CTA Link</Label>
          <Input
            id="ctaLink"
            name="ctaLink"
            defaultValue={service?.ctaLink}
            placeholder="e.g., /contact"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={service?.order || 0}
          />
        </div>

        <div className="flex items-center space-x-2 pt-8">
          <input
            type="checkbox"
            id="active"
            name="active"
            defaultChecked={service?.active ?? true}
          />
          <Label htmlFor="active">Active Service</Label>
        </div>
      </div>

      <Button type="submit" className="w-full">
        {service ? 'Update Service' : 'Create Service'}
      </Button>
    </form>
  );
};

// Service Details Component
const ServiceDetails = ({ service }: { service: Service }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4">{service.icon}</div>
        <h3 className="text-xl font-semibold">{service.title}</h3>
        <p className="text-lg font-bold text-purple-600 mt-2">{service.price}</p>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Description</h4>
        <p className="text-gray-700">{service.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">CTA Button</h4>
          <p className="text-gray-700">{service.ctaText}</p>
          <p className="text-sm text-gray-500">{service.ctaLink}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Status</h4>
          <Badge variant={service.active ? "default" : "secondary"}>
            {service.active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Order:</span> {service.order}
        </div>
        <div>
          <span className="font-medium">Created:</span> {new Date(service.createdAt).toLocaleDateString()}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {new Date(service.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ServicesAdmin;
