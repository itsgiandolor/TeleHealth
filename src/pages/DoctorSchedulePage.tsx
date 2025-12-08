import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Check, Clock, PlusCircle, LayoutDashboard, Users, MessageSquare, LogOut, Stethoscope, Video, FileText } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, Toaster } from "@/components/ui/sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const appointmentSchema = z.object({
    patient: z.string().min(1, "Patient name is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    reason: z.string().min(1, "Reason is required"),
    status: z.enum(["Confirmed", "Completed", "Cancelled", "Rescheduled"]),
});

const appointments = [
    {
        date: "2025-12-08",
        time: "09:00 - 10:00",
        patient: "Liam Johnson",
        avatar: "https://i.pravatar.cc/40?u=liam",
        reason: "Follow-up Check",
        status: "Completed",
    },
    {
        date: "2025-12-08",
        time: "10:00 - 11:00",
        patient: "Olivia Smith",
        avatar: "https://i.pravatar.cc/40?u=olivia",
        reason: "New Consultation",
        status: "Completed",
    },
    {
        date: "2025-12-08",
        time: "11:00 - 12:00",
        patient: "Noah Williams",
        avatar: "https://i.pravatar.cc/40?u=noah",
        reason: "Headache",
        status: "Confirmed",
    },
    // ... more appointments
];

const DoctorSchedulePage = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date("2025-12-08"))
    const [appointmentList, setAppointmentList] = React.useState(appointments);

    const filteredAppointments = appointmentList.filter(a => date && format(date, "yyyy-MM-dd") === a.date);

    const upcomingAppointments = filteredAppointments.filter(a => a.status === "Confirmed" || a.status === "Rescheduled");
    const completedAppointments = filteredAppointments.filter(a => a.status === "Completed");
    const cancelledAppointments = filteredAppointments.filter(a => a.status === "Cancelled");
    
    const addAppointment = (data: z.infer<typeof appointmentSchema>) => {
        setAppointmentList(prev => [...prev, { ...data, avatar: `https://i.pravatar.cc/40?u=${data.patient}` }]);
        toast.success("Appointment created successfully!");
    };

    return (
        <>
            <Toaster />
            <div className="flex min-h-screen w-full bg-muted/40">
                <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
                    <div className="flex h-16 items-center border-b px-6">
                        <Link to="/" className="flex items-center gap-2 font-semibold">
                            <Stethoscope className="h-6 w-6 text-primary" />
                            <span>Telemedicine</span>
                        </Link>
                    </div>
                    <nav className="flex-1 space-y-2 p-4">
                        <Link to="/dashboard/doctor">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <LayoutDashboard className="h-4 w-4" /> Dashboard
                            </Button>
                        </Link>
                        <Button variant="secondary" className="w-full justify-start gap-2">
                            <Clock className="h-4 w-4" /> Schedule
                        </Button>
                        <Link to="/doctor/patients">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Users className="h-4 w-4" /> Patients
                            </Button>
                        </Link>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <MessageSquare className="h-4 w-4" /> Messages
                        </Button>
                    </nav>
                    <div className="mt-auto p-4">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LogOut className="h-4 w-4" /> Logout
                        </Button>
                    </div>
                </aside>
                <main className="flex-1 p-6 sm:p-8">
                    <header className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold">My Schedule</h1>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2">
                                    <PlusCircle className="h-5 w-5" />
                                    <span>Add Appointment</span>
                                </Button>
                            </DialogTrigger>
                            <AddAppointmentForm addAppointment={addAppointment} />
                        </Dialog>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Appointments for {date ? format(date, "PPP") : '...'}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="upcoming">
                                        <TabsList>
                                            <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
                                            <TabsTrigger value="completed">Completed ({completedAppointments.length})</TabsTrigger>
                                            <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="upcoming">
                                            <AppointmentList appointments={upcomingAppointments} />
                                        </TabsContent>
                                        <TabsContent value="completed">
                                            <AppointmentList appointments={completedAppointments} />
                                        </TabsContent>
                                        <TabsContent value="cancelled">
                                            <AppointmentList appointments={cancelledAppointments} />
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardContent className="p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-md"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

const AddAppointmentForm = ({ addAppointment }: { addAppointment: (data: any) => void }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(appointmentSchema),
        defaultValues: { status: "Confirmed" }
    });

    const onSubmit = (data: any) => {
        addAppointment(data);
        reset();
    };

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Add New Appointment</DialogTitle>
                <DialogDescription>
                    Fill in the details below to add a new appointment.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="patient" className="text-right">
                        Patient Name
                    </Label>
                    <div className="col-span-3">
                        <Input id="patient" {...register("patient")} />
                        {errors.patient && <p className="text-red-500 text-xs mt-1">{errors.patient.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                        Date
                    </Label>
                    <div className="col-span-3">
                        <Input id="date" type="date" {...register("date")} />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                        Time
                    </Label>
                    <div className="col-span-3">
                        <Input id="time" type="time" {...register("time")} />
                        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reason" className="text-right">
                        Reason
                    </Label>
                    <div className="col-span-3">
                        <Textarea id="reason" {...register("reason")} />
                        {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                        Status
                    </Label>
                    <div className="col-span-3">
                        <Select onValueChange={(value) => register("status").onChange({ target: { value } })} defaultValue="Confirmed">
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Confirmed">Confirmed</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save Appointment</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}

const AppointmentList = ({ appointments }: { appointments: any[] }) => (
    <div className="space-y-4 pt-4">
        {appointments.length > 0 ? appointments.map((appointment, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg border bg-background hover:bg-muted transition-colors">
                <Avatar>
                    <AvatarImage src={appointment.avatar} />
                    <AvatarFallback>{appointment.patient.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground"><FileText className="inline-block h-4 w-4 mr-1" />{appointment.reason}</p>
                    <p className="text-sm text-muted-foreground"><Clock className="inline-block h-4 w-4 mr-1" />{appointment.time}</p>
                </div>
                <Badge
                    className={`px-2 py-1 text-xs font-medium rounded-full ${appointment.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "Confirmed"
                                ? "bg-blue-100 text-blue-800"
                                : appointment.status === "Cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                        }`}
                >
                    {appointment.status}
                </Badge>
                {appointment.status === 'Confirmed' && <Button size="sm" className="gap-2"><Video className="h-4 w-4" /> Start Call</Button>}
            </div>
        )) : (
            <p className="text-muted-foreground text-center py-8">No appointments for this day.</p>
        )}
    </div>
);


export default DoctorSchedulePage;