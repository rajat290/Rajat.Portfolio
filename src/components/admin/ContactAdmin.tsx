import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2, Mail, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  repliedAt?: string;
  createdAt: string;
}

const ContactAdmin = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch contact messages
  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['admin-contact'],
    queryFn: async () => {
      const response = await apiClient.get('/contact');
      return response.data.data || [];
    },
  });

  // Update contact status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'new' | 'read' | 'replied' }) => {
      const response = await apiClient.put(`/contact/${id}`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contact'] });
      toast.success('Contact status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update contact status');
    },
  });

  // Delete contact mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/contact/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contact'] });
      toast.success('Contact message deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete contact message');
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">New</Badge>;
      case 'read':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Read</Badge>;
      case 'replied':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Replied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="h-4 w-4 text-red-500" />;
      case 'read':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case 'replied':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Mail className="h-4 w-4 text-gray-500" />;
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
        <p className="mt-2 text-gray-600">Manage contact form submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Messages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contacts.filter((c: Contact) => c.status === 'new').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Read Messages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contacts.filter((c: Contact) => c.status === 'read').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Replied Messages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contacts.filter((c: Contact) => c.status === 'replied').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contact messages</h3>
              <p className="text-gray-600">Contact messages will appear here when visitors submit the form.</p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact: Contact) => (
            <Card key={contact._id} className={`transition-all ${contact.status === 'new' ? 'border-l-4 border-l-red-500' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(contact.status)}
                    <div>
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(contact.status)}
                    <span className="text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-2">{contact.message}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedContact(contact);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {contact.status === 'new' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatusMutation.mutate({ id: contact._id, status: 'read' })}
                      >
                        Mark as Read
                      </Button>
                    )}
                    {contact.status === 'read' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatusMutation.mutate({ id: contact._id, status: 'replied' })}
                      >
                        Mark as Replied
                      </Button>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this contact message?')) {
                        deleteMutation.mutate(contact._id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedContact && getStatusIcon(selectedContact.status)}
              Contact from {selectedContact?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedContact && <ContactDetails contact={selectedContact} onStatusUpdate={updateStatusMutation.mutate} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Contact Details Component
const ContactDetails = ({ contact, onStatusUpdate }: { contact: Contact; onStatusUpdate: (data: { id: string; status: 'new' | 'read' | 'replied' }) => void }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-sm text-gray-600">Name</h4>
          <p className="text-gray-900">{contact.name}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-600">Email</h4>
          <p className="text-gray-900">{contact.email}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-600">Status</h4>
          <div className="flex items-center gap-2">
            {contact.status === 'new' && <Clock className="h-4 w-4 text-red-500" />}
            {contact.status === 'read' && <Eye className="h-4 w-4 text-blue-500" />}
            {contact.status === 'replied' && <CheckCircle className="h-4 w-4 text-green-500" />}
            <span className="capitalize">{contact.status}</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-600">Received</h4>
          <p className="text-gray-900">{new Date(contact.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-gray-600 mb-2">Message</h4>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-900 whitespace-pre-wrap">{contact.message}</p>
        </div>
      </div>

      {contact.repliedAt && (
        <div>
          <h4 className="font-semibold text-sm text-gray-600">Replied At</h4>
          <p className="text-gray-900">{new Date(contact.repliedAt).toLocaleString()}</p>
        </div>
      )}

      <div className="flex space-x-2 pt-4 border-t">
        {contact.status === 'new' && (
          <Button
            onClick={() => onStatusUpdate({ id: contact._id, status: 'read' })}
            className="flex-1"
          >
            Mark as Read
          </Button>
        )}
        {contact.status === 'read' && (
          <Button
            onClick={() => onStatusUpdate({ id: contact._id, status: 'replied' })}
            className="flex-1"
          >
            Mark as Replied
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => window.open(`mailto:${contact.email}`, '_blank')}
          className="flex-1"
        >
          Reply via Email
        </Button>
      </div>
    </div>
  );
};

export default ContactAdmin;
