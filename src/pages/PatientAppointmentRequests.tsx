import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Video, FileText, MessageSquare, LogOut, LayoutDashboard, User, Stethoscope, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AppointmentRequest {
    id: string;
    doctorName: string;
    specialty: string;
    avatar: string;
    proposedDate: string;
    proposedTime: string;
    appointmentType: "online" | "onsite";
    reason: string;
    status: "pending" | "approved" | "rejected";
}

const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
];

const initialRequests: AppointmentRequest[] = [
    {
        id: "1",
        doctorName: "Dr. Evelyn Reed",
        specialty: "Cardiologist",
        avatar: "https://i.pravatar.cc/80?u=dr-reed",
        proposedDate: "2025-12-20",
        proposedTime: "10:00 AM",
        appointmentType: "online",
        reason: "Follow-up hypertension check",
        status: "pending",
    },
    {
        id: "2",
        doctorName: "Dr. Marcus Chen",
        specialty: "Dermatologist",
        avatar: "https://i.pravatar.cc/80?u=dr-chen",
        proposedDate: "2025-12-22",
        proposedTime: "02:30 PM",
        appointmentType: "onsite",
        reason: "Skin condition review",
        status: "pending",
    },
];

const PatientAppointmentRequests = () => {
    const [requests, setRequests] = useState<AppointmentRequest[]>(initialRequests);
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<AppointmentRequest | null>(null);
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");

    const pendingRequests = requests.filter(r => r.status === "pending");
    const approvedRequests = requests.filter(r => r.status === "approved");
    const rejectedRequests = requests.filter(r => r.status === "rejected");

    const handleApprove = (requestId: string) => {
        setRequests(requests.map(r =>
            r.id === requestId ? { ...r, status: "approved" as const } : r
        ));
    };

    const handleReject = (requestId: string) => {
        setRequests(requests.map(r =>
            r.id === requestId ? { ...r, status: "rejected" as const } : r
        ));
    };

    const handleReschedule = (request: AppointmentRequest) => {
        setSelectedRequest(request);
        setNewDate(request.proposedDate);
        setNewTime(request.proposedTime);
        setIsRescheduleOpen(true);
    };

    const handleConfirmReschedule = () => {
        if (selectedRequest && newDate && newTime) {
            setRequests(requests.map(r =>
                r.id === selectedRequest.id
                    ? { ...r, proposedDate: newDate, proposedTime: newTime, status: "approved" as const }
                    : r
            ));
            setIsRescheduleOpen(false);
            setSelectedRequest(null);
            setNewDate("");
            setNewTime("");
        }
    };

    const RequestCard = ({ request }: { request: AppointmentRequest }) => (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={request.avatar} alt={request.doctorName} />
                            <AvatarFallback>{request.doctorName.charAt(4)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{request.doctorName}</CardTitle>
                            <p className="text-sm text-muted-foreground">{request.specialty}</p>
                        </div>
                    </div>
                    <Badge
                        variant={
                            request.status === "pending"
                                ? "outline"
                                : request.status === "approved"
                                    ? "default"
                                    : "destructive"
                        }
                    >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium">Proposed Date & Time</p>
                        <p className="text-sm text-muted-foreground">
                            {new Date(request.proposedDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })} at {request.proposedTime}
                        </p>
                    </div>
                    <Badge variant={request.appointmentType === "online" ? "default" : "secondary"}>
                        {request.appointmentType.charAt(0).toUpperCase() + request.appointmentType.slice(1)}
                    </Badge>
                </div>
                <div>
                    <p className="text-sm font-medium">Reason for Visit</p>
                    <p className="text-sm text-muted-foreground">{request.reason}</p>
                </div>
                {request.status === "pending" && (
                    <div className="flex gap-2 pt-2">
                        <Button
                            size="sm"
                            className="flex-1 gap-2"
                            onClick={() => handleApprove(request.id)}
                        >
                            <Check className="h-4 w-4" /> Approve
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-2"
                            onClick={() => handleReschedule(request)}
                        >
                            <Calendar className="h-4 w-4" /> Reschedule
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1 gap-2"
                            onClick={() => handleReject(request.id)}
                        >
                            <X className="h-4 w-4" /> Reject
                        </Button>
                    </div>
                )}
                {request.status === "approved" && (
                    <Button variant="outline" className="w-full gap-2" disabled>
                        <Video className="h-4 w-4" /> Join Call on Appointment Date
                    </Button>
                )}
            </CardContent>
        </Card>
    );

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center border-b px-6">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <Stethoscope className="h-6 w-6 text-primary" />
                        <span>Telemedicine</span>
                    </Link>
                </div>
                <nav className="flex-1 space-y-2 p-4">
                    <Link to="/dashboard/patient">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <Link to="/patient/appointments">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Calendar className="h-4 w-4" /> Appointments
                            </Button>
                        </Link>
                        <Link to="/patient/appointment-requests">
                            <Button variant="secondary" className="w-full justify-start gap-2 pl-8">
                                <Calendar className="h-4 w-4" /> Appointment Requests
                            </Button>
                        </Link>
                    </div>
                    <Link to="/patient/records">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" /> Medical Records
                        </Button>
                    </Link>
                    <Link to="/patient/messages">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <MessageSquare className="h-4 w-4" /> Messages
                        </Button>
                    </Link>
                    <Link to="/patient/profile">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <User className="h-4 w-4" /> Profile
                        </Button>
                    </Link>
                </nav>
                <div className="mt-auto p-4">
                    <Link to="/">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LogOut className="h-4 w-4" /> Logout
                        </Button>
                    </Link>
                </div>
            </aside>

            <main className="flex-1 p-6 sm:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Appointment Requests</h1>
                    <p className="text-muted-foreground">Manage appointment requests from your doctors.</p>
                </header>

                <div className="space-y-8">
                    {/* Pending Requests */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <h2 className="text-2xl font-semibold">Pending Requests</h2>
                            <Badge variant="outline">{pendingRequests.length}</Badge>
                        </div>
                        {pendingRequests.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {pendingRequests.map((request) => (
                                    <RequestCard key={request.id} request={request} />
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <p className="text-muted-foreground">No pending appointment requests</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Approved Requests */}
                    {approvedRequests.length > 0 && (
                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <h2 className="text-2xl font-semibold">Approved Appointments</h2>
                                <Badge>{approvedRequests.length}</Badge>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {approvedRequests.map((request) => (
                                    <RequestCard key={request.id} request={request} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rejected Requests */}
                    {rejectedRequests.length > 0 && (
                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <h2 className="text-2xl font-semibold">Rejected Appointments</h2>
                                <Badge variant="destructive">{rejectedRequests.length}</Badge>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {rejectedRequests.map((request) => (
                                    <RequestCard key={request.id} request={request} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Reschedule Dialog */}
                <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Reschedule Appointment</DialogTitle>
                            <DialogDescription>
                                Change the date and time for your appointment with {selectedRequest?.doctorName}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="new-date">New Date</Label>
                                <Input
                                    id="new-date"
                                    type="date"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="new-time">New Time</Label>
                                <Select value={newTime} onValueChange={setNewTime}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeSlots.map((time) => (
                                            <SelectItem key={time} value={time}>
                                                {time}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsRescheduleOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleConfirmReschedule}>
                                Confirm Reschedule
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </main>
        </div>
    );
};

export default PatientAppointmentRequests;
