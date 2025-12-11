import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LayoutDashboard, Users, Stethoscope, Activity, Settings, LogOut, TrendingUp, AlertCircle, CheckCircle, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface DashboardStats {
    totalDoctors: number;
    totalPatients: number;
    totalAppointments: number;
    activeUsers: number;
    pendingVerifications: number;
    systemHealth: number;
}

interface SystemLog {
    id: string;
    timestamp: string;
    user: string;
    action: string;
    status: "success" | "warning" | "error";
}

const AdminDashboard = () => {
    const [currentPage, setCurrentPage] = useState<"dashboard" | "users" | "doctors" | "activity" | "settings">("dashboard");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<any>(null);
    const [isActivityDetailsOpen, setIsActivityDetailsOpen] = useState(false);

    const stats: DashboardStats = {
        totalDoctors: 28,
        totalPatients: 452,
        totalAppointments: 1240,
        activeUsers: 187,
        pendingVerifications: 12,
        systemHealth: 99.2,
    };

    const doctors = [
        { id: "D001", name: "Dr. Evelyn Reed", specialty: "Cardiologist", patients: 45, status: "Active", joinDate: "2024-01-15" },
        { id: "D002", name: "Dr. Marcus Chen", specialty: "Dermatologist", patients: 32, status: "Active", joinDate: "2024-02-20" },
        { id: "D003", name: "Dr. Sarah Johnson", specialty: "General Physician", patients: 58, status: "Active", joinDate: "2023-11-10" },
        { id: "D004", name: "Dr. Ben Carter", specialty: "Pediatrician", patients: 41, status: "Pending", joinDate: "2024-03-05" },
        { id: "D005", name: "Dr. Anya Sharma", specialty: "Neurologist", patients: 28, status: "Active", joinDate: "2024-01-22" },
    ];

    const recentLogs: SystemLog[] = [
        { id: "L001", timestamp: "2024-12-11 14:30", user: "Dr. Reed", action: "Completed consultation", status: "success" },
        { id: "L002", timestamp: "2024-12-11 14:15", user: "Patient Maria", action: "Booked appointment", status: "success" },
        { id: "L003", timestamp: "2024-12-11 13:45", user: "Dr. Chen", action: "Failed login attempt", status: "warning" },
        { id: "L004", timestamp: "2024-12-11 13:20", user: "Admin", action: "Updated system settings", status: "success" },
        { id: "L005", timestamp: "2024-12-11 12:50", user: "System", action: "Database backup completed", status: "success" },
    ];

    const handleViewUserDetails = (user: any) => {
        setSelectedUser(user);
        setIsUserDetailsOpen(true);
    };

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center justify-between border-b px-6">
                    <span className="text-lg font-bold text-primary">TeleHealth Admin</span>
                    <ThemeToggle />
                </div>
                <nav className="flex-1 space-y-2 p-4">
                    <button
                        onClick={() => setCurrentPage("dashboard")}
                        className={`w-full flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${currentPage === "dashboard"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage("users")}
                        className={`w-full flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${currentPage === "users"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                    >
                        <Users className="h-5 w-5" />
                        <span>Users</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage("doctors")}
                        className={`w-full flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${currentPage === "doctors"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                    >
                        <Stethoscope className="h-5 w-5" />
                        <span>Doctors</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage("activity")}
                        className={`w-full flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${currentPage === "activity"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                    >
                        <Activity className="h-5 w-5" />
                        <span>Activity Log</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage("settings")}
                        className={`w-full flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${currentPage === "settings"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                    >
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                    </button>
                </nav>
                <div className="border-t p-4">
                    <Link to="/">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LogOut className="h-4 w-4" /> Logout
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 sm:p-8">
                {/* Dashboard Page */}
                {currentPage === "dashboard" && (
                    <>
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold">Dashboard</h1>
                            <p className="text-muted-foreground">System overview and management</p>
                        </header>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
                                    <Stethoscope className="h-4 w-4 text-accent" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.totalDoctors}</div>
                                    <p className="text-xs text-muted-foreground">+2 this month</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                                    <Users className="h-4 w-4 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.totalPatients}</div>
                                    <p className="text-xs text-muted-foreground">+47 this month</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                                    <Activity className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.activeUsers}</div>
                                    <p className="text-xs text-muted-foreground">Currently online</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.totalAppointments}</div>
                                    <p className="text-xs text-muted-foreground">All time</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
                                    <p className="text-xs text-muted-foreground">Require action</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">System Health</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.systemHealth}%</div>
                                    <p className="text-xs text-muted-foreground">All systems operational</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Activity Log Section */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Latest System Events</CardTitle>
                                    <CardDescription>Recent user actions and system events</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Timestamp</TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Action</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentLogs.map((log) => (
                                                <TableRow key={log.id}>
                                                    <TableCell className="text-sm">{log.timestamp}</TableCell>
                                                    <TableCell className="font-medium">{log.user}</TableCell>
                                                    <TableCell>{log.action}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                log.status === "success" ? "outline" :
                                                                    log.status === "warning" ? "secondary" :
                                                                        "destructive"
                                                            }
                                                        >
                                                            {log.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}

                {/* Users Page */}
                {currentPage === "users" && (
                    <>
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold">Users Management</h1>
                            <p className="text-muted-foreground">Manage all system users</p>
                        </header>

                        <Card>
                            <CardHeader>
                                <CardTitle>All Users</CardTitle>
                                <CardDescription>Patient and Doctor accounts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Join Date</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { id: "U001", name: "Gian D.", type: "Patient", status: "Active", joinDate: "2024-01-15" },
                                            { id: "U002", name: "Maria K.", type: "Patient", status: "Active", joinDate: "2024-01-20" },
                                            { id: "U003", name: "John S.", type: "Patient", status: "Active", joinDate: "2024-02-05" },
                                            { id: "U004", name: "Sarah W.", type: "Patient", status: "Inactive", joinDate: "2023-12-10" },
                                            { id: "U005", name: "Dr. Evelyn Reed", type: "Doctor", status: "Active", joinDate: "2024-01-15" },
                                        ].map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-semibold">{user.name}</TableCell>
                                                <TableCell>{user.type}</TableCell>
                                                <TableCell>
                                                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                                                        {user.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{user.joinDate}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="outline" size="sm" className="gap-2 mr-2" onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsUserDetailsOpen(true);
                                                    }}>
                                                        <Eye className="h-4 w-4" /> View
                                                    </Button>
                                                    <Button variant="destructive" size="sm" className="gap-2">
                                                        <Trash2 className="h-4 w-4" /> Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Doctors Page */}
                {currentPage === "doctors" && (
                    <>
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold">Doctors Management</h1>
                            <p className="text-muted-foreground">Manage and verify doctor accounts</p>
                        </header>

                        <Card>
                            <CardHeader>
                                <CardTitle>Registered Doctors</CardTitle>
                                <CardDescription>Monitor and manage doctor accounts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Doctor</TableHead>
                                            <TableHead>Specialty</TableHead>
                                            <TableHead>Patients</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Join Date</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {doctors.map((doctor) => (
                                            <TableRow key={doctor.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage src={`https://i.pravatar.cc/40?u=${doctor.id}`} />
                                                            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-semibold">{doctor.name}</p>
                                                            <p className="text-xs text-muted-foreground">{doctor.id}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{doctor.specialty}</TableCell>
                                                <TableCell className="font-semibold">{doctor.patients}</TableCell>
                                                <TableCell>
                                                    <Badge variant={doctor.status === "Active" ? "default" : "secondary"}>
                                                        {doctor.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{doctor.joinDate}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-2 mr-2"
                                                        onClick={() => handleViewUserDetails(doctor)}
                                                    >
                                                        <Eye className="h-4 w-4" /> View
                                                    </Button>
                                                    <Button
                                                        variant={doctor.status === "Active" ? "destructive" : "default"}
                                                        size="sm"
                                                    >
                                                        {doctor.status === "Active" ? "Deactivate" : "Activate"}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Activity Log Page */}
                {currentPage === "activity" && (
                    <>
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold">Activity Log</h1>
                            <p className="text-muted-foreground">System events and user actions</p>
                        </header>

                        <Card>
                            <CardHeader>
                                <CardTitle>Complete Activity Log</CardTitle>
                                <CardDescription>All system events in chronological order</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Timestamp</TableHead>
                                            <TableHead>User</TableHead>
                                            <TableHead>Action</TableHead>
                                            <TableHead>Details</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[...recentLogs,
                                        { id: "L006", timestamp: "2024-12-11 12:30", user: "Dr. Johnson", action: "Issued e-prescription", status: "success" },
                                        { id: "L007", timestamp: "2024-12-11 12:00", user: "Patient John", action: "Uploaded medical record", status: "success" },
                                        { id: "L008", timestamp: "2024-12-11 11:45", user: "System", action: "Database optimization", status: "success" },
                                        ].map((log) => (
                                            <TableRow key={log.id}>
                                                <TableCell className="text-sm">{log.timestamp}</TableCell>
                                                <TableCell className="font-medium">{log.user}</TableCell>
                                                <TableCell>{log.action}</TableCell>
                                                <TableCell>
                                                    <Button variant="outline" size="sm" className="gap-2" onClick={() => {
                                                        setSelectedActivity(log);
                                                        setIsActivityDetailsOpen(true);
                                                    }}>
                                                        <Eye className="h-4 w-4" /> Details
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            log.status === "success" ? "outline" :
                                                                log.status === "warning" ? "secondary" :
                                                                    "destructive"
                                                        }
                                                    >
                                                        {log.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Settings Page */}
                {currentPage === "settings" && (
                    <>
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold">Settings</h1>
                            <p className="text-muted-foreground">System configuration and preferences</p>
                        </header>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>General Settings</CardTitle>
                                    <CardDescription>Platform name and contact info</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="platform-name">Platform Name</Label>
                                        <Input id="platform-name" defaultValue="TeleHealth" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="support-email">Support Email</Label>
                                        <Input id="support-email" type="email" defaultValue="support@telehealth.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="support-phone">Support Phone</Label>
                                        <Input id="support-phone" type="tel" defaultValue="+1 (800) 123-4567" />
                                    </div>
                                    <Button>Save Changes</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Security Settings</CardTitle>
                                    <CardDescription>Password and authentication policies</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="min-password">Minimum Password Length</Label>
                                        <Input id="min-password" type="number" defaultValue="8" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                                        <Input id="session-timeout" type="number" defaultValue="30" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                                        <Input id="max-login-attempts" type="number" defaultValue="5" />
                                    </div>
                                    <Button>Save Changes</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Notification Settings</CardTitle>
                                    <CardDescription>Email and notification preferences</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="notify-email">Notification Email</Label>
                                        <Input id="notify-email" type="email" defaultValue="admin@telehealth.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="alert-threshold">Alert Threshold (%)</Label>
                                        <Input id="alert-threshold" type="number" defaultValue="80" />
                                    </div>
                                    <Button>Save Changes</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>System Maintenance</CardTitle>
                                    <CardDescription>Backup and maintenance settings</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="backup-frequency">Backup Frequency</Label>
                                        <Input id="backup-frequency" defaultValue="Daily at 2:00 AM" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-backup">Last Backup</Label>
                                        <Input id="last-backup" defaultValue="2024-12-11 02:00 AM" disabled />
                                    </div>
                                    <Button>Perform Backup Now</Button>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>System Messages</CardTitle>
                                <CardDescription>Display messages to all users</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="system-message">System Announcement</Label>
                                    <Textarea
                                        id="system-message"
                                        placeholder="Enter announcement message here..."
                                        rows={5}
                                    />
                                </div>
                                <Button>Post Announcement</Button>
                            </CardContent>
                        </Card>
                    </>
                )}
            </main>

            {/* User Details Modal */}
            <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogDescription>
                            Complete user information
                        </DialogDescription>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 pb-4 border-b">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={`https://i.pravatar.cc/80?u=${selectedUser.id}`} />
                                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                                    <p className="text-muted-foreground">ID: {selectedUser.id}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Specialty</p>
                                    <p className="text-base font-semibold">{selectedUser.specialty}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                                    <p className="text-base font-semibold">{selectedUser.joinDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Active Patients</p>
                                    <p className="text-base font-semibold">{selectedUser.patients}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <Badge variant={selectedUser.status === "Active" ? "default" : "secondary"}>
                                        {selectedUser.status}
                                    </Badge>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <p className="text-sm font-medium text-muted-foreground mb-2">Account Actions</p>
                                <div className="flex gap-2">
                                    <Button variant="outline">Send Message</Button>
                                    <Button variant="outline">Edit Account</Button>
                                    <Button variant="destructive" className="ml-auto">Deactivate Account</Button>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-end pt-4 border-t">
                                <Button variant="outline" onClick={() => setIsUserDetailsOpen(false)}>Close</Button>
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Activity Details Modal */}
            <Dialog open={isActivityDetailsOpen} onOpenChange={setIsActivityDetailsOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Activity Details</DialogTitle>
                        <DialogDescription>
                            Complete event information
                        </DialogDescription>
                    </DialogHeader>
                    {selectedActivity && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                                    <p className="text-base font-semibold">{selectedActivity.timestamp}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <Badge
                                        variant={
                                            selectedActivity.status === "success" ? "outline" :
                                                selectedActivity.status === "warning" ? "secondary" :
                                                    "destructive"
                                        }
                                        className="mt-1"
                                    >
                                        {selectedActivity.status}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">User</p>
                                    <p className="text-base font-semibold">{selectedActivity.user}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Action</p>
                                    <p className="text-base font-semibold">{selectedActivity.action}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Event ID</p>
                                    <p className="text-base font-mono text-muted-foreground">{selectedActivity.id}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-end pt-4 border-t">
                                <Button variant="outline" onClick={() => setIsActivityDetailsOpen(false)}>Close</Button>
                                <Button>Export Event</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminDashboard;
