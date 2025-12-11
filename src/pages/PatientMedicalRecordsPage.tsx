import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Share2, Calendar, LogOut, LayoutDashboard, User, Stethoscope, MessageSquare, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const PatientMedicalRecordsPage = () => {
    const { t } = useTranslation();
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const medicalRecords = [
        {
            id: 1,
            date: "2024-07-10",
            doctor: "Dr. Evelyn Reed",
            type: "Consultation Note",
            summary: "Follow-up for hypertension management.",
            tags: ["cardiology", "hypertension"],
            fullDetails: "Patient came in for regular hypertension follow-up. Blood pressure readings have been stable at around 130/85. Current medication (Lisinopril 10mg) is working well. No side effects reported. Patient advised to continue current lifestyle changes and monitor diet. Next follow-up in 3 months.",
        },
        {
            id: 2,
            date: "2024-07-10",
            doctor: "Dr. Evelyn Reed",
            type: "Lab Result",
            summary: "Lipid Panel: LDL Cholesterol slightly elevated.",
            tags: ["lab", "cholesterol"],
            fullDetails: "Lipid Panel Results: Total Cholesterol: 210 mg/dL (Desirable: <200), LDL Cholesterol: 140 mg/dL (Slightly elevated), HDL Cholesterol: 45 mg/dL (Low), Triglycerides: 150 mg/dL (Normal). Recommendation: Increase dietary fiber, reduce saturated fats, consider statin therapy if not already on medication.",
        },
        {
            id: 3,
            date: "2024-06-20",
            doctor: "Dr. Ben Carter",
            type: "Consultation Note",
            summary: "Patient presented with symptoms of a common cold.",
            tags: ["general", "respiratory"],
            fullDetails: "Patient came in with cough, sore throat, and mild fever (99.5°F). Duration of symptoms: 3 days. Physical examination shows mild pharyngeal erythema. Diagnosis: Viral upper respiratory infection. Recommendations: Rest, plenty of fluids, throat lozenges. No antibiotics needed. Symptoms should improve in 7-10 days. Contact if symptoms worsen or fever persists.",
        },
        {
            id: 4,
            date: "2024-05-12",
            doctor: "Dr. Evelyn Reed",
            type: "Imaging Result",
            summary: "Chest X-Ray: Clear, no abnormalities.",
            tags: ["radiology", "chest"],
            fullDetails: "Chest X-Ray Findings: Lungs are clear with no consolidation or infiltrates. Heart size is normal. No pleural effusion. Mediastinum is unremarkable. No acute abnormalities detected. Conclusion: Normal study.",
        },
        {
            id: 5,
            date: "2023-11-01",
            doctor: "Dr. Anya Sharma",
            type: "Allergy Test",
            summary: "Positive for dust mites and pollen.",
            tags: ["allergy", "immunology"],
            fullDetails: "Allergy Testing Results: Positive reactions to: Dust mites (++), Tree pollen (++), Grass pollen (+). Negative for common food allergens. Recommendations: Use air purifier, HEPA filters in bedroom, consider antihistamines during pollen season. Follow-up allergy consultation recommended to discuss immunotherapy options.",
        }
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
                        <Button variant="secondary" className="w-full justify-start gap-2">
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
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">{t('navigation.medicalRecords')}</h1>
                    <p className="text-muted-foreground">{t('patient.medicalRecordsDesc')}</p>
                </header>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>{t('patient.allRecords')}</CardTitle>
                            <CardDescription>{t('patient.browseManage')}</CardDescription>
                        </div>
                        <Button className="gap-2">
                            <Share2 className="h-4 w-4" /> {t('patient.shareRecords')}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[120px]">{t('form.date')}</TableHead>
                                    <TableHead>{t('patient.recordType')}</TableHead>
                                    <TableHead>{t('patient.doctor')}</TableHead>
                                    <TableHead>Summary</TableHead>
                                    <TableHead>Tags</TableHead>
                                    <TableHead className="text-right">{t('patient.action')}</TableHead>
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
                                        <TableCell className="text-right gap-2 flex justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-2"
                                                onClick={() => {
                                                    setSelectedRecord(record);
                                                    setIsViewOpen(true);
                                                }}
                                            >
                                                <Eye className="h-4 w-4" /> View
                                            </Button>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Download className="h-4 w-4" /> {t('patient.download')}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>

            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Medical Record Details</DialogTitle>
                        <DialogDescription>
                            Complete information for this medical record
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRecord && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Date</p>
                                    <p className="text-base font-semibold">{selectedRecord.date}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Doctor</p>
                                    <p className="text-base font-semibold">{selectedRecord.doctor}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Record Type</p>
                                    <p className="text-base font-semibold">{selectedRecord.type}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Tags</p>
                                    <div className="flex gap-1 mt-1">
                                        {selectedRecord.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                    </div>
                                </div>
                            </div>
                            <div className="border-t pt-4">
                                <p className="text-sm font-medium text-muted-foreground mb-2">Summary</p>
                                <p className="text-sm">{selectedRecord.summary}</p>
                            </div>
                            <div className="border-t pt-4">
                                <p className="text-sm font-medium text-muted-foreground mb-2">Full Details</p>
                                <p className="text-sm whitespace-pre-wrap">{selectedRecord.fullDetails}</p>
                            </div>
                            <div className="flex gap-2 justify-end pt-4">
                                <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
                                <Button className="gap-2"><Download className="h-4 w-4" /> Download</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PatientMedicalRecordsPage;
