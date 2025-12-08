import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, Video, Stethoscope, User, FileText, LogOut, LayoutDashboard, PlusCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const appointments = [
    {
        doctor: "Dr. Reed",
        specialty: "Cardiologist",
        avatar: "https://i.pravatar.cc/40?u=dr-reed",
        date: "2025-12-15",
        time: "10:00 AM",
        status: "Confirmed",
    },
    {
        doctor: "Dr. Anya",
        specialty: "Dermatologist",
        avatar: "https://i.pravatar.cc/40?u=dr-anya",
        date: "2025-11-20",
        time: "02:30 PM",
        status: "Completed",
    },
    {
        doctor: "Dr. Smith",
        specialty: "General Physician",
        avatar: "https://i.pravatar.cc/40?u=dr-smith",
        date: "2025-12-22",
        time: "11:00 AM",
        status: "Confirmed",
    },
    {
        doctor: "Dr. Ben Carter",
        specialty: "Pediatrician",
        avatar: "https://i.pravatar.cc/40?u=dr-carter",
        date: "2025-11-10",
        time: "09:00 AM",
        status: "Cancelled",
    },
];

const PatientAppointmentsPage = () => {
    const upcomingAppointments = appointments.filter(a => a.status === "Confirmed");
    const pastAppointments = appointments.filter(a => a.status === "Completed");
    const cancelledAppointments = appointments.filter(a => a.status === "Cancelled");

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
                    <Button variant="secondary" className="w-full justify-start gap-2">
                        <Calendar className="h-4 w-4" /> Appointments
                    </Button>
                    <Link to="/patient/records">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" /> Medical Records
                        </Button>
                    </Link>
                    <Link to="/patient/profile">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <User className="h-4 w-4" /> Profile
                        </Button>
                    </Link>
                </nav>
                <div className="mt-auto p-4">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <LogOut className="h-4 w-4" /> Logout
                    </Button>
                </div>
            </aside>

            <main className="flex-1 p-6 sm:p-8">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">My Appointments</h1>
                        <p className="text-muted-foreground">Manage your upcoming, past, and cancelled appointments.</p>
                    </div>
                    <Button size="lg" className="gap-2">
                        <PlusCircle className="h-5 w-5" />
                        Schedule New Appointment
                    </Button>
                </header>

                <Tabs defaultValue="upcoming">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                        <AppointmentList appointments={upcomingAppointments} status="Upcoming" />
                    </TabsContent>
                    <TabsContent value="past">
                        <AppointmentList appointments={pastAppointments} status="Past" />
                    </TabsContent>
                    <TabsContent value="cancelled">
                        <AppointmentList appointments={cancelledAppointments} status="Cancelled" />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

const AppointmentList = ({ appointments, status }: { appointments: any[], status: string }) => (
    <div className="pt-4">
        {appointments.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {appointments.map((appointment, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader className="flex flex-row items-start gap-4 pb-4">
                             <Avatar className="w-12 h-12">
                                <AvatarImage src={appointment.avatar} />
                                <AvatarFallback>{appointment.doctor.charAt(3)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-lg">{appointment.doctor}</p>
                                <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                            </div>
                            <Badge variant={appointment.status === 'Confirmed' ? 'default' : appointment.status === 'Completed' ? 'secondary' : 'destructive'} className="ml-auto">{appointment.status}</Badge>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-3">
                            <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{appointment.time}</span>
                            </div>
                        </CardContent>
                        <div className="p-4 pt-0">
                            {appointment.status === 'Confirmed' && (
                                <div className="flex gap-2">
                                    <Button className="w-full gap-2"><Video className="h-4 w-4" /> Join Call</Button>
                                    <Button variant="outline" className="w-full">Reschedule</Button>
                                </div>
                            )}
                             {appointment.status === 'Completed' && (
                                <Button variant="outline" className="w-full">View Consultation Details</Button>
                            )}
                             {appointment.status === 'Cancelled' && (
                                <Button variant="secondary" className="w-full" disabled>Rebook Appointment</Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        ) : (
            <Card className="mt-4">
                <CardContent className="p-6 text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No {status} Appointments</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {status === 'Upcoming' && "You don't have any appointments scheduled."}
                        {status === 'Past' && "You haven't had any appointments yet."}
                        {status === 'Cancelled' && "You don't have any cancelled appointments."}
                    </p>
                    {status === 'Upcoming' && (
                        <Button className="mt-4 gap-2">
                           <PlusCircle className="h-4 w-4" /> Schedule an Appointment
                        </Button>
                    )}
                </CardContent>
            </Card>
        )}
    </div>
);

export default PatientAppointmentsPage;