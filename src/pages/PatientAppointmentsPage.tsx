import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, Video, Stethoscope, User, FileText, LogOut, LayoutDashboard, PlusCircle, AlertCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    const { t } = useTranslation();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedType, setSelectedType] = useState<"online" | "onsite">("online");
    const [reason, setReason] = useState("");

    const upcomingAppointments = appointments.filter(a => a.status === "Confirmed");
    const pastAppointments = appointments.filter(a => a.status === "Completed");
    const cancelledAppointments = appointments.filter(a => a.status === "Cancelled");

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
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" /> {t('navigation.dashboard')}
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <Button variant="secondary" className="w-full justify-start gap-2">
                            <Calendar className="h-4 w-4" /> {t('navigation.appointments')}
                        </Button>
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
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">{t('navigation.appointments')}</h1>
                        <p className="text-muted-foreground">{t('patient.scheduledConsultations')}</p>
                    </div>
                    <Button size="lg" className="gap-2" onClick={() => setIsBookingOpen(true)}>
                        <PlusCircle className="h-5 w-5" />
                        {t('patient.bookNewAppointment')}
                    </Button>
                </header>

                <Tabs defaultValue="upcoming">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="upcoming">{t('patient.upcomingAppointments')}</TabsTrigger>
                        <TabsTrigger value="past">{t('status.completed')}</TabsTrigger>
                        <TabsTrigger value="cancelled">{t('status.cancelled')}</TabsTrigger>
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
                                        <SelectValue placeholder={t('patient.selectDoctor')} />
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
                                        <SelectValue placeholder={t('patient.selectTime')} />
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
                                <Label htmlFor="type">{t('patient.appointmentType')}</Label>
                                <Select value={selectedType} onValueChange={(value) => setSelectedType(value as "online" | "onsite")}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('patient.appointmentType')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="online">{t('patient.online')}</SelectItem>
                                        <SelectItem value="onsite">{t('patient.onsite')}</SelectItem>
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
                                {t('common.cancel')}
                            </Button>
                            <Button onClick={handleBookAppointment}>
                                {t('patient.requestAppointment')}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </main>
        </div>
    );
};

const AppointmentList = ({ appointments, status }: { appointments: any[], status: string }) => {
    const { t } = useTranslation();
    return (
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
                                <Badge variant={appointment.status === 'Confirmed' ? 'default' : appointment.status === 'Completed' ? 'secondary' : 'destructive'} className="ml-auto">{t(`status.${appointment.status.toLowerCase()}`)}</Badge>
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
                                        <Button className="w-full gap-2"><Video className="h-4 w-4" /> {t('patient.joinCall')}</Button>
                                        <Button variant="outline" className="w-full">{t('patient.reschedule')}</Button>
                                    </div>
                                )}
                                {appointment.status === 'Completed' && (
                                    <Button variant="outline" className="w-full">{t('patient.viewRecord')}</Button>
                                )}
                                {appointment.status === 'Cancelled' && (
                                    <Button variant="secondary" className="w-full" disabled>{t('patient.bookAppointment')}</Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="mt-4">
                    <CardContent className="p-6 text-center">
                        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">{t('patient.noAppointments')}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {status === 'Upcoming' && t('patient.noAppointments')}
                            {status === 'Completed' && t('patient.noAppointments')}
                            {status === 'Cancelled' && t('patient.noAppointments')}
                        </p>
                        {status === 'Upcoming' && (
                            <Button className="mt-4 gap-2">
                                <PlusCircle className="h-4 w-4" /> {t('patient.bookAppointment')}
                            </Button>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default PatientAppointmentsPage;