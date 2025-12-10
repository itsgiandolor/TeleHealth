import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, LogOut, LayoutDashboard, Stethoscope, MessageSquare, Users, Check, X, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
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
    patientName: string;
    patientAge: string;
    avatar: string;
    requestedDate: string;
    requestedTime: string;
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
        patientName: "Gian D.",
        patientAge: "30 years old",
        avatar: "https://i.pravatar.cc/80?u=gian",
        requestedDate: "2025-12-15",
        requestedTime: "10:00 AM",
        appointmentType: "online",
        reason: "Follow-up for hypertension",
        status: "pending",
    },
    {
        id: "2",
        patientName: "Maria K.",
        patientAge: "45 years old",
        avatar: "https://i.pravatar.cc/80?u=maria",
        requestedDate: "2025-12-16",
        requestedTime: "02:30 PM",
        appointmentType: "onsite",
        reason: "Lab results consultation",
        status: "pending",
    },
    {
        id: "3",
        patientName: "John S.",
        patientAge: "55 years old",
        avatar: "https://i.pravatar.cc/80?u=john",
        requestedDate: "2025-12-18",
        requestedTime: "11:00 AM",
        appointmentType: "online",
        reason: "Pain management follow-up",
        status: "pending",
    },
];

const DoctorAppointmentRequests = () => {
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
        setNewDate(request.requestedDate);
        setNewTime(request.requestedTime);
        setIsRescheduleOpen(true);
    };

    const handleConfirmReschedule = () => {
        if (selectedRequest && newDate && newTime) {
            setRequests(requests.map(r =>
                r.id === selectedRequest.id
                    ? { ...r, requestedDate: newDate, requestedTime: newTime, status: "approved" as const }
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
                            <AvatarImage src={request.avatar} alt={request.patientName} />
                            <AvatarFallback>{request.patientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{request.patientName}</CardTitle>
                            <p className="text-sm text-muted-foreground">{request.patientAge}</p>
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
                        <p className="text-sm font-medium">Requested Date & Time</p>
                        <p className="text-sm text-muted-foreground">
                            {new Date(request.requestedDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })} at {request.requestedTime}
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
            </CardContent>
        </Card>
    );

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center justify-between border-b px-6">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <Stethoscope className="h-6 w-6 text-primary" />
                        <span>Telemedicine</span>
                    </Link>
                    <ThemeToggle />
                </div>
                <nav className="flex-1 space-y-2 p-4">
                    <Link to="/dashboard/doctor">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <Link to="/doctor/schedule">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Clock className="h-4 w-4" /> Schedule
                            </Button>
                        </Link>
                        <Link to="/doctor/appointments">
                            <Button variant="secondary" className="w-full justify-start gap-2 pl-8">
                                <Calendar className="h-4 w-4" /> Appointment Requests
                            </Button>
                        </Link>
                    </div>
                    <Link to="/doctor/patients">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Users className="h-4 w-4" /> Patients
                        </Button>
                    </Link>
                    <Link to="/doctor/messages">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <MessageSquare className="h-4 w-4" /> Messages
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
                    <p className="text-muted-foreground">Manage appointment requests from your patients.</p>
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
                                Change the date and time for {selectedRequest?.patientName}'s appointment.
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

export default DoctorAppointmentRequests;
