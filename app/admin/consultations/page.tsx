'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle,
  XCircle,
  Plus,
  Search,
  DollarSign,
  AlertCircle
} from 'lucide-react';

type ConsultationStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

interface Consultation {
    id: number;
    clientName: string;
    expertName: string;
    date: string;
    time: string;
    status: ConsultationStatus;
    price: number;
}

export default function AdminConsultations() {
  const [searchTerm, setSearchTerm] = useState('');

  const consultationsData: Consultation[] = [
    {
      id: 1,
      clientName: 'John Smith',
      expertName: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      price: 150,
    },
    {
      id: 2,
      clientName: 'Maria Garcia',
      expertName: 'Michael Chen',
      date: '2024-01-16',
      time: '02:00 PM',
      status: 'pending',
      price: 90,
    },
    {
      id: 3,
      clientName: 'David Wilson',
      expertName: 'Emily Rodriguez',
      date: '2024-01-17',
      time: '11:00 AM',
      status: 'completed',
      price: 67.5,
    },
    {
      id: 4,
      clientName: 'Lisa Brown',
      expertName: 'Dr. Sarah Johnson',
      date: '2024-01-18',
      time: '03:00 PM',
      status: 'cancelled',
      price: 150,
    }
  ];
  
  const [consultations, setConsultations] = useState<Consultation[]>(consultationsData);

  const getStatusColor = (status: ConsultationStatus) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredConsultations = consultations.filter(consultation =>
    consultation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.expertName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: number, newStatus: ConsultationStatus) => {
    setConsultations(consultations.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Consultation Management</h1>
            <p className="text-gray-600">Oversee all expert consultations</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Consultation
          </Button>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>All Consultations</CardTitle>
            <div className="mt-4">
              <Input
                placeholder="Search by client or expert..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Client</th>
                    <th className="text-left p-3">Expert</th>
                    <th className="text-left p-3">Date & Time</th>
                    <th className="text-left p-3">Price</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsultations.map((consultation) => (
                    <tr key={consultation.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{consultation.clientName}</td>
                      <td className="p-3">{consultation.expertName}</td>
                      <td className="p-3">{consultation.date} at {consultation.time}</td>
                      <td className="p-3">${consultation.price}</td>
                      <td className="p-3">
                        <Badge className={getStatusColor(consultation.status)}>
                          {consultation.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <select
                          className="p-2 rounded-md border bg-gray-100"
                          value={consultation.status}
                          onChange={(e) => handleStatusChange(consultation.id, e.target.value as ConsultationStatus)}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 