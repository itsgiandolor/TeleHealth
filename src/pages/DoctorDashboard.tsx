import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Video, FileText, MessageSquare, LogOut, LayoutDashboard, Users, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

const DoctorDashboard = () => {
    const todayAppointments = [
        { patient: "Gian D.", time: "10:30 AM", reason: "Follow-up Check", status: "Upcoming" },
        { patient: "Alex R.", time: "11:00 AM", reason: "New Consultation", status: "Upcoming" },
        { patient: "Samantha B.", time: "09:00 AM", reason: "Prescription Refill", status: "Completed" },
    ];

    const recentPatients = [
        { name: "Gian D.", lastVisit: "2024-07-10", id: "P001" },
        { name: "Maria K.", lastVisit: "2024-07-08", id: "P002" },
        { name: "John S.", lastVisit: "2024-07-05", id: "P003" },
    ];

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center justify-between border-b px-6">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <Stethoscope className="h-6 w-6 text-primary" />
                        <span>Telemedicine</span>
                    </Link>
                    <div className="flex gap-2">
                        <LanguageSelector />
                        <ThemeToggle />
                    </div>
                </div>
                <nav className="flex-1 space-y-2 p-4">
                    <Link to="/dashboard/doctor">
                        <Button variant="secondary" className="w-full justify-start gap-2">
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
                            <Button variant="ghost" className="w-full justify-start gap-2 pl-8">
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
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Welcome, Dr. Reed!</h1>
                        <p className="text-muted-foreground">You have {todayAppointments.filter(a => a.status === 'Upcoming').length} appointments today.</p>
                    </div>
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="https://i.pravatar.cc/60?u=dr-reed" />
                        <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                </header>

                <div className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Today's Schedule</CardTitle>
                            <CardDescription>Your appointments for today.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Reason</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {todayAppointments.map((appt, i) => (
                                        <TableRow key={i} className={appt.status === 'Completed' ? 'text-muted-foreground' : ''}>
                                            <TableCell className="font-medium">{appt.patient}</TableCell>
                                            <TableCell>{appt.time}</TableCell>
                                            <TableCell>{appt.reason}</TableCell>
                                            <TableCell>
                                                <Badge variant={appt.status === 'Completed' ? 'outline' : 'default'}>{appt.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {appt.status === 'Upcoming' && <Button className="gap-2"><Video className="h-4 w-4" /> Start Call</Button>}
                                                {appt.status === 'Completed' && <Button variant="outline" size="sm">View Record</Button>}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Patients</CardTitle>
                            <CardDescription>Patients you have recently consulted.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {recentPatients.map((patient) => (
                                    <div key={patient.id} className="flex items-center gap-3 rounded-lg border p-3">
                                        <Avatar>
                                            <AvatarImage src={`https://i.pravatar.cc/40?u=${patient.name}`} />
                                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{patient.name}</p>
                                            <p className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default DoctorDashboard;