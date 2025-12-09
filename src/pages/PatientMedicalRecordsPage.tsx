import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Share2, Calendar, LogOut, LayoutDashboard, User, Stethoscope, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const PatientMedicalRecordsPage = () => {
    const medicalRecords = [
        {
            date: "2024-07-10",
            doctor: "Dr. Evelyn Reed",
            type: "Consultation Note",
            summary: "Follow-up for hypertension management.",
            tags: ["cardiology", "hypertension"],
        },
        {
            date: "2024-07-10",
            doctor: "Dr. Evelyn Reed",
            type: "Lab Result",
            summary: "Lipid Panel: LDL Cholesterol slightly elevated.",
            tags: ["lab", "cholesterol"],
        },
        {
            date: "2024-06-20",
            doctor: "Dr. Ben Carter",
            type: "Consultation Note",
            summary: "Patient presented with symptoms of a common cold.",
            tags: ["general", "respiratory"],
        },
        {
            date: "2024-05-12",
            doctor: "Dr. Evelyn Reed",
            type: "Imaging Result",
            summary: "Chest X-Ray: Clear, no abnormalities.",
            tags: ["radiology", "chest"],
        },
        {
            date: "2023-11-01",
            doctor: "Dr. Anya Sharma",
            type: "Allergy Test",
            summary: "Positive for dust mites and pollen.",
            tags: ["allergy", "immunology"],
        }
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
                            <Button variant="ghost" className="w-full justify-start gap-2 pl-8">
                                <Calendar className="h-4 w-4" /> Appointment Requests
                            </Button>
                        </Link>
                    </div>
                    <Link to="/patient/records">
                        <Button variant="secondary" className="w-full justify-start gap-2">
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
                    <h1 className="text-3xl font-bold">Medical Records</h1>
                    <p className="text-muted-foreground">A complete history of your health records and reports.</p>
                </header>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>All Records</CardTitle>
                            <CardDescription>Browse and manage your medical documents.</CardDescription>
                        </div>
                        <Button className="gap-2">
                            <Share2 className="h-4 w-4" /> Share Records
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[120px]">Date</TableHead>
                                    <TableHead>Record Type</TableHead>
                                    <TableHead>Doctor</TableHead>
                                    <TableHead>Summary</TableHead>
                                    <TableHead>Tags</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {medicalRecords.map((record, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">{record.date}</TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            {record.type}
                                        </TableCell>
                                        <TableCell>{record.doctor}</TableCell>
                                        <TableCell className="text-muted-foreground">{record.summary}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                {record.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" className="mr-2 gap-2">
                                                <Download className="h-4 w-4" /> Download
                                            </Button>
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

export default PatientMedicalRecordsPage;
