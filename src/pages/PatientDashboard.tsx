import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Video, FileText, MessageSquare, LogOut, LayoutDashboard, User, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
    const upcomingAppointments = [
        { doctor: "Dr. Evelyn Reed", specialty: "Cardiologist", date: "2024-08-15", time: "10:30 AM", status: "Confirmed" },
        { doctor: "Dr. Marcus Chen", specialty: "Dermatologist", date: "2024-08-22", time: "02:00 PM", status: "Confirmed" },
    ];

    const pastConsultations = [
        { doctor: "Dr. Evelyn Reed", date: "2024-07-10", diagnosis: "Hypertension", prescription: "View" },
        { doctor: "Dr. Ben Carter", date: "2024-06-20", diagnosis: "Common Cold", prescription: "View" },
    ];

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
                        <Button variant="secondary" className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Button>
                    </Link>
                    <Link to="/patient/appointments">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Calendar className="h-4 w-4" /> Appointments
                        </Button>
                    </Link>
                    <Link to="/patient/records">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" /> Medical Records
                        </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <MessageSquare className="h-4 w-4" /> Messages
                    </Button>
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
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Welcome, Gian!</h1>
                        <p className="text-muted-foreground">Here's your health summary.</p>
                    </div>
                    <Button size="lg" className="gap-2">
                        <Calendar className="h-5 w-5" /> Book New Appointment
                    </Button>
                </header>

                <div className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Appointments</CardTitle>
                            <CardDescription>Your scheduled video consultations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Doctor</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {upcomingAppointments.map((appt, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={`https://i.pravatar.cc/40?u=${appt.doctor}`} />
                                                    <AvatarFallback>{appt.doctor.charAt(5)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    {appt.doctor}
                                                    <div className="text-sm text-muted-foreground">{appt.specialty}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{appt.date} at {appt.time}</TableCell>
                                            <TableCell className="text-right">
                                                <Button className="gap-2"><Video className="h-4 w-4" /> Join Call</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Medical History</CardTitle>
                            <CardDescription>Your past consultations and prescriptions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Doctor</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Diagnosis</TableHead>
                                        <TableHead className="text-right">E-Prescription</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pastConsultations.map((consult, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">{consult.doctor}</TableCell>
                                            <TableCell>{consult.date}</TableCell>
                                            <TableCell>{consult.diagnosis}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm">{consult.prescription}</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default PatientDashboard;