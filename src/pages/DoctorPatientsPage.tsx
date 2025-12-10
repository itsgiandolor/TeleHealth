import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Users, MessageSquare, LogOut, LayoutDashboard, Stethoscope, Search, FilePlus, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const patients = [
    {
        id: "P001",
        name: "Gian D.",
        avatar: "https://i.pravatar.cc/40?u=P001",
        lastVisit: "2024-07-10",
        diagnosis: "Hypertension",
        status: "Stable",
    },
    {
        id: "P002",
        name: "Maria K.",
        avatar: "https://i.pravatar.cc/40?u=P002",
        lastVisit: "2024-07-08",
        diagnosis: "Diabetes Type 2",
        status: "Monitoring",
    },
    {
        id: "P003",
        name: "John S.",
        avatar: "https://i.pravatar.cc/40?u=P003",
        lastVisit: "2024-07-05",
        diagnosis: "Common Cold",
        status: "Recovered",
    },
    {
        id: "P004",
        name: "Alex R.",
        avatar: "https://i.pravatar.cc/40?u=P004",
        lastVisit: "2024-07-11",
        diagnosis: "Allergic Rhinitis",
        status: "Stable",
    },
    {
        id: "P005",
        name: "Samantha B.",
        avatar: "https://i.pravatar.cc/40?u=P005",
        lastVisit: "2024-07-09",
        diagnosis: "Migraine",
        status: "Monitoring",
    }
];

const DoctorPatientsPage = () => {
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <Button variant="ghost" className="w-full justify-start gap-2 pl-8">
                                <Calendar className="h-4 w-4" /> Appointment Requests
                            </Button>
                        </Link>
                    </div>
                    <Link to="/doctor/patients">
                        <Button variant="secondary" className="w-full justify-start gap-2">
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
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">My Patients</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search patients..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button className="flex items-center gap-2">
                            <FilePlus className="h-5 w-5" />
                            <span>Add New Patient</span>
                        </Button>
                    </div>
                </header>

                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Last Visit</TableHead>
                                    <TableHead>Diagnosis</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPatients.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={patient.avatar} />
                                                    <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{patient.name}</p>
                                                    <p className="text-xs text-muted-foreground">{patient.id}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{patient.lastVisit}</TableCell>
                                        <TableCell>{patient.diagnosis}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                patient.status === 'Recovered' ? 'outline' :
                                                    patient.status === 'Stable' ? 'default' :
                                                        'secondary'
                                            }>{patient.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">View Details</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default DoctorPatientsPage;