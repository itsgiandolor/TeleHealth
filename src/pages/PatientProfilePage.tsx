import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, FileText, LogOut, LayoutDashboard, User, Stethoscope, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

const PatientProfilePage = () => {
    const { t } = useTranslation();
    const patient = {
        name: "Giannis Antetokounmpo",
        email: "gian.antetokounmpo@example.com",
        phone: "+1 (123) 456-7890",
        dob: "1994-12-06",
        address: "123 Victory Lane, Milwaukee, WI",
        emergencyContact: {
            name: "Mariah Riddlesprigger",
            phone: "+1 (098) 765-4321",
        },
        avatarUrl: "https://i.pravatar.cc/150?u=giannis",
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
                        <Button variant="secondary" className="w-full justify-start gap-2">
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
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">{t('navigation.profile')}</h1>
                    <p className="text-muted-foreground">{t('patient.manageProfile')}</p>
                </header>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader className="items-center">
                                <Avatar className="h-24 w-24 mb-4">
                                    <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-2xl">{patient.name}</CardTitle>
                                <CardDescription>{patient.email}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Button>{t('patient.changePhoto')}</Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('patient.personalInformation')}</CardTitle>
                                <CardDescription>{t('patient.updateContactDetails')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">{t('patient.fullName')}</Label>
                                        <Input id="fullName" defaultValue={patient.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t('patient.emailAddress')}</Label>
                                        <Input id="email" type="email" defaultValue={patient.email} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">{t('patient.phoneNumber')}</Label>
                                        <Input id="phone" type="tel" defaultValue={patient.phone} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dob">{t('patient.dateOfBirth')}</Label>
                                        <Input id="dob" type="date" defaultValue={patient.dob} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">{t('patient.address')}</Label>
                                    <Input id="address" defaultValue={patient.address} />
                                </div>

                                <Separator />

                                <h3 className="text-lg font-medium">{t('patient.emergencyContact')}</h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="emergencyName">{t('patient.contactName')}</Label>
                                        <Input id="emergencyName" defaultValue={patient.emergencyContact.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="emergencyPhone">{t('patient.contactPhone')}</Label>
                                        <Input id="emergencyPhone" type="tel" defaultValue={patient.emergencyContact.phone} />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button>{t('common.save')}</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PatientProfilePage;
