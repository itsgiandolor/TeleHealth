import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Video, FileText, MessageSquare, LogOut, LayoutDashboard, User, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";
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

const doctors = [
    { id: 1, name: "Dr. Evelyn Reed", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Marcus Chen", specialty: "Dermatologist" },
    { id: 3, name: "Dr. Sarah Johnson", specialty: "General Physician" },
    { id: 4, name: "Dr. Ben Carter", specialty: "Pediatrician" },
];

const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
];

const PatientDashboard = () => {
    const { t } = useTranslation();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedType, setSelectedType] = useState<"online" | "onsite">("online");
    const [reason, setReason] = useState("");

    const handleBookAppointment = () => {
        if (selectedDoctor && selectedDate && selectedTime && reason) {
            setIsBookingOpen(false);
            setSelectedDoctor("");
            setSelectedDate("");
            setSelectedTime("");
            setSelectedType("online");
            setReason("");
            alert("Appointment booked successfully!");
        }
    };
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
            <aside className="hidden w-80 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center justify-between border-b px-6">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <Stethoscope className="h-6 w-6 text-primary" />
                        <span>{t('common.telemedicine')}</span>
                    </Link>
                    <div className="flex gap-2">
                        <LanguageSelector />
                        <ThemeToggle />
                    </div>
                </div>
                <nav className="flex-1 space-y-2 p-4">
                    <Link to="/dashboard/patient">
                        <Button variant="secondary" className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" /> {t('navigation.dashboard')}
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <Link to="/patient/appointments">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Calendar className="h-4 w-4" /> {t('navigation.appointments')}
                            </Button>
                        </Link>
                        <Link to="/patient/appointment-requests">
                            <Button variant="ghost" className="w-full justify-start gap-2 pl-8">
                                <Calendar className="h-4 w-4" /> {t('navigation.appointmentRequests')}
                            </Button>
                        </Link>
                    </div>
                    <Link to="/patient/records">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" /> {t('navigation.medicalRecords')}
                        </Button>
                    </Link>
                    <Link to="/patient/messages">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <MessageSquare className="h-4 w-4" /> {t('navigation.messages')}
                        </Button>
                    </Link>
                    <Link to="/patient/profile">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <User className="h-4 w-4" /> {t('navigation.profile')}
                        </Button>
                    </Link>
                </nav>
                <div className="mt-auto p-4">
                    <Link to="/">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LogOut className="h-4 w-4" /> {t('common.logout')}
                        </Button>
                    </Link>
                </div>
            </aside>

            <main className="flex-1 p-6 sm:p-8">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{t('patient.welcome', { name: 'Gian' })}</h1>
                        <p className="text-muted-foreground">{t('patient.healthSummary')}</p>
                    </div>
                    <Button size="lg" className="gap-2" onClick={() => setIsBookingOpen(true)}>
                        <Calendar className="h-5 w-5" /> {t('patient.bookNewAppointment')}
                    </Button>
                </header>

                <div className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('patient.upcomingAppointments')}</CardTitle>
                            <CardDescription>{t('patient.scheduledConsultations')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('patient.doctor')}</TableHead>
                                        <TableHead>{t('patient.dateTime')}</TableHead>
                                        <TableHead className="text-right">{t('patient.action')}</TableHead>
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
                            <CardTitle>{t('patient.medicalHistory')}</CardTitle>
                            <CardDescription>{t('patient.yourConsultations')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('patient.doctor')}</TableHead>
                                        <TableHead>{t('form.date')}</TableHead>
                                        <TableHead>{t('patient.diagnosis')}</TableHead>
                                        <TableHead className="text-right">{t('patient.ePrescription')}</TableHead>
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

            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('patient.bookNewAppointment')}</DialogTitle>
                        <DialogDescription>
                            {t('patient.selectReason')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="doctor">{t('patient.selectDoctor')}</Label>
                            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {doctors.map((doctor) => (
                                        <SelectItem key={doctor.id} value={doctor.name}>
                                            {doctor.name} - {doctor.specialty}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="date">{t('form.date')}</Label>
                            <Input
                                id="date"
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="time">{t('form.time')}</Label>
                            <Select value={selectedTime} onValueChange={setSelectedTime}>
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
                        <div className="grid gap-2">
                            <Label htmlFor="type">Appointment Type</Label>
                            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as "online" | "onsite")}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select appointment type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="onsite">Onsite</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="reason">{t('patient.reason')}</Label>
                            <Input
                                id="reason"
                                placeholder="Describe your concern or reason for visit"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleBookAppointment}>
                            Book Appointment
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PatientDashboard;