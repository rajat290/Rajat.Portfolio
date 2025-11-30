import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Mail, Eye, Trash2, CheckCircle, Clock } from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  repliedAt?: string;
  createdAt: string;
}

interface ContactStats {
  total: number;
  new: number;
  read: number;
  replied: number;
}

const ContactManager: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<ContactStats>({ total: 0, new: 0, read: 0, replied: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contact', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch contacts');

      const data = await response.json();
      setContacts(data.data || []);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      toast({
        title: "Error",
        description: "Failed to load contact messages.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/contact/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch stats');

      const data = await response.json();
      setStats(data.data || { total: 0, new: 0, read: 0, replied: 0 });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'read' | 'replied') => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error('Failed to update status');

      toast({
        title: "Success",
        description: `Message marked as ${status}.`,
      });

      fetchContacts();
      fetchStats();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast({
        title: "Error",
        description: "Failed to update message status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact message?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete contact');

      toast({
        title: "Success",
        description: "Contact message deleted successfully.",
      });

      fetchContacts();
      fetchStats();
    } catch (error) {
      console.error('Failed to delete contact:', error);
      toast({
        title: "Error",
        description: "Failed to delete contact message.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive">New</Badge>;
      case 'read':
        return <Badge variant="default">Read</Badge>;
      case 'replied':
        return <Badge variant="secondary">Replied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading contact messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact Messages</h2>
          <p className="text-muted-foreground">Manage contact form submissions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.new}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read Messages</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.read}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Replied Messages</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.replied}</div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Contact Messages</CardTitle>
          <CardDescription>
            A list of all contact form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{getStatusBadge(contact.status)}</TableCell>
                  <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog open={isDialogOpen && selectedContact?._id === contact._id} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) setSelectedContact(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedContact(contact)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Contact Message from {contact.name}</DialogTitle>
                            <DialogDescription>
                              Received on {new Date(contact.createdAt).toLocaleString()}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Email</Label>
                              <p className="text-sm text-muted-foreground">{contact.email}</p>
                            </div>
                            <div>
                              <Label>Message</Label>
                              <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">Status:</span>
                                {getStatusBadge(contact.status)}
                              </div>
                              <div className="flex space-x-2">
                                {contact.status === 'new' && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleStatusUpdate(contact._id, 'read')}
                                  >
                                    Mark as Read
                                  </Button>
                                )}
                                {contact.status === 'read' && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleStatusUpdate(contact._id, 'replied')}
                                  >
                                    Mark as Replied
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(contact._id)}
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

export default ContactManager;
